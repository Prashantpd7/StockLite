import DashboardShell from '@/components/DashboardShell'
import InventoryTable from '@/components/InventoryTable'
import LowStockSummary from '@/components/LowStockSummary'
import { products, warehouses } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export default function InventoryPage() {
  const categoryCount = new Set(products.map((p) => p.category)).size
  const unitsOnHand = products.reduce((sum, p) => sum + p.currentStock, 0)

  return (
    <DashboardShell>
      <div className="page-header">
        <div>
          <h1>Inventory</h1>
          <p>Current stock across both warehouses.</p>
        </div>
      </div>

      <div className="summary-strip">
        <div className="summary-tile">
          <div className="value">{products.length}</div>
          <div className="label">Total SKUs tracked</div>
        </div>
        <div className="summary-tile">
          <div className="value">{warehouses.length}</div>
          <div className="label">Warehouses</div>
        </div>
        <div className="summary-tile">
          <div className="value">{categoryCount}</div>
          <div className="label">Categories</div>
        </div>
        <div className="summary-tile">
          <div className="value">{unitsOnHand}</div>
          <div className="label">Units on hand</div>
        </div>
      </div>

      <LowStockSummary products={products} warehouses={warehouses} />

      <InventoryTable products={products} warehouses={warehouses} />
    </DashboardShell>
  )
}
