# Frontend VillaPlace

[![Deploy](https://github.com/Villa-Place/Frontend_VillaPlace/actions/workflows/main.yml/badge.svg)](https://github.com/Villa-Place/Frontend_VillaPlace/actions/workflows/main.yml)

🏡 **Selamat Datang di VillaPlace!** 
VillaPlace adalah aplikasi **frontend modern** yang dirancang untuk mengelola dan menelusuri sewa villa dengan **mudah, cepat, dan responsif**. Dibangun menggunakan teknologi terkini, proyek ini berfokus pada performa tinggi, pengalaman pengguna yang menyenangkan, dan desain yang ramah semua perangkat.

## 🚀 Teknologi yang Digunakan

- Framework: [Next.js](https://nextjs.org/) - React framework untuk aplikasi SSR (Server Side Rendering) dan SSG (Static Site Generation).
- Bahasa: [TypeScript](https://www.typescriptlang.org/) - untuk memastikan codebase yang lebih aman dan terstruktur.
- Styling: [Tailwind CSS](https://tailwindcss.com/) - utility-first framework untuk styling cepat dan responsif.
- State Management: React hooks (useState, useReducer, dll).
- Testing: [Jest & React Testing Library](https://nextjs.org/docs/app/building-your-application/testing/jest) - Unit testing dan komponen testing.
- Icons: [FontAwesome](https://fontawesome.com/) - Icons untuk elemen visual.
- HTTP Client: Axios untuk pengambilan data dari API backend.
- Package Manager: npm atau Yarn.

## 📁 Struktur Proyek

```
Frontend_VillaPlace/
├── __mocks__/               # Mock file untuk pengujian
├── coverage/                # Laporan coverage hasil testing
├── public/                  # Aset publik (gambar, ikon, dll)
├── src/                     # Direktori utama source code
│   ├── app/                 # Folder routing dan layouting Next.js (App Router)
│   │   ├── (user)/          # Routing dan halaman untuk user
│   │   ├── auth/            # Routing untuk autentikasi
│   │   ├── dashboard/       # Routing dashboard aplikasi
│   │   ├── global.d.ts      # Definisi tipe global
│   │   └── layout.tsx       # Layout utama aplikasi
│   ├── components/          # Reusable UI components
|       ├── __tests__/       # Test files
│   ├── context/             # Context API untuk state management global
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Library utilitas tambahan
│   ├── services/            # HTTP services (API Calls)
│   ├── styles/              # Global styles (Tailwind)
│   ├── types/               # Type definitions
│   ├── utils/               # Helper functions
│   └──  validations/        # Validation schemas
├── .env                     # Environment variables
├── package.json             # Dependency manager
├── jest.config.ts           # Jest configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Dokumentasi proyek
```

## 🔧 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

### 1. Clone Repository

```bash
git clone https://github.com/username/Frontend_VillaPlace.git
cd Frontend_VillaPlace
```

### 2. Instal Dependencies

Gunakan npm atau Yarn:

```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root direktori dan tambahkan konfigurasi berikut:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Jalankan Proyek

Jalankan server development:

```bash
npm run dev
# atau
yarn dev
```

Buka aplikasi di browser: [http://localhost:3000](http://localhost:3000).

## ✅ Testing

Proyek ini dilengkapi dengan unit testing menggunakan Jest dan React Testing Library.

- Jalankan semua test:

```bash
npm test
```

- Jalankan test dengan laporan coverage:

```bash
npm run test -- --coverage
```

- Folder hasil coverage: `coverage/`

## 🛠️ Fitur Utama

1. Dashboard Admin & User: Mengelola data villa, booking, dan profil pengguna.
2. Filter & Search: Filter villa berdasarkan lokasi, rating, dan harga.
3. Rating & Review: Menampilkan rating bintang dan ulasan pengguna.
4. Responsif: Desain yang optimal untuk desktop, tablet, dan mobile.
5. Pengaturan Profil: Edit profil dan ubah password.
6. Integrasi API: Menghubungkan frontend dengan backend melalui HTTP API.

## 📸 Screenshot

### Home Page
![Home Page Villaplace](https://github.com/user-attachments/assets/6ca071e1-dd57-477b-93cb-e6d21f921473)

### Dashboard Admin

![Dashboard Admin](https://github.com/user-attachments/assets/4aec77bb-3ddd-4a4e-84bc-a63d678074b3)

### Filter Villa

![Filter Villa](https://github.com/user-attachments/assets/ace4c035-b31c-4dc2-b7f4-1ecc85780b49)

### Unit Testing

![Unit Testing](https://github.com/user-attachments/assets/4f15d2a3-171f-44b7-bbba-78e9e040c3ac) ![Unit Testing 2](https://github.com/user-attachments/assets/2af94a37-8b0f-41c0-9cb3-e2e7a5a988e7)

## 🧩 Fitur Tambahan (To-Do List)

- [ ] Menambahkan dark mode.
- [ ] Implementasikan i18n untuk multi-bahasa.
- [ ] Testing E2E dengan Cypress.

## 💡 Kontribusi dan Kolaborasi

Kami percaya proyek ini dapat berkembang lebih baik dengan bantuan komunitas. Jika Anda seorang developer, desainer, atau hanya tertarik dengan proyek ini, kami menyambut kontribusi Anda! Berikut caranya:

1. **Fork** repository ini.
2. Buat branch baru:
   ```bash
   git checkout -b feature/nama-fitur
   ```
3. Lakukan perubahan, lalu commit:
   ```bash
   git commit -m "Menambahkan fitur X"
   ```
4. Push branch Anda:
   ```bash
   git push origin feature/nama-fitur
   ```
5. **Push** branch anda:
   ```bash
   git push origin feature/nama-fitur
   ```

💡 **Ide atau Saran?**

Buka [Issue](https://github.com/Villa-Place/Frontend_VillaPlace/issues) baru jika Anda memiliki ide, saran, atau masalah yang ingin didiskusikan.

## 👨‍💻 Tim & Role

1. [Rr. Denti Nurramadhona](https://www.linkedin.com/in/rrdentin/) : Project Manager
2. [Kevin Mclaren Pandoh](https://www.linkedin.com/in/kevinmpandoh/) : PIC Fullstack Engineer
3. [Maria M. Y. K.](https://www.instagram.com/mariasunlla/) : PIC UI/UX Designer
4. [Azkhal Zavier](https://www.linkedin.com/in/azkhal-zavier/) : PIC Frontend
5. [Fery Yulia Rahman](https://www.linkedin.com/in/feryyuliarahman/) : PIC Backend

## ⭐ Support Proyek Kami

Jika Anda menyukai VillaPlace atau merasa proyek ini bermanfaat, silakan berikan ⭐ Star di repository ini! Dengan dukungan Anda, kami semakin semangat untuk mengembangkan fitur-fitur baru dan menjaga kualitas proyek ini. 😊
