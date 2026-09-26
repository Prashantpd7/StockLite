import type { ReactElement } from 'react'

// Purely decorative warehouse environment.
// Rendered as a stylized one-point-perspective scene: a back wall of storage
// racks filled with boxes, a receding floor grid, ceiling strip lights and
// faint structural beams. It carries no data and no interactivity — it only
// supplies the industrial "warehouse control center" atmosphere behind the
// real, 2D inventory interface.

const BAY_X = [60, 320, 580, 840, 1100]
const BAY_W = 250
const BEAM_Y = [228, 328, 428]
const BOX_COLORS = ['#3f5c4c', '#4d4c3c', '#3c454b']
const BOX_WIDTHS = [78, 60, 86]
const BOX_HEIGHTS = [58, 66, 52]

function boxesForRow(
  x: number,
  width: number,
  bottom: number,
  seed: number,
): ReactElement[] {
  const boxes: ReactElement[] = []
  let cursor = x + 16
  for (let i = 0; i < 3; i++) {
    const bw = BOX_WIDTHS[(i + seed) % BOX_WIDTHS.length]
    const bh = BOX_HEIGHTS[(i + seed) % BOX_HEIGHTS.length]
    const color = BOX_COLORS[(i + seed) % BOX_COLORS.length]
    if (cursor + bw > x + width - 16) break
    boxes.push(
      <g key={i}>
        <rect
          x={cursor}
          y={bottom - bh}
          width={bw}
          height={bh}
          rx={3}
          fill={color}
          opacity={0.92}
        />
        <rect
          x={cursor}
          y={bottom - bh}
          width={bw}
          height={4}
          rx={2}
          fill="#ffffff"
          opacity={0.07}
        />
        <line
          x1={cursor + 7}
          y1={bottom - bh / 2}
          x2={cursor + bw - 7}
          y2={bottom - bh / 2}
          stroke="#ffffff"
          strokeOpacity={0.06}
        />
      </g>,
    )
    cursor += bw + 12
  }
  return boxes
}

function RackBay({ x, seed }: { x: number; seed: number }): ReactElement {
  const w = BAY_W
  return (
    <g opacity={0.62}>
      <rect x={x} y={116} width={13} height={330} rx={2} fill="#39423d" />
      <rect
        x={x + w - 13}
        y={116}
        width={13}
        height={330}
        rx={2}
        fill="#39423d"
      />
      {BEAM_Y.map((y) => (
        <rect
          key={y}
          x={x - 5}
          y={y}
          width={w + 10}
          height={11}
          rx={2}
          fill="#2a312d"
        />
      ))}
      {[228, 328, 428].map((bottom, i) => (
        <g key={bottom}>{boxesForRow(x, w, bottom, seed + i)}</g>
      ))}
    </g>
  )
}

// Floor perspective grid lines.
const FLOOR_ROWS = [478, 496, 524, 562, 614, 682, 766, 868]
const FLOOR_COLS = [
  -300, -120, 40, 180, 320, 460, 600, 720, 840, 980, 1120, 1260, 1400, 1560,
  1740,
]

export default function WarehouseScene(): ReactElement {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wh-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c2426" />
          <stop offset="55%" stopColor="#161d1f" />
          <stop offset="100%" stopColor="#0f1416" />
        </linearGradient>
        <radialGradient id="wh-vignette" cx="50%" cy="42%" r="75%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="65%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.72" />
        </radialGradient>
        <linearGradient id="wh-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f7f61" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4f7f61" stopOpacity="0" />
        </linearGradient>
        <filter id="wh-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#wh-wall)" />

      {/* Ceiling strip lights */}
      <g filter="url(#wh-soft)" opacity="0.5">
        <rect x="240" y="34" width="300" height="10" rx="5" fill="#d9e6dc" />
        <rect x="640" y="34" width="300" height="10" rx="5" fill="#d9e6dc" />
        <rect x="1040" y="34" width="300" height="10" rx="5" fill="#d9e6dc" />
      </g>
      <g opacity="0.85">
        <rect x="240" y="36" width="300" height="5" rx="2.5" fill="#eef4ee" />
        <rect x="640" y="36" width="300" height="5" rx="2.5" fill="#eef4ee" />
        <rect x="1040" y="36" width="300" height="5" rx="2.5" fill="#eef4ee" />
      </g>

      {/* Back wall panel seams */}
      <g stroke="#ffffff" strokeOpacity="0.03">
        {[280, 500, 720, 940, 1160].map((x) => (
          <line key={x} x1={x} y1="60" x2={x} y2="470" />
        ))}
      </g>

      {/* Storage racks with boxes */}
      {BAY_X.map((x, i) => (
        <RackBay key={x} x={x} seed={i} />
      ))}

      {/* Floor */}
      <rect x="0" y="470" width="1440" height="430" fill="#111718" />
      <g stroke="#7f9a89" strokeOpacity="0.14" strokeWidth="1">
        {FLOOR_ROWS.map((y) => (
          <line key={y} x1="0" y1={y} x2="1440" y2={y} />
        ))}
      </g>
      <g stroke="#7f9a89" strokeOpacity="0.11" strokeWidth="1">
        {FLOOR_COLS.map((x) => (
          <line key={x} x1={x} y1="900" x2="720" y2="470" />
        ))}
      </g>

      {/* Structural side beams converging toward the vanishing point */}
      <g stroke="#ffffff" strokeOpacity="0.05">
        <line x1="0" y1="120" x2="720" y2="470" />
        <line x1="1440" y1="120" x2="720" y2="470" />
        <line x1="0" y1="900" x2="720" y2="470" />
        <line x1="1440" y1="900" x2="720" y2="470" />
      </g>

      {/* Ambient warehouse-green glow behind the racks */}
      <ellipse
        cx="720"
        cy="470"
        rx="620"
        ry="230"
        fill="url(#wh-glow)"
        opacity="0.35"
      />

      <rect width="1440" height="900" fill="url(#wh-vignette)" />
    </svg>
  )
}
