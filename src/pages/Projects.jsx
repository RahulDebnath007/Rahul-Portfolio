import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const PROJECTS = [

  {
    title: 'Thumblify AI 🎨🤖',
    desc: 'An AI-powered thumbnail generator that creates professional, click-worthy thumbnails in seconds.',
    ss: '/Thumblify.png',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'Google Gemini Image API', 'Vercel'],
    live: 'https://thumblify-red-ten.vercel.app/',
    code: 'https://github.com/RahulDebnath007/Thumblify'
  },
  {
  title: 'Movie Ticket Booking Application',
  desc: 'A dynamic movie booking app with real time details, responsive UI , seemless ticketing and robust error handling.',
  ss: '/movie.png',
  tech: ['React', 'Node.js', 'MongoDB', 'Clerk','OMDB API'],
  live: 'https://quickshow-eosin.vercel.app/',
  code: 'https://github.com/RahulDebnath007/Zenex.git'
  },
  {
    title: ' AI Resume Analyser',
    desc: 'An intelligent document interaction app powered by Gemini API that understands and answers queries from uploaded PDFs.',
    ss: '/analyser.png',
    tech: ['SDK development', 'Puter', 'Tailwind Css', 'Zustand', 'Docker', 'TypeScript'],
    live: 'https://ai-resume-analyzer-main-pearl.vercel.app/',
    code: 'https://github.com/RahulDebnath007/ai-resume-analyzer-main.git'
  },
  {
  title: 'Skew News — AI News Analysis Platform',

  desc: 'An AI-powered news analysis platform that collects articles from multiple sources, analyzes them with Google Gemini, and provides AI-generated summaries, sentiment analysis, political framing estimates, confidence scores, framing notes, and loaded-term detection. Built with an automated news ingestion pipeline using Oxylabs, Supabase, and Next.js.',

  ss: '/skew.png',

  tech: ['Next.js', 'TypeScript', 'Gemini', 'Supabase', 'Oxylabs', 'Tailwind CSS', 'PostgreSQL', 'Posthog'],

  live: 'https://skew-news-rahul.vercel.app/',

  code: 'https://github.com/RahulDebnath007/skew_news'
},
  {
    title: ' AI Chat Application',
    desc: 'a simple yet powerful chat application using React & Node.js, with a key focus on AI integration! 💡 This project was a great learning experience, blending frontend interactivity with backend intelligence.',
    ss: '/devin.png',
    tech: ['Node.js', 'MongoDB', 'React', 'Express'],
    live: 'https://drive.google.com/file/d/1cDmnCid-cLyzHggexyfCdWCqgQ0F44b4/view',
    code: 'https://github.com/RahulDebnath007/AI-DEVIN.git'
  },
 
  
  
  {
  title: 'Personal-Ai-Assistent',
  desc: 'Veda is a personal ai assistent...who perform “Weather in (City name)” (it gives response World wide) “Tell me joke" Or Tell Any ask ( Which gives response by AI) “Open youtube"(And many More opening command [ Facebook, Google, WhatsApp, Gmail, Instagram, News, Music ,Games].',
  ss: '/Veda.png',
  tech: ['React', 'Gemini API', 'Tailwind CSS'],
  live: 'https://personal-ai-assistent.vercel.app/',
  code: 'https://github.com/RahulDebnath007/Personal-Ai-Assistent.git'
  },
  
  {
    title: 'Zentry -  Smooth-Scroll animation project',
    desc: 'It is a smooth-scroll animation project inspired by Zentry. Here we experience seemless smooth animation effect ',
    ss: '/zentry.png',
    tech: ['GSAP', 'React.js', 'Tailwind CSS'],
    live: 'https://award-winning-website-main-iota.vercel.app/',
    code: 'https://github.com/RahulDebnath007/award-winning-website-main.git'
  },
   {
    title: 'Bookshop Automation Software',
    desc: 'This project uses a combination of front-end technologies like HTML, CSS, and JavaScript for building the user interface, along with features like a login page, shopkeeper dashboard, and order management.',
    ss: '/bookwala.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    live: 'https://rahuldebnath007.github.io/Online-bookshop/scv.html',
    code: 'https://github.com/RahulDebnath007/Online-bookshop.git'
  },
  {
    title: 'Online footwear website',
    desc: 'Footcap is a stylish and responsive online footwear store developed using HTML, CSS, and JavaScript. The platform showcases a wide range of footwear products with smooth navigation, interactive UI, and a modern layout.Users can explore collections, view product details.',
    ss: '/footware.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    live: 'https://footware-website-rahul-debnaths-projects.vercel.app/',
    code: 'https://github.com/RahulDebnath007/Online-Footware-website.git'
  },
  {
    title: 'Car Repair Service website',
    desc: 'AutoFix is a modern and responsive car repair service website developed using HTML, CSS, and JavaScript. It showcases essential services like maintenance, diagnostics, and bookings through a clean user interface, helping customers schedule appointments, explore services.',
    ss: '/autofix.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    live: 'https://rahuldebnath007.github.io/car-workshop-project/',
    code: 'https://github.com/RahulDebnath007/car-workshop-project.git'
  },
  {
    title: 'Online Job search Platform',
    desc: 'Startup is a sleek and responsive online job search platform developed using core front-end technologies — HTML, CSS, and JavaScript. It allows users to explore job opportunities, connect with employers, and navigate their career journey through an intuitive and user-friendly interface.',
    ss: '/Startup.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    live: 'https://rahuldebnath007.github.io/job-finding-related-project/',
    code: 'https://github.com/RahulDebnath007/job-finding-related-project.git'
  }
]

export default function Projects() {
  return (
    <motion.section
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="projects"
    >
      <div className="card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 30 }}>
        <motion.h2
          className="text-4xl font-semibold text-cyan-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          🚀 Projects
        </motion.h2>
        <p className="text-gray-400 mb-10">
          A collection of my major works — blending research, AI innovation.
        </p>

        <div className="projects-grid" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.9), rgba(10,10,10,0.9))',
                border: '1px solid rgba(0,255,255,0.1)',
                borderRadius: 16,
                padding: 16,
                overflow: 'hidden',
                boxShadow: '0 0 20px rgba(0,255,255,0.08)'
              }}
            >
              <motion.div className="ss" whileHover={{ scale: 1.05 }} style={{ borderRadius: 12, overflow: 'hidden' }}>
                <img
                  src={p.ss}
                  alt={p.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 12
                  }}
                />
              </motion.div>

              <div style={{ marginTop: 12 }}>
                <h3 style={{ fontSize: 18, color: '#0ea5e9', marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#bbb', marginBottom: 8, lineHeight: 1.6 }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(0,255,255,0.05)',
                        border: '1px solid rgba(0,255,255,0.1)',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#aaf'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <motion.a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    whileHover={{ scale: 1.08 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'rgba(255,255,255,0.05)',
                      color: '#0ea5e9',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 13,
                      border: '1px solid rgba(0,255,255,0.1)',
                      textDecoration: 'none'
                    }}
                  >
                    <Github size={14} /> Code
                  </motion.a>
                  <motion.a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    whileHover={{ scale: 1.08 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 13,
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
