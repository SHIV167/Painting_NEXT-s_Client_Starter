'use client'

import { useState, useEffect } from 'react'

export default function PagesManagement() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
      fetchPages()
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await fetch(`/api/admin/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      fetchPages()
    } catch (error) {
      console.error('Error updating page:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pages Management</h2>
          <a
            href="/admin/pages/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Page
          </a>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {pages.map((page: any) => (
              <li key={page.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-indigo-600 truncate">{page.title}</p>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                    {page.metaTitle && (
                      <p className="text-xs text-gray-400 mt-1">Meta: {page.metaTitle}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${page.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {page.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleToggleActive(page.id, page.isActive)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Toggle
                    </button>
                    <a
                      href={`/admin/pages/${page.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </a>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900 text-sm"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {pages.length === 0 && (
              <li className="px-4 py-6 text-center text-gray-500">
                No pages found. Create your first page.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
