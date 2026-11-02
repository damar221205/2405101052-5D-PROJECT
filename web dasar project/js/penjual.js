// Halaman penjual: login sederhana, kelola pesanan, kelola menu, riwayat
window.HALAMAN = 'penjual';
pasangHeader('penjual');
pasangFooter();

// ---------- login ----------
function masuk() {
  if (document.getElementById('password').value === PASSWORD_PENJUAL) {
    sessionStorage.setItem('kantin2_login', 'ya');
    tampilHalaman();
  } else {
    document.getElementById('pesanLogin').innerHTML = '<div class="pesan gagal">Password salah.</div>';
  }
}
function keluar() {
  sessionStorage.removeItem('kantin2_login');
  tampilHalaman();
}
function tampilHalaman() {
  const login = sessionStorage.getItem('kantin2_login') === 'ya';
  document.getElementById('halamanLogin').style.display = login ? 'none' : 'block';
  document.getElementById('halamanPenjual').style.display = login ? 'block' : 'none';
  if (login) { bukaTab('pesanan'); }
}

// ---------- tab ----------
let tabAktif = 'pesanan';
function bukaTab(nama) {
  tabAktif = nama;
  ['pesanan', 'menu', 'riwayat'].forEach(t => {
    document.getElementById('isi-' + t).style.display = t === nama ? 'block' : 'none';
    document.getElementById('tab-' + t).className = t === nama ? 'aktif' : '';
  });
  segarkan();
}
function segarkan() {
  tampilStatistik();
  if (tabAktif === 'pesanan') tampilPesananMasuk();
  if (tabAktif === 'menu') tampilTabelMenu();
  if (tabAktif === 'riwayat') tampilRiwayat();
}

// ---------- statistik ----------
function tampilStatistik() {
  const p = getPesanan();
  const hitung = daftarStatus => p.filter(x => daftarStatus.includes(x.status)).length;
  document.getElementById('statistik').innerHTML = `
    <div><b>${hitung(['Menunggu'])}</b>Pesanan masuk</div>
    <div><b>${hitung(['Diproses', 'Siap Diambil'])}</b>Sedang diproses</div>
    <div><b>${hitung(['Selesai'])}</b>Selesai</div>`;
}

