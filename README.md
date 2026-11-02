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

Buka `index.html` di browser. Aplikasi dipakai oleh dua jenis pengguna: pembeli (tanpa login) dan penjual.

### A. Alur Pembeli (mahasiswa)

1. **Lihat menu.** Halaman utama menampilkan daftar makanan dan minuman. Gunakan kolom pencarian atau filter kategori untuk menemukan menu.
2. **Tambah ke keranjang.** Klik tombol **+ Keranjang** pada menu yang diinginkan. Menu berstatus *Habis* tidak dapat dipilih. Jumlah item muncul pada menu **Keranjang** di bagian atas.
3. **Periksa keranjang.** Buka menu **Keranjang**. Ubah jumlah dengan tombol **−** dan **+**, atau klik **Hapus** untuk membuang menu. Total harga dihitung otomatis.
4. **Isi data pemesan.** Masukkan **nama lengkap** dan **NIM** (angka 8–20 digit). Catatan pesanan boleh dikosongkan.
5. **Pesan.** Klik **Pesan Sekarang**. Nomor pesanan (contoh: `KK-001`) akan tampil sebagai tanda pesanan berhasil.
6. **Pantau status.** Buka menu **Pesanan Saya**, masukkan NIM, lalu klik **Cari Pesanan**. Status diperbarui otomatis dan semua riwayat pesanan tampil di halaman yang sama.
7. **Ambil pesanan.** Saat status berubah menjadi **Siap Diambil**, ambil pesanan di kantin dan bayar langsung.

### B. Alur Penjual

1. **Login.** Buka menu **Penjual**, masukkan password `kantin123`, lalu klik **Masuk**.
2. **Pantau ringkasan.** Dashboard menampilkan jumlah pesanan masuk, sedang diproses, dan selesai.
3. **Proses pesanan** (tab **Pesanan Masuk**). Lihat detail pesanan (nama, NIM, menu, jumlah, catatan), lalu ubah statusnya lewat dropdown: *Menunggu → Diproses → Siap Diambil → Selesai*. Pesanan juga dapat dibatalkan.
4. **Kelola menu** (tab **Kelola Menu**). Isi form untuk menambah menu baru. Gunakan tombol **Edit**, **Hapus**, atau **Tandai Habis / Tandai Ada** pada tabel menu.
5. **Lihat riwayat** (tab **Riwayat**). Pesanan berstatus Selesai atau Dibatalkan tampil di sini beserta total pendapatan. Hapus satu riwayat dengan tombol **Hapus**, atau semuanya dengan **Hapus Semua Riwayat**.
6. **Logout.** Klik **Keluar** di pojok kanan atas dashboard.
