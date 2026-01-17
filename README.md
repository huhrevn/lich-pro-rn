# Lịch Pro - React Native

Ứng dụng Lịch Việt Nam với đầy đủ tính năng âm lịch, xem ngày tốt xấu, và quản lý sự kiện.

## ✨ Tính năng

- 🏠 **Trang chủ**: Hiển thị ngày âm lịch, giờ hoàng đạo
- 📅 **Lịch**: Xem lịch tháng và sự kiện
- 🔄 **Đổi lịch**: Chuyển đổi dương lịch ⟷ âm lịch
- 📝 **Nhật ký**: Ghi chép hàng ngày
- 🙏 **Kinh cầu**: Các lời kinh phổ biến
- 🌍 **Đồng hồ thế giới**: Xem giờ các múi giờ
- ⭐ **Xem bói**: Tử vi, Tarot, Kinh Dịch
- 💌 **Lời chúc**: Lời chúc các dịp lễ

## 🚀 Cài đặt

### Yêu cầu
- Node.js 18+
- npm hoặc yarn
- Xcode (cho iOS) hoặc Android Studio (cho Android)

### Bước 1: Clone và cài dependencies

\`\`\`bash
cd "c:\\Users\\Admin\\Desktop\\Ai\\LICH\\lich\\LICH PRO\\LichProRN"
npm install
\`\`\`

### Bước 2: Cài CocoaPods (chỉ iOS)

\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

### Bước 3: Chạy app

**iOS (cần Mac):**
\`\`\`bash
npx react-native run-ios
\`\`\`

**Android:**
\`\`\`bash
npx react-native run-android
\`\`\`

## 📁 Cấu trúc thư mục

\`\`\`
LichProRN/
├── src/
│   ├── navigation/      # React Navigation setup
│   ├── screens/         # Tất cả màn hình
│   │   ├── HomeScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── ConverterScreen.tsx
│   │   ├── JournalScreen.tsx
│   │   ├── PrayersScreen.tsx
│   │   ├── WorldClockScreen.tsx
│   │   ├── FortuneScreen.tsx
│   │   ├── GreetingsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/      # Components tái sử dụng
│   ├── contexts/        # React Contexts
│   ├── hooks/           # Custom hooks
│   ├── services/        # Firebase, Google Calendar
│   └── types/           # TypeScript types
├── ios/                 # iOS native code
├── android/             # Android native code
└── App.tsx             # Entry point
\`\`\`

## 🔧 Cấu hình

### Firebase (Optional)
1. Tạo project trên Firebase Console
2. Download \`google-services.json\` (Android) và \`GoogleService-Info.plist\` (iOS)
3. Đặt vào thư mục tương ứng

### Google Sign-In (Optional)
1. Cấu hình OAuth trong Google Cloud Console
2. Thêm iOS Client ID và Android Client ID
3. Cập nhật trong \`src/services/firebase.ts\`

## 📱 Build Production

### iOS
\`\`\`bash
cd ios
xcodebuild -workspace LichProRN.xcworkspace -scheme LichProRN -configuration Release archive
\`\`\`

### Android
\`\`\`bash
cd android
./gradlew assembleRelease
\`\`\`

## 🎨 Tùy chỉnh

- **Màu sắc**: Sửa trong \`styles\` của từng screen
- **Font**: Thêm custom fonts vào \`assets/fonts\`
- **Icons**: Sử dụng emoji hoặc cài \`react-native-vector-icons\`

## 📝 Ghi chú

- App đã được convert từ phiên bản Capacitor
- Business logic được giữ nguyên từ version cũ
- UI được viết lại hoàn toàn cho React Native
- Một số tính năng nâng cao cần cấu hình thêm

## 🐛 Troubleshooting

### Lỗi Metro Bundler
\`\`\`bash
npx react-native start --reset-cache
\`\`\`

### Lỗi CocoaPods
\`\`\`bash
cd ios
pod deintegrate
pod install
\`\`\`

### Lỗi Gradle
\`\`\`bash
cd android
./gradlew clean
\`\`\`

## 📄 License

MIT License
\`\`\`
