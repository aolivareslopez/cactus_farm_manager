import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function GET() {
  const logs = await prisma.careLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { plant: true },
  })
  return NextResponse.json(logs)
}

export async function POST(req: Request) {
  const body = await req.json()
  const log = await prisma.careLog.create({
    data: {
      plantId: parseInt(body.plantId),
      type: body.type,
      note: body.note,
    },
  })
  return NextResponse.json(log, { status: 201 })
}