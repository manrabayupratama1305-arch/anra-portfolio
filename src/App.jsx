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
    const timer = setTimeout(() => setLoading(false), 1200);

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
    transform: visible[id] ? "translateY(0px)" : "translateY(30px)",
    transition: "all 0.6s ease",
  });

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
        <div style={styles.logo}>ANRA BAYU</div>
        <div style={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
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
          motion graphics, and clean modern design.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={sections.projects} style={{ ...styles.section, ...fade("projects") }}>
        <h2 style={styles.heading}>Projects</h2>

        <div style={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} style={styles.card}>
              <h3 style={styles.cardTitle}>{p.title}</h3>
              <p style={styles.text}>{p.desc}</p>
              <p style={styles.small}>{p.tools}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={sections.contact} style={{ ...styles.section, ...fade("contact") }}>
        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>Instagram: @bayuanra13</p>
        <p style={styles.text}>WhatsApp: 082169792999</p>
        <p style={styles.text}>Email: m.anrabayupratama1305@gmail.com</p>
      </section>

      <footer style={styles.footer}>© 2026 ANRA BAYU</footer>
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
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #e5e7eb",
  },

  logo: {
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  navLinks: {
    display: "flex",
    gap: "20px",
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
    fontSize: "60px",
    letterSpacing: "6px",
    color: "#0f172a",
  },

  subtitle: {
    color: "#1e3a8a",
  },

  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 24px",
    border: "1px solid #1e3a8a",
    color: "#1e3a8a",
    textDecoration: "none",
  },

  section: {
    padding: "100px 20px",
    maxWidth: "900px",
    margin: "auto",
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

  cardTitle: {
    color: "#0f172a",
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
