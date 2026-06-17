import { prisma } from '../lib/db'

export default async function Dashboard() {
  const [plants, recentLogs] = await Promise.all([
    prisma.plant.findMany(),
    prisma.careLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { plant: true },
    }),
  ])

  const totalPlants = plants.reduce((sum, p) => sum + p.quantity, 0)
  const species = new Set(plants.map(p => p.species).filter(Boolean)).size
  const forSale = plants.filter(p => p.forSale).length
  const needsAttention = plants.filter(p => p.status !== 'healthy').length

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">Dashboard</h1>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total plants', value: totalPlants },
          { label: 'Species', value: species },
          { label: 'For sale', value: forSale },
          { label: 'Needs attention', value: needsAttention },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-100 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-medium">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-sm font-medium mb-3">Recent activity</h2>
        {recentLogs.length === 0 ? (
          <p className="text-sm text-gray-400">No activity yet — add your first plant to get started.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentLogs.map(log => (
              <div key={log.id} className="flex items-center gap-3 text-sm py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">{log.type}</span>
                <span className="font-medium">{log.plant.name}</span>
                <span className="text-gray-400 flex-1">{log.note}</span>
                <span className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}