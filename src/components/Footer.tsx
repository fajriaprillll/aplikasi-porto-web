import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';

// ── SVG Icons ──────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ── Shared socials data ─────────────────────────────────────────
export const socials = [
  { label: 'GitHub', href: profileData.contact.github, icon: <GithubIcon />, color: '#ffffff' },
  { label: 'LinkedIn', href: profileData.contact.linkedin, icon: <LinkedInIcon />, color: '#0a66c2' },
  { label: 'Instagram', href: `https://instagram.com/${profileData.contact.instagram.replace('@', '')}`, icon: <InstagramIcon />, color: '#e1306c' },
  { label: 'TikTok', href: `https://tiktok.com/${profileData.contact.tiktok}`, icon: <TikTokIcon />, color: '#ff0050' },
];

// ── Floating Sidebar ────────────────────────────────────────────
const SocialItem = ({ label, href, icon, color }: typeof socials[0]) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clicked) {
      // Second click — navigate
      window.open(href, '_blank', 'noopener,noreferrer');
      setClicked(false);
      return;
    }
    setClicked(true);
    // Auto-dismiss after 3s if user doesn't click again
    timerRef.current = setTimeout(() => setClicked(false), 3000);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="relative flex items-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); }}>
      {/* Tooltip / Confirm popup */}
      <AnimatePresence>
        {(hovered || clicked) && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, x: -8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-14 z-50 whitespace-nowrap"
          >
            {clicked ? (
              // Confirm state
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                onClick={handleClick}
                style={{ boxShadow: `0 0 20px -4px ${color}40` }}
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  Visit {label}
                </span>
                <ExternalIcon />
              </div>
            ) : (
              // Hover tooltip
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/[0.07] shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {label}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
        animate={clicked ? { scale: 1.1 } : { scale: 1 }}
        className="w-9 h-9 flex items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-300"
        style={{
          backgroundColor: clicked ? `${color}18` : 'rgba(255,255,255,0.03)',
          borderColor: clicked ? `${color}60` : 'rgba(255,255,255,0.06)',
          color: clicked ? color : '#71717a',
        }}
      >
        {icon}
      </motion.button>
    </div>
  );
};

export const SocialSidebar = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
    className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-3 pb-0"
  >
    {socials.map((s) => (
      <SocialItem key={s.label} {...s} />
    ))}
    <div className="w-px h-20 bg-gradient-to-b from-zinc-700 to-transparent mt-2" />
  </motion.div>
);

// ── Footer ──────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/[0.05] py-24 bg-transparent">
    <div className="section-container flex flex-col md:flex-row justify-between items-start gap-16">
      {/* Branding */}
      <div className="max-w-sm">
        <h3 className="text-3xl font-black mb-4 tracking-tighter text-white">
          {profileData.name.toUpperCase()}
        </h3>
        <p className="text-zinc-600 text-sm leading-relaxed mb-6">
          Fullstack Web Developer — membangun sistem yang solid dari backend hingga tampilan.
        </p>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* Branding & Status */}
      <div className="flex flex-col gap-6 max-w-xs">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">About</div>
        <p className="text-2xl font-bold tracking-tighter text-white leading-snug">
          Saya bangun sistem,<br />bukan sekadar tampilan.
        </p>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold text-zinc-500 tracking-wide">
            Available · Full-time &amp; Remote
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-4">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 mb-2">Location</div>
        <div className="text-xl font-bold tracking-tighter text-white">
          {profileData.contact.location.toUpperCase()}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Open to Remote Work</div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${profileData.contact.email}`}
          className="mt-4 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-600 hover:text-white transition-colors border-b border-zinc-800 hover:border-white pb-1 w-fit origin-left"
        >
          {profileData.contact.email}
        </motion.a>
      </div>
    </div>
  </footer>
);

export default Footer;
