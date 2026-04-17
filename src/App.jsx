import React, { useState, useEffect } from 'react';
import { 
  Mail, MapPin, Award, BookOpen, Leaf, Briefcase, GraduationCap, 
  Instagram, Microscope, Menu, X, Moon, Sun, Globe, Presentation,
  TestTube, ExternalLink, Users, Download, Github
} from 'lucide-react';

// --- Diccionario de Internacionalización (i18n) ---
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
    exp_1_date: "2022 - Presente",
    exp_1_title: "Profesor de Posgrado (Investigador)",
    exp_1_inst: "FPUNA, FACISA-UNE & Universidad Sudamericana",
    exp_1_desc: "Docencia en Maestría y Doctorado en Ciencias de la Computación, Inteligencia Artificial y Estadística Aplicada.",
    exp_2_date: "2023",
    exp_2_title: "Consultor Internacional OPS/OMS",
    exp_2_inst: "Organización Panamericana de la Salud",
    exp_2_desc: "Capacitación en análisis de datos de emergencias sanitarias a nivel regional (LATAM).",
    exp_3_date: "2020 - 2022",
    exp_3_title: "Analista de Datos Epidemiológicos",
    exp_3_inst: "Ministerio de Salud Pública y Bienestar Social / OPS Paraguay",
    exp_3_desc: "Pronósticos basados en modelos matemáticos y vigilancia epidemiológica durante la pandemia de COVID-19.",
    edu_title: "Formación",
    edu_1_date: "2015 - 2020",
    edu_1_title: "Doctorado en Ciencias de la Computación",
    edu_1_inst: "Universidad Nacional de Asunción, Paraguay.",
    edu_2_date: "2011 - 2013",
    edu_2_title: "Maestría en Zoología",
    edu_2_inst: "Universidad de Concepción, Chile.",
    edu_3_date: "2005 - 2010",
    edu_3_title: "Licenciatura en Ciencias, mención Biología",
    edu_3_inst: "Universidad Nacional de Asunción, Paraguay.",
    awards_title: "Reconocimientos",
    awards_1: "PRONII Nivel II (2023) - CONACYT, Paraguay.",
    awards_2: "Premio Nacional de Ciencia, Mención de Honor (2020) - Presidencia de la República del Paraguay.",
    awards_3: "Premio a la Mejor Presentación (2012) - Encuentro Conjunto de Botánica, Ecología y Evolución, Chile.",
    projects_title: "Proyectos de Investigación",
    projects_desc: "Investigaciones científicas y tecnológicas financiadas, enfocadas en inteligencia artificial, epidemiología matemática y conservación.",
    projects_link: "Ver perfil completo en CONACYT (CVPy)",
    project_list: [
      { date: "2024 - Presente", title: "IA aplicada a la predicción de distribución de vectores de importancia médica (Salud Única)", role: "Investigador", org: "CONACYT (PINV01-580)" },
      { date: "2024 - Presente", title: "Paisajes sonoros: aplicaciones de Inteligencia Artificial para la conservación de ecosistemas", role: "Investigador Asociado", org: "CONACYT (PINV01-530)" },
      { date: "2023 - Presente", title: "Impactos del Cambio Rápido de Hábitat: Diversidad de mamíferos y deforestación", role: "Investigador", org: "Walder Foundation (Biota Award)" },
      { date: "2021", title: "Simulación de modelos epidemiológicos para predicción y contingencia del COVID-19", role: "Investigador Asociado", org: "CONACYT (PINV20-40)" },
      { date: "2015 - 2020", title: "Modelado y control de arbovirus usando infección por Wolbachia", role: "Investigador en Formación", org: "STIC-AmSud (MOSTICAW/NEMBICA)" }
    ],
    courses_title: "Cátedras y Docencia",
    courses_desc: "Experiencia docente completa en programas de grado, maestría, doctorado y especializaciones.",
    teaching_list: [
      { date: "2025", title: "Profesor de Maestría en Inteligencia Artificial", inst: "FIUNA", desc: "Cátedra: Probabilidad y Estadística Avanzada." },
      { date: "2025", title: "Profesor de Maestría en Inteligencia Artificial y Análisis de Datos", inst: "FPUNA", desc: "Cátedras: Fundamentos de Ciencia de Datos, Aprendizaje Automático y Estadística Aplicada." },
      { date: "2024 - 2025", title: "Profesor de Doctorado y Maestría en Ciencias de los Alimentos", inst: "FCQ, UNA", desc: "Cátedras: Estadística Aplicada, Diseño Experimental y Análisis de datos con R." },
      { date: "2024 - 2025", title: "Profesor de Especialización en Investigación en Salud", inst: "FENOB, UNA", desc: "Cátedras: Gestión de Datos y Análisis de Resultados." },
      { date: "2024", title: "Instructor de Taller", inst: "IV Encuentro de Matemáticas y Estadísticas", desc: "Taller aplicado a Ciencias Sociales y Económicas." },
      { date: "2023", title: "Profesor de Diplomados en ML e IA", inst: "MITIC - FPUNA", desc: "Diplomados en Machine Learning e Inteligencia Artificial." },
      { date: "2023", title: "Instructor de Macroentrenamiento en IA", inst: "UNAM, México", desc: "Capacitación a nivel internacional en Inteligencia Artificial." },
      { date: "2022", title: "Coordinador y Profesor de Diplomados", inst: "FPUNA", desc: "Diplomados en Redacción Técnica Científica, Análisis de Datos en Salud, y Computación Estadística." },
      { date: "2022", title: "Profesor de Maestría en Analítica de Datos", inst: "UNC (Concepción)", desc: "Cátedra: Exploración de la Información." },
      { date: "2019 - 2020", title: "Profesor Universitario", inst: "UCOM", desc: "Cátedras: Introducción a la Teoría de Conjuntos y Modelado de Sistemas Biológicos." },
      { date: "2014 - 2015", title: "Profesor de Bioinformática y Bioestadística", inst: "FACEN-UNA y CEMIT", desc: "Docencia en licenciatura y maestría, además de asesoría de tesis." }
    ],
    pub_title: "Publicaciones Destacadas",
    pub_desc: "Una selección de investigaciones enfocadas en epidemiología, salud pública y ciencias computacionales.",
    pub_more: "Explora mi historial completo de publicaciones y citas en:",
    theses_title: "Dirección de Tesis",
    theses_desc: "Tesis de maestría y doctorado orientadas y en curso.",
    theses_list: [
      { student: "Myriam Velazquez", date: "2026 - Presente", type: "Doctorado en Ciencias Exactas y Naturales", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "Claudia Rolon", date: "2026 - Presente", type: "Doctorado en Ciencias Exactas y Naturales", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "Marcela Jiménez Zacur", date: "2026 - Presente", type: "Doctorado en Ciencias de la Computación", inst: "FPUNA", role: "Tutor" },
      { student: "César Ayala", date: "2026", type: "Doctorado en Ciencias de la Computación", inst: "FPUNA", role: "Tutor" },
      { student: "Cesar Vian", date: "2025", type: "Maestría en Ciencias de la Computación", inst: "FPUNA", role: "Tutor" },
      { student: "Marcela Jiménez Zacur", date: "2021", type: "Maestría en Biología de la Conservación", inst: "FACEN-UNA", role: "Co-tutor" },
      { student: "María Elena Damús", date: "2018", type: "Maestría en Biotecnología de Alimentos", inst: "UNI", role: "Co-tutor" },
      { student: "Gladys Estigarribia", date: "2018", type: "Maestría en Biotecnología de Alimentos", inst: "UNI", role: "Co-tutor" },
      { student: "Liza Ramírez", date: "2017", type: "Maestría en Ciencias Biotecnológicas", inst: "CEMIT-UNA", role: "Co-tutor" },
      { student: "Claudia Barboza", date: "2017", type: "Maestría en Ciencias Biotecnológicas", inst: "CEMIT-UNA", role: "Co-tutor" }
    ],
    bonsai_title: "El Arte del Bonsái",
    bonsai_desc_1: "Más allá de las matemáticas, la programación y la epidemiología, encuentro equilibrio y conexión con la naturaleza a través del cuidado de árboles Bonsái.",
    bonsai_desc_2: "Esta práctica me enseña sobre la paciencia, el crecimiento paulatino y la atención al detalle; virtudes que también son esenciales en la investigación científica y el desarrollo tecnológico. Es un espacio para la creatividad botánica y la tranquilidad.",
    bonsai_btn: "Ver mi galería en Instagram",
    footer_desc: "Científico e Investigador combinando biología, modelos matemáticos y ciencia de datos para resolver problemas complejos.",
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
    hero_desc: "Specialized at the intersection of biology and technology. My work focuses on the development of theoretical mathematical models for epidemic control and health emergency data analysis.",
    hero_cv_btn: "Download CV",
    cv_title: "Curriculum Vitae",
    cv_desc: "Download my complete resume or visit my interactive profile on the CONACYT portal to learn more about my academic background, publications, and projects in detail.",
    exp_title: "Highlighted Experience",
    exp_1_date: "2022 - Present",
    exp_1_title: "Postgraduate Professor (Researcher)",
    exp_1_inst: "FPUNA, FACISA-UNE & Universidad Sudamericana",
    exp_1_desc: "Teaching Master's and PhD courses in Computer Science, Artificial Intelligence, and Applied Statistics.",
    exp_2_date: "2023",
    exp_2_title: "International Consultant PAHO/WHO",
    exp_2_inst: "Pan American Health Organization",
    exp_2_desc: "Regional training in health emergency data analysis across Latin America (LATAM).",
    exp_3_date: "2020 - 2022",
    exp_3_title: "Epidemiological Data Analyst",
    exp_3_inst: "Ministry of Public Health and Social Welfare / PAHO Paraguay",
    exp_3_desc: "Forecasts based on mathematical models and epidemiological surveillance during the COVID-19 pandemic.",
    edu_title: "Education",
    edu_1_date: "2015 - 2020",
    edu_1_title: "PhD in Computer Science",
    edu_1_inst: "National University of Asunción, Paraguay.",
    edu_2_date: "2011 - 2013",
    edu_2_title: "MSc in Zoology",
    edu_2_inst: "University of Concepción, Chile.",
    edu_3_date: "2005 - 2010",
    edu_3_title: "BSc in Sciences, Biology mention",
    edu_3_inst: "National University of Asunción, Paraguay.",
    awards_title: "Awards & Honors",
    awards_1: "PRONII Level II Researcher (2023) - CONACYT, Paraguay.",
    awards_2: "National Science Award, Honorable Mention (2020) - Presidency of the Republic of Paraguay.",
    awards_3: "Best Presentation Award (2012) - Joint Meeting of Botany, Ecology and Evolution, Chile.",
    projects_title: "Research Projects",
    projects_desc: "Funded scientific and technological research focusing on artificial intelligence, mathematical epidemiology, and conservation.",
    projects_link: "View complete profile on CONACYT (CVPy)",
    project_list: [
      { date: "2024 - Present", title: "AI applied to the spatio-temporal prediction of medical vectors (One Health)", role: "Researcher", org: "CONACYT (PINV01-580)" },
      { date: "2024 - Present", title: "Soundscapes: AI applications for ecosystem conservation and use", role: "Associate Researcher", org: "CONACYT (PINV01-530)" },
      { date: "2023 - Present", title: "Impacts of Rapid Habitat Change: Mammalian diversity and response to deforestation", role: "Researcher", org: "Walder Foundation (Biota Award)" },
      { date: "2021", title: "Simulation of epidemiological models for COVID-19 prediction and contingency", role: "Associate Researcher", org: "CONACYT (PINV20-40)" },
      { date: "2015 - 2020", title: "Modeling and control of arboviruses using Wolbachia infection", role: "Researcher in Training", org: "STIC-AmSud (MOSTICAW/NEMBICA)" }
    ],
    courses_title: "Teaching & Courses",
    courses_desc: "Comprehensive teaching experience across undergraduate, Master's, PhD, and specialization programs.",
    teaching_list: [
      { date: "2025", title: "Professor of Master's in Artificial Intelligence", inst: "FIUNA", desc: "Course: Advanced Probability and Statistics." },
      { date: "2025", title: "Professor of Master's in AI and Data Analysis", inst: "FPUNA", desc: "Courses: Data Science Fundamentals, Machine Learning, and Applied Statistics." },
      { date: "2024 - 2025", title: "Professor of PhD and Master's in Food Sciences", inst: "FCQ, UNA", desc: "Courses: Applied Statistics, Experimental Design, and Data Analysis with R." },
      { date: "2024 - 2025", title: "Professor of Specialization in Health Research", inst: "FENOB, UNA", desc: "Courses: Data Management and Results Analysis." },
      { date: "2024", title: "Workshop Instructor", inst: "IV Meeting of Mathematics and Statistics", desc: "Workshop applied to Social and Economic Sciences." },
      { date: "2023", title: "Professor of ML and AI Diplomas", inst: "MITIC - FPUNA", desc: "Diploma programs in Machine Learning and Artificial Intelligence." },
      { date: "2023", title: "AI Macrotraining Instructor", inst: "UNAM, Mexico", desc: "International training in Artificial Intelligence." },
      { date: "2022", title: "Coordinator and Professor of Diplomas", inst: "FPUNA", desc: "Diplomas in Scientific Writing, Health Data Analysis, and Statistical Computing." },
      { date: "2022", title: "Professor of Master's in Data Analytics", inst: "UNC (Concepción)", desc: "Course: Information Exploration." },
      { date: "2019 - 2020", title: "University Professor", inst: "UCOM", desc: "Courses: Introduction to Set Theory and Modeling of Biological Systems." },
      { date: "2014 - 2015", title: "Professor of Bioinformatics and Biostatistics", inst: "FACEN-UNA & CEMIT", desc: "Teaching at bachelor's and master's levels, including thesis advising." }
    ],
    pub_title: "Highlighted Publications",
    pub_desc: "A selection of research focused on epidemiology, public health, and computational sciences.",
    pub_more: "Explore my complete publication history and citations at:",
    theses_title: "Theses Supervised",
    theses_desc: "Master's and doctoral theses oriented, including ongoing research.",
    theses_list: [
      { student: "Myriam Velazquez", date: "2026 - Present", type: "Doctorate in Exact, Natural and Applied Sciences", inst: "FACEN-UNA", role: "Co-advisor" },
      { student: "Claudia Rolon", date: "2026 - Present", type: "Doctorate in Exact, Natural and Applied Sciences", inst: "FACEN-UNA", role: "Co-advisor" },
      { student: "Marcela Jiménez Zacur", date: "2026 - Present", type: "Doctorate in Computer Science", inst: "FPUNA", role: "Advisor" },
      { student: "César Ayala", date: "2026", type: "Doctorate in Computer Science", inst: "FPUNA", role: "Advisor" },
      { student: "Cesar Vian", date: "2025", type: "Master's in Computer Science", inst: "FPUNA", role: "Advisor" },
      { student: "Marcela Jiménez Zacur", date: "2021", type: "Master's in Conservation Biology", inst: "FACEN-UNA", role: "Co-advisor" },
      { student: "María Elena Damús", date: "2018", type: "Master's in Food Biotechnology", inst: "UNI", role: "Co-advisor" },
      { student: "Gladys Estigarribia", date: "2018", type: "Master's in Food Biotechnology", inst: "UNI", role: "Co-advisor" },
      { student: "Liza Ramírez", date: "2017", type: "Master's in Biotechnology Sciences", inst: "CEMIT-UNA", role: "Co-advisor" },
      { student: "Claudia Barboza", date: "2017", type: "Master's in Biotechnology Sciences", inst: "CEMIT-UNA", role: "Co-advisor" }
    ],
    bonsai_title: "The Art of Bonsai",
    bonsai_desc_1: "Beyond mathematics, programming, and epidemiology, I find balance and connection with nature through the care of Bonsai trees.",
    bonsai_desc_2: "This practice teaches me about patience, gradual growth, and attention to detail; virtues that are also essential in scientific research and technological development. It is a space for botanical creativity and tranquility.",
    bonsai_btn: "View my gallery on Instagram",
    footer_desc: "Scientist and Researcher combining biology, mathematical models, and data science to solve complex problems.",
    footer_contact: "Contact",
    footer_rights: "All rights reserved."
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');
  const toggleTheme = () => setIsDark(!isDark);

  // Paleta de colores dinámica según el tema
  const theme = {
    bgMain: isDark ? 'bg-slate-900' : 'bg-slate-50',
    bgSec: isDark ? 'bg-slate-800' : 'bg-white',
    bgThird: isDark ? 'bg-slate-800/50' : 'bg-slate-50',
    textMain: isDark ? 'text-slate-100' : 'text-slate-900',
    textSec: isDark ? 'text-slate-300' : 'text-slate-600',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
    border: isDark ? 'border-slate-700' : 'border-slate-200',
    navBg: isDark ? 'bg-slate-900/95 border-b border-slate-800' : 'bg-white/95 shadow-sm',
    card: isDark ? 'bg-slate-800 border-slate-700 shadow-lg' : 'bg-white border-slate-100 shadow-sm',
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme.bgMain} ${theme.textMain}`}>
      {/* Navbar */}
      <nav className={`${theme.navBg} sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className={`font-bold text-xl ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>Dr. Pastor Pérez</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#sobre-mi" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_about}</a>
              <a href="#experiencia" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_exp}</a>
              <a href="#proyectos" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_projects}</a>
              <a href="#cursos" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_courses}</a>
              <a href="#publicaciones" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_pub}</a>
              <a href="#tutorias" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_theses}</a>
              <a href="#cv" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_cv}</a>
              <a href="#bonsai" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_bonsai}</a>
              <a href="#contacto" className={`${theme.textSec} hover:text-emerald-500 transition`}>{t.nav_contact}</a>
              
              {/* Toggles */}
              <div className="flex items-center space-x-3 border-l border-slate-300 dark:border-slate-600 pl-4">
                <button onClick={toggleLang} className={`flex items-center gap-1 ${theme.textSec} hover:text-emerald-500 transition text-sm font-medium`} title="Cambiar Idioma">
                  <Globe size={18} /> {lang.toUpperCase()}
                </button>
                <button onClick={toggleTheme} className={`${theme.textSec} hover:text-emerald-500 transition`} title="Modo Oscuro/Claro">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            {/* Mobile menu button & Toggles */}
            <div className="flex items-center space-x-4 md:hidden">
              <button onClick={toggleLang} className={`${theme.textSec} hover:text-emerald-500 text-sm font-medium`}>
                {lang.toUpperCase()}
              </button>
              <button onClick={toggleTheme} className={`${theme.textSec} hover:text-emerald-500`}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleMenu} className={`${theme.textSec} hover:text-emerald-500`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${theme.bgSec} border-t ${theme.border}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#sobre-mi" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_about}</a>
              <a href="#experiencia" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_exp}</a>
              <a href="#proyectos" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_projects}</a>
              <a href="#cursos" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_courses}</a>
              <a href="#publicaciones" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_pub}</a>
              <a href="#tutorias" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_theses}</a>
              <a href="#cv" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_cv}</a>
              <a href="#bonsai" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_bonsai}</a>
              <a href="#contacto" onClick={toggleMenu} className={`block px-3 py-2 ${theme.textSec} hover:bg-emerald-900/10 rounded-md`}>{t.nav_contact}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="sobre-mi" className={`py-20 ${theme.bgSec} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className={`w-64 h-64 ${isDark ? 'bg-slate-700 border-emerald-900' : 'bg-slate-200 border-emerald-100'} rounded-full overflow-hidden border-4 flex items-center justify-center transition-colors duration-300 shadow-xl`}>
              <img 
                src="https://ui-avatars.com/api/?name=Pastor+Perez&size=256&background=059669&color=fff" 
                alt="Dr. Pastor E. Pérez Estigarribia" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h1 className={`text-4xl md:text-5xl font-extrabold ${theme.textMain} mb-4`}>
              {t.hero_title}
            </h1>
            <h2 className={`text-xl md:text-2xl ${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-medium mb-6`}>
              {t.hero_subtitle}
            </h2>
            <p className={`text-lg ${theme.textSec} mb-8 leading-relaxed`}>
              {t.hero_desc}
            </p>
          </div>
        </div>
      </section>

      {/* Proyectos de Investigación */}
      <section id="proyectos" className={`py-20 ${theme.bgSec} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <TestTube className={isDark ? 'text-emerald-400 mb-4' : 'text-emerald-600 mb-4'} size={40} />
            <h3 className={`text-3xl font-bold ${theme.textMain} mb-4`}>{t.projects_title}</h3>
            <p className={`${theme.textSec} max-w-2xl`}>{t.projects_desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {t.project_list.map((project, idx) => (
              <div key={idx} className={`p-6 rounded-xl border ${theme.border} ${isDark ? 'bg-slate-800/80' : 'bg-slate-50'} hover:border-emerald-500 transition duration-300 flex flex-col justify-between`}>
                <div>
                  <span className={`text-xs font-bold ${isDark ? 'bg-emerald-900/60 text-emerald-300' : 'bg-emerald-100 text-emerald-800'} px-2 py-1 rounded uppercase tracking-wide inline-block mb-3`}>
                    {project.date}
                  </span>
                  <h4 className={`text-lg font-bold ${theme.textMain} mb-2 leading-tight`}>{project.title}</h4>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{project.role}</p>
                  <p className={`text-sm ${theme.textMuted}`}>{project.org}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a 
              href="https://cv.conacyt.gov.py/publicar/cv?id=3af9ecaf6ada7eeb118573eda46e50fa" 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition shadow-sm ${isDark ? 'bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700' : 'bg-white text-emerald-700 border border-slate-200 hover:bg-slate-50'}`}
            >
              <ExternalLink size={20} /> {t.projects_link}
            </a>
          </div>
        </div>
      </section>

      {/* Cátedras y Cursos */}
      <section id="cursos" className={`py-20 ${theme.bgMain} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <Presentation className={isDark ? 'text-emerald-400 mb-4' : 'text-emerald-600 mb-4'} size={40} />
            <h3 className={`text-3xl font-bold ${theme.textMain} mb-4`}>{t.courses_title}</h3>
            <p className={`${theme.textSec} max-w-2xl`}>{t.courses_desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.teaching_list.map((course, idx) => (
              <div key={idx} className={`p-6 rounded-xl border ${theme.card} hover:-translate-y-1 transition duration-300`}>
                <span className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{course.date}</span>
                <h4 className={`text-lg font-bold ${theme.textMain} mt-1 mb-1`}>{course.title}</h4>
                <p className={`${theme.textMuted} text-sm mb-2`}>{course.inst}</p>
                <p className={`${theme.textSec} text-sm leading-relaxed`}>{course.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publicaciones" className={`py-20 ${theme.bgSec} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${theme.textMain} mb-4`}>{t.pub_title}</h3>
            <p className={`${theme.textSec} max-w-2xl mx-auto`}>{t.pub_desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 border rounded-xl ${theme.card} hover:shadow-md transition`}>
              <span className={`text-xs font-bold ${isDark ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800'} px-2 py-1 rounded uppercase tracking-wide`}>Nature Medicine</span>
              <h4 className={`font-bold ${theme.textMain} mt-3 mb-2`}>Modeling the impact of vaccine campaigns on the epidemic transmission dynamics of chikungunya virus outbreaks</h4>
              <p className={`text-sm ${theme.textMuted} mb-3`}>Pérez-Estigarribia, P. E., et al. (2025).</p>
            </div>

            <div className={`p-6 border rounded-xl ${theme.card} hover:shadow-md transition`}>
              <span className={`text-xs font-bold ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded uppercase tracking-wide`}>Applied Sciences</span>
              <h4 className={`font-bold ${theme.textMain} mt-3 mb-2`}>A mathematical model for COVID-19 with variable transmissibility and hospitalizations: A case study in Paraguay</h4>
              <p className={`text-sm ${theme.textMuted} mb-3`}>Shin, H. H., Sauer Ayala, C., Pérez-Estigarribia, P., et al. (2021).</p>
            </div>

            <div className={`p-6 border rounded-xl ${theme.card} hover:shadow-md transition`}>
              <span className={`text-xs font-bold ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'} px-2 py-1 rounded uppercase tracking-wide`}>Theoretical Population Biology</span>
              <h4 className={`font-bold ${theme.textMain} mt-3 mb-2`}>A class of fast-slow models for adaptive resistance evolution</h4>
              <p className={`text-sm ${theme.textMuted} mb-3`}>Pérez-Estigarribia, P. E., Bliman, P. A., & Schaerer, C. E. (2020).</p>
            </div>

            <div className={`p-6 border rounded-xl ${theme.card} hover:shadow-md transition`}>
              <span className={`text-xs font-bold ${isDark ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'} px-2 py-1 rounded uppercase tracking-wide`}>IEEE (ECC)</span>
              <h4 className={`font-bold ${theme.textMain} mt-3 mb-2`}>Modelling and control of Mendelian and maternal inheritance for biological control of dengue vectors</h4>
              <p className={`text-sm ${theme.textMuted} mb-3`}>Pérez-Estigarribia, P. E., Bliman, P. A., & Schaerer, C. E. (2021).</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
            <h4 className={`text-lg font-medium ${theme.textMain} mb-6`}>{t.pub_more}</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://scholar.google.es/citations?user=u6VMrDsAAAAJ&hl=en" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm font-medium">
                <BookOpen size={20} /> Google Scholar
              </a>
              <a href="https://www.researchgate.net/profile/Pastor-Enmanuel-Perez-Estigarribia" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition shadow-sm font-medium">
                <Microscope size={20} /> ResearchGate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorías */}
      <section id="tutorias" className={`py-20 ${theme.bgMain} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <Users className={isDark ? 'text-emerald-400 mb-4' : 'text-emerald-600 mb-4'} size={40} />
            <h3 className={`text-3xl font-bold ${theme.textMain} mb-4`}>{t.theses_title}</h3>
            <p className={`${theme.textSec} max-w-2xl`}>{t.theses_desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.theses_list.map((thesis, idx) => (
              <div key={idx} className={`p-5 rounded-lg border ${theme.border} ${theme.bgSec} hover:shadow-md transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${theme.textMain}`}>{thesis.student}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800'}`}>{thesis.date}</span>
                  </div>
                  <p className={`text-sm ${theme.textSec}`}>{thesis.type}</p>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>{thesis.inst}</p>
                </div>
                <div className="shrink-0">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${isDark ? 'border-slate-600 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                    {thesis.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies: Bonsai */}
      <section id="bonsai" className={`py-20 ${isDark ? 'bg-emerald-950 border-y border-emerald-900' : 'bg-emerald-900'} text-emerald-50 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Leaf className="text-emerald-400" size={32} />
              <h3 className="text-3xl font-bold text-white">{t.bonsai_title}</h3>
            </div>
            <p className="text-lg text-emerald-100 mb-6 leading-relaxed">
              {t.bonsai_desc_1}
            </p>
            <p className="text-emerald-200/80 mb-8 leading-relaxed">
              {t.bonsai_desc_2}
            </p>
            <a href="https://www.instagram.com/pastoreperez/" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 ${isDark ? 'bg-emerald-800 hover:bg-emerald-700' : 'bg-emerald-700 hover:bg-emerald-600'} text-white rounded-lg transition font-medium`}>
              <Instagram size={20} /> {t.bonsai_btn}
            </a>
          </div>
        </div>
      </section>

      {/* Sección CV Destacada */}
      <section id="cv" className={`py-20 ${theme.bgSec} transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-10 rounded-3xl border ${theme.border} ${isDark ? 'bg-slate-800/50' : 'bg-emerald-50'} flex flex-col items-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
              <Download size={32} />
            </div>
            <h3 className={`text-3xl font-bold ${theme.textMain} mb-4`}>{t.cv_title}</h3>
            <p className={`text-lg ${theme.textSec} mb-8 max-w-2xl`}>
              {t.cv_desc}
            </p>
            <a 
              href="https://cv.conacyt.gov.py/publicar/cv?id=3af9ecaf6ada7eeb118573eda46e50fa" 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${isDark ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
            >
              <Download size={20} /> {t.hero_cv_btn}
            </a>
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contacto" className={`${isDark ? 'bg-black border-t border-slate-800' : 'bg-slate-900'} text-slate-400 py-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white text-xl font-bold mb-4">{t.hero_title}</h4>
              <p className="mb-4 max-w-md text-sm leading-relaxed">{t.footer_desc}</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-white text-lg font-bold mb-4">{t.footer_contact}</h4>
              <p className="flex items-center gap-3 text-sm font-medium"><Mail size={18} /> peperez.estigarribia@gmail.com</p>
              <p className="flex items-center gap-3 text-sm font-medium"><Github size={18} /> <a href="https://github.com/Pastor-E-Perez-Estigarribia/" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">github.com/Pastor-E-Perez-Estigarribia</a></p>
              <p className="flex items-center gap-3 text-sm font-medium"><MapPin size={18} /> Luque, Paraguay</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800/50 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Pastor Enmanuel Pérez Estigarribia. {t.footer_rights}</p>
          </div>
        </div>
      </footer>

      {/* Botón Flotante de Contacto */}
      <a 
        href="mailto:peperez.estigarribia@gmail.com"
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        title={t.nav_contact}
      >
        <Mail size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:ml-3 transition-all duration-300 ease-in-out font-medium">
          {t.nav_contact}
        </span>
      </a>
    </div>
  );
}