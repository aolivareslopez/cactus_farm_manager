import { prisma } from '../../lib/db'
import Link from 'next/link'

export default async function CareLogPage() {
  const logs = await prisma.careLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { plant: true },
  })

  const typeColor: Record<string, string> = {
    watering: 'bg-blue-50 text-blue-800',
    repotting: 'bg-teal-50 text-teal-800',
    'health check': 'bg-amber-50 text-amber-800',
    fertilizing: 'bg-green-50 text-green-800',
    sale: 'bg-purple-50 text-purple-800',
    other: 'bg-gray-100 text-gray-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-medium">Care log</h1>
        <Link
          href="/care/new"
          className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          + Log entry
        </Link>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-400">No entries yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {logs.map(log => (
            <div key={log.id} className="bg-white border border-gray-200 rounded-xl flex items-start gap-3 px-4 py-3 text-sm">
              <span className={`text-xs px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0 ${typeColor[log.type] ?? 'bg-gray-100 text-gray-600'}`}>
                {log.type}
              </span>
              <Link href={`/plants/${log.plantId}`} className="font-medium hover:underline">
                {log.plant.name}
              </Link>
              <span className="text-gray-400 flex-1">{log.note ?? '—'}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(log.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}