import { useEffect, useState, useRef } from "react";

export default function App() {
  const [visible, setVisible] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const sections = {
    about: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

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

  const projects = [
    {
      title: "Cinematic Brand Video",
      desc: "Video editing & storytelling",
      tools: "Premiere Pro · After Effects",
    },
    {
      title: "Motion Design",
      desc: "Animated graphic content",
      tools: "After Effects · Photoshop",
    },
    {
      title: "Social Media Design",
      desc: "Content & branding visuals",
      tools: "Figma · Photoshop",
    },
  ];

  return (
    <div style={styles.body}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logo}>MUHAMMAD ANRA BAYU PRATAMA</div>

        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={styles.line}></span>
          <span style={styles.line}></span>
          <span style={styles.line}></span>
        </div>

        {menuOpen && (
          <div style={styles.mobileMenu}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Hello! I'm Anra</h1>
          <p style={styles.subtitle}>Video Editor & Graphic Designer</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={sections.about} style={styles.section}>
        <h2 style={styles.heading}>About Me</h2>
        <p style={styles.text}>
          Creative video editor & graphic designer focused on cinematic storytelling and modern design.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={sections.projects} style={styles.sectionAlt}>
        <h2 style={styles.heading}>Projects</h2>

        <div style={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} style={styles.card}>
              <h3>{p.title}</h3>
              <p style={styles.text}>{p.desc}</p>
              <p style={styles.small}>{p.tools}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={sections.contact} style={styles.section}>
        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>Instagram: @bayuanra13</p>
        <p style={styles.text}>WhatsApp: 082169792999</p>
        <p style={styles.text}>Email: m.anrabayupratama1305@gmail.com</p>
      </section>

      <footer style={styles.footer}>© 2026 MUHAMMAD ANRA BAYU PRATAMA</footer>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: "#ffffff",
    color: "#0f172a",
  },

  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px", // DIGESER LEBIH KE DALAM
    background: "rgba(255,255,255,0.95)",
    borderBottom: "1px solid #e5e7eb",
  },

  logo: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#1e3a8a",
    letterSpacing: "1px",
  },

  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
  },

  line: {
    width: "22px",
    height: "2px",
    background: "#0f172a",
  },

  mobileMenu: {
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "white",
    border: "1px solid #e5e7eb",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  hero: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg,#ffffff,#f1f5f9)",
  },

  heroContent: {
    textAlign: "center",
  },

  title: {
    fontSize: "52px",
    color: "#0f172a",
  },

  subtitle: {
    color: "#1e3a8a",
  },

  section: {
    padding: "100px 20px",
    maxWidth: "900px",
    margin: "auto",
  },

  sectionAlt: {
    padding: "100px 20px",
    maxWidth: "900px",
    margin: "auto",
    background: "#f8fafc",
  },

  heading: {
    fontSize: "26px",
    color: "#1e3a8a",
    marginBottom: "20px",
  },

  text: {
    color: "#334155",
    lineHeight: 1.7,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#ffffff",
  },

  small: {
    fontSize: "12px",
    color: "#64748b",
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b",
  },
};