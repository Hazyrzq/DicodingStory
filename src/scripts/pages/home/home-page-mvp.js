import { HomePresenter } from '../../presenters/home-presenter.js';
import { MapModel } from '../../models/map-model.js';

export default class HomePage {
  constructor() {
    this.presenter = new HomePresenter(this);
    this.mapModel = new MapModel();
  }

  async render() {
    return `
      <section class="container">
        <div class="page-hero">
          <div class="hero-left">
            <h1 id="page-title">Stories</h1>
            <p class="page-subtitle">Temukan dan bagikan cerita menarik dari komunitas</p>
          </div>
          <div class="hero-right">
            <div class="status-card">
              <div id="online-status" class="status-badge online"><i class="fas fa-wifi"></i> Online</div>
              <div id="offline-count" class="status-badge offline" style="display:none;"><i class="fas fa-database"></i> <span id="offline-count-text">0</span> Offline</div>
            </div>
          </div>
        </div>

        <div class="action-bar">
          <div class="action-right">
            <a href="#/add-story" class="btn btn-primary"><i class="fas fa-plus"></i> Add Story</a>
            <a href="#/offline-stories" id="home-offline-stories-btn" class="btn btn-outline" style="display:none;"><i class="fas fa-database"></i> Offline Stories</a>
            <a id="home-login-btn" href="#/login" class="btn btn-outline"><i class="fas fa-sign-in-alt"></i> Login</a>
            <a id="home-register-btn" href="#/register" class="btn btn-outline"><i class="fas fa-user-plus"></i> Register</a>
          </div>
        </div>

        <div class="discover-bar">
          <div class="searchbox">
            <i class="fas fa-search"></i>
            <input id="home-search" type="text" placeholder="Cari cerita..." />
          </div>
          <div class="chips" id="home-chips">
            <button class="chip chip-active" data-filter="all">Semua</button>
            <button class="chip" data-filter="with-location">Ada lokasi</button>
            <button class="chip" data-filter="recent">Terbaru</button>
          </div>
        </div>
        <ul id="stories" class="stories-grid" aria-live="polite"></ul>
        <div id="pagination" style="display:flex; gap:8px; justify-content:center; margin:20px 0;"></div>
        <div id="map" style="height:360px; border:1px solid #e5e7eb; border-radius:8px;"></div>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button id="push-subscribe" class="btn btn-success"><i class="fas fa-bell"></i> Subscribe Push</button>
          <button id="push-unsubscribe" class="btn btn-danger"><i class="fas fa-bell-slash"></i> Unsubscribe Push</button>
        </div>
      </section>
    `;
  }

  // View methods for Presenter
  showLoading() {
    const storiesContainer = document.querySelector('#stories');
    if (storiesContainer) {
      storiesContainer.innerHTML = `
        <div class="loading-state">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Memuat stories...</p>
        </div>
      `;
    }
    
    // Show loading in status indicators
    const onlineStatus = document.querySelector('#online-status');
    if (onlineStatus) {
      onlineStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    }
  }

