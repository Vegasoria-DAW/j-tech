<?php

declare(strict_types=1);

/**
 * Endpoint del formulario de contacto de J-TECH.
 *
 * Recibe JSON por POST, valida los datos, aplica medidas antispam
 * (honeypot, trampa de tiempo y limite por IP) y envia el correo
 * por SMTP usando PHPMailer. Responde siempre en JSON.
 */

use PHPMailer\PHPMailer\PHPMailer;

// Buffer de salida: neutraliza un BOM o espacios accidentales en config.php
// para que no rompan las cabeceras HTTP.
ob_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

/**
 * Responde en JSON y termina.
 */
function respond(int $status, array $payload): void
{
    if (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Limita los envios por IP usando un fichero temporal.
 */
function checkRateLimit(int $max, int $window): bool
{
    if ($max <= 0 || $window <= 0) {
        return true;
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = sys_get_temp_dir() . '/jtech_rate';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];

    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = $decoded;
        }
    }

    $hits = array_values(array_filter($hits, static fn ($t): bool => ($now - (int) $t) < $window));
    if (count($hits) >= $max) {
        return false;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);

    return true;
}

/**
 * Devuelve un campo de texto saneado (sin saltos de linea para evitar
 * inyeccion de cabeceras) y recortado.
 */
function field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    if (!is_scalar($value)) {
        return '';
    }
    $value = str_replace(["\r", "\n", '%0a', '%0d'], ' ', (string) $value);

    return trim($value);
}

// --- Configuracion ---
$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    error_log('[J-TECH contacto] Falta config.php');
    respond(500, ['ok' => false, 'message' => 'El formulario no esta configurado.']);
}
$config = require $configFile;
if (!is_array($config)) {
    error_log('[J-TECH contacto] config.php no devuelve un array');
    respond(500, ['ok' => false, 'message' => 'El formulario no esta configurado.']);
}

// --- Solo mismo origen ---
$allowedOrigins = (array) ($config['allowed_origins'] ?? []);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $allowedOrigins !== [] && !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'message' => 'Origen no permitido.']);
}

// --- Solo POST ---
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Metodo no permitido.']);
}

// --- Limite de tamano ---
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 100000) {
    respond(413, ['ok' => false, 'message' => 'La solicitud es demasiado grande.']);
}

// --- Leer el cuerpo JSON ---
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'message' => 'Solicitud no valida.']);
}

$name     = field($data, 'name');
$email    = field($data, 'email');
$phone    = field($data, 'phone');
$business = field($data, 'business');
$service  = field($data, 'service');
$message  = field($data, 'message');

$honeypot = field($data, 'website');
$started  = (int) ($data['startedAt'] ?? 0);

// --- Antispam: honeypot ---
// Se responde ok para no dar pistas al bot, pero no se envia nada.
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

// --- Antispam: trampa de tiempo ---
$elapsed = time() - (int) round($started / 1000);
$minSeconds = (int) ($config['min_seconds'] ?? 3);
$maxSeconds = (int) ($config['max_seconds'] ?? 7200);
if ($started <= 0 || $elapsed < $minSeconds || $elapsed > $maxSeconds) {
    respond(422, [
        'ok' => false,
        'message' => 'No hemos podido verificar el formulario. Recarga la pagina e intentalo de nuevo.',
    ]);
}

// --- Antispam: limite por IP ---
$rateMax = (int) ($config['rate_max'] ?? 3);
$rateWindow = (int) ($config['rate_window'] ?? 600);
if (!checkRateLimit($rateMax, $rateWindow)) {
    respond(429, [
        'ok' => false,
        'message' => 'Has enviado demasiadas solicitudes. Espera unos minutos e intentalo de nuevo.',
    ]);
}

