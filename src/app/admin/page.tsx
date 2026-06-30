import { query } from '@/lib/db'

export default async function AdminDashboard() {
  const stats = await Promise.all([
    query('SELECT COUNT(*) FROM "MenuItem"'),
    query('SELECT COUNT(*) FROM "Slider"'),
    query('SELECT COUNT(*) FROM "Page"'),
    query('SELECT COUNT(*) FROM "FeaturedWork"'),
  ])

  const [menuCount, sliderCount, pageCount, featuredCount] = [
    parseInt(stats[0].rows[0].count),
    parseInt(stats[1].rows[0].count),
    parseInt(stats[2].rows[0].count),
    parseInt(stats[3].rows[0].count),
  ]

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
        <p className="admin-subtitle">Welcome back! Here's an overview of your gallery content.</p>
      </div>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div className="admin-stat-value">{menuCount}</div>
          <div className="admin-stat-label">Menu Items</div>
          <a href="/admin/menu" className="admin-stat-link">
            Manage
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="admin-stat-value">{sliderCount}</div>
          <div className="admin-stat-label">Sliders</div>
          <a href="/admin/sliders" className="admin-stat-link">
            Manage
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="admin-stat-value">{pageCount}</div>
          <div className="admin-stat-label">Pages</div>
          <a href="/admin/pages" className="admin-stat-link">
            Manage
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="admin-stat-value">{featuredCount}</div>
          <div className="admin-stat-label">Featured Works</div>
          <a href="/admin/featured" className="admin-stat-link">
            Manage
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2 className="admin-section-title">Quick Actions</h2>
        <div className="admin-actions-grid">
          <a href="/admin/menu/new" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Menu Item
          </a>
          <a href="/admin/sliders/new" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Slider
          </a>
          <a href="/admin/pages/new" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Page
          </a>
          <a href="/admin/featured/new" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Featured Work
          </a>
          <a href="/admin/about" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit About Gallery
          </a>
          <a href="/admin/content" className="admin-action-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Content
          </a>
        </div>
      </div>
    </div>
  )
}
