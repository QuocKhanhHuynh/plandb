# 🌿 Hệ Thống Tri Thức Thực Vật & Nhận Dạng Dựa Trên CBIR

Hệ thống full-stack toàn diện để quản lý **phân loại thực vật, tri thức thực vật học, hình thái và dữ liệu phân bố**. Hệ thống tích hợp một dịch vụ AI có khả năng trích xuất vector đặc trưng CNN từ ảnh thực vật và thực hiện tìm kiếm tương đồng trong không gian nhiều chiều bằng `pgvector` của PostgreSQL.

Được thiết kế để sẵn sàng cho môi trường production, toàn bộ hạ tầng (Frontend, Backend Web, dịch vụ AI, Cơ sở dữ liệu và Message Broker) đều được container hoá hoàn toàn bằng Docker.

---

## 🚀 Bắt Đầu Nhanh (Dưới 5 Phút)

### 1. Clone repository

```bash
git clone https://github.com/KN-16/Plant-Knowledge-System.git
cd plant-knowledge-system
```

### 2. Giải nén các thành phần phụ thuộc & Mô hình cần thiết

Trước khi khởi động các container, hãy đảm bảo tất cả các mô hình và mã nguồn nén đã được giải nén.

```bash
# Giải nén phần phụ thuộc của Backend Web (nếu đang ở dạng nén)
cd backendweb
unzip uploads.zip -d .
cd ..

# Giải nén Mô hình AI (Bắt buộc cho việc trích xuất đặc trưng CNN)
cd backend-ai
unzip models.zip -d .
cd ..
```

### 3. Khởi chạy hạ tầng

```bash
docker compose up -d --build
```

---

## 🌐 Các Địa Chỉ Truy Cập

Sau khi các container chạy, bạn có thể truy cập các dịch vụ qua trình duyệt bằng các địa chỉ cục bộ sau:

- **Ứng dụng Web Frontend:** http://localhost
- **Trang quản trị Admin:** http://localhost/admin
- **pgAdmin (Giao diện CSDL):** http://localhost:5050
- **RabbitMQ Dashboard:** http://localhost:15672

---

## 🔐 Tài Khoản Hệ Thống & Thông Tin Đăng Nhập

Cơ sở dữ liệu được nạp sẵn dữ liệu thử nghiệm và các tài khoản thông qua `init.sql`. Hãy dùng các thông tin đăng nhập này để kiểm thử hệ thống ngay lập tức.

### Tài khoản ứng dụng Web

```txt
Vai trò Admin:
  Tên đăng nhập: admin (hoặc admin@system.com)
  Mật khẩu:      123456
  Quyền hạn:     Toàn quyền CRUD đối với phân loại, người dùng và các đoạn tri thức AI.

Vai trò Người dùng thường:
  Tên đăng nhập: user (hoặc user@example.com)
  Mật khẩu:      123456
  Quyền hạn:     Nhận dạng thực vật và duyệt tri thức.
```

### Tài khoản hạ tầng

```txt
pgAdmin (Giao diện Web):
  Email:    admin@example.com
  Mật khẩu: adminpass

RabbitMQ (Message Broker):
  Tên đăng nhập: admin
  Mật khẩu:      admin

PostgreSQL (Kết nối trực tiếp):
  Cơ sở dữ liệu: plant_knowledge_db
  Người dùng:    admin
  Mật khẩu:      adminpass
```

---

## 📂 Cấu Trúc Dự Án

```text
plant-knowledge-system/
├── backend-web/              # REST API Node.js (Express, Sequelize)
├── backend-AI/               # Dịch vụ AI (Python, suy luận mô hình)
├── frontend-web/             # Ứng dụng client web (dựa trên Vite)
├── nginx-gateway/            # Reverse proxy (cổng vào)
│   └── nginx.conf            # Cấu hình Nginx
├── pgadmin/                  # Cấu hình PgAdmin
│   └── servers.json          # Kết nối CSDL cấu hình sẵn
├── envs/                     # Biến môi trường tập trung
├── .venv/                    # Môi trường Python cục bộ (chỉ dùng khi phát triển)
├── init.sql                  # Schema CSDL & dữ liệu mẫu
├── docker-compose.yml        # Điều phối nhiều dịch vụ
├── .gitignore
└── README.md
```

