'use client'

import { useState, useEffect } from 'react'

export default function FeaturedWorksManagement() {
  const [featuredWorks, setFeaturedWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedWorks()
  }, [])

  const fetchFeaturedWorks = async () => {
    try {
      const response = await fetch('/api/admin/featured')
      const data = await response.json()
      setFeaturedWorks(data)
    } catch (error) {
      console.error('Error fetching featured works:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this featured work?')) return

    try {
      await fetch(`/api/admin/featured/${id}`, { method: 'DELETE' })
      fetchFeaturedWorks()
    } catch (error) {
      console.error('Error deleting featured work:', error)
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await fetch(`/api/admin/featured/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      fetchFeaturedWorks()
    } catch (error) {
      console.error('Error updating featured work:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Works Management</h2>
          <a
            href="/admin/featured/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Featured Work
          </a>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {featuredWorks.map((work: any) => (
              <li key={work.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-20 w-20 object-cover rounded"
                        src={work.imageUrl}
                        alt={work.title}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">{work.title}</p>
                      {work.artistName && (
                        <p className="text-sm text-gray-500">by {work.artistName}</p>
                      )}
                      {work.year && (
                        <p className="text-xs text-gray-400">{work.year}</p>
                      )}
                      <span className="text-xs text-gray-400">Order: {work.order}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${work.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {work.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleToggleActive(work.id, work.isActive)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Toggle
                    </button>
                    <a
                      href={`/admin/featured/${work.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {featuredWorks.length === 0 && (
              <li className="px-4 py-6 text-center text-gray-500">
                No featured works found. Add your first featured work.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
