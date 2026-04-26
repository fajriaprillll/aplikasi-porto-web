import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft, ExternalLink, Code, CheckCircle2 } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black">
        <h1 className="text-4xl font-bold mb-4 tracking-tighter">Project Not Found</h1>
        <Link to="/" className="btn-elegant">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 pt-40"
    >
      <div className="section-container">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-20 text-xs font-black uppercase tracking-[0.3em]"
        >
          <ArrowLeft size={16} /> Back to Work
        </button>

        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <div className="flex gap-3 mb-8 flex-wrap">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] font-black tracking-widest uppercase text-zinc-500 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-gradient">{project.title.toUpperCase()}</h1>
              <p className="text-xl text-zinc-400 leading-relaxed font-medium whitespace-pre-line">
                {project.fullDescription}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-10">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-elegant flex items-center gap-3">
                    Live Demo <ExternalLink size={20} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-elegant-outline flex items-center gap-3">
                    Source Code <Code size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-8 pt-12 border-t border-white/5">
              <h3 className="text-3xl font-bold tracking-tighter">KEY FEATURES</h3>
              <ul className="grid gap-6">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-zinc-400 group">
                    <CheckCircle2 className="text-white mt-1 shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" size={20} />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-40 h-fit">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="elegant-card overflow-hidden"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover opacity-80"
              />
              <div className="p-12 bg-zinc-950/50">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                  <span>Project Archetype</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