// --- Validacion ---
$invalid = [];
if ($name === '' || mb_strlen($name) > 120) {
    $invalid[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 190) {
    $invalid[] = 'email';
}
if ($service === '' || mb_strlen($service) > 120) {
    $invalid[] = 'service';
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    $invalid[] = 'message';
}
if ($phone !== '' && mb_strlen($phone) > 40) {
    $invalid[] = 'phone';
}
if ($business !== '' && mb_strlen($business) > 150) {
    $invalid[] = 'business';
}

if ($invalid !== []) {
    respond(422, [
        'ok' => false,
        'message' => 'Revisa los campos del formulario.',
        'fields' => $invalid,
    ]);
}

// --- Envio por SMTP ---
require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconocida';
$when = date('d/m/Y H:i');
$esc = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

$rows = [
    'Nombre'    => $name,
    'Email'     => $email,
    'Telefono'  => $phone !== '' ? $phone : '—',
    'Empresa'   => $business !== '' ? $business : '—',
    'Servicio'  => $service,
];

$htmlRows = '';
foreach ($rows as $label => $value) {
    $htmlRows .= '<tr><td style="padding:6px 12px;font-weight:600;color:#101828;">' . $esc($label)
        . '</td><td style="padding:6px 12px;color:#334155;">' . $esc((string) $value) . '</td></tr>';
}

$html = '<!doctype html><html lang="es"><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">'
    . '<div style="max-width:600px;margin:0 auto;padding:24px;">'
    . '<h2 style="color:#101828;margin:0 0 4px;">Nueva solicitud de presupuesto</h2>'
    . '<p style="color:#5c6675;margin:0 0 16px;">Recibida desde el formulario de la web (versión portfolio)</p>'
    . '<table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e9f0;border-radius:12px;">'
    . $htmlRows
    . '</table>'
    . '<h3 style="color:#101828;margin:20px 0 6px;">Mensaje</h3>'
    . '<div style="background:#fff;border:1px solid #e5e9f0;border-radius:12px;padding:12px;color:#334155;white-space:pre-wrap;">'
    . $esc($message) . '</div>'
    . '<p style="color:#9aa4b5;font-size:12px;margin-top:16px;">IP: ' . $esc($ip) . ' · ' . $esc($when) . '</p>'
    . '</div></body></html>';

$plain = "Nueva solicitud de presupuesto - J-TECH\n\n";
foreach ($rows as $label => $value) {
    $plain .= $label . ': ' . $value . "\n";
}
$plain .= "\nMensaje:\n" . $message . "\n\n---\nIP: " . $ip . ' · ' . $when . "\n";

try {
    // Captura la ultima respuesta de error del servidor SMTP (4xx/5xx) para
    // poder registrarla. Solo se guardan lineas "SERVER -> CLIENT", nunca los
    // comandos del cliente (que es donde viajan las credenciales).
    $smtpReply = '';
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = static function (string $str, int $level) use (&$smtpReply): void {
        if (strpos($str, 'SERVER -> CLIENT:') !== 0) {
            return;
        }
        $line = trim(substr($str, strlen('SERVER -> CLIENT:')));
        if (preg_match('/^[45]\d\d\b/', $line) === 1) {
            $smtpReply = $line;
        }
    };
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp_host'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_user'];
    $mail->Password = (string) $config['smtp_pass'];
    $mail->SMTPSecure = (($config['smtp_secure'] ?? 'ssl') === 'tls')
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom((string) $config['from'], (string) ($config['from_name'] ?? 'J-TECH'));
    foreach ((array) $config['to'] as $recipient) {
        $mail->addAddress((string) $recipient);
    }
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Nueva solicitud de presupuesto - ' . $name;
    $mail->isHTML(true);
    $mail->Body = $html;
    $mail->AltBody = $plain;

    $mail->send();
} catch (\Throwable $e) {
    // Motivo real devuelto por el servidor SMTP, sin exponer credenciales.
    $detail = !empty($smtpReply) ? $smtpReply : (isset($mail) ? trim((string) $mail->ErrorInfo) : '');
    if ($detail === $e->getMessage()) {
        $detail = '';
    }

    error_log('[J-TECH contacto] ' . $e->getMessage() . ($detail !== '' ? ' | ' . $detail : ''));
    respond(500, [
        'ok' => false,
        'message' => 'No se pudo enviar el mensaje. Intentalo de nuevo en unos minutos.',
    ]);
}

respond(200, [
    'ok' => true,
    'message' => 'Gracias. Hemos recibido tu solicitud.',
]);
