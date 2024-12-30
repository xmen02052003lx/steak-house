# Online Ordering Web Application

## Usage Instructions

Create a MongoDB database and get your MongoDB URI if using MongoDB Atlas (or use `mongodb://localhost:27017` if running locally).

Online payment functionality: Create a PayPal account and get your PayPal Client ID from the PayPal Developer portal.

### Biến môi trường

Create the .env file

```

PORT = 5000

MONGO_URI = mongodb://localhost:27017 Hoặc Dùng MongoDB Atlas URI

JWT_SECRET = <your-choice> (e.g., abc123)

PAYPAL_CLIENT_ID = <your-client id>
PAYPAL_APP_SECRET=<your-payPal-secret>

PAYPAL_API_URL=https://api-m.sandbox.paypal.com

```

### Install Dependencies (frontend & backend)

```bash

npm install
cd frontend
npm install

```

### Run the Application

#### Run both frontend (:3000) & backend (:5001)

```bash

npm run dev

```

#### Run frontend only

```bash

npm run client

```

#### Run backend only

```bash

npm run server

```

### How to Create an Admin Account

1. Register a new account.

2. Access your database (using MongoDB Compass or MongoDB Atlas) and set the isAdmin field of the newly created account to true.

3. Log in again using the updated account.
