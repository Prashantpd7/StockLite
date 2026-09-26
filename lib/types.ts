// Shared types used across the StockLite app.

export type Warehouse = {
  id: string
  name: string
  location: string
}

export type Product = {
  id: string
  name: string
  category: string
  warehouseId: string
  currentStock: number
  reorderThreshold: number
}

export type TransactionType = 'IN' | 'OUT' | 'TRANSFER_OUT' | 'TRANSFER_IN'

export type Transaction = {
  id: string
  productId: string
  productName: string
  warehouseId: string
  warehouseName: string
  type: TransactionType
  quantity: number
  timestamp: string // ISO string
  linkedTransactionId?: string // pairs TRANSFER_OUT with TRANSFER_IN
}

export type StaffUser = {
  id: string
  name: string
  role: 'staff'
}

// Low-stock status shared by the inventory table and status badge.
export type StockStatus = 'ok' | 'low' | 'critical'

// A product needs replenishment when its stock is at or below the reorder
// threshold (stock <= threshold). This is the single source of truth for the
// low-stock rule used by the inventory table, its filter, and the badge.
export function isLowStock(product: Product): boolean {
  return product.currentStock <= product.reorderThreshold
}

export function getStockStatus(product: Product): StockStatus {
  if (!isLowStock(product)) return 'ok'
  // Below the threshold is the more severe of the two low-stock states.
  return product.currentStock < product.reorderThreshold ? 'critical' : 'low'
}

export function getStockStatusLabel(status: StockStatus): string {
  if (status === 'critical') return 'Below threshold'
  if (status === 'low') return 'At threshold'
  return 'In stock'
}
