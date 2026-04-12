export default function Heroes() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient effect */}
      <defs>
        <linearGradient
          id="heroGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Placeholder for hero visual */}
      <rect width="1200" height="600" fill="url(#heroGradient)" />

      {/* Decorative circles */}
      <circle cx="900" cy="150" r="200" stroke="#0ea5e9" strokeWidth="2" opacity="0.2" />
      <circle cx="300" cy="450" r="150" stroke="#0ea5e9" strokeWidth="2" opacity="0.15" />
      <circle cx="600" cy="100" r="100" stroke="#0ea5e9" strokeWidth="1" opacity="0.1" />
    </svg>
  )
}
