import { motion } from 'framer-motion';
import { ArrowRight, Code, Mail, MapPin } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { profileData } from '../data/profile';
import { SpotlightCard, DecryptedText, BlurText, MagneticElement, ShimmerButton } from '../components/PremiumEffects';

const LandingPage = () => {
  const allSkills = [...profileData.skills.frontend, ...profileData.skills.tools, ...profileData.skills.learning];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoUrl = `mailto:${profileData.contact.email}?subject=Project Inquiry from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = mailtoUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center section-container pt-40 md:pt-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.15, 0.25, 0.15], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[160px]" 
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-xs tracking-widest font-bold uppercase mb-8 inline-block text-zinc-500">
              <DecryptedText text={profileData.role} />
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1] tracking-tighter text-white">
              <BlurText className="pb-2 justify-center" text={profileData.name.toUpperCase()} delay={100} animateBy="words" direction="bottom" />
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-zinc-500 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              {profileData.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                href="#projects" 
                className="btn-elegant flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                href="#contact" 
                className="btn-elegant-outline"
              >
                Contact Me
              </motion.a>
            </div>

            <div className="mt-32 grid grid-cols-3 gap-8 md:gap-24 border-t border-white/5 pt-12">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">Fullstack</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Focus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">{profileData.stats.projects}</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">S1</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Informatika</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"><BlurText text="SELECTED WORK" animateBy="words" delay={100} direction="bottom" /></h2>
            <p className="text-zinc-500 text-lg">A curated selection of my most impactful digital products.</p>
          </div>
          <div className="text-zinc-600 text-sm font-bold tracking-widest uppercase">
            <DecryptedText text={`[ 001 — 00${projects.length} ]`} speed={100} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: false }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack - Infinite Marquee */}
      <section className="py-32 overflow-hidden border-y border-white/5 bg-transparent">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tighter">CORE STACK</h2>
        </div>
        
        <div className="flex flex-col gap-12">
          {/* Row 1 - Left to Right */}
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div 
              className="flex gap-16 pr-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                duration: 30, 
                ease: "linear" 
              }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => (
                <div key={i} className="text-4xl md:text-7xl font-black text-zinc-800 hover:text-white transition-colors cursor-default tracking-tighter">
                  {skill.toUpperCase()}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div 
              className="flex gap-16 pr-16 items-center"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ 
                repeat: Infinity, 
                duration: 35, 
                ease: "linear" 
              }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => (
                <div key={i} className="text-4xl md:text-7xl font-black text-zinc-800 hover:text-white transition-colors cursor-default tracking-tighter outline-text">
                  {skill.toUpperCase()}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Bento Style */}
      <section id="about" className="border-t border-white/5">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* THE STORY card */}
            <SpotlightCard className="lg:col-span-7 elegant-card p-12 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-8 tracking-tighter">THE STORY</h2>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                    hidden: {}
                  }}
                  className="space-y-6 text-zinc-400 text-sm md:text-lg leading-relaxed whitespace-pre-line"
                >
                  <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    {profileData.about.description}
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    {profileData.about.subDescription}
                  </motion.p>
                </motion.div>
              </div>
              <div className="mt-12 flex gap-4 flex-wrap relative z-10">
                 {profileData.skills.frontend.map((s, i) => (
                   <motion.div 
                     key={s} 
                     whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 2 : -2, backgroundColor: "rgba(99,102,241,0.15)", color: "#ffffff" }}
                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
                     className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5 text-zinc-500 cursor-default transition-colors"
                   >
                     {s}
                   </motion.div>
                 ))}
              </div>
            </SpotlightCard>

            {/* Right column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Profile Photo */}
              <div className="elegant-card overflow-hidden relative group" style={{ aspectRatio: '3/4' }}>
                <img
                  src={profileData.about.image}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">Fullstack Developer</div>
                  <div className="text-2xl font-bold tracking-tighter text-white">{profileData.name}</div>
                </div>
              </div>

              {/* Clean Code card */}
              <SpotlightCard className="elegant-card p-8 group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                       <Code size={24} />
                     </div>
                     <div className="text-zinc-700 font-bold text-xs uppercase tracking-widest group-hover:text-white transition-colors">01</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Clean Code</h3>
                  <p className="text-zinc-500 text-sm">Writing maintainable, scalable, and optimized codebases with focus on quality.</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                   <span className="text-xs font-bold text-zinc-700 uppercase tracking-widest">Efficiency</span>
                   <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        className="h-full bg-white"
                      />
                   </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Experience - Minimal Timeline */}
      <section id="experience" className="bg-transparent border-t border-white/5">
        <div className="section-container">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-20 tracking-tighter"><BlurText text="EXPERIENCE" animateBy="letters" delay={100} direction="bottom" /></h2>
            <div className="space-y-16">
              {profileData.experience.map((exp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="group relative pl-12 border-l border-zinc-800 hover:border-indigo-500/50 transition-colors duration-500"
                >
                  <div className="absolute top-0 left-[-6px] w-3 h-3 bg-zinc-800 rounded-full group-hover:bg-indigo-400 group-hover:shadow-[0_0_10px_rgba(129,140,248,0.8)] transition-all duration-500" />
                  <div className="text-zinc-600 font-bold text-xs mb-2 tracking-widest uppercase">{exp.period}</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">{exp.role} — <span className="text-zinc-600">{exp.company}</span></h3>
                  <p className="text-zinc-500 text-sm md:text-lg leading-relaxed whitespace-pre-line">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container pb-40">
        <div className="elegant-card p-8 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                <BlurText text="LET'S" delay={100} direction="bottom" /><br /><BlurText text="CONNECT." delay={100} direction="bottom" />
              </h2>
              <p className="text-zinc-500 text-base md:text-xl mb-10 leading-relaxed max-w-md">
                Saya selalu terbuka untuk ide-ide baru, peluang kerja, atau sekadar berdiskusi tentang teknologi.
              </p>
              
              <div className="space-y-10">
                <div className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-1">Email Me</div>
                    <a href={`mailto:${profileData.contact.email}`} className="text-lg md:text-2xl font-bold text-white hover:text-zinc-400 transition-colors tracking-tighter break-all">
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>
                <div className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-1">Location</div>
                    <span className="text-2xl font-bold text-white tracking-tighter">
                      {profileData.contact.location.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-700 ml-1">Full Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(129,140,248,0.4)" }}
                      required name="name" type="text" placeholder="JOHN DOE" 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-6 focus:border-white/20 outline-none transition-colors text-white font-medium tracking-tight origin-left" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-700 ml-1">Email Address</label>
                    <motion.input 
                      whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(129,140,248,0.4)" }}
                      required name="email" type="email" placeholder="HELLO@DOMAIN.COM" 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-6 focus:border-white/20 outline-none transition-colors text-white font-medium tracking-tight origin-left" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-700 ml-1">Your Message</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(129,140,248,0.4)" }}
                    required name="message" placeholder="WHAT'S ON YOUR MIND?" rows={6} 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-6 focus:border-white/20 outline-none transition-colors text-white font-medium resize-none tracking-tight origin-bottom"
                  />
                </div>
                <MagneticElement className="mt-4">
                  <ShimmerButton type="submit" className="w-full text-xl py-6 font-bold tracking-widest text-white">
                    SEND MESSAGE
                  </ShimmerButton>
                </MagneticElement>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
        .outline-text:hover {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
          color: white;
        }
      `}} />
    </motion.div>
  );
};

export default LandingPage;
