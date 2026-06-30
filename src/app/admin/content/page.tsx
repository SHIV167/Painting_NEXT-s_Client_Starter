'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function ContentManagement() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      setContents(data)
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: number, html: string) => {
    try {
      await fetch(`/api/admin/content/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      })
      alert('Content updated successfully')
    } catch (error) {
      console.error('Error updating content:', error)
      alert('Failed to update content')
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>

        <div className="space-y-6">
          {contents.map((content: any) => (
            <div key={content.id} className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {content.key.replace(/_/g, ' ').toUpperCase()}
                </h3>
                <div className="mb-4">
                  <ReactQuill
                    theme="snow"
                    value={content.html}
                    onChange={(value) => handleUpdate(content.id, value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {contents.length === 0 && (
            <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
              No content found. Content will be created automatically when needed.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
