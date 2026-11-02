// Halaman keranjang + form pemesanan (nama & NIM)
window.HALAMAN = 'keranjang';
pasangFooter();

// isi otomatis nama & NIM jika pernah memesan
const pembeli = ambil('pembeli', { nama: '', nim: '' });
document.getElementById('nama').value = pembeli.nama;
document.getElementById('nim').value = pembeli.nim;

function hitungTotal() {
  const menu = getMenu();
  return getKeranjang().reduce((t, k) => {
    const m = menu.find(x => x.id === k.id);
    return t + (m ? m.harga * k.jumlah : 0);
  }, 0);
}

function tampilKeranjang() {
  pasangHeader('keranjang');
  const menu = getMenu();
  const keranjang = getKeranjang();
  if (keranjang.length === 0) {
    document.getElementById('isi').innerHTML = '<div class="box kosong">Keranjang masih kosong. <a href="index.html">Lihat menu</a></div>';
    document.getElementById('formPesan').style.display = 'none';
    return;
  }
  document.getElementById('formPesan').style.display = 'block';
  let baris = '';
  keranjang.forEach(k => {
    const m = menu.find(x => x.id === k.id);
    if (!m) return;
    baris += `<tr>
      <td>${h(m.emoji)} ${h(m.nama)} ${m.tersedia ? '' : '<b style="color:#dc2626">(habis)</b>'}</td>
      <td class="kanan">${rupiah(m.harga)}</td>
      <td><button class="kecil abu" onclick="ubahJumlah(${k.id}, -1)">−</button> ${k.jumlah}
          <button class="kecil abu" onclick="ubahJumlah(${k.id}, 1)">+</button></td>
      <td class="kanan">${rupiah(m.harga * k.jumlah)}</td>
      <td><button class="kecil merah" onclick="hapusItem(${k.id})">Hapus</button></td></tr>`;
  });
  document.getElementById('isi').innerHTML = `<div class="tabel-bungkus"><table>
    <tr><th>Menu</th><th class="kanan">Harga</th><th>Jumlah</th><th class="kanan">Subtotal</th><th></th></tr>
    ${baris}
    <tr><th colspan="3" class="kanan">Total</th><th class="kanan">${rupiah(hitungTotal())}</th><th></th></tr></table></div>`;
}

function ubahJumlah(id, selisih) {
  const keranjang = getKeranjang();
  const item = keranjang.find(k => k.id === id);
  item.jumlah += selisih;
  simpan('keranjang', item.jumlah < 1 ? keranjang.filter(k => k.id !== id) : keranjang);
  tampilKeranjang();
}
function hapusItem(id) {
  simpan('keranjang', getKeranjang().filter(k => k.id !== id));
  tampilKeranjang();
}

function buatPesanan() {
  const nama = document.getElementById('nama').value.trim();
  const nim = document.getElementById('nim').value.trim();
  const catatan = document.getElementById('catatan').value.trim();
  const hasil = document.getElementById('hasil');
  const menu = getMenu();

  // validasi
  if (nama.length < 3) { hasil.innerHTML = '<div class="pesan gagal">Nama lengkap minimal 3 karakter.</div>'; return; }
  if (!nimValid(nim)) { hasil.innerHTML = '<div class="pesan gagal">NIM harus berupa angka (8-20 digit).</div>'; return; }
  const item = getKeranjang().map(k => {
    const m = menu.find(x => x.id === k.id);
    return m && { id: m.id, nama: m.nama, harga: m.harga, jumlah: k.jumlah, tersedia: m.tersedia };
  }).filter(Boolean);
  if (item.length === 0) { hasil.innerHTML = '<div class="pesan gagal">Keranjang kosong.</div>'; return; }
  if (item.some(i => !i.tersedia)) { hasil.innerHTML = '<div class="pesan gagal">Ada menu yang habis. Hapus dulu dari keranjang.</div>'; return; }

  // simpan pesanan
  const semua = getPesanan();
  const id = semua.reduce((maks, p) => Math.max(maks, p.id), 0) + 1;
  semua.push({
    id: id, nama: nama, nim: nim, waktu: new Date().toISOString(), catatan: catatan,
    total: item.reduce((t, i) => t + i.harga * i.jumlah, 0), status: 'Menunggu',
    item: item.map(i => ({ id: i.id, nama: i.nama, harga: i.harga, jumlah: i.jumlah }))
  });
  simpan('pesanan', semua);
  simpan('pembeli', { nama: nama, nim: nim });
  simpan('keranjang', []);

  document.getElementById('isi').innerHTML = '';
  document.getElementById('formPesan').style.display = 'none';
  pasangHeader('keranjang');
  hasil.innerHTML = `<div class="pesan sukses">Pesanan <b>${kodePesanan(id)}</b> berhasil dibuat! Pantau statusnya di
    <a href="pesanan.html">Pesanan Saya</a>.</div>`;
}
tampilKeranjang();