// ---------- pesanan masuk ----------
function tampilPesananMasuk() {
  const aktif = getPesanan().filter(p => !['Selesai', 'Dibatalkan'].includes(p.status));
  const kotak = document.getElementById('isi-pesanan');
  if (aktif.length === 0) { kotak.innerHTML = '<p class="kosong">Tidak ada pesanan yang perlu diproses.</p>'; return; }
  kotak.innerHTML = aktif.map(p => `
    <div class="box">
      <div class="pesanan-atas">
        <div><b>${kodePesanan(p.id)}</b> · ${h(p.nama)} (${h(p.nim)})<br><small>${waktu(p.waktu)}</small></div>
        <span class="status ${kelasStatus(p.status)}">${p.status}</span>
      </div>
      <ul style="margin:6px 0 6px 18px">${p.item.map(i => `<li>${i.jumlah}× ${h(i.nama)} — ${rupiah(i.harga * i.jumlah)}</li>`).join('')}</ul>
      ${p.catatan ? `<div class="sub">Catatan: ${h(p.catatan)}</div>` : ''}
      <div class="baris" style="margin-bottom:0;align-items:center">
        <b>Total: ${rupiah(p.total)}</b>
        <select onchange="ubahStatus(${p.id}, this.value)">
          ${STATUS.map(s => `<option ${s === p.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>`).join('');
}
function ubahStatus(id, statusBaru) {
  const semua = getPesanan();
  semua.find(p => p.id === id).status = statusBaru;
  simpan('pesanan', semua);
  segarkan();
}

// ---------- riwayat ----------
function tampilRiwayat() {
  const selesai = getPesanan().filter(p => ['Selesai', 'Dibatalkan'].includes(p.status)).sort((a, b) => b.id - a.id);
  const kotak = document.getElementById('isi-riwayat');
  if (selesai.length === 0) { kotak.innerHTML = '<p class="kosong">Belum ada riwayat pesanan.</p>'; return; }
  const pendapatan = selesai.filter(p => p.status === 'Selesai').reduce((t, p) => t + p.total, 0);
  kotak.innerHTML = `<div class="baris" style="align-items:center">
      <p class="sub" style="margin:0">Total pendapatan (pesanan selesai): <b>${rupiah(pendapatan)}</b></p>
      <button class="merah" style="flex:0 0 auto" onclick="hapusSemuaRiwayat()">Hapus Semua Riwayat</button></div>
    <div class="tabel-bungkus"><table>
    <tr><th>No.</th><th>Pemesan</th><th>Tanggal</th><th>Menu</th><th class="kanan">Total</th><th>Status</th><th>Aksi</th></tr>
    ${selesai.map(p => `<tr><td>${kodePesanan(p.id)}</td><td>${h(p.nama)}<br><small>${h(p.nim)}</small></td><td>${waktu(p.waktu)}</td>
      <td>${p.item.map(i => `${i.jumlah}× ${h(i.nama)}`).join(', ')}</td><td class="kanan">${rupiah(p.total)}</td>
      <td><span class="status ${kelasStatus(p.status)}">${p.status}</span></td>
      <td><button class="kecil merah" onclick="hapusRiwayat(${p.id})">Hapus</button></td></tr>`).join('')}
    </table></div>`;
}

// hapus satu riwayat (hanya pesanan Selesai / Dibatalkan)
function hapusRiwayat(id) {
  if (!confirm('Hapus riwayat pesanan ' + kodePesanan(id) + '? Data juga hilang dari halaman Pesanan Saya milik pembeli.')) return;
  simpan('pesanan', getPesanan().filter(p => p.id !== id));
  segarkan();
}

// hapus semua riwayat; pesanan yang masih aktif (Menunggu/Diproses/Siap Diambil) tidak ikut terhapus
function hapusSemuaRiwayat() {
  if (!confirm('Hapus SEMUA riwayat pesanan (Selesai dan Dibatalkan)? Tindakan ini tidak bisa dibatalkan.')) return;
  simpan('pesanan', getPesanan().filter(p => !['Selesai', 'Dibatalkan'].includes(p.status)));
  segarkan();
}

// ---------- kelola menu ----------
function tampilTabelMenu() {
  document.getElementById('tabelMenu').innerHTML = `<table>
    <tr><th></th><th>Nama</th><th>Kategori</th><th class="kanan">Harga</th><th>Status</th><th>Aksi</th></tr>
    ${getMenu().map(m => `<tr><td>${h(m.emoji)}</td><td>${h(m.nama)}</td><td>${h(m.kategori)}</td><td class="kanan">${rupiah(m.harga)}</td>
      <td>${m.tersedia ? 'Tersedia' : '<b style="color:#dc2626">Habis</b>'}</td>
      <td><button class="kecil abu" onclick="gantiTersedia(${m.id})">${m.tersedia ? 'Tandai Habis' : 'Tandai Ada'}</button>
          <button class="kecil" onclick="editMenu(${m.id})">Edit</button>
          <button class="kecil merah" onclick="hapusMenu(${m.id})">Hapus</button></td></tr>`).join('')}
    </table>`;
}
function resetForm() {
  document.getElementById('judulForm').textContent = 'Tambah Menu';
  ['menuId', 'mNama', 'mHarga', 'mDeskripsi'].forEach(i => (document.getElementById(i).value = ''));
  document.getElementById('mKategori').value = 'Makanan';
  document.getElementById('mEmoji').value = '🍽️';
  document.getElementById('mTersedia').checked = true;
  document.getElementById('pesanMenu').innerHTML = '';
}
function simpanMenu() {
  const nama = document.getElementById('mNama').value.trim();
  const harga = Number(document.getElementById('mHarga').value);
  if (!nama || harga <= 0) {
    document.getElementById('pesanMenu').innerHTML = '<div class="pesan gagal">Nama dan harga wajib diisi dengan benar.</div>';
    return;
  }
  const data = {
    nama: nama, harga: harga,
    kategori: document.getElementById('mKategori').value.trim() || 'Lainnya',
    deskripsi: document.getElementById('mDeskripsi').value.trim(),
    emoji: document.getElementById('mEmoji').value.trim() || '🍽️',
    tersedia: document.getElementById('mTersedia').checked
  };
  const menu = getMenu();
  const id = Number(document.getElementById('menuId').value);
  if (id) Object.assign(menu.find(m => m.id === id), data);          // ubah menu
  else menu.push({ id: menu.reduce((maks, m) => Math.max(maks, m.id), 0) + 1, ...data });  // menu baru
  simpan('menu', menu);
  resetForm();
  segarkan();
}
function editMenu(id) {
  const m = getMenu().find(x => x.id === id);
  document.getElementById('judulForm').textContent = 'Edit Menu';
  document.getElementById('menuId').value = m.id;
  document.getElementById('mNama').value = m.nama;
  document.getElementById('mKategori').value = m.kategori;
  document.getElementById('mHarga').value = m.harga;
  document.getElementById('mEmoji').value = m.emoji;
  document.getElementById('mDeskripsi').value = m.deskripsi;
  document.getElementById('mTersedia').checked = m.tersedia;
  window.scrollTo(0, 0);
}
function gantiTersedia(id) {
  const menu = getMenu();
  const m = menu.find(x => x.id === id);
  m.tersedia = !m.tersedia;
  simpan('menu', menu);
  segarkan();
}
function hapusMenu(id) {
  if (!confirm('Hapus menu ini?')) return;
  simpan('menu', getMenu().filter(m => m.id !== id));
  segarkan();
}

tampilHalaman();
setInterval(() => { if (sessionStorage.getItem('kantin2_login') === 'ya' && tabAktif === 'pesanan') segarkan(); }, 5000);
