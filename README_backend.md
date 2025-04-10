# 🛠️ Fullstack Test - Backend API

Este es el backend de una aplicación de ecommerce simple, desarrollado como parte de una prueba técnica. Permite ver productos, crear y actualizar transacciones relacionadas con pagos simulados a través de la pasarela Wompi (sandbox).

---

## 🔧 Tecnologías utilizadas

- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Jest (Tests unitarios)
- Arquitectura hexagonal

---

## 📦 Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/MiguelEspalda/backend-test.git
cd backend-test
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura tu base de datos en `.env`:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/tu_base
```

4. Ejecuta migraciones y el seed:

```bash
npx prisma migrate dev --name init
npm run seed
```

5. Inicia el servidor:

```bash
npm run dev
```

Servidor disponible en: `http://localhost:3000`

---

## 📡 API Endpoints

### 🔍 `GET /api/products`

Retorna todos los productos disponibles.

#### Ejemplo de respuesta:
```json
[
  {
    "id": "uuid",
    "name": "Camiseta edición limitada",
    "description": "Camiseta oficial de Wompi edición 2024",
    "price": 75000,
    "stock": 10
  }
]
```

---

### 💳 `POST /api/transactions`

Crea una nueva transacción en estado `PENDING`.

#### Request body:
```json
{
  "productId": "uuid",
  "customerEmail": "cliente@correo.com",
  "deliveryInfo": "Calle 123",
  "amount": 15000
}
```

#### Ejemplo de respuesta:
```json
{
  "id": "uuid",
  "status": "PENDING",
  "amount": 15000,
  "productId": "uuid",
  "customerEmail": "cliente@correo.com"
}
```

---

### 🔄 `PUT /api/transactions/:id`

Actualiza una transacción con el resultado de pago (simulado desde frontend o test).

#### Request body:
```json
{
  "status": "SUCCESS",
  "wompiId": "tx_test_123"
}
```

---

### 📜 `GET /api/transactions`

Retorna todas las transacciones realizadas.

#### Ejemplo de respuesta:
```json
[
  {
    "id": "uuid",
    "status": "SUCCESS",
    "amount": 75000,
    "product": {
      "name": "Camiseta edición limitada",
      "price": 75000
    }
  }
]
```

---

## 🧪 Tests

Este proyecto cuenta con pruebas unitarias usando Jest.

### Ejecutar tests

```bash
npm run test
```

### Cobertura mínima esperada: 80%

Un resumen de cobertura se genera en consola y en la carpeta `coverage`.

---

## 🚀 Despliegue

Este backend puede ser desplegado en servicios como:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [AWS](https://aws.amazon.com/)
- [Vercel backend](https://vercel.com)

⚠️ No olvides configurar correctamente las variables de entorno (`DATABASE_URL`, etc.) en el panel del proveedor.

---

## 🔐 Notas de seguridad

- La API no expone ninguna clave privada de Wompi.
- Los pagos se simulan vía `sandbox`.
- El endpoint de pago puede integrarse desde frontend usando la `public_key`.

---

## 📄 Postman Collection

Incluye una colección para pruebas con Postman. [Ver archivo `wompi-api.postman_collection.json`](./postman/wompi-api.postman_collection.json)

---

## 👨‍💻 Autor

Desarrollado por [Miguel Martinez Cobos]  
Email: martinezcobosm@gmail.com