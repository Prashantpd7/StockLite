import { Product, Transaction, TransactionType, Warehouse } from './types'

export const warehouses: Warehouse[] = [
  {
    id: 'wh-north',
    name: 'North Distribution Center',
    location: 'Elkridge, MD',
  },
  { id: 'wh-south', name: 'South Fulfillment Hub', location: 'Waco, TX' },
]

const seedProducts: Product[] = [
  {
    id: 'p-001',
    name: 'Corrugated Shipping Box (M)',
    category: 'Packaging',
    warehouseId: 'wh-north',
    currentStock: 420,
    reorderThreshold: 100,
  },
  {
    id: 'p-002',
    name: 'Corrugated Shipping Box (M)',
    category: 'Packaging',
    warehouseId: 'wh-south',
    currentStock: 38,
    reorderThreshold: 100,
  },
  {
    id: 'p-003',
    name: 'Stretch Wrap Film 18in',
    category: 'Packaging',
    warehouseId: 'wh-north',
    currentStock: 64,
    reorderThreshold: 60,
  },
  {
    id: 'p-004',
    name: 'Stretch Wrap Film 18in',
    category: 'Packaging',
    warehouseId: 'wh-south',
    currentStock: 15,
    reorderThreshold: 60,
  },
  {
    id: 'p-005',
    name: 'Packing Tape, Clear 48mm',
    category: 'Packaging',
    warehouseId: 'wh-north',
    currentStock: 210,
    reorderThreshold: 80,
  },
  {
    id: 'p-006',
    name: 'Heavy-Duty Pallet Jack',
    category: 'Equipment',
    warehouseId: 'wh-south',
    currentStock: 6,
    reorderThreshold: 5,
  },
  {
    id: 'p-007',
    name: 'Heavy-Duty Pallet Jack',
    category: 'Equipment',
    warehouseId: 'wh-north',
    currentStock: 3,
    reorderThreshold: 5,
  },
  {
    id: 'p-008',
    name: 'Steel Shelving Unit 5-Tier',
    category: 'Equipment',
    warehouseId: 'wh-north',
    currentStock: 12,
    reorderThreshold: 4,
  },
  {
    id: 'p-009',
    name: 'Forklift Safety Vest',
    category: 'Safety',
    warehouseId: 'wh-south',
    currentStock: 25,
    reorderThreshold: 20,
  },
  {
    id: 'p-010',
    name: 'Forklift Safety Vest',
    category: 'Safety',
    warehouseId: 'wh-north',
    currentStock: 20,
    reorderThreshold: 20,
  },
  {
    id: 'p-011',
    name: 'Nitrile Gloves (Box of 100)',
    category: 'Safety',
    warehouseId: 'wh-north',
    currentStock: 140,
    reorderThreshold: 50,
  },
  {
    id: 'p-012',
    name: 'Nitrile Gloves (Box of 100)',
    category: 'Safety',
    warehouseId: 'wh-south',
    currentStock: 9,
    reorderThreshold: 50,
  },
  {
    id: 'p-013',
    name: 'First Aid Kit, Wall-Mount',
    category: 'Safety',
    warehouseId: 'wh-south',
    currentStock: 8,
    reorderThreshold: 8,
  },
  {
    id: 'p-014',
    name: 'Handheld Barcode Scanner',
    category: 'Electronics',
    warehouseId: 'wh-north',
    currentStock: 18,
    reorderThreshold: 6,
  },
  {
    id: 'p-015',
    name: 'Handheld Barcode Scanner',
    category: 'Electronics',
    warehouseId: 'wh-south',
    currentStock: 4,
    reorderThreshold: 6,
  },
  {
    id: 'p-016',
    name: 'Label Printer, Thermal',
    category: 'Electronics',
    warehouseId: 'wh-north',
    currentStock: 9,
    reorderThreshold: 3,
  },
  {
    id: 'p-017',
    name: 'Warehouse Radio, Two-Way',
    category: 'Electronics',
    warehouseId: 'wh-south',
    currentStock: 11,
    reorderThreshold: 10,
  },
  {
    id: 'p-018',
    name: 'Wooden Pallet, Standard',
    category: 'Materials',
    warehouseId: 'wh-north',
    currentStock: 320,
    reorderThreshold: 150,
  },
  {
    id: 'p-019',
    name: 'Wooden Pallet, Standard',
    category: 'Materials',
    warehouseId: 'wh-south',
    currentStock: 132,
    reorderThreshold: 150,
  },
  {
    id: 'p-020',
    name: 'Cardboard Dunnage Sheets',
    category: 'Materials',
    warehouseId: 'wh-south',
    currentStock: 55,
    reorderThreshold: 55,
  },
]

