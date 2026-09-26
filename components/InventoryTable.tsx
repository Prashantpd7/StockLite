'use client'

import { useMemo, useState } from 'react'
import {
  Product,
  Warehouse,
  getStockStatus,
  getStockStatusLabel,
  isLowStock,
} from '@/lib/types'
import StatusBadge from '@/components/StatusBadge'

export default function InventoryTable({
  products,
  warehouses,
}: {
  products: Product[]
  warehouses: Warehouse[]
}) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  )
  const warehouseName = (id: string) =>
    warehouses.find((w) => w.id === id)?.name ?? id

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lowStockOnly, setLowStockOnly] = useState(false)

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory)
        return false
      if (lowStockOnly && !isLowStock(p)) return false
      return true
    })
  }, [products, selectedCategory, lowStockOnly])

  return (
    <>
      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="checkbox-filter">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
          />
          Low stock only
        </label>
      </div>

      <div className="panel table-panel">
        {visibleProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products match these filters</h3>
            <p>Try a different category or clear the low stock filter.</p>
          </div>
        ) : (
          <div className="table-scroll" tabIndex={0} aria-label="Inventory table">
            <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Warehouse</th>
                <th className="num">Current stock</th>
                <th className="num">Reorder threshold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product) => {
                const status = getStockStatus(product)
                return (
                  <tr key={product.id}>
                    <td className="cell-product">{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      <span className="warehouse-tag">
                        {warehouseName(product.warehouseId)}
                      </span>
                    </td>
                    <td className="num">{product.currentStock}</td>
                    <td className="num">{product.reorderThreshold}</td>
                    <td>
                      <StatusBadge
                        status={status}
                        label={getStockStatusLabel(status)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
