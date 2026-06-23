"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  Terminal, 
  Network, 
  CheckCircle, 
  Server, 
  Cpu, 
  Layers, 
  Settings, 
  Brain, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight, 
  Send, 
  Github, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";

// Interactive Particle Constellation Background Component
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Dynamic particle density based on screen dimensions
      const densityMultiplier = 0.00012; // Adjusted for a dense, visually rich field
      const numberOfParticles = Math.min(
        Math.floor(canvas.width * canvas.height * densityMultiplier),
        150 // Cap to prevent performance drop on 4k displays
      );
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 0.8,
          // Assign random neon color types (purple, blue, cyan)
          colorType: Math.random(),
          alpha: Math.random() * 0.4 + 0.15
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back when hitting boundary walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Determine particle color
        let colorString = "rgba(139, 92, 246,"; // Purple (default)
        if (p.colorType < 0.33) {
          colorString = "rgba(59, 130, 246,"; // Blue
        } else if (p.colorType < 0.66) {
          colorString = "rgba(6, 182, 212,"; // Cyan
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorString + p.alpha + ")";
        ctx.fill();

        // Draw connections between neighboring particles (Constellation nodes)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineOpacity = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect particles to mouse coordinate
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineOpacity = (1 - dist / mouse.radius) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Cyan-blue laser link to cursor
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  
  // WhatsApp Chat Simulator State
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! 👋 I'm Arunbalaji. I specialize in Next.js applications and AI-integrated support. How can I help you today?", 
      sender: "arun", 
      time: "2:09 PM" 
    }
  ]);

  // Network Simulator State
  const [simStatus, setSimStatus] = useState("idle"); // idle, testing, complete
  const [nodes, setNodes] = useState([
    { name: "Auth Endpoint", latency: 34, status: "online" },
    { name: "Database Cluster", latency: 12, status: "online" },
    { name: "AI Infographic API", latency: 98, status: "online" },
    { name: "Next.js Edge CDN", latency: 8, status: "online" }
  ]);
  const [overallUptime, setOverallUptime] = useState(99.98);

  // Monitor scroll to set active nav section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Run mock network ping test
  const runPingTest = () => {
    if (simStatus === "testing") return;
    
    setSimStatus("testing");
    
    // Simulate updating latency on nodes
    let interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        latency: Math.floor(Math.random() * 40) + (node.name.includes("AI") ? 80 : 5),
        status: "testing"
      })));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setNodes([
        { name: "Auth Endpoint", latency: Math.floor(Math.random() * 15) + 20, status: "online" },
        { name: "Database Cluster", latency: Math.floor(Math.random() * 5) + 8, status: "online" },
        { name: "AI Infographic API", latency: Math.floor(Math.random() * 30) + 85, status: "online" },
        { name: "Next.js Edge CDN", latency: Math.floor(Math.random() * 4) + 6, status: "online" }
      ]);
      setOverallUptime(Number((99.95 + Math.random() * 0.04).toFixed(2)));
      setSimStatus("complete");
    }, 2000);
  };

  // Handle WhatsApp Message Send
  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!whatsappMessage.trim()) return;

    const newMsg = {
      id: chatMessages.length + 1,
      text: whatsappMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    
    // Format text for WhatsApp URL redirect
    const formattedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919043731376?text=${formattedText}`;
    
    // Clear input
    setWhatsappMessage("");

    // Simulate response delay or directly open
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  return (
    <>
      {/* Particle constellation canvas background */}
      <ParticleBackground />

      {/* Sticky Header Navigation */}
      <header className="header" id="navbar">
        <div className="container nav-container">
          <a href="#about" className="logo-text text-gradient">
            <Terminal size={22} className="text-primary" /> ARUNBALAJI
          </a>
          
          <nav>
            <ul className="nav-links">
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <button 
            className="menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`} id="mobile-nav-panel">
        <a 
          href="#about" 
          className="mobile-nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </a>
        <a 
          href="#experience" 
          className="mobile-nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Experience
        </a>
        <a 
          href="#projects" 
          className="mobile-nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Projects
        </a>
        <a 
          href="#skills" 
          className="mobile-nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Skills
        </a>
        <a 
          href="#contact" 
          className="mobile-nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero container" id="about">
        <div className="hero-grid">
          <div className="hero-content-area">
            <div className="uptime-badge" id="availability-badge">
              <span className="uptime-dot"></span> Available for Opportunities | System Status: Active
            </div>
            <h1 className="hero-title text-glowing">
              Hi, I'm <br />
              <span className="text-gradient">Arunbalaji A</span>
            </h1>
            <h2 className="hero-subtitle">
              <span>Customer Support Associate</span>
              <span className="text-muted">|</span>
              <span className="text-gradient-accent">AI Web Specialist</span>
            </h2>
            <p className="hero-desc">
              Highly motivated technical professional combining a B.E. in Computer Science with a passion for delivering exceptional customer service. Adept at breaking down complex technical issues with patience and clarity. Seeking to leverage strong problem-solving abilities and familiarity with Microsoft ecosystems to resolve user challenges efficiently in a fast-paced support environment.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary btn-glow" id="cta-contact">
                Let's Connect <ArrowRight size={18} />
              </a>
              <a href="#projects" className="btn btn-secondary" id="cta-projects">
                View My Projects
              </a>
              <a 
                href="https://wa.me/919043731376?text=Hi%20Arunbalaji%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%21" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp"
                id="cta-whatsapp"
              >
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-photo-wrapper">
            <div className="photo-glow-back"></div>
            <div className="photo-frame">
              <Image 
                src="/arun.png" 
                alt="Arunbalaji A" 
                width={320} 
                height={320}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="section-padding" id="experience">
        <div className="container">
          <h2 className="section-title text-gradient text-glowing" id="experience-title">Professional Experience</h2>
          <p className="section-subtitle">A track record of customer satisfaction, technical escalations, and performance monitoring.</p>
          
          <div className="timeline">
            {/* Timeline Node - Saku AI Tech */}
            <div className="timeline-item">
              <div className="timeline-dot" aria-hidden="true">
                <Brain size={16} />
              </div>
              <div className="timeline-content glass-panel glass-card-hover" id="experience-card-saku">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-company">Saku AI Tech</h3>
                    <div className="timeline-role">Customer Support Associate</div>
                  </div>
                  <span className="timeline-date">Jan 2026 – June 2026</span>
                </div>
                <ul className="timeline-list">
                  <li>
                    Served as the primary technical escalation point for modern Next.js web applications, guiding users through critical technical roadblocks and feature utilization.
                  </li>
                  <li>
                    Enhanced end-user experiences by actively troubleshooting and resolving performance issues within AI-integrated application environments.
                  </li>
                  <li>
                    Analyzed customer interaction data and support tickets to identify recurring technical issues, providing actionable insights to the development team to reduce future ticket volumes.
                  </li>
                  <li>
                    Navigated international voice processes to provide real-time technical assistance, bridging the gap between complex software requirements and global user needs.
                  </li>
                </ul>

                {/* Company Context Metrics */}
                <div className="saku-meta-grid" id="company-metrics">
                  <div className="saku-meta-card">
                    <div className="saku-meta-val text-gradient">1,000+</div>
                    <div className="saku-meta-lbl">Clients Served</div>
                  </div>
                  <div className="saku-meta-card">
                    <div className="saku-meta-val text-gradient">1.5M+</div>
                    <div className="saku-meta-lbl">Infographics</div>
                  </div>
                  <div className="saku-meta-card">
                    <div className="saku-meta-val text-gradient">300K+</div>
                    <div className="saku-meta-lbl">Active Users</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Node - Sit */}
            <div className="timeline-item">
              <div className="timeline-dot" aria-hidden="true">
                <Award size={16} />
              </div>
              <div className="timeline-content glass-panel glass-card-hover" id="experience-card-sit">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-company">Sethu Institute of Technology</h3>
                    <div className="timeline-role">B.E in Computer Science & Engineering</div>
                  </div>
                  <span className="timeline-date">2021 – 2025</span>
                </div>
                <ul className="timeline-list">
                  <li>
                    Graduated with an outstanding academic record of <strong>81%</strong>.
                  </li>
                  <li>
                    Built strong foundations in data structures, computer networks, database systems, and object-oriented programming.
                  </li>
                  <li>
                    Developed core engineering capabilities and applied computational theory to automate network monitoring and diagnostics.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="section-padding bg-secondary" id="projects">
        <div className="container">
          <h2 className="section-title text-gradient text-glowing" id="projects-title">Featured Projects</h2>
          <p className="section-subtitle">Real-world applications focusing on network telemetry, deep learning, and user utility.</p>
          
          <div className="projects-grid">
            {/* Project 1: Network Uptime Dashboard (Interactive!) */}
            <div className="project-card glass-panel glass-card-hover" id="project-card-telemetry">
              <div className="project-card-header">
                <div className="project-icon-wrapper" aria-hidden="true">
                  <Activity size={22} />
                </div>
                <div className="uptime-percentage" id="live-uptime-metric">
                  {overallUptime}% Uptime
                </div>
              </div>
              <h3 className="project-title">Network Uptime & API Tracker</h3>
              <p className="project-desc">
                An automated health dashboard tracking latency spikes, REST API availability, and error rates across microservices. Built with JavaScript, chart representations, and server monitoring integration to assure continuous operational uptime.
              </p>
              
              {/* INTERACTIVE COMPONENT: Live Telemetry Simulation Playground */}
              <div className="uptime-sim-container" id="telemetry-playground">
                <div className="uptime-sim-header">
                  <div className="uptime-sim-title">
                    <Terminal size={14} className="text-gradient" /> Telemetry Simulator
                  </div>
                  <button 
                    className="uptime-sim-btn" 
                    onClick={runPingTest}
                    disabled={simStatus === "testing"}
                  >
                    {simStatus === "testing" ? "Pinging..." : "Run Ping Test"}
                  </button>
                </div>
                
                <div className="uptime-node-list">
                  {nodes.map((node, i) => (
                    <div key={i} className="uptime-node-row">
                      <div className="node-meta">
                        <span className={`node-dot ${node.status === "testing" ? "testing" : "online"}`}></span>
                        <span className="node-name">{node.name}</span>
                      </div>
                      <span className="node-ping">{node.latency} ms</span>
                    </div>
                  ))}
                </div>

                <div className="uptime-bar" aria-label="Mock uptime history bar chart">
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                  <div className="uptime-bar-tick"></div>
                </div>
              </div>

              <div className="project-tags" style={{ marginTop: "24px" }}>
                <span className="project-tag">JavaScript</span>
                <span className="project-tag">REST APIs</span>
                <span className="project-tag">Telemetry</span>
                <span className="project-tag">Uptime Monitoring</span>
              </div>
            </div>

            {/* Project 2: Leukemia Cancer Prediction */}
            <div className="project-card glass-panel glass-card-hover" id="project-card-leukemia">
              <div className="project-card-header">
                <div className="project-icon-wrapper" aria-hidden="true">
                  <Cpu size={22} />
                </div>
                <span className="text-muted" style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>ML MODEL</span>
              </div>
              <h3 className="project-title">Leukemia Prediction Model</h3>
              <p className="project-desc">
                An advanced image recognition model leveraging deep learning and Convolutional Neural Networks (CNNs) to analyze blood smear microscopic images for early-stage Leukemia identification, assisting healthcare processes.
              </p>
              <div className="project-tags">
                <span className="project-tag">Python</span>
                <span className="project-tag">Deep Learning</span>
                <span className="project-tag">CNNs</span>
                <span className="project-tag">Medical AI</span>
              </div>
            </div>

            {/* Project 3: E-commerce Platform */}
            <div className="project-card glass-panel glass-card-hover" id="project-card-ecommerce">
              <div className="project-card-header">
                <div className="project-icon-wrapper" aria-hidden="true">
                  <Layers size={22} />
                </div>
                <span className="text-muted" style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>FULL-STACK</span>
              </div>
              <h3 className="project-title">Full-Stack E-commerce System</h3>
              <p className="project-desc">
                A secure web application supporting interactive shopping carts, user authentication, and order workflows. Structured on React.js and SQL backend databases for efficient inventory tracking and transaction management.
              </p>
              <div className="project-tags">
                <span className="project-tag">React.js</span>
                <span className="project-tag">Java</span>
                <span className="project-tag">SQL</span>
                <span className="project-tag">REST APIs</span>
              </div>
            </div>

            {/* Project 4: Smart Blind Stick */}
            <div className="project-card glass-panel glass-card-hover" id="project-card-blindstick">
              <div className="project-card-header">
                <div className="project-icon-wrapper" aria-hidden="true">
                  <Network size={22} />
                </div>
                <span className="text-muted" style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>IOT & AUTOMATION</span>
              </div>
              <h3 className="project-title">IoT Smart Blind Stick</h3>
              <p className="project-desc">
                A hardware-software collaborative assistive device designed for the visually impaired. Integrates ultrasonic sensors, obstacle recognition logic, and buzzers to provide haptic feedback and safe navigational routing.
              </p>
              <div className="project-tags">
                <span className="project-tag">Hardware Automation</span>
                <span className="project-tag">Sensors</span>
                <span className="project-tag">C++</span>
                <span className="project-tag">Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Category Grid */}
      <section className="section-padding" id="skills">
        <div className="container">
          <h2 className="section-title text-gradient text-glowing" id="skills-title">Technical Expertise</h2>
          <p className="section-subtitle">Structured systems, analytical tooling, and customer escalation management workflows.</p>

          <div className="skills-container">
            {/* Category 1: Support & Troubleshooting */}
            <div className="skill-category-card glass-panel" id="skills-category-support">
              <div className="skill-category-header">
                <Settings className="text-gradient" size={24} aria-hidden="true" />
                <h3 className="skill-category-title">Support & Troubleshooting</h3>
              </div>
              <div className="skills-tags-wrapper">
                <span className="skill-pill">Root Cause Analysis</span>
                <span className="skill-pill">Bug Replication</span>
                <span className="skill-pill">Incident Management</span>
                <span className="skill-pill">Customer Feedback Loop</span>
                <span className="skill-pill">Technical Documentation</span>
                <span className="skill-pill">SLA Compliance</span>
              </div>
            </div>

            {/* Category 2: Networking & Protocols */}
            <div className="skill-category-card glass-panel" id="skills-category-networking">
              <div className="skill-category-header">
                <Network className="text-gradient-accent" size={24} aria-hidden="true" />
                <h3 className="skill-category-title">Networking Fundamentals</h3>
              </div>
              <div className="skills-tags-wrapper">
                <span className="skill-pill">OSI Model</span>
                <span className="skill-pill">TCP/IP</span>
                <span className="skill-pill">DNS Resolution</span>
                <span className="skill-pill">DHCP</span>
                <span className="skill-pill">IP Addressing & Subnetting</span>
              </div>
            </div>

            {/* Category 3: Tools & Platforms */}
            <div className="skill-category-card glass-panel" id="skills-category-tools">
              <div className="skill-category-header">
                <Terminal className="text-gradient" size={24} aria-hidden="true" />
                <h3 className="skill-category-title">Tools & Platforms</h3>
              </div>
              <div className="skills-tags-wrapper">
                <span className="skill-pill">Next.js Framework</span>
                <span className="skill-pill">REST APIs</span>
                <span className="skill-pill">Command Line (CLI)</span>
                <span className="skill-pill">Git / GitHub</span>
                <span className="skill-pill">CRM & Ticketing Platforms</span>
                <span className="skill-pill">JavaScript</span>
              </div>
            </div>

            {/* Category 4: Soft Skills */}
            <div className="skill-category-card glass-panel" id="skills-category-soft">
              <div className="skill-category-header">
                <Brain className="text-gradient-accent" size={24} aria-hidden="true" />
                <h3 className="skill-category-title">Professional Mindset</h3>
              </div>
              <div className="skills-tags-wrapper">
                <span className="skill-pill">Analytical Problem Solving</span>
                <span className="skill-pill">Quick Adaptability</span>
                <span className="skill-pill">Lateral Thinking</span>
                <span className="skill-pill">Technical Communication</span>
                <span className="skill-pill">Cross-Functional Liaison</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section & Interactive WhatsApp Chat */}
      <section className="section-padding bg-secondary" id="contact">
        <div className="container">
          <h2 className="section-title text-gradient text-glowing" id="contact-title">Let's Connect</h2>
          <p className="section-subtitle">Get in touch via standard channels, or start an instant chat using the WhatsApp simulator.</p>
          
          <div className="contact-grid">
            {/* Left Column: Traditional Contact Details */}
            <div className="contact-info-list" id="contact-details">
              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-info-title">Email</div>
                  <a href="mailto:arunbalaji200300u@gmail.com" className="contact-info-value hover:underline">
                    arunbalaji200300u@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-info-title">Phone</div>
                  <a href="tel:9043731376" className="contact-info-value hover:underline">
                    +91 90437 31376
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="contact-info-title">Location</div>
                  <div className="contact-info-value">Tamil Nadu, India</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="contact-info-title">Support Availability</div>
                  <div className="contact-info-value">24/7 Escalation Readiness</div>
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp Interactive Panel */}
            <div className="whatsapp-chat-panel" id="whatsapp-simulator">
              <div className="whatsapp-chat-header">
                <div className="whatsapp-avatar-wrapper">
                  <Image 
                    src="/arun.png" 
                    alt="Arunbalaji A" 
                    width={40} 
                    height={40} 
                    className="whatsapp-avatar"
                  />
                  <span className="whatsapp-online-dot" aria-hidden="true"></span>
                </div>
                <div className="whatsapp-header-info">
                  <div className="whatsapp-header-name">Arunbalaji A</div>
                  <div className="whatsapp-header-status">Online & Ready to Chat</div>
                </div>
              </div>
              
              <div className="whatsapp-chat-body">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`whatsapp-bubble ${msg.sender === "arun" ? "received" : "sent"}`}
                  >
                    {msg.text}
                    <span className="whatsapp-bubble-time">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form className="whatsapp-chat-footer" onSubmit={handleSendWhatsApp}>
                <input 
                  type="text" 
                  className="whatsapp-chat-input"
                  placeholder="Type a message to send to WhatsApp..."
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  id="whatsapp-chat-input-field"
                />
                <button 
                  type="submit" 
                  className="whatsapp-send-btn" 
                  aria-label="Send WhatsApp message"
                  id="whatsapp-send-btn-submit"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <ul className="footer-nav">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="footer-socials">
            <a 
              href="https://wa.me/919043731376" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="WhatsApp Profile Link"
            >
              <MessageSquare size={18} />
            </a>
            <a 
              href="mailto:arunbalaji200300u@gmail.com" 
              className="footer-social-icon"
              aria-label="Email Address"
            >
              <Mail size={18} />
            </a>
            <a 
              href="tel:9043731376" 
              className="footer-social-icon"
              aria-label="Phone Number"
            >
              <Phone size={18} />
            </a>
          </div>

          <p className="footer-copyright">
            © 2026 Arunbalaji A | Built with Next.js, Vanilla CSS & Passion
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/919043731376?text=Hi%20Arunbalaji%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%21" 
        className="floating-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Direct chat on WhatsApp"
        id="whatsapp-fab"
      >
        <MessageSquare size={26} />
        <span className="floating-whatsapp-tooltip">Chat with me on WhatsApp!</span>
      </a>
    </>
  );
}
