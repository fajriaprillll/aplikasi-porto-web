export const profileData = {
  name: "Fajri Apriliansyah",
  role: "Fullstack Web Developer (Backend-Oriented) & Lulusan Informatika",
  tagline: "Membangun aplikasi web end-to-end dengan fokus pada arsitektur backend yang scalable, desain REST API yang aman, dan struktur database yang teroptimasi—memastikan sistem tidak hanya terlihat bagus, tapi juga tangguh di balik layar.",
  about: {
    description: "Saya adalah Fullstack Web Developer lulusan S1 Informatika dengan spesialisasi di arsitektur backend. Fokus utama saya adalah merancang skema database relasional (MySQL), membangun REST API yang aman dan terstruktur (Node.js/Express), serta memastikan integritas aliran data hingga ke sisi client (React.js).",
    subDescription: "Pengalaman terbesar saya adalah membangun arsitektur sistem pemesanan QR Code secara end-to-end. Tantangan utamanya bukan pada UI, melainkan bagaimana menangani asinkronitas webhook dari Payment Gateway, menjaga konsistensi data transaksi, dan mem-push notifikasi real-time ke pengguna tanpa membebani server. Saya menggunakan AI dalam workflow saya untuk mempercepat boilerplate dan review kode, sehingga saya bisa fokus merancang arsitektur sistem yang robust dan siap di-scale.",
    image: "/profile/pict.jpg"
  },
  skills: {
    frontend: ["JavaScript", "Node.js (Express.js)", "React.js", "MySQL", "REST API", "Git & GitHub", "Tailwind CSS"],
    tools: ["Payment Gateway Integration", "Real-time Notification", "QR Code System", "Database Design"],
    learning: ["TypeScript", "Next.js"]
  },
  experience: [
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
