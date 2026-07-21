import "./AuroraHero.css";

export default function AuroraHero() {
  return (
    <section className="aurora-hero">

      {/* Aurora Background */}
      <div className="aurora-bg">
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
        <span className="grid-overlay"></span>
      </div>

      {/* Glass Card */}
      <div className="hero-card">

        <div className="hero-badge">
           DEVFLOW
        </div>

        <h1>
          Welcome Back.
        </h1>

        <p>
          Organize your projects, manage tasks,
          track productivity and keep your entire
          development workflow in one beautiful place.
        </p>

        <div className="hero-buttons">

          <button className="hero-btn primary">
            New Project
          </button>

          <button className="hero-btn secondary">
            Continue →
          </button>

        </div>

      </div>

    </section>
  );
}