# J-TECH — Colores corporativos

Referencia extraída de `src/styles/variables.css` del proyecto J-Tech
(j-tech.site). Fuente de verdad para la paleta del CRM.

## Marca (iguales en ambos modos)

| Uso                                | Variable                | Hex                          |
| ---------------------------------- | ----------------------- | ---------------------------- |
| Primario (botones, enlaces, focos) | `--color-primary`       | `#2f5cff`                    |
| Primario hover                     | `--color-primary-hover` | `#2348d8`                    |
| Primario active/pressed            | `--color-primary-active`| `#1d3dbd`                    |
| Primario suave (fondos destacados) | `--color-primary-soft`  | `#eef2ff`                    |
| Acento (degradados con primario)   | `--color-accent`        | `#7c5cff`                    |
| Degradado marca                    | —                       | `linear-gradient(135deg, #2f5cff, #7c5cff)` |
| Éxito                              | `--color-success`       | `#16a34a`                    |
| Peligro                            | `--color-danger`        | `#dc2626`                    |

## Modo claro

| Uso                              | Variable                | Hex                        |
| -------------------------------- | ----------------------- | -------------------------- |
| Fondo página                     | `--color-bg`            | `#ffffff`                  |
| Fondo suave (secciones alternas) | `--color-bg-soft`       | `#f5f7fb`                  |
| Superficie (tarjetas)            | `--color-surface`       | `#ffffff`                  |
| Superficie suave (badges, cont.) | `--color-surface-soft`  | `#e8ecf3`                  |
| Superficie hover                 | `--color-surface-hover` | `#eef1f6`                  |
| Superficie muted                 | `--color-surface-muted` | `#d7dde8`                  |
| Texto principal                  | `--color-text`          | `#101828`                  |
| Texto secundario                 | `--color-text-muted`    | `#5c6675`                  |
| Borde                            | `--color-border`        | `#e5e9f0`                  |
| Borde hover                      | `--color-border-hover`  | `#c9d2e0`                  |
| Éxito suave (fondos)             | `--color-success-soft`  | `#e8f7ee`                  |
| Info suave (fondos)              | `--color-info-soft`     | `#eaf1ff`                  |
| Nav translúcido / con scroll     | `--color-nav-bg`        | `rgba(255,255,255,0.8)` / `rgba(255,255,255,0.94)` |

## Modo oscuro

| Uso                              | Variable                | Hex                        |
| -------------------------------- | ----------------------- | -------------------------- |
| Fondo página                     | `--color-bg`            | `#0b1220`                  |
| Fondo suave                      | `--color-bg-soft`       | `#101a30`                  |
| Superficie (tarjetas)            | `--color-surface`       | `#14203a`                  |
| Superficie suave                 | `--color-surface-soft`  | `#1c2946`                  |
| Superficie hover                 | `--color-surface-hover` | `#202f4d`                  |
| Superficie muted                 | `--color-surface-muted` | `#2a3a5c`                  |
| Texto principal                  | `--color-text`          | `#f5f7fb`                  |
| Texto secundario                 | `--color-text-muted`    | `#9aa4b5`                  |
| Borde                            | `--color-border`        | `#26334f`                  |
| Borde hover                      | `--color-border-hover`  | `#344362`                  |
| Primario suave (fondos)          | `--color-primary-soft`  | `rgba(99,102,241,0.22)`    |
| Éxito suave                      | `--color-success-soft`  | `#103123`                  |
| Info suave                       | `--color-info-soft`     | `#152442`                  |
| Nav translúcido / con scroll     | `--color-nav-bg`        | `rgba(11,18,32,0.8)` / `rgba(11,18,32,0.94)` |

## Reglas de uso (observadas en su web)

- Los **CTA y elementos de marca** usan el degradado
  `135deg #2f5cff → #7c5cff`; el texto destacado, degradado `90deg`
  con los mismos colores.
- Los fondos oscuros llevan **resplandores radiales** sutiles azul/violeta
  (p. ej. `rgba(47,92,255,0.22)` y `rgba(124,92,255,0.18)`).
- Tipografías: `Inter` (texto) + `Space Grotesk` (titulares);
  radios 8/12/16/24 px.

## Mapeo a los tokens del CRM (`app/globals.css`)

| Token CRM (`--background`, `--foreground`, …) | Claro         | Oscuro    |
| -------------------------------------------- | ------------- | --------- |
| `background` / `foreground`                  | `#ffffff` / `#101828` | `#0b1220` / `#f5f7fb` |
| `card` / `popover`                           | `#ffffff`     | `#14203a` |
| `primary`                                    | `#2f5cff`     | `#2f5cff` |
| `accent` (hovers)                            | `#eef2ff`     | `#1f2950` |
| `accent-foreground`                          | `#1d3dbd`     | `#c9d4ff` |
| `secondary`                                  | `#e8ecf3`     | `#1c2946` |
| `muted`                                      | `#f5f7fb`     | `#101a30` |
| `muted-foreground`                           | `#5c6675`     | `#9aa4b5` |
| `border` / `input`                           | `#e5e9f0`     | `#26334f` |
| `ring`                                       | `#2f5cff`     | `#7c5cff` |
| `destructive`                                | `#dc2626`     | `#dc2626` |

> Nota: `ring` en oscuro usa el violeta de marca (`#7c5cff`) en vez de un
> derivado del azul para que los focos destaquen sobre el fondo `#0b1220`.
> El botón primario usa el degradado
> `bg-linear-to-br from-[#2f5cff] to-[#7c5cff]` (ver `components/ui/button.tsx`).