---

## 🏗 Kiến Trúc Hệ Thống

Hệ thống vận hành theo kiến trúc lấy cảm hứng từ microservices:

1. **Frontend** giao tiếp trực tiếp với **Backend Web API**.
2. **Backend Web** xử lý các thao tác CRUD thông thường (phân loại, hình thái) và uỷ thác các tác vụ ML nặng hoặc bất đồng bộ cho **RabbitMQ**.
3. **Dịch vụ AI** lắng nghe các tác vụ, xử lý ảnh qua mô hình CNN và sinh ra các vector nhiều chiều.
4. **PostgreSQL** lưu trữ dữ liệu có cấu trúc và dùng extension `pgvector` để chạy tìm kiếm láng giềng gần nhất (`<->`) nhanh trên ảnh thực vật và các đoạn tri thức.

---

## ⚙️ Cấu Hình Môi Trường

Hệ thống dùng các file cấu hình môi trường tập trung nằm trong thư mục `envs/`.  
Mỗi dịch vụ được cấu hình bằng file `.env` riêng.

---

### 📂 Tổng Quan Các File Môi Trường

```text
envs/
├── .env.productionBackendWeb   # Backend Web (Node.js API)
├── .env.productionBackendAI    # Dịch vụ AI (Python)
├── .env.productionPgadmin      # Cấu hình PgAdmin
├── .env.productionPostgres     # Cơ sở dữ liệu PostgreSQL
└── .env.productionRabbit       # RabbitMQ message broker
```

---

## ⚠️ Lưu Ý Quan Trọng Khi Triển Khai

### ✅ An toàn cho phát triển cục bộ

Các giá trị hiện tại được cấu hình cho **phát triển và kiểm thử cục bộ**.  
Bạn có thể dùng trực tiếp khi chạy hệ thống trên máy.

---

### 🔐 BẮT BUỘC đổi khi triển khai production

Cập nhật các biến sau trước khi triển khai công khai:

- JWT secrets:
  - `JWT_ACCESS_SECRET`
  - `JWT_REFRESH_SECRET`

- Thông tin đăng nhập cơ sở dữ liệu:
  - `POSTGRES_PASSWORD`
  - `DB_PASS`

- Thông tin đăng nhập RabbitMQ:
  - `RABBITMQ_DEFAULT_USER`
  - `RABBITMQ_DEFAULT_PASS`

- Thông tin đăng nhập PgAdmin:
  - `PGADMIN_DEFAULT_EMAIL`
  - `PGADMIN_DEFAULT_PASSWORD`

---

### 💡 Thực Hành Tốt

- Không bao giờ commit secret production thật vào source control
- Dùng `.env` ghi đè hoặc trình quản lý secret trong production
- Chỉ giữ `envs/` cho các giá trị mặc định khi phát triển
- Thường xuyên xoay vòng thông tin đăng nhập

---

## 🚀 Tóm Tắt

- Hệ thống được container hoá hoàn toàn bằng Docker Compose
- Tất cả dịch vụ cốt lõi (Backend, AI, Database, Message Broker) được cấu hình sẵn qua thư mục `envs/`
- Nginx đóng vai trò cổng vào công khai duy nhất (cổng 80)

---

## ⚠️ Ghi Chú Cấu Hình Bổ Sung

Dù hầu hết dịch vụ đã được cấu hình sẵn, một số điều chỉnh có thể cần thiết tuỳ theo môi trường của bạn:

### 🔧 Cấu hình Frontend (Lúc build)

Frontend dùng Vite và cần đúng các endpoint API tại thời điểm build.

Được định nghĩa trong `docker-compose.yml`:

