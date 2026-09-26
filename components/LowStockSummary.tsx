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

// Bonus: warehouse-level low-stock summary.
// Uses the shared low-stock rule (currentStock <= reorderThreshold) so the
// panel always agrees with the inventory table and its low-stock filter.
export default function LowStockSummary({
  products,
  warehouses,
}: {
  products: Product[]
  warehouses: Warehouse[]
}) {
  // Warehouses that have at least one low-stock product start expanded.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const summary = useMemo(
    () =>
      warehouses.map((warehouse) => {
        const rows = products.filter(
          (p) => p.warehouseId === warehouse.id && isLowStock(p),
        )
        const criticalCount = rows.filter(
          (p) => getStockStatus(p) === 'critical',
        ).length
        return {
          warehouse,
          rows: rows.sort((a, b) => a.currentStock - b.currentStock),
          criticalCount,
        }
      }),
    [products, warehouses],
  )

  const totalLow = summary.reduce((sum, s) => sum + s.rows.length, 0)

  return (
    <section className="lowstock-section" aria-labelledby="lowstock-heading">
      <div className="lowstock-header">
        <h2 id="lowstock-heading">Low-stock summary</h2>
        <span className="lowstock-total">
          {totalLow} item{totalLow === 1 ? '' : 's'} need replenishment
        </span>
      </div>

      <div className="lowstock-grid">
        {summary.map(({ warehouse, rows, criticalCount }) => {
          const isOpen = expanded[warehouse.id] ?? false
          return (
            <div className="panel lowstock-card" key={warehouse.id}>
              <div className="lowstock-card-head">
                <div className="lowstock-card-title">
                  <h3>{warehouse.name}</h3>
                  <span className="lowstock-location">{warehouse.location}</span>
                </div>
                <span
                  className={
                    rows.length === 0
                      ? 'lowstock-count is-empty'
                      : criticalCount > 0
                        ? 'lowstock-count is-critical'
                        : 'lowstock-count is-low'
                  }
                >
                  {rows.length} low-stock
                </span>
              </div>

              {rows.length === 0 ? (
                <p className="lowstock-empty">
                  All products are above their reorder threshold.
                </p>
              ) : (
                <>
                  <button
                    type="button"
                    className="lowstock-toggle"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [warehouse.id]: !isOpen,
                      }))
                    }
                  >
                    {isOpen ? 'Hide' : 'Show'} {rows.length} affected product
                    {rows.length === 1 ? '' : 's'}
                    <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <ul className="lowstock-list">
                      {rows.map((p) => {
                        const status = getStockStatus(p)
                        return (
                          <li className="lowstock-item" key={p.id}>
                            <div className="lowstock-item-info">
                              <span className="lowstock-item-name">
                                {p.name}
                              </span>
                              <span className="lowstock-item-meta">
                                {p.currentStock} on hand · reorder at{' '}
                                {p.reorderThreshold}
                              </span>
                            </div>
                            <StatusBadge
                              status={status}
                              label={getStockStatusLabel(status)}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
