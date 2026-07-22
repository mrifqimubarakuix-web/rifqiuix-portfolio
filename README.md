# Portfolio Muh. Rifqi Mubarak — Static Site

Ini adalah hasil migrasi portfolio dari Framer (`rifqiuix.framer.website`) ke
situs statis biasa: cuma HTML, CSS, dan sedikit JavaScript. Tidak ada proses
build, tidak ada framework — jadi filenya bisa dibuka dan diedit langsung.

## 1. Isi folder ini

```
rifqiuix-portfolio/
├── index.html              -> halaman utama (About)
├── lucy/index.html         -> halaman project Lucy Technology
├── nautilus/index.html     -> halaman project Nautilus
├── malmora/index.html      -> halaman project Malmora Reseller
├── articles/index.html     -> halaman daftar artikel
├── assets/
│   ├── css/style.css       -> semua styling (warna, jarak, layout)
│   ├── js/main.js          -> script kecil untuk tombol menu di HP
│   └── img/                -> semua gambar (foto profil, cover project, dst)
├── vercel.json              -> pengaturan untuk deploy ke Vercel
└── README.md                 -> file ini
```

Tiap halaman adalah file HTML terpisah yang berdiri sendiri — tidak ada
"template" otomatis. Kalau mau ubah nav/header di semua halaman, artinya
perlu diubah di tiap file (memang begini konsekuensi static site sederhana
tanpa framework).

## 2. Lihat hasilnya di komputer sendiri

Kamu tidak wajib install apa pun untuk sekadar melihat. Cara paling gampang:

1. Buka Finder, masuk ke folder `rifqiuix-portfolio`.
2. Klik dua kali file `index.html`. Otomatis akan terbuka di browser.

Kalau nanti mau lihat versi yang perilakunya lebih mirip situs asli
(termasuk path seperti `/lucy/` tanpa perlu klik file satu-satu), jalankan
via terminal:

```bash
cd rifqiuix-portfolio
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser. Tekan `Ctrl + C` di terminal
untuk mematikan server ini kalau sudah selesai.

## 3. Cara edit teks

Semua teks ada langsung di file `.html` masing-masing halaman — cari
kalimatnya pakai `Cmd+F` di text editor (VS Code, TextEdit, dll), ganti,
simpan, lalu refresh browser.

Contoh: mau ganti kalimat perkenalan di halaman utama? Buka `index.html`,
cari `<p class="hero-text">`, edit teks di dalamnya.

## 4. Cara ganti / tambah gambar

1. Taruh file gambar baru di `assets/img/`.
2. Di file HTML terkait, ganti `src="assets/img/nama-file-lama.png"` jadi
   nama file barumu.
3. Untuk halaman di dalam folder (misalnya `lucy/index.html`), path gambarnya
   pakai awalan `../`, contoh: `src="../assets/img/nama-file.png"`.

## 5. Deploy ke Vercel

Ada dua cara. Kalau baru pertama kali, **cara A (CLI)** paling cepat karena
tidak perlu bikin akun GitHub dulu. **Cara B (GitHub)** lebih enak untuk
jangka panjang karena tiap kali kamu edit & push, Vercel otomatis update
situsnya.

### Cara A — Deploy langsung pakai Vercel CLI (paling cepat)

1. Install Node.js kalau belum ada: unduh di https://nodejs.org (pilih versi
   LTS), lalu install seperti biasa.
2. Buka Terminal, install Vercel CLI (cukup sekali saja):
   ```bash
   npm install -g vercel
   ```
3. Masuk ke folder project:
   ```bash
   cd ~/Projects/rifqiuix-portfolio
   ```
4. Jalankan:
   ```bash
   vercel
   ```
5. Ikuti pertanyaan yang muncul (semuanya boleh pilih default / tekan Enter):
   - "Set up and deploy?" → `Y`
   - "Which scope?" → pilih akunmu
   - "Link to existing project?" → `N`
   - "What's your project's name?" → boleh isi bebas, misal `rifqiuix-portfolio`
   - "In which directory is your code located?" → biarkan default (`./`)
6. Tunggu sebentar, nanti muncul link `https://xxxxx.vercel.app` — itu
   situsmu sudah online.
7. Untuk update situs setelah edit file, tinggal jalankan `vercel --prod`
   lagi dari folder yang sama.

### Cara B — Lewat GitHub (auto-deploy tiap kali edit)

1. Buat akun di https://github.com kalau belum punya.
2. Buat repository baru di GitHub (tombol hijau "New"), jangan centang opsi
   "Add README" karena kita sudah punya file-nya.
3. Di Terminal, dari folder project (`git init` sudah dijalankan otomatis,
   lihat bagian bawah), hubungkan ke GitHub:
   ```bash
   cd ~/Projects/rifqiuix-portfolio
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git branch -M main
   git push -u origin main
   ```
   (Ganti `USERNAME` dan `NAMA-REPO` sesuai punyamu.)
4. Buka https://vercel.com, sign up/login pakai akun GitHub yang sama.
5. Klik "Add New Project", pilih repo yang baru kamu push.
6. Framework preset biarkan "Other" (situs ini tanpa framework), klik
   "Deploy".
7. Selesai — tiap kali kamu `git push` perubahan baru, Vercel otomatis
   build ulang & update situsnya.

## 6. Custom domain (opsional)

Kalau nanti punya domain sendiri (misalnya dari Niagahoster/Domainesia),
tinggal buka project di dashboard Vercel → tab **Settings → Domains** →
masukkan domainmu, lalu ikuti instruksi untuk arahkan DNS-nya.

## Catatan tentang hasil migrasi ini

- Semua teks & gambar diambil langsung dari situs Framer aslinya
  (`rifqiuix.framer.website`), lalu disusun ulang jadi HTML/CSS polos.
- Efek scroll/animasi ala Framer sengaja **tidak** ditiru 1:1 supaya kode
  tetap sederhana dan gampang di-maintain tanpa JavaScript rumit — fokusnya
  meniru tampilan (warna, font, tata letak, konten), bukan animasinya.
- Font yang dipakai: **Inclusive Sans** dari Google Fonts (sama seperti
  situs aslinya), dimuat lewat tag `<link>` di setiap halaman — tidak perlu
  file font terpisah.
