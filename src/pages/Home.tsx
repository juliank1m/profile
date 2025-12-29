import { GitHubIcon, LinkedInIcon, EmailIcon, SparklesIcon, CodeIcon } from '../components/Icons'
import './Home.css'

export default function Home() {
  const skills = [
    { category: 'Languages', items: ['Python', 'C', 'Java', 'C#'], color: 'blue' },
    { category: 'Frontend', items: ['React', 'HTML', 'CSS'], color: 'purple' },
    { category: 'Backend', items: ['Flask', 'MySQL'], color: 'lavender' },
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
          First-year <span className="highlight-blue">Software Engineering</span> student at the{' '}
          <span className="highlight-purple">University of Waterloo</span> interested in 
          building reliable full-stack software.
        </p>
        <div className="links">
          <a 
            href="https://github.com/juliank1m" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button link-github"
          >
            <GitHubIcon /> GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/juliank1m/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button link-linkedin"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a 
            href="mailto:juliankim4321@gmail.com"
            className="link-button link-email"
          >
            <EmailIcon /> Email
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
            I'm Julian, a first-year Software Engineering student at the University of 
            Waterloo with a strong interest in building full-stack web applications and 
            reliable software systems. I enjoy working across the full stack, from designing 
            user interfaces to implementing backend logic and databases.
          </p>
          <p>
            I've worked with technologies such as Python, C, Java, C#, React, Flask, and 
            MySQL, and I'm particularly interested in writing clean, maintainable code and 
            understanding how systems work under the hood. Through both academic and personal 
            projects, I've gained experience breaking down problems, designing structured 
            solutions, and iterating based on feedback.
          </p>
          <p>
            Beyond coursework, I enjoy working on projects that have real-world impact and 
            collaborating in team environments. I'm continuously learning new tools and 
            technologies, and I'm currently exploring cloud computing and AWS. I'm motivated 
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
