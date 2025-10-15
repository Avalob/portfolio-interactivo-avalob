import React from 'react';
import BuildingModal from './BuildingModal';
import './BuildingModal.css';
import { FaPython, FaWordpress, FaCubes, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJava, FaGitAlt, FaGithub, FaAndroid, FaCloud } from 'react-icons/fa';
import { SiSketchup, SiAdobepremierepro, SiCanva, SiCoreldraw, SiAdobeindesign, SiGnubash, SiSqlite, SiMongodb, SiSpringboot, SiEclipseide, SiFigma, SiAdobephotoshop, SiTailwindcss, SiJson, SiMarkdown, SiAdobeillustrator } from 'react-icons/si';
import { IoLogoJavascript } from "react-icons/io";
import { GrMysql } from "react-icons/gr";
import { VscVscode } from "react-icons/vsc";
function SkillsModal({ isOpen, onClose, showBackButton = false }) {
  const skillsByCategory = {
    'Frontend': [
      { name: 'JavaScript', icon: <IoLogoJavascript />, color: '#f7df1e' },
      { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
      { name: 'React', icon: <FaReact />, color: '#61dafb' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4' },
    ],
    'Backend': [
      { name: 'Java', icon: <FaJava />, color: '#f89820' },
      { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
      { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
      { name: 'MySQL', icon: <GrMysql />, color: '#4479a1' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
      { name: 'SQLite', icon: <SiSqlite />, color: '#003b57' },
      { name: 'Python', icon: <FaPython />, color: '#3776ab' },
    ],
    'DevOps': [
      { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
      { name: 'GitHub', icon: <FaGithub />, color: '#181717' },
      { name: 'Bash', icon: <SiGnubash />, color: '#4eaa25' },
      { name: 'VS Code', icon: <VscVscode />, color: '#007acc' },
      { name: 'Android Studio', icon: <FaAndroid />, color: '#3ddc84' },
      { name: 'Eclipse', icon: <SiEclipseide />, color: '#2c2255' },
      { name: 'Google Cloud', icon: <FaCloud />, color: '#4285f4' },
      { name: 'WordPress', icon: <FaWordpress />, color: '#21759b' },
    ],
    'Design': [
      { name: 'Figma', icon: <SiFigma />, color: '#f24e1e' },
      { name: 'Adobe Photoshop', icon: <SiAdobephotoshop />, color: '#31a8ff' },
      { name: 'Illustrator', icon: <SiAdobeillustrator />, color: '#ff9a00' },
      { name: 'InDesign', icon: <SiAdobeindesign />, color: '#ff3366' },
      { name: 'CorelDRAW', icon: <SiCoreldraw />, color: '#00a32a' },
      { name: 'Canva', icon: <SiCanva />, color: '#00c4cc' },
      { name: 'Adobe Premiere Pro', icon: <SiAdobepremierepro />, color: '#9999ff' },
      { name: 'SketchUp', icon: <SiSketchup />, color: '#005f9e' },
      { name: 'Clo3D', icon: <FaCubes />, color: '#e4002b' },
    ],
    'Markup': [
      { name: 'Markdown', icon: <SiMarkdown />, color: '#000000' },
      { name: 'JSON', icon: <SiJson />, color: '#292929' },
    ]
  };

  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Habilidades Técnicas"
      icon="⚡"
      showBackButton={showBackButton}
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="building-section">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid var(--color-border)'
            }}>
              {category}
            </h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="rrss-card skill-card"
                  style={{ 
                    cursor: 'default',
                    pointerEvents: 'none',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '16px 12px',
                    background: `linear-gradient(135deg, ${skill.color}15 0%, ${skill.color}25 100%)`,
                    border: `2px solid ${skill.color}80`,
                    boxShadow: `0 0 12px ${skill.color}40`,
                    transition: 'none'
                  }}
                >
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '8px',
                    color: skill.color,
                    filter: 'brightness(1.2) saturate(1.3)',
                    textShadow: `0 0 8px ${skill.color}80`
                  }}>
                    {skill.icon}
                  </div>
                  <div className="rrss-card-name" style={{ 
                    marginBottom: 0, 
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)'
                  }}>
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BuildingModal>
  );
}

export default SkillsModal;
