import WarehouseScene from '@/components/WarehouseScene'

// Fixed, non-interactive warehouse environment rendered behind the whole app.
// Purely decorative: it never receives focus, clicks, or data.
export default function WarehouseBackdrop() {
  return (
    <div className="warehouse-backdrop" aria-hidden="true">
      <WarehouseScene />
      <div className="warehouse-backdrop-glow" />
      <div className="warehouse-backdrop-scrim" />
    </div>
  )
}
