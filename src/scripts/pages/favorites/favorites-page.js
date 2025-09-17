import IndexedDBModel from '../../models/indexeddb-model.js';

export default class FavoritesPage {
  constructor() {
    this.indexedDB = new IndexedDBModel();
  }

  async render() {
    return `
      <section class="container favorites-page">
        <div class="page-header gradient">
          <div class="page-header-content">
            <h1 id="page-title">Favorit</h1>
            <p class="page-subtitle">Story yang Anda simpan untuk dibaca nanti</p>
          </div>
        </div>

        <ul id="fav-list" class="stories-grid" aria-live="polite"></ul>
      </section>
    `;
  }

  async afterRender() {
    await this.indexedDB.init();
    const list = document.querySelector('#fav-list');
    const items = await this.indexedDB.getAllFavorites();
    if (!list) return;
    if (items.length === 0) {
      list.innerHTML = '<p>Tidak ada favorit. Simpan story dari halaman Home atau Detail.</p>';
      return;
    }
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OWFiYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    list.innerHTML = items.map((s) => `
      <li class="story-card">
        <a class="story-link" href="#/stories/${s.id}">
          <div class="story-image-container">
            <img src="${s.photoUrl || fallbackImage}" alt="Foto oleh ${s.name}" loading="lazy" />
          </div>
          <div class="story-content">
            <h3><i class="fas fa-book-open"></i> ${s.name}</h3>
            <p>${s.description}</p>
            <div class="story-meta">
              <span><i class="fas fa-calendar"></i> ${new Date(s.createdAt).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </a>
        <div class="fav-actions">
          <button type="button" class="btn btn-danger btn-sm remove-fav-btn" aria-label="Hapus" data-id="${s.id}">
            <i class="fas fa-trash"></i> Hapus
          </button>
        </div>
      </li>
    `).join('');

    list.addEventListener('click', async (e) => {
      const btn = e.target.closest('.remove-fav-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const ok = await this.showConfirm({
        title: 'Hapus Favorit',
        message: 'Story ini akan dihapus dari daftar favorit. Lanjutkan?',
        confirmText: 'Hapus',
        cancelText: 'Batal'
      });
      if (!ok) return;
      await this.indexedDB.removeFavorite(id);
      btn.closest('li')?.remove();
      if (!list.querySelector('li')) {
        list.innerHTML = '<p>Tidak ada favorit.</p>';
      }
    });
  }

  // Private: styled confirm modal
  showConfirm({ title = 'Konfirmasi', message = 'Lanjutkan?', confirmText = 'OK', cancelText = 'Batal' } = {}) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div class="confirm-header">
            <h3 id="confirm-title"><i class="fas fa-exclamation-triangle"></i> ${title}</h3>
          </div>
          <div class="confirm-body">${message}</div>
          <div class="confirm-actions">
            <button type="button" class="btn btn-outline confirm-cancel">${cancelText}</button>
            <button type="button" class="btn btn-danger confirm-ok">${confirmText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const cleanup = (result) => {
        overlay.remove();
        document.removeEventListener('keydown', onKey);
        resolve(result);
      };
      const onKey = (ev) => { if (ev.key === 'Escape') cleanup(false); };
      document.addEventListener('keydown', onKey);
      overlay.addEventListener('click', (ev) => { if (ev.target === overlay) cleanup(false); });
      overlay.querySelector('.confirm-cancel')?.addEventListener('click', () => cleanup(false));
      overlay.querySelector('.confirm-ok')?.addEventListener('click', () => cleanup(true));
    });
  }
}


