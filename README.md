# Ứng dụng web đặt hàng trực tuyến

## Hướng dẫn sử dụng
Tạo một cơ sở dữ liệu MongoDB và lấy MongoDB URI của bạn nếu bạn dùng MongoDB Atlas (Hoặc mongodb://localhost:27017 nếu chạy trên môi trường cục bộ )

Chức năng thanh toán online: Tạo một tài khoản PayPal và lấy Client ID của bạn - PayPal Developer.

### Biến môi trường
Đổi tên tệp .env.example thành .env và thêm các thông số sau:

```

PORT = 5000

MONGO_URI = mongodb://localhost:27017 Hoặc Dùng MongoDB Atlas URI

JWT_SECRET = <tùy bạn chọn> (ví dụ: abc123)

PAYPAL_CLIENT_ID = client id của bạn

PAYPAL_APP_SECRET=<paypal secret của bạn>

PAYPAL_API_URL=https://api-m.sandbox.paypal.com

```


### Cài đặt Dependencies (frontend & backend)
```bash

npm install
cd frontend
npm install

```

### Chạy

#### Chạy cả frontend (:3000) & backend (:5000)
```bash

npm run dev

```

#### Chạy chỉ frontend
```bash

npm run client

```

#### Chạy chỉ backend
```bash

npm run server

```

### Cách tạo tài khoản admin
1. Đăng ký tài khoản 
2. Vào database của bạn (dùng MongoDB Compass hoặc MongoDB Atlas), sửa trường "isAdmin" của tài khoản vừa tạo thành "true"
3. Đăng nhập lại vào hệ thống bằng tài khoản trên
