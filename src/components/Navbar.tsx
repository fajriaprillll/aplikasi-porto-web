import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Menu, X } from 'lucide-react';
import { MagneticElement } from './PremiumEffects';
import { profileData } from '../data/profile';

// ── Config ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Projects', href: 'projects' },
  { label: 'About',    href: 'about' },
  { label: 'Career',   href: 'experience' },
];

const NAVBAR_H = 68; // px — must match h-[68px] below

// ── Scroll helper ───────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Nav Link ────────────────────────────────────────────────────
const NavLink = ({
  label,
  id,
  active,
}: {
  label: string;
  id: string;
  active: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => scrollToSection(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-[11px] font-black uppercase tracking-[0.25em] transition-colors duration-200 focus:outline-none"
      style={{ color: active ? '#ffffff' : hovered ? '#ffffff' : '#52525b' }}
    >
      {label}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-white rounded-full"
        animate={{
          width: active || hovered ? '100%' : '0%',
          opacity: active ? 1 : 0.6,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.button>
  );
};

// ── Tooltip Wrapper ─────────────────────────────────────────────
const WithTooltip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.07] whitespace-nowrap pointer-events-none z-50"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Navbar ──────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['projects', 'about', 'experience', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - NAVBAR_H - 40 <= window.scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleMobileNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => scrollToSection(id), 300);
  };

  return (
    <>
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-7 h-7 flex items-center justify-center bg-white/[0.04] rounded-lg border border-white/[0.08] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.4)] transition-all duration-300">
              <rect x="5" y="4" width="4" height="16" rx="1" fill="#818cf8"/>
              <rect x="11" y="4" width="8" height="4" rx="1" fill="#ffffff"/>
              <rect x="11" y="10" width="5" height="4" rx="1" fill="#ffffff"/>
            </svg>
          </motion.div>
          <div className="flex items-center">
            <span className="text-[17px] font-black tracking-[0.08em] text-white select-none">
              FAJRI
            </span>
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-indigo-400 text-xl font-black leading-none ml-0.5"
            >
              .
            </motion.span>
          </div>
        </Link>

        {/* ── Center Nav ── */}
        {isHome && (
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={label}
                label={label}
                id={href}
                active={activeSection === href}
              />
            ))}
          </div>
        )}

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">

          {/* Contact CTA */}
          {isHome && (
            <MagneticElement>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="hidden md:inline-flex items-center text-[10px] font-black uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor:
                    activeSection === 'contact'
                      ? 'rgba(99,102,241,0.7)'
                      : 'rgba(255,255,255,0.12)',
                  color: activeSection === 'contact' ? '#818cf8' : '#ffffff',
                  background:
                    activeSection === 'contact'
                      ? 'rgba(99,102,241,0.08)'
                      : 'transparent',
                }}
              >
                Contact
              </motion.button>
            </MagneticElement>
          )}

          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Download CV */}
          <WithTooltip label="Download CV">
            <motion.a
              href="/cv-fajri-apriliansyah.pdf"
              download
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] text-zinc-500 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-colors duration-200"
            >
              <FileDown size={17} />
            </motion.a>
          </WithTooltip>

          {/* Copy Email */}
          <WithTooltip label={copied ? 'Copied!' : 'Copy Email'}>
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200"
              style={{
                background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                borderColor: copied ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.07)',
                color: copied ? '#34d399' : '#71717a',
              }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    width="17" height="17" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    width="17" height="17" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </WithTooltip>

        </div>
        
        {/* ── Mobile Menu Toggle ── */}
        <div className="md:hidden flex items-center ml-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-zinc-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>

    {/* ── Mobile Menu Overlay ── */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/80 flex flex-col items-center justify-center pt-20"
        >
          {isHome && (
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={() => handleMobileNavClick(href)}
                  className="text-2xl font-black uppercase tracking-[0.2em] text-white focus:outline-none"
                  style={{ color: activeSection === href ? '#818cf8' : '#ffffff' }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => handleMobileNavClick('contact')}
                className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-indigo-400 border border-indigo-500/50 px-8 py-4 rounded-full bg-indigo-500/10 focus:outline-none"
              >
                Contact Me
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
