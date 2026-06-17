'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPlantPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    species: '',
    location: '',
    quantity: 1,
    status: 'healthy',
    forSale: false,
    price: '',
    notes: '',
  })

  const handleSubmit = async () => {
    setLoading(true)
    await fetch('/api/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: form.price ? parseFloat(form.price) : null }),
    })
    router.push('/plants')
  }

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form as any)[key]}
        onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? parseInt(e.target.value) : e.target.value }))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
      />
    </div>
  )

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-medium mb-5">Add plant</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
        {field('Name', 'name', 'text', 'e.g. Saguaro #1')}
        {field('Species', 'species', 'text', 'e.g. Carnegiea gigantea')}
        {field('Location', 'location', 'text', 'e.g. Section A')}
        {field('Quantity', 'quantity', 'number')}

        <div>
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="healthy">Healthy</option>
            <option value="needs attention">Needs attention</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="forSale"
            checked={form.forSale}
            onChange={e => setForm(f => ({ ...f, forSale: e.target.checked }))}
          />
          <label htmlFor="forSale" className="text-sm text-gray-600">For sale</label>
        </div>

        {form.forSale && field('Price ($)', 'price', 'number', '0.00')}

        <div>
          <label className="block text-sm text-gray-500 mb-1">Notes</label>
          <textarea
            placeholder="Any notes about this plant..."
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.name}
          className="w-full py-2 text-sm font-medium bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Add plant'}
        </button>
      </div>
    </div>
  )
}