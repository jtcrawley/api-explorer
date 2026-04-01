"use client";

const BANDS = [
  {
    range: "2xx",
    label: "Success",
    color: "#22c55e",
    codes: [
      { code: "200", name: "OK", desc: "Here's your data" },
      { code: "201", name: "Created", desc: "New thing made" },
      { code: "204", name: "No Content", desc: "Done, nothing to return" },
    ],
  },
  {
    range: "3xx",
    label: "Redirect",
    color: "#3b82f6",
    codes: [
      { code: "301", name: "Moved Permanently", desc: "URL has changed forever" },
      { code: "304", name: "Not Modified", desc: "Use your cached version" },
    ],
  },
  {
    range: "4xx",
    label: "Your fault",
    color: "#f59e0b",
    codes: [
      { code: "400", name: "Bad Request", desc: "Something wrong with your request" },
      { code: "401", name: "Unauthorized", desc: "Need to log in first" },
      { code: "403", name: "Forbidden", desc: "Logged in but not allowed" },
      { code: "404", name: "Not Found", desc: "That thing doesn't exist" },
      { code: "429", name: "Too Many Requests", desc: "Slow down — rate limited" },
    ],
  },
  {
    range: "5xx",
    label: "Server's fault",
    color: "#ef4444",
    codes: [
      { code: "500", name: "Internal Server Error", desc: "The kitchen is on fire" },
      { code: "502", name: "Bad Gateway", desc: "Upstream service broke" },
      { code: "503", name: "Service Unavailable", desc: "Down for maintenance" },
    ],
  },
];

export default function StatusCodesDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
        HTTP Status Code Ranges
      </p>
      <div className="space-y-4">
        {BANDS.map((band) => (
          <div key={band.range}>
            {/* Band header */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${band.color}20`, color: band.color }}
              >
                {band.range}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: band.color }}>
                {band.label}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: `${band.color}30` }} />
            </div>
            {/* Codes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
              {band.codes.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="font-mono text-sm font-bold flex-shrink-0 w-10"
                    style={{ color: band.color }}
                  >
                    {c.code}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                      {c.name}
                    </p>
                    <p className="text-[11px] leading-tight mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
