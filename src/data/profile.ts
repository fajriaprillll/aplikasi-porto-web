export const profileData = {
  name: "Fajri Apriliansyah",
  role: "Fullstack Web Developer (Backend-Oriented) & Lulusan Informatika",
  tagline: "Membangun aplikasi web end-to-end dengan fokus pada arsitektur backend yang scalable. Saat ini sedang memimpin pengembangan Hyundai DMS (Dealer Management System) untuk digitalisasi operasional dealership otomotif.",
  about: {
    description: "Saya adalah Fullstack Web Developer lulusan S1 Informatika dengan spesialisasi di arsitektur backend. Saat ini, saya berfokus mengembangkan Hyundai DMS, sebuah platform ERP enterprise-grade yang menangani alur kerja operasional dealer dari inventaris hingga layanan purna jual.",
    subDescription: "Keahlian saya mencakup perancangan sistem Full-Stack modern menggunakan React.js, Node.js, dan PostgreSQL. Saya berdedikasi membangun aplikasi yang tidak hanya memiliki performa tinggi di balik layar, tetapi juga menyajikan pengalaman pengguna kelas eksekutif dengan standar visual yang premium.",
    image: "/profile/pict.jpg"
  },
  skills: {
    frontend: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Shadcn UI", "Vite"],
    tools: ["Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Passport.js", "REST API", "WebSocket"],
    learning: ["Next.js", "Microservices"]
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "Hyundai Adisucipto Yogyakarta",
      period: "April 2026 – Present",
      description: "Membangun arsitektur Full-Stack untuk Hyundai DMS (Dealer Management System) guna mengoptimalkan operasional dealership secara end-to-end.\n• Mengembangkan sistem ERP skala enterprise menggunakan React.js, Node.js, dan PostgreSQL dengan standar visual premium.\n• Merancang Executive Dashboard untuk monitoring KPI operasional, sales, dan aftersales secara real-time.\n• Mengimplementasikan fitur pelacakan inventaris unit/suku cadang dan alur kerja servis yang terintegrasi.\n• Mengoptimalkan performa sistem dan keamanan data menggunakan TypeScript serta sistem autentikasi modern."
    },
    {
      role: "Arsitek & Fullstack Developer",
      company: "Sistem Pemesanan QR Code (Tugas Akhir)",
      period: "2025 – 2026",
      description: "Merancang dan mengimplementasikan arsitektur backend end-to-end untuk sistem pemesanan terintegrasi.\n• Merancang skema relasional MySQL yang ter-normalisasi untuk mencegah anomali data pesanan.\n• Mengembangkan REST API menggunakan Express.js dengan implementasi error handling tersentralisasi dan validasi payload yang ketat.\n• Mengintegrasikan sistem Payment Gateway (Midtrans) menggunakan webhook handler yang idempotent untuk mencegah double-charging pada transaksi asinkron.\n• Mengimplementasikan WebSocket untuk notifikasi real-time, memangkas delay update status pesanan di sisi client."
    },
    {
      role: "Frontend Engineer",
      company: "EduTech Web Applications (Project Pribadi)",
      period: "2026",
      description: "Membangun Single Page Applications (SPA) untuk edukasi interaktif dengan React.js. Fokus pada pemisahan antara Business Logic dan UI Components.\n• Merancang arsitektur state management global yang efisien untuk melacak progress kuis dan skor tanpa memicu re-render yang tidak perlu.\n• Mendesain struktur payload JSON dan flow data yang terstandardisasi agar aplikasi mudah diintegrasikan dengan sistem backend (API-ready).\n• Mengimplementasikan validasi data di sisi client secara dinamis untuk meminimalkan beban komputasi di server."
    }
  ],
  contact: {
    email: "fajriapril33@gmail.com",
    github: "https://github.com/fajriaprillll",
    linkedin: "https://www.linkedin.com/in/fajri-apriliansyah",
    instagram: "@fajriapril_",
    tiktok: "@runforurlifemf",
    location: "Yogyakarta, Indonesia"
  },
  stats: {
    projects: "5+",
    clients: "Fresh Grad",
    experience: "2024"
  }
};