```yaml
args:
  - VITE_API_URL=http://localhost/api
  - VITE_BACKEND_URL=http://localhost
```

👉 Cập nhật các giá trị này nếu:

- Bạn triển khai lên domain khác
- Bạn thay đổi gateway công khai (Nginx)

---

### 🌐 Nginx Gateway

- Mọi lưu lượng từ bên ngoài được định tuyến qua `nginx-gateway`
- Chỉ cổng `80` được mở ra máy chủ:

```yaml
ports:
  - "80:80"
```

👉 Bạn có thể cần cập nhật:

- `nginx-gateway/nginx.conf` (quy tắc định tuyến)
- Thêm SSL (cổng 443) cho production

---

### 🧠 Khi triển khai công khai

Bạn nên rà soát:

- Build args của frontend (`VITE_*`)
- Cấu hình định tuyến Nginx
- Biến môi trường trong `envs/`
- Thông tin đăng nhập và secret

---

### 💡 Tóm Tắt

- Phát triển cục bộ → gần như cắm là chạy
- Triển khai production → cần:
  - Cập nhật biến môi trường
  - Điều chỉnh URL API của frontend
  - Cấu hình Nginx cho đúng

---

## 📝 Ghi Chú & Xử Lý Sự Cố

- **Phụ thuộc `pgvector`:** Đảm bảo image PostgreSQL của bạn hỗ trợ `pgvector`. Script `init.sql` sẽ tự động chạy `CREATE EXTENSION IF NOT EXISTS vector` khi khởi tạo.
- **Lỗi giải nén mô hình:** Nếu dịch vụ AI bị crash khi khởi động, hãy kiểm tra `models.zip` đã được giải nén thành công vào thư mục `backend-ai/models/` chưa.
- **Lỗi thư mục Upload:** Nếu upload file không hoạt động hoặc dịch vụ báo lỗi thiếu file, hãy đảm bảo các file nén cần thiết (nếu có) đã được giải nén đúng để thư mục `backend-web/uploads/` tồn tại và có đủ dữ liệu như mong đợi.
- **Lưu trữ dữ liệu:** File cơ sở dữ liệu được lưu qua Docker volumes. Để xoá sạch cơ sở dữ liệu và nạp lại từ `init.sql`, chạy `docker compose down -v`.
- **Xung đột cổng:** Đảm bảo các cổng `80`, `5050` và `15672` trên máy chủ đang trống trước khi chạy Docker Compose.

## 🗄️ Sao Lưu & Khôi Phục Cơ Sở Dữ Liệu

Phần này cung cấp các lệnh để xuất (dump) và khôi phục cơ sở dữ liệu PostgreSQL đang chạy trong Docker.

### 📤 Dump Cơ Sở Dữ Liệu (Xuất)

```bash
# Dump cơ sở dữ liệu trong container PostgreSQL ra một file tạm
docker compose exec postgres pg_dump -U admin -d plant_knowledge_db --clean --if-exists --encoding=UTF8 -f /tmp/init.sql

# Sao chép file SQL đã dump từ container ra máy chủ
docker compose cp postgres:/tmp/init.sql ./init.sql
```

👉 Lệnh này sẽ tạo bản sao lưu đầy đủ cơ sở dữ liệu dưới dạng `init.sql` trên máy của bạn.

---

### 📥 Khôi Phục Cơ Sở Dữ Liệu (Nhập)

#### Cách 1: Khôi phục bằng file bên trong container (Khuyến nghị)

```bash
# Sao chép file SQL vào container
docker compose cp ./init.sql postgres:/tmp/init.sql

# Chạy file SQL bên trong container PostgreSQL
docker compose exec postgres psql -U admin -d plant_knowledge_db -f /tmp/init.sql
```

---

#### Cách 2: Khôi phục bằng pipe (không cần sao chép file)

```bash
# Đẩy trực tiếp file SQL vào container PostgreSQL
cat init.sql | docker compose exec -T postgres psql -U admin -d plant_knowledge_db
```
