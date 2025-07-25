import { NextRequest } from 'next/server'
import { GET as getTransactions } from '@/src/app/api/user/[userid]/transactions/route'
import { GET as getWatchlist } from '@/src/app/api/user/[userid]/watchlist/route'
import prisma from '@/src/lib/prisma'

jest.mock('@/src/lib/prisma', () => ({
  transaction: { findMany: jest.fn() },
  watchlist: { findMany: jest.fn() }
}))

describe('Transaction endpoint', () => {
  it('returns 200 for authorized request', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue([])
    const req = new NextRequest(new URL('http://localhost/api/user/u1/transactions'))
    const res = await getTransactions(req, { params: { userid: 'u1' } })
    expect(res.status).toBe(200)
  })
})

describe('Watchlist endpoint', () => {
  it('returns 200 for authorized request', async () => {
    (prisma.watchlist.findMany as jest.Mock).mockResolvedValue([])
    const req = new NextRequest(new URL('http://localhost/api/user/u1/watchlist'))
    const res = await getWatchlist(req, { params: { userid: 'u1' } })
    expect(res.status).toBe(200)
  })
})

describe('Unauthorized requests', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('@/src/auth', () => ({
      auth: () => new Response('Unauthorized', { status: 401 })
    }))
  })

  it('returns 401 for transactions without auth', async () => {
    const { middleware } = await import('@/src/middleware')
    const req = new NextRequest(new URL('http://localhost/api/user/u1/transactions'))
    const res = await middleware(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 for watchlist without auth', async () => {
    const { middleware } = await import('@/src/middleware')
    const req = new NextRequest(new URL('http://localhost/api/user/u1/watchlist'))
    const res = await middleware(req)
    expect(res.status).toBe(401)
  })
})
