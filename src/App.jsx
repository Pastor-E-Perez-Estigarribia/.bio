import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, MapPin, Award, BookOpen, Leaf, Briefcase, GraduationCap, 
  Instagram, Microscope, Menu, X, Moon, Sun, Globe, Presentation,
  TestTube, ExternalLink, Users, Download, Github
} from 'lucide-react';

// --- Diccionario de Internacionalización Completo (i18n) ---
const translations = {
  es: {
    nav_about: "Sobre mí",
    nav_exp: "Experiencia",
    nav_projects: "Proyectos",
    nav_courses: "Cátedras",
    nav_pub: "Publicaciones",
    nav_theses: "Tutorías",
    nav_cv: "CV",
    nav_bonsai: "Bonsái",
    nav_contact: "Contacto",
    hero_title: "Pastor E. Pérez Estigarribia",
    hero_subtitle: "Biólogo | Doctor en Ciencias de la Computación | Modelado Matemático",
    hero_desc: "Especializado en la intersección de la biología y la tecnología. Mi trabajo se centra en el desarrollo de modelos matemáticos teóricos para el control de epidemias y análisis de datos de emergencias sanitarias.",
    hero_cv_btn: "Descargar CV",
    cv_title: "Curriculum Vitae",
    cv_desc: "Descarga mi hoja de vida completa o visita mi perfil interactivo en el portal de CONACYT para conocer en detalle mi trayectoria académica, publicaciones y proyectos.",
    exp_title: "Experiencia Destacada",
    exp_list: [
      { date: "2022 - Presente", title: "Profesor de Posgrado (Investigador)", inst: "FPUNA, FACISA-UNE & Universidad Sudamericana", desc: "Docencia en Maestría y Doctorado en Ciencias de la Computación, Inteligencia Artificial y Estadística Aplicada." },
      { date: "2023", title: "Consultor Internacional OPS/OMS", inst: "Organización Panamericana de la Salud", desc: "Capacitación en análisis de datos de emergencias sanitarias a nivel regional (LATAM)." },
      { date: "2020 - 2022", title: "Analista de Datos Epidemiológicos", inst: "Ministerio de Salud Pública y Bienestar Social / OPS Paraguay", desc: "Pronósticos basados en modelos matemáticos y vigilancia epidemiológica durante la pandemia de COVID-19." }
    ],
    edu_title: "Formación",
    edu_list: [
      { date: "2015 - 2020", title: "Doctorado en Ciencias de la Computación", inst: "Universidad Nacional de Asunción, Paraguay." },
      { date: "2011 - 2013", title: "Maestría en Zoología", inst: "Universidad de Concepción, Chile." },
      { date: "2005 - 2010", title: "Licenciatura en Ciencias, mención Biología", inst: "Universidad Nacional de Asunción, Paraguay." }
    ],
    awards_title: "Reconocimientos",
    awards_list: [
      "PRONII Nivel II (2023) - CONACYT, Paraguay.",
      "Premio Nacional de Ciencia, Mención de Honor (2020) - Presidencia de la República.",
      "Mejor Presentación (2012) - Encuentro Conjunto de Botánica, Ecología y Evolución, Chile."
    ],
    projects_title: "Proyectos de Investigación",
    projects_desc: "Investigaciones científicas y tecnológicas financiadas, enfocadas en inteligencia artificial, epidemiología matemática y conservación.",
    projects_link: "Ver perfil completo en CONACYT (CVPy)",
    project_list: [
      { date: "2024 - Presente", title: "IA aplicada a la predicción de distribución de vectores de importancia médica (Salud Única)", role: "Investigador", org: "CONACYT (PINV01-580)" },
      { date: "2024 - Presente", title: "Paisajes sonoros: aplicaciones de IA para la conservación de ecosistemas", role: "Investigador Asociado", org: "CONACYT (PINV01-530)" },
      { date: "2023 - Presente", title: "Impactos del Cambio Rápido de Hábitat: Diversidad de mamíferos y deforestación", role: "Investigador", org: "Walder Foundation (Biota Award)" },
      { date: "2021", title: "Simulación de modelos epidemiológicos para predicción y contingencia del COVID-19", role: "Investigador Asociado", org: "CONACYT (PINV20-40)" },
      { date: "2015 - 2020", title: "Modelado y control de arbovirus usando infección por Wolbachia", role: "Investigador en Formación", org: "STIC-AmSud (MOSTICAW/NEMBICA)" }
    ],
    courses_title: "Cátedras y Docencia",
    teaching_list: [
      { date: "2025", title: "Maestría en Inteligencia Artificial", inst: "FIUNA", desc: "Cátedra: Probabilidad y Estadística Avanzada." },
      { date: "2025", title: "Maestría en IA y Análisis de Datos", inst: "FPUNA", desc: "Cátedras: Fundamentos de Ciencia de Datos, Aprendizaje Automático y Estadística Aplicada." },
      { date: "2024 - 2025", title: "Doctorado y Maestría en Cs. de los Alimentos", inst: "FCQ, UNA", desc: "Cátedras: Estadística Aplicada, Diseño Experimental y Análisis de datos con R." },
      { date: "2024 - 2025", title: "Especialización en Investigación en Salud", inst: "FENOB, UNA", desc: "Cátedras: Gestión de Datos y Análisis de Resultados." },
      { date: "2024", title: "Instructor de Taller", inst: "IV Encuentro de Matemáticas y Estadísticas", desc: "Taller aplicado a Ciencias Sociales y Económicas." },
      { date: "2023", title: "Macroentrenamiento en IA", inst: "UNAM, México", desc: "Capacitación internacional en Inteligencia Artificial." },
      { date: "2022", title: "Diplomados FPUNA", inst: "FPUNA", desc: "Redacción Científica y Computación Estadística." },
      { date: "2022", title: "Maestría en Analítica de Datos", inst: "UNC (Concepción)", desc: "Cátedra: Exploración de la Información." }
    ],
    pub_title: "Publicaciones Destacadas",
    pub_desc: "Una selección de investigaciones enfocadas en epidemiología, salud pública y ciencias computacionales.",
    pub_list: [
      { title: "Modeling the impact of vaccine campaigns on chikungunya...", journal: "Nature Medicine", year: "2025" },
      { title: "A mathematical model for COVID-19 with variable transmissibility...", journal: "Applied Sciences", year: "2021" },
      { title: "A class of fast-slow models for adaptive resistance evolution", journal: "Theoretical Population Biology", year: "2020" },
      { title: "Modelling and control of Mendelian and maternal inheritance...", journal: "IEEE (ECC)", year: "2021" }
    ],
    pub_more: "Explora mi historial completo en:",
    theses_title: "Dirección de Tesis",
    theses_desc: "Tesis de maestría y doctorado orientadas y en curso.",
    theses_list: [
      { student: "Myriam Velazquez", date: "2026 - Pres.", type: "Doctorado en Cs. Exactas", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "Claudia Rolon", date: "2026 - Pres.", type: "Doctorado en Cs. Exactas", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "Marcela Jiménez Zacur", date: "2026 - Pres.", type: "Doctorado en Cs. Computación", inst: "FPUNA", role: "Tutor" },
      { student: "César Ayala", date: "2026", type: "Doctorado en Cs. Computación", inst: "FPUNA", role: "Tutor" },
      { student: "Cesar Vian", date: "2025", type: "Maestría en Cs. Computación", inst: "FPUNA", role: "Tutor" },
      { student: "Marcela Jiménez Zacur", date: "2021", type: "Maestría en Biología Conservación", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "María Elena Damús", date: "2018", type: "Maestría en Biotecnología Alimentos", inst: "UNI", role: "Co-tutor" },
      { student: "Gladys Estigarribia", date: "2018", type: "Maestría en Biotecnología Alimentos", inst: "UNI", role: "Co-tutor" },
      { student: "Liza Ramírez", date: "2017", type: "Maestría en Cs. Biotecnológicas", inst: "CEMIT-UNA", role: "Co-tutor" }
    ],
    bonsai_title: "El Arte del Bonsái",
    bonsai_desc_1: "Más allá de las matemáticas, la programación y la epidemiología, encuentro equilibrio y conexión con la naturaleza a través del cuidado de árboles Bonsái.",
    bonsai_desc_2: "Esta práctica me enseña sobre la paciencia, el crecimiento paulatino y la atención al detalle; virtudes que también son esenciales en la investigación científica y el desarrollo tecnológico. Es un espacio para la creatividad botánica y la tranquilidad.",
    bonsai_btn: "Ver mi galería en Instagram",
    footer_desc: "Científico e Investigador combinando biología, modelos matemáticos y ciencia de datos.",
    footer_contact: "Contacto",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    nav_about: "About Me",
    nav_exp: "Experience",
    nav_projects: "Projects",
    nav_courses: "Teaching",
    nav_pub: "Publications",
    nav_theses: "Mentorship",
    nav_cv: "CV",
    nav_bonsai: "Bonsai",
    nav_contact: "Contact",
    hero_title: "Pastor E. Pérez Estigarribia",
    hero_subtitle: "Biologist | PhD in Computer Science | Mathematical Modeling",
    hero_desc: "Specialized at the intersection of biology and technology. My work focuses on the development of theoretical mathematical models for epidemic control.",
    hero_cv_btn: "Download CV",
    cv_title: "Curriculum Vitae",
    cv_desc: "Download my complete resume or visit my interactive profile on the CONACYT portal.",
    exp_title: "Highlighted Experience",
    exp_list: [
      { date: "2022 - Present", title: "Postgraduate Professor (Researcher)", inst: "FPUNA, FACISA-UNE & U. Sudamericana", desc: "Teaching AI and Applied Statistics at Master's and PhD levels." },
      { date: "2023", title: "International Consultant PAHO/WHO", inst: "Pan American Health Organization", desc: "Regional health emergency data analysis training." }
    ],
    edu_title: "Education",
    edu_list: [
      { date: "2015 - 2020", title: "PhD in Computer Science", inst: "National University of Asunción, Paraguay." }
    ],
    projects_title: "Research Projects",
    projects_desc: "Funded scientific research focusing on AI, mathematical epidemiology, and conservation.",
    project_list: [
      { date: "2024 - Present", title: "AI applied to medical vector prediction", role: "Researcher", org: "CONACYT (PINV01-580)" }
    ],
    courses_title: "Teaching & Courses",
    teaching_list: [
      { date: "2025", title: "Master's in AI", inst: "FIUNA", desc: "Advanced Probability and Statistics." }
    ],
    pub_title: "Selected Publications",
    theses_title: "Theses Supervision",
    theses_list: [
      { student: "Myriam Velazquez", date: "2026", type: "PhD in Exact Sciences", inst: "FACEN-UNA", role: "Co-advisor" }
    ],
    bonsai_title: "The Art of Bonsai",
    bonsai_desc_1: "Beyond mathematics and programming, I find balance through the care of Bonsai trees.",
    bonsai_btn: "Instagram Gallery",
    footer_rights: "All rights reserved."
  }
};