  showGuestView() {
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    const offlineStoriesBtn = document.querySelector('#home-offline-stories-btn');
    
    if (footer) footer.style.display = '';
    if (offlineStoriesBtn) offlineStoriesBtn.style.display = 'none';
    
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="landing-page">
          <!-- Hero Section -->
          <section class="hero-section">
            <div class="hero-container">
              <div class="hero-content">
                <div class="hero-text">
                  <h1 class="hero-title">
                    Bagikan <span class="highlight">Cerita</span> Codingmu, 
                    <br>Inspirasi Dunia!
                  </h1>
                  <p class="hero-description">
                    Platform komunitas untuk para developer berbagi pengalaman, 
                    proyek, dan inspirasi. Mulai ceritamu sekarang!
                  </p>
                  <div class="hero-actions">
                    <a href="#/register" class="btn btn-primary btn-large">
                      <i class="fas fa-rocket"></i>
                      Daftar Sekarang
                    </a>
                    <a href="#/login" class="btn btn-outline btn-large">
                      <i class="fas fa-sign-in-alt"></i>
                      Masuk
                    </a>
                  </div>
                </div>
                <div class="hero-visual">
                  <div class="hero-image">
                    <div class="floating-card card-1">
                      <i class="fas fa-code"></i>
                      <span>Code</span>
                    </div>
                    <div class="floating-card card-2">
                      <i class="fas fa-camera"></i>
                      <span>Photo</span>
                    </div>
                    <div class="floating-card card-3">
                      <i class="fas fa-map-marker-alt"></i>
                      <span>Location</span>
                    </div>
                    <div class="floating-card card-4">
                      <i class="fas fa-share-alt"></i>
                      <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section class="features-section">
            <div class="container">
              <div class="section-header">
                <h2>Mengapa Memilih Dicoding Story?</h2>
                <p>Platform terbaik untuk developer berbagi cerita dan inspirasi</p>
              </div>
              <div class="features-grid">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-camera"></i>
                  </div>
                  <h3>Abadikan Momen</h3>
                  <p>Ambil foto langsung dari kamera dan bagikan cerita visualmu dengan mudah.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-map-marked-alt"></i>
                  </div>
                  <h3>Lokasi Interaktif</h3>
                  <p>Tandai lokasi ceritamu di peta digital yang menarik dan informatif.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-bell"></i>
                  </div>
                  <h3>Notifikasi Real-time</h3>
                  <p>Dapatkan update dan jangan lewatkan cerita terbaru dari temanmu.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- How It Works Section -->
          <section class="how-it-works">
            <div class="container">
              <div class="section-header">
                <h2>Cara Kerja</h2>
                <p>Hanya 4 langkah sederhana untuk memulai</p>
              </div>
              <div class="steps-container">
                <div class="step-item">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>Daftar Akun</h3>
                    <p>Buat akun gratis dalam hitungan detik</p>
                  </div>
                </div>
                <div class="step-arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
                <div class="step-item">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>Buat Story Baru</h3>
                    <p>Ambil foto dan tulis deskripsi ceritamu</p>
                  </div>
                </div>
                <div class="step-arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
                <div class="step-item">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>Tambahkan Lokasi</h3>
                    <p>Pilih lokasi di peta untuk konteks lebih</p>
                  </div>
                </div>
                <div class="step-arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
                <div class="step-item">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h3>Bagikan!</h3>
                    <p>Publikasikan dan inspirasi developer lain</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Stats Section -->
          <section class="stats-section">
            <div class="container">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">10K+</div>
                  <div class="stat-label">Stories Dibagikan</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">5K+</div>
                  <div class="stat-label">Pengguna Aktif</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">99.9%</div>
                  <div class="stat-label">Uptime Server</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">24/7</div>
                  <div class="stat-label">Dukungan</div>
                </div>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="cta-section">
            <div class="container">
              <div class="cta-content">
                <h2>Siap Berbagi Ceritamu?</h2>
                <p>Bergabunglah dengan ribuan developer lainnya dan mulai inspirasi hari ini.</p>
                <div class="cta-actions">
                  <a href="#/register" class="btn btn-primary btn-large">
                    <i class="fas fa-rocket"></i>
                    Mulai Sekarang
                  </a>
                  <a href="#/login" class="btn btn-outline btn-large">
                    <i class="fas fa-sign-in-alt"></i>
                    Masuk ke Akun
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>`;
    }
  }

  showAuthenticatedView() {
    const pageHeader = document.querySelector('.page-header');
    const loginBtn = document.querySelector('#home-login-btn');
    const registerBtn = document.querySelector('#home-register-btn');
    const offlineStoriesBtn = document.querySelector('#home-offline-stories-btn');
    
    if (pageHeader) pageHeader.style.display = '';
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (offlineStoriesBtn) offlineStoriesBtn.style.display = 'inline-flex';
  }

  displayStories(stories) {
    const storiesContainer = document.querySelector('#stories');
    if (storiesContainer) {
      storiesContainer.innerHTML = stories
        .map((s) => {
          // Prefer fresh blob URL when a photoFile exists
          let photoUrl = s.photoFile ? URL.createObjectURL(s.photoFile) : (s.photoUrl || '');
          
          // Create fallback image
          const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OWFiYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          
          return `
          <li class="story-card">
            <a class="story-link" href="#/stories/${s.id}">
              <div class="story-image-container">
                <img src="${photoUrl || fallbackImage}" alt="Foto oleh ${s.name}" loading="lazy" onload="if(this.src.startsWith('blob:')) URL.revokeObjectURL(this.src)" onerror="this.src='${fallbackImage}'; this.onerror=null;" />
                <div class="story-overlay">
                  <i class="fas fa-eye"></i>
                </div>
              </div>
              <div class="story-content">
                <h3><i class="fas fa-book-open"></i> ${s.name}</h3>
                <p>${s.description}</p>
                <div class="story-meta">
                  <span><i class="fas fa-calendar"></i> ${new Date(s.createdAt).toLocaleString('id-ID')}</span>
                  ${s.lat && s.lon ? '<span><i class="fas fa-map-marker-alt"></i> Lokasi tersedia</span>' : ''}
                </div>
              </div>
            </a>
            <button class="icon-btn bookmark-btn" aria-label="Simpan" data-id="${s.id}" data-name="${s.name}" data-description="${s.description}" data-created="${s.createdAt}" data-photo="${s.photoUrl || ''}">
              <i class="fas fa-bookmark"></i>
            </button>
          </li>
          `;
        })
        .join('');
    }
  }

  renderPagination(hasPrev, hasNext) {
    const paginationEl = document.querySelector('#pagination');
    if (paginationEl) {
      paginationEl.innerHTML = '';
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Prev';
      prevBtn.className = 'btn btn-outline';
      prevBtn.disabled = !hasPrev;
      prevBtn.addEventListener('click', () => this.presenter.onPageChange('prev'));
      
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
      nextBtn.className = 'btn btn-outline';
      nextBtn.disabled = !hasNext;
      nextBtn.addEventListener('click', () => this.presenter.onPageChange('next'));
      
      paginationEl.append(prevBtn, nextBtn);
    }
  }

  renderMap(stories) {
    const mapContainer = document.querySelector('#map');
    if (!mapContainer || !window.L) return;

    try {
      this.mapModel.destroyMap();
      mapContainer.innerHTML = '';
      
      const map = this.mapModel.createMap('map', {
        center: [-2.5, 118],
        zoom: 4.5
      });

      const osm = this.mapModel.addTileLayer(map, 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      });
      
      const toner = this.mapModel.addTileLayer(map, 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        attribution: '© CARTO',
      });
      
      const terrain = this.mapModel.addTileLayer(map, 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '© OpenTopoMap',
      });

      osm.addTo(map);

      const markersLayer = this.mapModel.addLayerGroup(map);

      stories.filter((s) => typeof s.lat === 'number' && typeof s.lon === 'number')
        .forEach((s) => {
          this.mapModel.addMarker(map, [s.lat, s.lon], `<b>${s.name}</b><br/>${s.description}`);
        });

      const baseLayers = {
        'OpenStreetMap': osm,
        'Light Map': toner,
        'Topo': terrain
      };
      
      const overlayLayers = {
        'Stories': markersLayer
      };

      this.mapModel.addLayerControl(map, baseLayers, overlayLayers);
    } catch (error) {
      console.error('Map initialization error:', error);
      mapContainer.innerHTML = '<p>Error loading map. Please refresh the page.</p>';
    }
  }

  getLocationToggle() {
    const locationToggle = document.querySelector('#location-toggle');
    return locationToggle ? locationToggle.checked : false;
  }

  showError(message) {
    const storiesContainer = document.querySelector('#stories');
    if (storiesContainer) {
      storiesContainer.innerHTML = `<p role="alert">${message}</p>`;
    }
  }

  showMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `<i class="fas fa-bell"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Navigation methods
  navigateToHome() {
    setTimeout(() => {
      window.location.hash = '#/';
    }, 1000);
  }

  navigateToLogin() {
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 1000);
  }

  showMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `<i class="fas fa-bell"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  async afterRender() {
    const locationToggle = document.querySelector('#location-toggle');
    const subscribeBtn = document.querySelector('#push-subscribe');
    const unsubscribeBtn = document.querySelector('#push-unsubscribe');
    const searchInput = document.querySelector('#home-search');
    const chips = document.querySelector('#home-chips');

    // Event listeners
    if (locationToggle) {
      locationToggle.addEventListener('change', () => this.presenter.onLocationToggle());
    }

    if (subscribeBtn) {
      subscribeBtn.addEventListener('click', () => this.presenter.subscribeWebPush());
    }

    if (unsubscribeBtn) {
      unsubscribeBtn.addEventListener('click', () => this.presenter.unsubscribeWebPush());
    }

    // Search filter (client-side)
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('#stories .story-card');
        cards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    // Chips filter
    if (chips) {
      chips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip');
        if (!btn) return;
        chips.querySelectorAll('.chip').forEach(c => c.classList.remove('chip-active'));
        btn.classList.add('chip-active');
        const filter = btn.getAttribute('data-filter');
        const cards = document.querySelectorAll('#stories .story-card');
        cards.forEach((card) => {
          if (filter === 'with-location') {
            const hasLoc = !!card.querySelector('.fa-map-marker-alt');
            card.style.display = hasLoc ? '' : 'none';
          } else if (filter === 'recent') {
            // simple visual: show all, sort already handled by API; keep UX predictable
            card.style.display = '';
          } else {
            card.style.display = '';
          }
        });
      });
    }

    // Load initial data
    await this.presenter.loadStories();

    // Mark bookmark buttons active based on current favorites
    try {
      const indexed = new (await import('../../models/indexeddb-model.js')).default();
      await indexed.init();
      const favs = await indexed.getAllFavorites();
      const favIds = new Set(favs.map(f => String(f.id)));
      document.querySelectorAll('.bookmark-btn').forEach((btn) => {
        if (favIds.has(btn.getAttribute('data-id'))) {
          btn.classList.add('active');
        }
      });
    } catch {}

    // Delegate bookmark button clicks
    const storiesContainer = document.querySelector('#stories');
    if (storiesContainer) {
      storiesContainer.addEventListener('click', async (e) => {
        const btn = e.target.closest('.bookmark-btn');
        if (!btn) return;
        const story = {
          id: btn.getAttribute('data-id'),
          name: btn.getAttribute('data-name'),
          description: btn.getAttribute('data-description'),
          createdAt: btn.getAttribute('data-created'),
          photoUrl: btn.getAttribute('data-photo') || ''
        };
        const saved = await this.presenter.toggleFavorite(story);
        btn.classList.toggle('active', saved);
        this.showMessage(saved ? 'Disimpan ke Favorit' : 'Dihapus dari Favorit');
      });
    }
  }
}