// A few sample transactions so the History page isn't empty on first load.
const seedTransactions: Transaction[] = [
  {
    id: 't-001',
    productId: 'p-002',
    productName: 'Corrugated Shipping Box (M)',
    warehouseId: 'wh-south',
    warehouseName: 'South Fulfillment Hub',
    type: 'OUT',
    quantity: 62,
    timestamp: '2026-09-15T14:32:00Z',
  },
  {
    id: 't-002',
    productId: 'p-018',
    productName: 'Wooden Pallet, Standard',
    warehouseId: 'wh-north',
    warehouseName: 'North Distribution Center',
    type: 'IN',
    quantity: 100,
    timestamp: '2026-09-16T09:05:00Z',
  },
  {
    id: 't-003',
    productId: 'p-011',
    productName: 'Nitrile Gloves (Box of 100)',
    warehouseId: 'wh-north',
    warehouseName: 'North Distribution Center',
    type: 'TRANSFER_OUT',
    quantity: 40,
    timestamp: '2026-09-17T11:20:00Z',
    linkedTransactionId: 't-004',
  },
  {
    id: 't-004',
    productId: 'p-012',
    productName: 'Nitrile Gloves (Box of 100)',
    warehouseId: 'wh-south',
    warehouseName: 'South Fulfillment Hub',
    type: 'TRANSFER_IN',
    quantity: 40,
    timestamp: '2026-09-17T11:20:00Z',
    linkedTransactionId: 't-003',
  },
]

// -------------------------------------------------------------------------
// Shared in-memory store
// -------------------------------------------------------------------------
// Next.js builds a separate module instance per route/page bundle, so plain
// module-level state would NOT be shared between API routes and pages. Keeping
// the mutable arrays on globalThis gives the whole app one authoritative store.
type StockLiteStore = {
  products: Product[]
  transactions: Transaction[]
  nextTransactionSeq: number
  nextProductSeq: number
}

const globalForStore = globalThis as unknown as {
  __stockliteStore?: StockLiteStore
}

function createStore(): StockLiteStore {
  const productRows = seedProducts.map((p) => ({ ...p }))
  const transactionRows = seedTransactions.map((t) => ({ ...t }))
  return {
    products: productRows,
    transactions: transactionRows,
    nextTransactionSeq: transactionRows.length + 1,
    nextProductSeq: productRows.length + 1,
  }
}

const store: StockLiteStore =
  globalForStore.__stockliteStore ??
  (globalForStore.__stockliteStore = createStore())

// Shared, mutable references used across the app.
export const products = store.products
export const transactions = store.transactions

function warehouseName(id: string) {
  return warehouses.find((w) => w.id === id)?.name ?? id
}

export function findProduct(id: string) {
  return products.find((p) => p.id === id)
}

// A quantity is only valid when it is a positive, finite number.
// This rejects 0, negatives, NaN, Infinity and non-numeric values (which
// coerce to NaN via Number(...) at the API boundary).
export function isValidQuantity(quantity: number): boolean {
  return typeof quantity === 'number' && Number.isFinite(quantity) && quantity > 0
}

