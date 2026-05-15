import { useEffect, useState, useRef } from "react";

export default function App() {
  const [visible, setVisible] = useState({});
  const [loading, setLoading] = useState(true);

  const sections = {
    about: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const fade = (id) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0px)" : "translateY(40px)",
    transition: "all 0.8s ease",
  });

  const projects = [
    {
      title: "Cinematic Brand Video",
      desc: "High-energy cinematic edit for branding",
      tools: "Premiere Pro · After Effects",
      video: "https://cdn.coverr.co/videos/coverr-editing-video-on-laptop-9417/1080p.mp4",
    },
    {
      title: "Motion Graphics Poster",
      desc: "Animated promotional design",
      tools: "After Effects · Photoshop",
      video: "https://cdn.coverr.co/videos/coverr-typing-on-laptop-1556/1080p.mp4",
    },
    {
      title: "Social Media Content Pack",
      desc: "Design system for Instagram content",
      tools: "Figma · Photoshop",
      video: "https://cdn.coverr.co/videos/coverr-working-at-night-1558/1080p.mp4",
    },
  ];

  if (loading) {
    return (
      <div style={styles.loading}>
        <h1 style={styles.loadingText}>ANRA BAYU</h1>
        <p style={{ color: "#6ea8ff" }}>Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div style={styles.body}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logo}>ANRA BAYU</div>
        <div style={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <video autoPlay muted loop style={styles.video}>
          <source
            src="https://cdn.coverr.co/videos/coverr-dark-code-typing-9712/1080p.mp4"
            type="video/mp4"
          />
        </video>

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.title}>ANRA BAYU</h1>
          <p style={styles.subtitle}>Video Editor & Graphic Designer</p>
          <a href="#projects" style={styles.button}>View Projects</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={sections.about} style={{ ...styles.section, ...fade("about") }}>
        <h2 style={styles.heading}>About Me</h2>
        <p style={styles.text}>
          Creative video editor & graphic designer focused on cinematic storytelling,
          motion graphics, and modern visual identity.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={sections.projects} style={{ ...styles.section, background: "#070b18", ...fade("projects") }}>
        <h2 style={styles.heading}>Featured Projects</h2>
        <p style={styles.text}>Hover to preview video projects</p>

        <div style={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.videoBox}>
                <video className="hoverVideo" muted loop playsInline src={p.video} />
              </div>
              <h3>{p.title}</h3>
              <p style={styles.smallText}>{p.desc}</p>
              <p style={styles.smallText}>{p.tools}</p>
            </div>
          ))}
        </div>

        {/* CASE STUDY */}
        <div style={{ marginTop: "60px" }}>
          <h2 style={styles.heading}>Case Study</h2>
          <div style={styles.caseBox}>
            <h3>Cinematic Brand Identity</h3>
            <p style={styles.text}>
              Project berbasis storytelling visual untuk meningkatkan engagement
              melalui cinematic motion design.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={sections.contact} style={{ ...styles.section, ...fade("contact") }}>
        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>Instagram: @bayuanra13</p>
        <p style={styles.text}>WhatsApp: 082169792999</p>
        <p style={styles.text}>Email: m.anrabayupratama1305@gmail.com</p>
      </section>

      <footer style={styles.footer}>© 2026 ANRA BAYU — Creative Portfolio</footer>

      <style>{`
        html { scroll-behavior: smooth; }

        .hoverVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: 0.4s ease;
        }

        .hoverVideo:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: "black",
    color: "white",
  },
  loading: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
  },
  loadingText: {
    fontSize: "40px",
    letterSpacing: "8px",
  },
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    zIndex: 999,
  },
  logo: { color: "#6ea8ff", fontWeight: "bold" },
  navLinks: { display: "flex", gap: "20px" },

  hero: {
    height: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.4) contrast(1.2)",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.5), black)",
  },

  heroContent: {
    position: "relative",
    textAlign: "center",
  },

  title: {
    fontSize: "64px",
    letterSpacing: "10px",
  },

  subtitle: {
    color: "#6ea8ff",
  },

  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 24px",
    border: "1px solid #4c8dff",
    color: "white",
    textDecoration: "none",
  },

  section: {
    padding: "100px 20px",
    maxWidth: "1000px",
    margin: "auto",
  },

  heading: {
    fontSize: "28px",
    color: "#4c8dff",
    marginBottom: "20px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: 1.7,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    border: "1px solid #1f2a44",
    padding: "12px",
    background: "#0b1220",
  },

  videoBox: {
    width: "100%",
    height: "150px",
    overflow: "hidden",
    background: "#111a2e",
  },

  smallText: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  caseBox: {
    padding: "20px",
    border: "1px solid #1f2a44",
    background: "#0b1220",
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b",
  },
};
