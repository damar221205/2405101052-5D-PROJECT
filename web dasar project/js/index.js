// Halaman menu: tampilkan daftar, cari, dan filter kategori
window.HALAMAN = 'menu';
pasangHeader('menu');
pasangFooter();

// isi pilihan kategori dari data menu
const daftarKategori = ['Semua', ...new Set(getMenu().map(m => m.kategori))];
document.getElementById('kategori').innerHTML = daftarKategori.map(k => `<option>${h(k)}</option>`).join('');

function tampilMenu() {
  const kata = document.getElementById('cari').value.toLowerCase();
  const kat = document.getElementById('kategori').value;
  const hasil = getMenu().filter(m =>
    m.nama.toLowerCase().includes(kata) && (kat === 'Semua' || m.kategori === kat));

  if (hasil.length === 0) {
    document.getElementById('daftar').innerHTML = '<p class="kosong" style="grid-column:1/-1">Menu tidak ditemukan.</p>';
    return;
  }
  document.getElementById('daftar').innerHTML = hasil.map(m => `
    <div class="kartu ${m.tersedia ? '' : 'habis'}">
      <div class="emoji">${h(m.emoji)}</div>
      <h3>${h(m.nama)}</h3>
      <div class="kat">${h(m.kategori)} · ${m.tersedia ? 'Tersedia' : 'Habis'}</div>
      <p class="desk">${h(m.deskripsi)}</p>
      <div class="harga">${rupiah(m.harga)}</div>
      <button onclick="tambahKeKeranjang(${m.id})" ${m.tersedia ? '' : 'disabled'}>+ Keranjang</button>
    </div>`).join('');
}
tampilMenu();
