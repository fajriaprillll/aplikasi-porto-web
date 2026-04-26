import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'biam-learning',
    title: 'Halo Biam!',
    shortDescription: 'Aplikasi kuis edukasi anak dengan arsitektur state terpusat dan logika scoring independen.',
    fullDescription: 'Problem: Aplikasi kuis tradisional sering mengalami state-loss (data hilang) saat refresh dan memiliki struktur data soal yang sulit di-maintain secara dinamis.\n\nSolution: Membangun arsitektur state terpusat untuk menyimpan progress user dan skor secara persisten. Merancang skema data soal (JSON) yang modular sehingga penambahan tipe soal baru tidak merusak logika scoring utama. Memisahkan logika kalkulasi skor murni dari layer UI.\n\nResult: Menghasilkan alur kuis yang bug-free dengan performa rendering yang stabil, siap untuk dihubungkan dengan database backend kapan saja.',
    image: '/projects/biam.png',
    techStack: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://aplikasi-belajar-biam.vercel.app/',
    githubUrl: 'https://github.com/fajriaprillll/aplikasi-belajar-biam',
    features: [
      'Arsitektur state terpusat untuk persistensi data',
      'Skema JSON modular untuk skalabilitas bank soal',
      'Logika scoring dinamis terpisah dari layer UI',
      'Optimasi render komponen interaktif'
    ]
  },
  {
    id: 'simple-learning',
    title: 'Quiz Master!',
    shortDescription: 'Platform kuis web dengan client-side validation engine dan payload JSON terskala.',
    fullDescription: 'Problem: Membutuhkan sistem validasi jawaban yang cepat dan tidak bergantung penuh pada response server, serta arsitektur data yang bisa menangani ribuan bank soal secara terstruktur.\n\nSolution: Mengimplementasikan client-side validation engine yang mengevaluasi jawaban secara independen berdasarkan struktur data yang disuntikkan saat inisialisasi. Menggunakan glassmorphism UI dengan optimasi CSS agar repaint/reflow browser tetap seminimal mungkin.\n\nResult: Sistem kuis yang highly-responsive, struktur data scalable yang mendukung berbagai jenis relasi soal-jawaban, dan pengalaman pengguna yang premium tanpa mengorbankan kecepatan akses.',
    image: '/projects/simple.png',
    techStack: ['React', 'JavaScript', 'Tailwind CSS'],
    liveUrl: 'https://aplikasi-belajar-sederhana.vercel.app/',
    githubUrl: 'https://github.com/fajriaprillll/aplikasi-belajar-sederhana-',
    features: [
      'Client-side validation engine terisolasi',
      'Struktur payload data JSON terstandardisasi',
      'Pengelolaan state antar sesi kuis yang persisten',
      'Optimasi rendering glassmorphism UI'
    ]
  }
];
