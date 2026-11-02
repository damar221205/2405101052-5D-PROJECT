// Halaman pesanan pembeli: status + riwayat berdasarkan NIM
window.HALAMAN = 'pesanan';
pasangHeader('pesanan');
pasangFooter();

let nimAktif = ambil('pembeli', { nim: '' }).nim;
document.getElementById('nim').value = nimAktif;

function cariPesanan() {
  const nim = document.getElementById('nim').value.trim();
  if (!nimValid(nim)) { document.getElementById('hasil').innerHTML = '<div class="pesan gagal">NIM harus berupa angka (8-20 digit).</div>'; return; }
  nimAktif = nim;
  tampilPesanan();
}

function tampilPesanan() {
  const kotak = document.getElementById('hasil');
  if (!nimAktif) { kotak.innerHTML = '<p class="kosong">Masukkan NIM untuk melihat pesanan.</p>'; return; }
  const daftar = getPesanan().filter(p => p.nim === nimAktif).sort((a, b) => b.id - a.id);
  if (daftar.length === 0) { kotak.innerHTML = '<p class="kosong">Belum ada pesanan untuk NIM ini.</p>'; return; }

  kotak.innerHTML = daftar.map(p => `
    <div class="box">
      <div class="pesanan-atas">
        <div><b>${kodePesanan(p.id)}</b> · ${waktu(p.waktu)}</div>
        <span class="status ${kelasStatus(p.status)}">${p.status}</span>
      </div>
      <div>${p.item.map(i => `${i.jumlah}× ${h(i.nama)}`).join(', ')}</div>
      ${p.catatan ? `<div class="sub">Catatan: ${h(p.catatan)}</div>` : ''}
      <div><b>Total: ${rupiah(p.total)}</b></div>
      ${p.status === 'Siap Diambil' ? '<div class="pesan sukses" style="margin:8px 0 0">Pesanan siap! Silakan ambil di kantin dan bayar langsung.</div>' : ''}
    </div>`).join('');
}
tampilPesanan();
setInterval(tampilPesanan, 5000);   // perbarui otomatis tiap 5 detik
