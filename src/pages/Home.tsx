import { GitHubIcon, LinkedInIcon, EmailIcon, SparklesIcon, CodeIcon } from '../components/Icons'
import './Home.css'

export default function Home() {
  const skills = [
    { category: 'Languages', items: ['Java', 'Python', 'C', 'C#', 'SQL', 'JavaScript', 'TypeScript', 'HTML/CSS'], color: 'blue' },
    { category: 'Frameworks', items: ['React', 'Next.js', 'Flask', 'Scrum'], color: 'purple' },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">Welcome</div>
        <h1 className="name">
          Hi, I'm <span className="name-highlight">Julian Kim</span>
        </h1>
        <p className="tagline">
          First-year <strong className="highlight-blue">Software Engineering</strong> student at the{' '}
          <strong className="highlight-purple">University of Waterloo</strong> passionate about 
          building <strong>reliable full-stack software</strong> and solving real problems.
        </p>
        <div className="links">
          <a 
            href="https://github.com/juliank1m" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button link-github"
          >
            <span className="link-label">
              <GitHubIcon /> GitHub
            </span>
            <span className="link-username">juliank1m</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/juliank1m/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button link-linkedin"
          >
            <span className="link-label">
              <LinkedInIcon /> LinkedIn
            </span>
            <span className="link-username">juliank1m</span>
          </a>
          <a 
            href="mailto:juliankim4321@gmail.com"
            className="link-button link-email"
          >
            <span className="link-label">
              <EmailIcon /> Email
            </span>
            <span className="link-username">juliankim4321@gmail.com</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon"><SparklesIcon /></span> About Me
        </h2>
        <div className="about-card">
          <p>
            I'm Julian, a first-year <strong>Software Engineering</strong> student at the <strong>University of 
            Waterloo</strong> with a strong interest in building <strong>full-stack web applications</strong> and 
            reliable software systems. I enjoy working across the full stack, from designing 
            user interfaces to implementing <strong>backend logic</strong> and <strong>databases</strong>.
          </p>
          <p>
            I've worked with technologies such as <strong>Python</strong>, <strong>C</strong>, <strong>Java</strong>, <strong>C#</strong>, <strong>React</strong>, <strong>Flask</strong>, <strong>Next.js</strong>, and 
            <strong> SQL databases</strong>. I'm particularly interested in writing <strong>clean, maintainable code</strong> and 
            understanding how systems work under the hood. Through both academic and personal 
            projects, I've gained experience <strong>breaking down problems</strong>, <strong>designing structured 
            solutions</strong>, and iterating based on feedback.
          </p>
          <p>
            Beyond coursework, I enjoy working on projects that have <strong>real-world impact</strong> and 
            collaborating in <strong>team environments</strong>. I'm continuously learning new tools and 
            technologies, and I'm currently exploring <strong>cloud computing</strong> and <strong>AWS</strong>. I'm motivated 
            to grow as an engineer by building practical and well-designed projects.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon"><CodeIcon /></span> Skills
        </h2>
        <div className="skills-grid">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className={`skill-card skill-card-${skillGroup.color}`}>
              <h3 className="skill-category">{skillGroup.category}</h3>
              <div className="skill-items">
                {skillGroup.items.map((skill) => (
                  <span key={skill} className={`skill-tag skill-tag-${skillGroup.color}`}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
