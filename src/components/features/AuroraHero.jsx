import "./AuroraHero.css";
import ReactBitsAurora from "./ReactBitsAurora";

export default function AuroraHero({
  badge = "DEVFLOW",
  title = "Welcome Back.",
  description = "Organize your projects, manage tasks, track productivity and keep your entire development workflow in one beautiful place.",
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section className="aurora-hero">
      <ReactBitsAurora />

      <div className="hero-card">
        <div className="hero-badge">
          {badge}
        </div>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

        {(primaryLabel || secondaryLabel) && (
          <div className="hero-buttons">
            {primaryLabel && (
              <button className="hero-btn primary" onClick={onPrimaryClick}>
                {primaryLabel}
              </button>
            )}
            {secondaryLabel && (
              <button className="hero-btn secondary" onClick={onSecondaryClick}>
                {secondaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