// --- COMPONENTE UX: Reveal on Scroll ---
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Solo anima una vez
        }
      });
    }, { threshold: 0.15 });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); }
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang];
  
  // Usamos una ruta absoluta manual para evitar problemas con import.meta en entornos de compilación restringidos
  const baseUrl = '/.bio/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');
  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    bgMain: isDark ? 'bg-slate-900' : 'bg-slate-50',
    bgSec: isDark ? 'bg-slate-800' : 'bg-white',
    bgThird: isDark ? 'bg-slate-800/50' : 'bg-slate-100',
    textMain: isDark ? 'text-slate-100' : 'text-slate-900',
    textSec: isDark ? 'text-slate-300' : 'text-slate-600',
    border: isDark ? 'border-slate-700' : 'border-slate-200',
    navBg: isDark ? 'bg-slate-900/95 border-b border-slate-800 shadow-xl' : 'bg-white/95 border-b border-slate-100 shadow-sm',
    card: isDark ? 'bg-slate-800 border-slate-700 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-500',
  };

  const SectionTitle = ({ children, icon: Icon }) => (
    <div className="flex items-center gap-4 mb-10">
      <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
        <Icon size={24} />
      </div>
      <h3 className={`text-3xl font-bold ${theme.textMain} tracking-tight`}>{children}</h3>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme.bgMain} ${theme.textMain} selection:bg-emerald-500 selection:text-white`}>
      {/* Navbar */}
      <nav className={`${theme.navBg} sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-md">P</div>
              <span className={`font-extrabold text-xl tracking-tighter ${isDark ? 'text-white' : 'text-emerald-900'}`}>Dr. Pastor Pérez</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['sobre-mi', 'experiencia', 'proyectos', 'cursos', 'publicaciones', 'tutorias', 'bonsai'].map((item) => (
                <a key={item} href={`#${item}`} className={`${theme.textSec} hover:text-emerald-500 transition text-sm font-bold uppercase tracking-wider`}>
                  {t[`nav_${item.replace('-', '_').replace('sobre_mi', 'about').replace('experiencia', 'exp').replace('proyectos', 'projects').replace('cursos', 'courses').replace('publicaciones', 'pub').replace('tutorias', 'theses')}`] || t[`nav_${item}`]}
                </a>
              ))}
              
              <div className="flex items-center space-x-4 border-l border-slate-300 dark:border-slate-700 pl-6">
                <button onClick={toggleLang} className={`flex items-center gap-1 ${theme.textSec} hover:text-emerald-500 transition text-xs font-black uppercase`} title="Idioma">
                  <Globe size={18} /> {lang}
                </button>
                <button onClick={toggleTheme} className={`${theme.textSec} hover:text-emerald-500 transition p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700`} title="Tema">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center lg:hidden space-x-4">
              <button onClick={toggleTheme} className={theme.textSec}>{isDark ? <Sun /> : <Moon />}</button>
              <button onClick={toggleMenu} className={theme.textSec}>{isMenuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="sobre-mi" className={`py-24 ${theme.bgSec} overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <Reveal delay={100}>
            <div className="w-full flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-emerald-500 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-[2.5rem] overflow-hidden border-4 border-emerald-500/20 shadow-2xl bg-slate-100">
                  <img 
                    src={`${baseUrl}perfil.png`} 
                    alt="Pastor Pérez" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-500 scale-105"
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Pastor+Perez&size=512&background=059669&color=fff"; }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="w-full text-center md:text-left">
              <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">{t.hero_title}</h1>
              <h2 className={`text-2xl font-semibold mb-8 ${isDark ? 'text-emerald-400' : 'text-emerald-700'} tracking-wide uppercase text-sm`}>{t.hero_subtitle}</h2>
              <p className={`text-xl leading-relaxed mb-10 ${theme.textSec} max-w-2xl`}>{t.hero_desc}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a href="#cv" className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-xl shadow-emerald-600/20 active:scale-95">
                  {t.hero_cv_btn}
                </a>
                <div className="flex gap-3">
                  <a href="https://github.com/Pastor-E-Perez-Estigarribia/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-emerald-500/10 transition hover:border-emerald-500"><Github size={24} /></a>
                  <a href="https://www.instagram.com/pastoreperez/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-emerald-500/10 transition hover:border-emerald-500"><Instagram size={24} /></a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experiencia y Educación */}
      <section id="experiencia" className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal delay={100}>
            <div>
              <SectionTitle icon={Briefcase}>{t.exp_title}</SectionTitle>
              <div className="space-y-6">
                {t.exp_list.map((exp, idx) => (
                  <div key={idx} className={`p-8 rounded-[2rem] border ${theme.card} transition-all duration-300 shadow-sm`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">{exp.date}</span>
                    </div>
                    <h4 className="text-xl font-extrabold mb-1">{exp.title}</h4>
                    <p className="text-sm font-bold mb-4 text-emerald-600/80">{exp.inst}</p>
                    <p className={`text-sm leading-relaxed ${theme.textSec}`}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <div>
              <SectionTitle icon={GraduationCap}>{t.edu_title}</SectionTitle>
              <div className="space-y-8 pl-4">
                {t.edu_list.map((edu, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-emerald-500/30">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                    <span className="text-xs font-black text-emerald-500 uppercase">{edu.date}</span>
                    <h4 className="text-lg font-extrabold mt-1">{edu.title}</h4>
                    <p className={`text-sm ${theme.textSec} font-medium mt-1`}>{edu.inst}</p>
                  </div>
                ))}
                <div className={`mt-12 p-8 rounded-[2rem] bg-emerald-600 text-white shadow-2xl hover:scale-[1.02] transition-transform`}>
                  <Award className="mb-4" size={32} />
                  <h4 className="text-xl font-bold mb-4">Reconocimientos</h4>
                  <ul className="space-y-3">
                    {t.awards_list.map((award, idx) => (
                      <li key={idx} className="text-sm font-medium flex gap-3">
                        <span className="opacity-60">•</span> {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className={`py-24 ${theme.bgThird} transition-colors overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <SectionTitle icon={Microscope}>{t.projects_title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {t.project_list.map((project, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className={`h-full group p-8 rounded-[2.5rem] border ${theme.card} bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300 flex flex-col`}>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-lg mb-6 inline-block w-fit">{project.date}</span>
                  <h4 className={`text-lg font-black mb-4 leading-tight group-hover:text-emerald-600 transition-colors`}>{project.title}</h4>
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-700 mt-auto">
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-tighter mb-1">{project.role}</p>
                    <p className="text-xs font-bold opacity-40">{project.org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="flex justify-center mt-12">
              <a href="https://cv.conacyt.gov.py/publicar/cv?id=3af9ecaf6ada7eeb118573eda46e50fa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-emerald-600 font-black text-sm uppercase tracking-widest hover:border-emerald-500 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none">
                {t.projects_link} <ExternalLink size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cátedras */}
      <section id="cursos" className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <SectionTitle icon={Presentation}>{t.courses_title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.teaching_list.map((course, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className={`h-full p-8 rounded-[2rem] border ${theme.card} transition-all shadow-sm hover:-translate-y-1`}>
                  <h4 className="font-extrabold text-lg mb-2 leading-tight">{course.title}</h4>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">{course.inst}</p>
                  <p className={`text-xs font-medium leading-relaxed ${theme.textSec}`}>{course.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publicaciones */}
      <section id="publicaciones" className={`py-24 ${theme.bgThird} overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <SectionTitle icon={BookOpen}>{t.nav_pub}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {t.pub_list.map((pub, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className={`h-full p-8 rounded-[2rem] border ${theme.card} bg-white dark:bg-slate-800 hover:-translate-y-1 transition-transform`}>
                  <h4 className="text-lg font-black mb-3 leading-tight">{pub.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600 italic">{pub.journal}</span>
                    <span className="text-xs font-black opacity-30">{pub.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://scholar.google.es/citations?user=u6VMrDsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                Google Scholar <ExternalLink size={16} />
              </a>
              <a href="https://www.researchgate.net/profile/Pastor-Enmanuel-Perez-Estigarribia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg">
                ResearchGate <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tutorías */}
      <section id="tutorias" className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <SectionTitle icon={Users}>{t.theses_title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.theses_list.map((thesis, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className={`h-full group p-6 rounded-2xl border ${theme.card} bg-white dark:bg-slate-800 flex flex-col justify-between hover:shadow-lg transition-all`}>
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{thesis.student}</p>
                    <p className="text-xs font-bold opacity-60 mt-1">{thesis.type}</p>
                    <p className="text-[10px] font-black uppercase text-emerald-600/60 mt-0.5">{thesis.inst}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg tracking-tighter">
                      {thesis.role}
                    </span>
                    <span className="text-[9px] font-bold opacity-40">{thesis.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bonsái */}
      <section id="bonsai" className="py-24 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none rotate-12 scale-150">
          <Leaf size={400} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <div className="inline-flex p-4 bg-white/10 rounded-3xl backdrop-blur-md mb-8">
              <Leaf className="text-emerald-400" size={40} />
            </div>
            <h3 className="text-5xl font-black mb-10 tracking-tight">{t.bonsai_title}</h3>
            <p className="text-2xl leading-relaxed mb-8 font-medium text-emerald-50">{t.bonsai_desc_1}</p>
            <p className="text-emerald-200/80 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">{t.bonsai_desc_2}</p>
            <a href="https://www.instagram.com/pastoreperez/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-emerald-900 rounded-[2rem] font-black text-lg uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl">
              <Instagram size={24} /> {t.bonsai_btn}
            </a>
          </Reveal>
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className={`py-24 ${theme.bgSec} overflow-hidden`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <div className="p-16 rounded-[3rem] border-2 border-emerald-500/10 bg-emerald-500/5 backdrop-blur-sm">
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-emerald-600/20">
                <Download size={40} />
              </div>
              <h3 className="text-4xl font-black mb-6">{t.cv_title}</h3>
              <p className={`text-xl mb-12 ${theme.textSec} font-medium leading-relaxed`}>{t.cv_desc}</p>
              <a href="https://cv.conacyt.gov.py/publicar/cv?id=3af9ecaf6ada7eeb118573eda46e50fa" target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-emerald-700 transition active:scale-95">
                {t.hero_cv_btn}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-black' : 'bg-slate-900'} text-slate-500 py-20 border-t border-slate-800`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-12">
            <button 
              onClick={() => window.location.href = `mailto:${['peperez.estigarribia', 'gmail.com'].join('@')}`} 
              className="p-4 bg-slate-800/50 rounded-2xl hover:text-white hover:bg-emerald-600 transition duration-500 cursor-pointer"
              title="Enviar correo"
              aria-label="Enviar correo"
            >
              <Mail />
            </button>
            <a href="https://github.com/Pastor-E-Perez-Estigarribia/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-800/50 rounded-2xl hover:text-white hover:bg-emerald-600 transition duration-500"><Github /></a>
            <a href="https://www.instagram.com/pastoreperez/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-800/50 rounded-2xl hover:text-white hover:bg-emerald-600 transition duration-500"><Instagram /></a>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-40">{t.hero_title}</p>
          <p className="text-xs font-medium">&copy; {new Date().getFullYear()} Pastor Enmanuel Pérez Estigarribia. {t.footer_rights}</p>
        </div>
      </footer>
    </div>
  );
}