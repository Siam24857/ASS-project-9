// components/FiltersPanel.jsx
export default function Fillter() {
  const amenities = [
    { label: "Whiteboard", checked: false },
    { label: "Projector", checked: true },
    { label: "Wi-Fi", checked: true },
    { label: "Power Outlets", checked: true },
    { label: "Quiet Zone", checked: false },
    { label: "Air Conditioning", checked: false },
  ];

  return (
    <div className="w-[260px] rounded-2xl bg-[#0f1724] p-5 text-white shadow-xl border border-white/10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>

        <button className="text-sm font-medium text-orange-400 hover:text-orange-300">
          Clear all
        </button>
      </div>

      {/* Amenities */}
      <div className="mb-7">
        <h3 className="mb-4 text-lg font-semibold">Amenities</h3>

        <div className="space-y-4">
          {amenities.map((item) => (
            <label
              key={item.label}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="
                  h-5 w-5 rounded border border-gray-400
                  bg-transparent text-orange-400
                  accent-orange-400
                "
              />

              <span className="text-[17px] text-gray-100">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="mb-7">
        <h3 className="mb-4 text-lg font-semibold">Hourly Rate ($)</h3>

        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            className="
              w-full rounded-xl border border-[#243244]
              bg-[#101826] px-4 py-3
              text-white placeholder:text-gray-400
              outline-none focus:border-orange-400
            "
          />

          <span className="text-gray-400">to</span>

          <input
            type="number"
            placeholder="Max"
            className="
              w-full rounded-xl border border-[#243244]
              bg-[#101826] px-4 py-3
              text-white placeholder:text-gray-400
              outline-none focus:border-orange-400
            "
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl border border-[#243244]
          bg-[#0b1320] py-3
          font-medium text-white
          transition hover:bg-[#121d2d]
        "
      >
        ✕ Clear All Filters
      </button>
    </div>
  );
}