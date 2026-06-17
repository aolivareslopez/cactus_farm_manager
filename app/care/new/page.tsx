'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NewCareLogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [plants, setPlants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    plantId: searchParams.get('plantId') ?? '',
    type: 'watering',
    note: '',
  })

  useEffect(() => {
    fetch('/api/plants').then(r => r.json()).then(setPlants)
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    await fetch('/api/care', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.back()
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-medium mb-5">Log care entry</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">

        <div>
          <label className="block text-sm text-gray-500 mb-1">Plant</label>
          <select
            value={form.plantId}
            onChange={e => setForm(f => ({ ...f, plantId: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="">Select a plant...</option>
            {plants.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Type</label>
          <select
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="watering">Watering</option>
            <option value="repotting">Repotting</option>
            <option value="health check">Health check</option>
            <option value="fertilizing">Fertilizing</option>
            <option value="sale">Sale</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Note</label>
          <textarea
            placeholder="What did you do? Any observations..."
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.plantId}
          className="w-full py-2 text-sm font-medium bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Save entry'}
        </button>
      </div>
    </div>
  )
}