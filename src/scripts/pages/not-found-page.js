export default class NotFoundPage {
  async render() {
    return `
      <section class="container">
        <div class="not-found-container">
          <div class="not-found-content">
            <div class="not-found-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p class="not-found-description">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. 
              Mungkin halaman tersebut telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
            </p>
            <div class="not-found-actions">
              <a href="#/" class="btn btn-primary">
                <i class="fas fa-home"></i> Kembali ke Beranda
              </a>
              <a href="#/add-story" class="btn btn-outline">
                <i class="fas fa-plus"></i> Tambah Cerita
              </a>
            </div>
            <div class="not-found-suggestions">
              <h3>Mungkin Anda mencari:</h3>
              <ul>
                <li><a href="#/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><a href="#/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                <li><a href="#/register"><i class="fas fa-user-plus"></i> Register</a></li>
                <li><a href="#/add-story"><i class="fas fa-plus"></i> Tambah Cerita</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Add any additional functionality if needed
  }
}


