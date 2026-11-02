// ===== KantinKu versi simpel: data & fungsi bersama =====
// Data disimpan di localStorage browser (pengganti database untuk tahap UTS).

const PASSWORD_PENJUAL = 'kantin123';
const STATUS = ['Menunggu', 'Diproses', 'Siap Diambil', 'Selesai', 'Dibatalkan'];

const MENU_AWAL = [
  { id: 1, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 15000, deskripsi: 'Nasi goreng dengan telur dan ayam suwir.', emoji: '🍛', tersedia: true },
  { id: 2, nama: 'Mie Goreng', kategori: 'Makanan', harga: 12000, deskripsi: 'Mie goreng bumbu khas kantin.', emoji: '🍜', tersedia: true },
  { id: 3, nama: 'Ayam Geprek', kategori: 'Makanan', harga: 17000, deskripsi: 'Ayam crispy sambal bawang plus nasi.', emoji: '🍗', tersedia: true },
  { id: 4, nama: 'Soto Ayam', kategori: 'Makanan', harga: 14000, deskripsi: 'Soto ayam kuah kuning hangat.', emoji: '🍲', tersedia: true },
  { id: 5, nama: 'Es Teh', kategori: 'Minuman', harga: 5000, deskripsi: 'Teh manis dingin.', emoji: '🧊', tersedia: true },
  { id: 6, nama: 'Jus Jeruk', kategori: 'Minuman', harga: 8000, deskripsi: 'Jus jeruk peras segar.', emoji: '🍊', tersedia: true },
  { id: 7, nama: 'Kopi Susu', kategori: 'Minuman', harga: 10000, deskripsi: 'Kopi susu gula aren.', emoji: '☕', tersedia: true },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Camilan', harga: 6000, deskripsi: 'Pisang goreng crispy, 3 potong.', emoji: '🍌', tersedia: true },
  { id: 9, nama: 'Risoles', kategori: 'Camilan', harga: 5000, deskripsi: 'Risoles isi ragout ayam.', emoji: '🥟', tersedia: false }
];

// ---- baca & simpan localStorage ----
function ambil(kunci, awal) {
  const teks = localStorage.getItem('kantin2_' + kunci);
  return teks ? JSON.parse(teks) : awal;
}
function simpan(kunci, nilai) {
  localStorage.setItem('kantin2_' + kunci, JSON.stringify(nilai));
}

function getMenu() {
  let menu = ambil('menu', null);
  if (!menu) { menu = MENU_AWAL; simpan('menu', menu); }
  return menu;
}
const getPesanan = () => ambil('pesanan', []);
const getKeranjang = () => ambil('keranjang', []);   // [{id, jumlah}]

// ---- fungsi kecil ----
const rupiah = n => 'Rp' + Number(n).toLocaleString('id-ID');
const nimValid = nim => /^\d{8,20}$/.test(nim);
const kodePesanan = id => 'KK-' + String(id).padStart(3, '0');
const waktu = iso => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
// h() mengamankan teks dari input pengguna sebelum ditampilkan sebagai HTML
function h(teks) {
  return String(teks ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const kelasStatus = s => 's-' + s.split(' ')[0];

function jumlahKeranjang() {
  return getKeranjang().reduce((total, k) => total + k.jumlah, 0);
}
function tambahKeKeranjang(id) {
  const menu = getMenu().find(m => m.id === id);
  if (!menu || !menu.tersedia) { alert('Menu sedang habis.'); return; }
  const keranjang = getKeranjang();
  const ada = keranjang.find(k => k.id === id);
  if (ada) ada.jumlah++; else keranjang.push({ id: id, jumlah: 1 });
  simpan('keranjang', keranjang);
  pasangHeader(window.HALAMAN);
}

// ---- header & footer di setiap halaman ----
function pasangHeader(halaman) {
  const link = (file, nama, kode) => `<a href="${file}" class="${halaman === kode ? 'on' : ''}">${nama}</a>`;
  document.getElementById('header').innerHTML = `<div class="wrap bar">
    <a class="logo" href="index.html">🍽️ KantinKu</a>
    <nav>${link('index.html', 'Menu', 'menu')}${link('keranjang.html', 'Keranjang (' + jumlahKeranjang() + ')', 'keranjang')}${link('pesanan.html', 'Pesanan Saya', 'pesanan')}${link('penjual.html', 'Penjual', 'penjual')}</nav></div>`;
}
function pasangFooter() {
  document.getElementById('footer').innerHTML = '© 2026 KantinKu – Pemesanan Makanan Kantin Kampus';
}
