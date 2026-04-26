import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ExternalLink, Code } from 'lucide-react';
import { SpotlightCard, ShimmerButton } from './PremiumEffects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(129,140,248,0.15)] hover:border-indigo-500/20 transition-all duration-500"
    >
      <SpotlightCard className="w-full h-full">
      {/* Project Image */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.05]">
        <img 
          src={project.image} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Project</span>
          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} className="p-4 bg-white text-black rounded-full transition-transform hover:scale-110 active:scale-95">
                <Code size={20} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className="p-4 bg-white text-black rounded-full transition-transform hover:scale-110 active:scale-95">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-10">
        <div className="flex gap-2 mb-6 flex-wrap">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] font-black tracking-widest uppercase text-zinc-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold mb-4 tracking-tighter text-white group-hover:text-zinc-300 transition-colors">{project.title}</h3>
        <p className="text-zinc-500 text-lg leading-relaxed mb-8 line-clamp-2">{project.shortDescription}</p>
        
        <Link to={`/project/${project.id}`} className="block w-fit mt-4">
          <ShimmerButton className="px-8 py-4 font-bold tracking-widest text-xs uppercase text-white inline-flex items-center gap-3">
            View Details <ArrowRight size={16} />
          </ShimmerButton>
        </Link>
      </div>
      </SpotlightCard>
    </motion.div>
  );
};

// Helper for the arrow icon inside the component since I can't import it at the top easily without re-running view_file
const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default ProjectCard;