export function recordTransaction(input: {
  productId: string
  productName: string
  warehouseId: string
  type: TransactionType
  quantity: number
  linkedTransactionId?: string
}): Transaction {
  const tx: Transaction = {
    id: `t-${String(store.nextTransactionSeq++).padStart(3, '0')}`,
    productId: input.productId,
    productName: input.productName,
    warehouseId: input.warehouseId,
    warehouseName: warehouseName(input.warehouseId),
    type: input.type,
    quantity: input.quantity,
    timestamp: new Date().toISOString(),
    linkedTransactionId: input.linkedTransactionId,
  }
  transactions.push(tx)
  return tx
}

// -------------------------------------------------------------------------
// TASK 2 — Stock In / Stock Out
// -------------------------------------------------------------------------
// Applies a validated stock movement to the correct product row and logs a
// transaction. Validation happens before any mutation, so a rejected request
// leaves inventory untouched and creates no transaction.
export function applyStockMovement(
  productId: string,
  quantity: number,
  direction: 'IN' | 'OUT',
): Product {
  const product = findProduct(productId)
  if (!product) throw new Error('Product not found')

  if (!isValidQuantity(quantity)) {
    throw new Error('Quantity must be a number greater than 0')
  }

  if (direction === 'OUT' && quantity > product.currentStock) {
    throw new Error(
      `Insufficient stock: only ${product.currentStock} available`,
    )
  }

  product.currentStock += direction === 'IN' ? quantity : -quantity

  recordTransaction({
    productId: product.id,
    productName: product.name,
    warehouseId: product.warehouseId,
    type: direction,
    quantity,
  })

  return product
}

// -------------------------------------------------------------------------
// TASK 3 — Warehouse Transfer
// -------------------------------------------------------------------------
// Moves stock from the source product row to the matching row at the
// destination warehouse. All conditions are validated before any mutation, so
// a failed transfer leaves both warehouses untouched (no partial writes).
// The matching destination row is created automatically when needed.
export function applyTransfer(
  productId: string,
  destWarehouseId: string,
  quantity: number,
): { source: Product; destination: Product } {
  const source = findProduct(productId)
  if (!source) throw new Error('Source product not found')

  if (!destWarehouseId) {
    throw new Error('Destination warehouse is required')
  }
  const destinationWarehouse = warehouses.find((w) => w.id === destWarehouseId)
  if (!destinationWarehouse) {
    throw new Error('Destination warehouse not found')
  }

  if (!isValidQuantity(quantity)) {
    throw new Error('Quantity must be a number greater than 0')
  }

  if (destWarehouseId === source.warehouseId) {
    throw new Error('Source and destination warehouses must be different')
  }

  if (quantity > source.currentStock) {
    throw new Error(
      `Insufficient stock: only ${source.currentStock} available at the source warehouse`,
    )
  }

  // Find the matching product row at the destination, or create one. This is
  // still part of validation/setup; nothing is decremented yet.
  let destination = products.find(
    (p) => p.warehouseId === destWarehouseId && p.name === source.name,
  )
  if (!destination) {
    destination = {
      id: `p-${String(store.nextProductSeq++).padStart(3, '0')}`,
      name: source.name,
      category: source.category,
      warehouseId: destWarehouseId,
      currentStock: 0,
      reorderThreshold: source.reorderThreshold,
    }
  }

  // All checks passed — commit the move atomically.
  if (!products.includes(destination)) {
    products.push(destination)
  }
  source.currentStock -= quantity
  destination.currentStock += quantity

  const outTx = recordTransaction({
    productId: source.id,
    productName: source.name,
    warehouseId: source.warehouseId,
    type: 'TRANSFER_OUT',
    quantity,
  })
  const inTx = recordTransaction({
    productId: destination.id,
    productName: destination.name,
    warehouseId: destination.warehouseId,
    type: 'TRANSFER_IN',
    quantity,
  })
  outTx.linkedTransactionId = inTx.id
  inTx.linkedTransactionId = outTx.id

  return { source, destination }
}
