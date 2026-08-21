/**
 * "Protok" — the site's signature ambient layer.
 *
 * Three ideas from the business, layered and kept almost invisible:
 *   · drifting light fields      — the ambient the hero already established
 *   · thin lines with a moving
 *     pulse travelling along them — telecom: something being carried
 *   · outlined sheets rising
 *     slowly through the frame    — print and digitisation: paper becoming data
 *
 * Everything is CSS on transform and opacity, no canvas and no JS. Opacities
 * sit between 0.03 and 0.12 and the slowest cycle runs 46 seconds, so it reads
 * as atmosphere rather than as an animated background. It is decorative and
 * carries no information, so it is hidden from assistive tech and switched off
 * entirely under prefers-reduced-motion.
 */

type Props = {
  tone?: "dark" | "light";
  /** "quiet" drops the sheets and halves the intensity, for light sections. */
  variant?: "full" | "quiet";
  className?: string;
};

const SHEETS = [
  { left: "12%", delay: "0s", duration: "46s", scale: 1, tilt: -8 },
  { left: "38%", delay: "-17s", duration: "54s", scale: 0.72, tilt: 6 },
  { left: "71%", delay: "-31s", duration: "50s", scale: 0.88, tilt: -4 },
  { left: "88%", delay: "-8s", duration: "58s", scale: 0.6, tilt: 10 },
] as const;

const LINES = [
  { top: "22%", delay: "0s", duration: "17s", width: "62%", left: "0%" },
  { top: "48%", delay: "-6s", duration: "21s", width: "48%", left: "30%" },
  { top: "74%", delay: "-12s", duration: "19s", width: "56%", left: "12%" },
] as const;

export default function AmbientFlow({
  tone = "dark",
  variant = "full",
  className = "",
}: Props) {
  const dark = tone === "dark";
  const quiet = variant === "quiet";

  const ink = dark ? "255,255,255" : "11,11,12";
  const lineAlpha = dark ? (quiet ? 0.06 : 0.1) : quiet ? 0.05 : 0.08;
  const pulse = dark ? "rgba(255,90,95,0.75)" : "rgba(227,30,36,0.5)";
  const sheetAlpha = dark ? 0.09 : 0.07;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Drifting light fields */}
      <div
        className="ambient-drift absolute -left-[15%] top-[8%] h-[60vh] w-[55vw]"
        style={{
          background: dark
            ? "radial-gradient(closest-side, rgba(227,30,36,0.34), transparent 72%)"
            : "radial-gradient(closest-side, rgba(227,30,36,0.11), transparent 72%)",
          opacity: quiet ? 0.5 : 1,
        }}
      />
      <div
        className="ambient-drift-slow absolute -right-[12%] bottom-[4%] h-[55vh] w-[48vw]"
        style={{
          background: dark
            ? "radial-gradient(closest-side, rgba(255,255,255,0.1), transparent 70%)"
            : "radial-gradient(closest-side, rgba(11,11,12,0.05), transparent 70%)",
          opacity: quiet ? 0.55 : 1,
        }}
      />

      {/* Data lines — a short pulse travels the length of each */}
      {LINES.map((line) => (
        <div
          key={line.top}
          className="absolute h-px"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            background: `rgba(${ink},${lineAlpha})`,
          }}
        >
          <span
            className="ambient-pulse absolute inset-y-0 block w-[14%]"
            style={{
              background: `linear-gradient(90deg, transparent, ${pulse}, transparent)`,
              animationDelay: line.delay,
              animationDuration: line.duration,
            }}
          />
        </div>
      ))}

      {/* Sheets rising through the frame */}
      {!quiet &&
        SHEETS.map((sheet) => (
          <svg
            key={sheet.left}
            className="ambient-rise absolute bottom-[-22%]"
            style={{
              left: sheet.left,
              animationDelay: sheet.delay,
              animationDuration: sheet.duration,
              // Each sheet keeps its own size and tilt while the shared
              // keyframes handle the travel.
              ["--sheet-scale" as string]: sheet.scale,
              ["--sheet-tilt" as string]: `${sheet.tilt}deg`,
            }}
            width="86"
            height="112"
            viewBox="0 0 86 112"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="85"
              height="111"
              rx="3"
              stroke={`rgba(${ink},${sheetAlpha * 1.6})`}
            />
            {[22, 36, 50, 64, 78].map((y, i) => (
              <line
                key={y}
                x1="14"
                y1={y}
                x2={i % 2 === 0 ? 72 : 56}
                y2={y}
                stroke={`rgba(${ink},${sheetAlpha})`}
              />
            ))}
          </svg>
        ))}
    </div>
  );
}
