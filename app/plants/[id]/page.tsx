import { prisma } from '../../../lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PlantProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = await prisma.plant.findUnique({
    where: { id: parseInt(id) },
    include: { careLogs: { orderBy: { createdAt: 'desc' } }, photos: true },
  })

  if (!plant) notFound()

  const statusColor =
    plant.status === 'healthy' ? 'bg-green-50 text-green-800' :
    plant.status === 'needs attention' ? 'bg-amber-50 text-amber-800' :
    'bg-red-50 text-red-800'

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/plants" className="text-sm text-gray-400 hover:text-gray-600">← Inventory</Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
        <div className="h-32 bg-gray-50 flex items-center justify-center text-5xl border-b border-gray-100">
          🌵
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-xl font-medium">{plant.name}</h1>
              {plant.species && <p className="text-sm text-gray-400 mt-0.5">{plant.species}</p>}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>{plant.status}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Quantity</div>
              <div className="text-lg font-medium">{plant.quantity}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Location</div>
              <div className="text-lg font-medium">{plant.location ?? '—'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Price</div>
              <div className="text-lg font-medium">{plant.price ? `$${plant.price}` : '—'}</div>
            </div>
          </div>

          {plant.notes && (
            <div className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
              {plant.notes}
            </div>
          )}

          {plant.forSale && (
            <div className="mt-3">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800">For sale</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">Care log</h2>
          <Link
            href={`/care/new?plantId=${plant.id}`}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            + Log entry
          </Link>
        </div>

        {plant.careLogs.length === 0 ? (
          <p className="text-sm text-gray-400">No care entries yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {plant.careLogs.map(log => (
              <div key={log.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 mt-0.5 flex-shrink-0">
                  {log.type}
                </span>
                <span className="text-gray-500 flex-1">{log.note ?? '—'}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}