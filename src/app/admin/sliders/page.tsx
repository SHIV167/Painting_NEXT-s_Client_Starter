'use client'

import { useState, useEffect } from 'react'

export default function SliderManagement() {
  const [sliders, setSliders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSliders()
  }, [])

  const fetchSliders = async () => {
    try {
      const response = await fetch('/api/admin/sliders')
      const data = await response.json()
      setSliders(data)
    } catch (error) {
      console.error('Error fetching sliders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slider?')) return

    try {
      await fetch(`/api/admin/sliders/${id}`, { method: 'DELETE' })
      fetchSliders()
    } catch (error) {
      console.error('Error deleting slider:', error)
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await fetch(`/api/admin/sliders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      fetchSliders()
    } catch (error) {
      console.error('Error updating slider:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Slider Management</h2>
          <a
            href="/admin/sliders/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Slider
          </a>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {sliders.map((slider: any) => (
              <li key={slider.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-20 w-32">
                      <img
                        className="h-20 w-32 object-cover rounded"
                        src={slider.imageUrl}
                        alt={slider.title}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">{slider.title}</p>
                      <p className="text-sm text-gray-500">{slider.subtitle}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          slider.deviceType === 'desktop' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {slider.deviceType}
                        </span>
                        <span className="text-xs text-gray-500">Order: {slider.order}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${slider.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {slider.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleToggleActive(slider.id, slider.isActive)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Toggle
                    </button>
                    <a
                      href={`/admin/sliders/${slider.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(slider.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {sliders.length === 0 && (
              <li className="px-4 py-6 text-center text-gray-500">
                No sliders found. Create your first slider.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
