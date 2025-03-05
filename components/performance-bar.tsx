export default function PerformanceBar({ label, value, color, compact = false }) {
  return (
    <div>
      {!compact && (
        <div className="flex justify-between text-xs mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        {compact && <span className="text-xs w-24 truncate">{label}</span>}
        <div className="flex-1 bg-gray-700 rounded-full h-2">
          <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
        </div>
        {compact && <span className="text-xs w-8 text-right">{value}%</span>}
      </div>
    </div>
  )
}

