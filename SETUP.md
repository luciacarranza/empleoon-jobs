# Empleoon — Guía de Setup

## Requisitos previos
- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)

---

## 1. Instalar dependencias

```bash
npm install
```

---

## 2. Configurar Supabase

1. Creá un nuevo proyecto en https://supabase.com
2. Andá a **SQL Editor** y pegá el contenido de `supabase/schema.sql`
3. Ejecutá el script para crear las tablas (incluye la tabla `candidates` y el bucket de Storage `cvs`)
4. Andá a **Settings > API** y copiá:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
5. Verificá en **Storage** que se haya creado el bucket `cvs` (privado). Si no aparece, creálo manualmente: New bucket → nombre `cvs` → Public **OFF**

---

## Banco de talento (CVs de candidatos)

- Página pública: `/candidatos` — formulario simple (nombre, email, área, seniority, CV en PDF/Word)
- Los CVs se guardan en el bucket privado `cvs` de Supabase Storage
- Los datos del candidato se guardan en la tabla `candidates`

**Para ver/descargar los CVs recibidos:**
- Supabase Dashboard → Table Editor → `candidates` (ver datos de contacto)
- Supabase Dashboard → Storage → `cvs` (descargar los archivos, nombrados como `nombre-timestamp.ext`)

---

## 3. Variables de entorno

```bash
cp .env.local.example .env.local
# Editá .env.local con tus valores de Supabase
```

---

## 4. Correr en desarrollo

```bash
npm run dev
# Abrí http://localhost:3000
```

---

## 5. Deploy en Vercel

1. Subí el código a GitHub
2. Importá el proyecto en https://vercel.com
3. Configurá las variables de entorno en Vercel (las mismas que .env.local)
4. Deploy automático en cada push a main

---

## 6. Publicar vacantes

### Opción A — Formulario admin (recomendado)
- Andá a `/admin` en tu sitio
- Usuario: `admin`
- Password: el que configuraste en `ADMIN_PASSWORD`
- Completá el formulario

### Opción B — Supabase Dashboard (más rápido)
- Abrí https://supabase.com/dashboard
- Seleccioná tu proyecto
- Table Editor → tabla `jobs`
- Insert Row

### Campos importantes de una vacante
| Campo | Descripción |
|-------|-------------|
| `slug` | URL amigable (ej: `senior-dev-acme-2024`) |
| `is_featured` | `true` para aparecer destacada arriba |
| `is_active` | `false` para desactivar sin borrar |
| `apply_url` | Link directo a la aplicación |

---

## 7. Monetización

### Newsletter
- Los suscriptores se guardan en la tabla `newsletter_subscribers`
- Exportalos desde Supabase → Table Editor → Export CSV
- Importalos en Mailchimp, ConvertKit, Brevo o Resend

### Vacantes destacadas (`is_featured = true`)
- Cobrás por destacar una vacante
- La marcás como featured al cargarla

### Vacantes patrocinadas
- Usá la tabla `sponsored_slots` para trackear períodos pagos
- Integrá Stripe para pagos (futuro)

---

## 8. Dominio personalizado
1. Comprá el dominio en Namecheap, GoDaddy o Cloudflare
2. En Vercel → Settings → Domains → Add Domain
3. Seguí las instrucciones DNS

---

## Comandos útiles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run lint     # Verificar errores
```
