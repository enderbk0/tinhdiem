# VN Grade Calculator

Ứng dụng tính điểm học sinh Việt Nam (Lớp 6 - 12) theo **Thông tư 22/2021/TT-BGDĐT**.

## Tính năng nổi bật
- 🎨 **Giao diện Duolingo-style**: Thân thiện, hiện đại và mượt mà.
- 📐 **Tính toán chính xác**: Hỗ trợ đầy đủ công thức ĐTB môn học kỳ, cả năm và xếp loại.
- 🚀 **Offline & PWA**: Hoạt động tốt ngay cả khi không có mạng.
- 🛡️ **Bảo mật**: Dữ liệu chỉ lưu trên máy bạn (LocalStorage).
- 🌓 **Dark Mode**: Tự động chuyển đổi theo hệ thống.

## Công nghệ sử dụng
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Zustand** (State management)
- **Recharts** (Biểu đồ)
- **Lucide Icons**

## Hướng dẫn cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/tinhdiem.git
cd tinhdiem
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy môi trường phát triển:
```bash
npm run dev
```

## Triển khai lên GitHub Pages

Ứng dụng được cấu hình để xuất tĩnh (Static Export).

1. Build ứng dụng:
```bash
npm run build
```
Lệnh này sẽ tạo ra thư mục `out`.

2. Deploy thư mục `out` lên GitHub Pages (hoặc sử dụng GitHub Actions).

## Lưu ý
Kết quả tính toán chỉ mang tính chất tham khảo. Luôn đối chiếu với kết quả chính thức từ nhà trường.
