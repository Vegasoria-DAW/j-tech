<?php

/**
 * Plantilla de configuracion del formulario de contacto de J-TECH.
 * Copia este archivo a "config.php" y rellena la contrasena del buzon.
 * "config.php" NO se sube a git y queda bloqueado por .htaccess.
 */
return [
    // Servidor SMTP de IONOS.
    // IMPORTANTE: para buxones alojados en el cluster europeo hay que usar
    // "smtp.ionos.es" (o "smtp.ionos.de"); "smtp.ionos.com" apunta al cluster
    // de EE. UU. y devuelve "535 Authentication credentials invalid".
    'smtp_host'   => 'smtp.ionos.es',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl', // 'ssl' (465) o 'tls' (587)

    'smtp_user'   => 'hola@ejemplo.com',
    'smtp_pass'   => '',

    // Destinatario(s) de las solicitudes
    'to'          => ['hola@ejemplo.com'],

    // Remitente: debe ser un buzon real del dominio
    'from'        => 'hola@ejemplo.com',
    'from_name'   => 'J-TECH Portfolio - Formulario web',

    // Antispam
    'min_seconds' => 3,
    'max_seconds' => 7200,
    'rate_max'    => 3,
    'rate_window' => 600,

    // Origenes permitidos (produccion + desarrollo local)
    'allowed_origins' => [
        'https://ejemplo.com',
        'https://www.ejemplo.com',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
];