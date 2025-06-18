# SYRDIA ERP - Sistema Multiempresa

**SYRDIA** es un sistema ERP escalable y modular desarrollado por [DAYARAN SYSTEMS](https://dayaran.com). Diseñado para adaptarse a distintos rubros empresariales (restaurantes, librerías, ferreterías, minimarkets, etc.) bajo un esquema **multiempresa, multisucursal y multiusuario** con roles y permisos configurables.

## 🧠 Arquitectura General

| Capa       | Tecnología             |
|------------|------------------------|
| Backend    | Node.js + Express + MySQL (Store Procedures) |
| Frontend   | React + Tailwind CSS + Vite                  |
| Autenticación | JWT (token único generado por usuario técnico) |
| Infraestructura | AWS (RDS, EC2, futuro S3, Route53)         |

---

## 📁 Estructura del Proyecto
erp-syrdia/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── app.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ └── package.json
│
└── README.md


---

## 🚀 Funcionalidades actuales

### 🔐 Módulo de Seguridad
- ✅ Login de usuarios
- ✅ Cambio de contraseña
- ✅ Gestión de usuarios (crear, editar, listar)
- ✅ Roles por empresa
- ✅ Sucursales por empresa
- ✅ Menú dinámico por permisos

### 🧩 Estructura modular (en progreso)
- [x] Dashboard por usuario
- [x] Acceso por módulos y permisos
- [ ] Ventas
- [ ] Compras
- [ ] Inventario
- [ ] Facturación Electrónica SUNAT (futuro)

---

## 🛠️ Instalación Local

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/erp-syrdia.git
cd erp-syrdia

2. Variables de entorno
Crea archivos .env en ambas carpetas:

📦 backend/.env
PORT=3000
DB_HOST=xxxx.aws-region.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=*****
DB_NAME=sisvent_uat
JWT_SECRET=superSecretClaveToken
URL_FRONT_LOCAL=http://localhost:5173
URL_FRONT_PRD=https://erp.syrdia.com

🌐 frontend/.env
VITE_API_URL=http://localhost:3000/api

3. Instala dependencias
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

4. Ejecuta el proyecto
# Backend
npm run dev

# Frontend
npm run dev

🔑 Acceso de desarrollo
Usuario técnico	Para generación de token
Email: usrerp@syrdia.com	
Password: temporal123	

Este usuario genera el token base con el que otros usuarios consumen el API. No está ligado a ninguna empresa.

🛡️ Seguridad prevista (futuro inmediato)
🔐 Expiración corta de tokens

✅ Permisos por rol y acción

🛑 Rate limiting por IP

📍 Validación IP / User Agent

📦 Logs de auditoría de acciones

✅ Producción en HTTPS (Cloudflare o AWS ALB)

📄 Licencia
Este proyecto es propiedad de DAYARAN SYSTEMS. Todos los derechos reservados.

🤖 ¿SYRDIA es una IA?
¡Sí! SYRDIA es también una IA de asistencia empresarial integrada con el sistema ERP, LMS y Catálogo SaaS. Se encuentra en proceso de entrenamiento y será parte fundamental del crecimiento inteligente de tu empresa.