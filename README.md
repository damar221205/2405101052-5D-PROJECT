# KantinKu – Sistem Informasi Pemesanan Makanan Kantin Kampus

Aplikasi website pemesanan makanan dan minuman kantin kampus (tahap UTS: frontend).

## Identitas Mahasiswa

| | |
|---|---|
| Nama Lengkap | Dewangga Damarjati |
| NIM | 2405101052 |
| Kelas | 5D |
| Program Studi | Informatika |

## Informasi Mata Kuliah

| | |
|---|---|
| Mata Kuliah | Pemrograman Web Dasar |
| Tahun Akademik | 2026/2027 (Semester Ganjil) |
| Tugas | Ujian Tengah Semester (UTS) |

## Deskripsi Pengerjaan UTS

KantinKu dibuat untuk mengatasi antrean panjang dan pencatatan pesanan manual di kantin kampus. Mahasiswa dapat melihat menu, memasukkan makanan ke keranjang, lalu memesan tanpa login dengan mengisi nama dan NIM. Penjual dapat mengelola menu dan memproses pesanan melalui halaman penjual.

Pada tahap UTS, pengerjaan difokuskan pada **frontend** menggunakan HTML, CSS, dan JavaScript. Data (menu dan pesanan) disimpan di `localStorage` browser sebagai simulasi database. Backend PHP dan database MySQL (`db_kantinku`) direncanakan pada tahap UAS.

## Ringkasan Fitur

**Pembeli (tanpa login)**
- Melihat daftar menu beserta harga, kategori, deskripsi, dan ketersediaan
- Pencarian menu dan filter berdasarkan kategori
- Keranjang pesanan: tambah, ubah jumlah, hapus item
- Perhitungan total harga otomatis
- Pemesanan dengan mengisi nama, NIM, dan catatan (dengan validasi)
- Melihat status dan riwayat pesanan berdasarkan NIM (diperbarui otomatis)

**Penjual (login dengan password)**
- Dashboard ringkasan: pesanan masuk, diproses, dan selesai
- Mengelola pesanan: ubah status (Menunggu, Diproses, Siap Diambil, Selesai, Dibatalkan)
- Mengelola menu: tambah, edit, hapus, dan tandai tersedia/habis
- Riwayat pesanan beserta total pendapatan
- Hapus riwayat pesanan (satu per satu atau semua)

## Struktur Folder

```
kantinku-simpel/
├── index.html          # Halaman menu (beranda)
├── keranjang.html      # Keranjang dan form pemesanan
├── pesanan.html        # Status dan riwayat pesanan pembeli
├── penjual.html        # Dashboard penjual
├── css/
│   └── style.css       # Seluruh tampilan
├── js/
│   ├── data.js         # Data menu awal, fungsi localStorage, header/footer
│   ├── index.js        # Logika halaman menu
│   ├── keranjang.js    # Logika keranjang dan pemesanan
│   ├── pesanan.js      # Logika status dan riwayat pembeli
│   └── penjual.js      # Logika dashboard penjual
├── screenshots/        # Screenshot hasil implementasi
└── README.md
```

## Petunjuk Menjalankan Aplikasi

1. Clone atau unduh repository ini, lalu ekstrak jika berbentuk zip.
2. Pastikan susunan folder tidak berubah (`css/` dan `js/` sejajar dengan file `.html`).
3. Jalankan salah satu cara berikut:
   - **Langsung:** buka `index.html` dengan Chrome atau Edge.
   - **VS Code:** klik kanan `index.html`, pilih **Open with Live Server**.
   - **Python:** jalankan `python -m http.server 8000` di folder proyek, lalu buka `http://localhost:8000`.

**Akses penjual:** buka menu **Penjual**, lalu masukkan password `kantin123`.

**Catatan:** data tersimpan di browser yang digunakan. Untuk mereset data, buka DevTools (F12) → Application → Clear site data.
