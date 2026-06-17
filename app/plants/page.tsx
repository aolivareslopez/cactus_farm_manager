import { prisma } from '../../lib/db'
import Link from 'next/link'

export default async function PlantsPage() {
  const plants = await prisma.plant.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">Inventory</h1>
      {plants.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-3">No plants yet.</p>
          <Link href="/plants/new" className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            + Add your first plant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {plants.map(plant => (
            <Link key={plant.id} href={`/plants/${plant.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors cursor-pointer">
                <div className="h-20 bg-gray-50 flex items-center justify-center text-3xl">🌵</div>
                <div className="p-3">
                  <div className="text-sm font-medium">{plant.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 mb-2">{plant.species}</div>
                  <div className="flex gap-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      plant.status === 'healthy' ? 'bg-green-50 text-green-800' :
                      plant.status === 'needs attention' ? 'bg-amber-50 text-amber-800' :
                      'bg-red-50 text-red-800'
                    }`}>{plant.status}</span>
                    {plant.forSale && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">For sale</span>}
                    {plant.location && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{plant.location}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}