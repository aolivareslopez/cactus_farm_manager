import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function GET() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: 'desc' },
    include: { photos: true },
  })
  return NextResponse.json(plants)
}

export async function POST(req: Request) {
  const body = await req.json()
  const plant = await prisma.plant.create({
    data: {
      name: body.name,
      species: body.species,
      location: body.location,
      quantity: body.quantity ?? 1,
      status: body.status ?? 'healthy',
      forSale: body.forSale ?? false,
      price: body.price,
      notes: body.notes,
    },
  })
  return NextResponse.json(plant, { status: 201 })
}