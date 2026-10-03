import { button, icon, sectionTitle, faq, cta } from '../components.mjs';

const programs = {
  virtual: {
    title: 'Virtual School', route: '/virtual-school/',
    eyebrow: 'VIRTUAL SCHOOL / ALAF', heading: 'Clases en vivo.<br>De lunes a jueves.',
    description: 'El estudiante se conecta con docentes y compañeros en tiempo real. El horario se adapta a su etapa educativa e incluye actividades guiadas y colaborativas.',
    image: 'virtual-school.webp', alt: 'Ilustración de estudiantes conectados a una clase con una docente', imageCaption: 'Una ilustración de las clases que conectan a docentes y estudiantes.',
    tags: ['Lunes a jueves', 'Horario por etapa', 'Clases en vivo'],
    introTitle: 'Qué hace el estudiante.',
    intro: 'La rutina se organiza alrededor de las sesiones con el grupo, las actividades y la evaluación del aprendizaje.',
    items: [ ['book','Conectarse a clase','Participa en sesiones en vivo de lunes a jueves. Consulta el horario del grado antes de elegir el programa.'], ['chat','Trabajar con el grupo','Las clases incluyen participación, actividades guiadas y trabajo colaborativo con los compañeros.'], ['globe','Usar recursos digitales','El material de estudio está disponible en formato digital para trabajar desde casa.'], ['compass','Revisar su progreso','La evaluación incluye diagnósticos, proyectos, rúbricas y reportes del aprendizaje.'] ],
    fitHeading: 'Revisa cómo encaja<br>en su rutina.',
    fitText: 'Para elegir esta modalidad, considera el tiempo de conexión y el entorno de estudio que puede organizar tu familia.',
    fitBullets: ['Disponibilidad para las sesiones de lunes a jueves.', 'Conexión a internet y un dispositivo adecuado.', 'Un espacio de estudio y acompañamiento familiar.'],
    questions: [ ['¿Las clases se imparten todos los días?', 'La propuesta publicada por ALAF establece clases en vivo de lunes a jueves. Consulta cómo se distribuyen las sesiones para el grado de interés.'], ['¿Cuál es el horario de mi hijo?', 'El horario se adapta a la etapa del estudiante. Indica el grado a admisiones para solicitar el horario correspondiente; no hay un horario único publicado para todos los niveles.'], ['¿Qué calendario puedo consultar?', 'ALAF presenta calendario panameño de marzo a diciembre e internacional de agosto a junio. Confirma las fechas de inicio y disponibilidad del programa con admisiones.'], ['¿Cómo ingresamos a las clases y los materiales?', 'El acceso de estudiantes se mantiene en el campus virtual de ALAF. Solicita las indicaciones de acceso y requisitos técnicos del programa antes de comenzar.'] ],
    otherRoute: 'homeschool', otherName: 'Homeschool acompañado', otherText: 'La familia organiza el estudio con guías de ALAF, fechas de entrega y evaluaciones.'
  },
  homeschool: {
    title: 'Homeschool acompañado', route: '/homeschool/',
    eyebrow: 'HOMESCHOOL ACOMPAÑADO / ALAF', heading: 'Homeschool.<br>Con guía de ALAF.',
    description: 'La familia organiza el tiempo de estudio con recursos y orientación del colegio. Hay fechas tope para entregar actividades y presentar evaluaciones.',
    image: 'familia-collage.webp', alt: 'Ilustración de papel recortado de una madre y su hija trabajando en un cuaderno', imageCaption: 'El estudio en casa también se organiza en familia.',
    tags: ['Rutina familiar', 'Guías y orientación', 'Entregas y evaluaciones'],
    introTitle: 'Cómo se organiza el trabajo.',
    intro: 'La flexibilidad permite distribuir el tiempo en casa. Las actividades, las entregas y la evaluación dan continuidad al programa.',
    items: [ ['clock','Planificar la semana','La familia distribuye el trabajo según su rutina y las fechas establecidas para las actividades.'], ['book','Trabajar con guías','El estudiante utiliza los materiales y recursos educativos digitales de ALAF.'], ['heart','Recibir orientación','ALAF ofrece supervisión del trabajo y orientación para padres durante el proceso.'], ['calendar','Entregar y evaluar','El programa establece fechas tope para actividades y evaluaciones. La flexibilidad mantiene compromisos académicos.'] ],
    fitHeading: 'La familia tiene<br>un papel activo.',
    fitText: 'Antes de elegir Homeschool, revisa cuánto tiempo puede dedicar la familia a organizar y acompañar el estudio.',
    fitBullets: ['Un adulto disponible para organizar el trabajo en casa.', 'Tiempo para seguir las guías y cumplir las entregas.', 'Comunicación con ALAF para conocer el seguimiento.'],
    questions: [ ['¿Se puede estudiar a cualquier ritmo?', 'La familia puede organizar el tiempo de estudio, con fechas tope de entrega y evaluación. Consulta el calendario de actividades para planificar el trabajo.'], ['¿Necesitamos experiencia previa?', 'ALAF ofrece recursos, tutorías y orientación para padres. Pide información sobre cómo se inicia el programa y cómo se coordina el acompañamiento.'], ['¿Quién acompaña el trabajo en casa?', 'La familia participa en la organización y el estudio. ALAF aporta recursos, orientación y supervisión; consulta las responsabilidades específicas del programa.'], ['¿Hay evaluación del aprendizaje?', 'Sí. La propuesta de ALAF incluye diagnósticos, proyectos, rúbricas y reportes. Solicita la organización de entregas y evaluaciones del grado que necesitas.'] ],
    otherRoute: 'virtual-school', otherName: 'Virtual School', otherText: 'Clases en vivo de lunes a jueves, con docentes, compañeros y un horario según la etapa del estudiante.'
  }
};

export function program(site, type) {
  const p=programs[type];
  return {title:p.title,description:p.description,prefix:'../',route:p.route,active:'modalidades',body:`
<section class="page-hero program-page"><div class="container"><nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="../index.html">Inicio</a><span aria-hidden="true">/</span><a href="../index.html#servicios">Modalidades</a><span aria-hidden="true">/</span><span aria-current="page">${p.title}</span></nav><div class="page-hero-layout"><div><p class="eyebrow">${p.eyebrow}</p><h1>${p.heading}</h1><p class="hero-description">${p.description}</p><div class="hero-actions">${button('../admisiones/index.html#consulta','Consultar este programa')}${button('#como-funciona','Cómo funciona',{secondary:true})}</div><div class="tag-row">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div><figure class="page-hero-image"><img src="../assets/${p.image}" alt="${p.alt}" width="1536" height="1024" fetchpriority="high"><figcaption>${p.imageCaption}</figcaption></figure></div></div></section>
<section class="section" id="como-funciona"><div class="container">${sectionTitle('EL DÍA A DÍA',p.introTitle,p.intro)}<div class="feature-grid">${p.items.map(([symbol,title,text])=>`<article class="feature"><span class="feature-icon">${icon(symbol)}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>
<section class="section fit-section"><div class="container fit-layout"><div>${sectionTitle('PARA ORGANIZARTE',p.fitHeading,p.fitText)}<ul class="check-list">${p.fitBullets.map(t=>`<li>${icon('check')}${t}</li>`).join('')}</ul></div><aside class="orientation-card"><p class="eyebrow">ANTES DE MATRICULAR</p><h3>Grado, modalidad<br>y calendario.</h3><p>Comparte esos tres datos para solicitar los horarios, costos, requisitos y servicios incluidos en el programa.</p>${button('../admisiones/index.html#consulta','Pedir información',{secondary:true})}<img src="../assets/alafito-guia.webp" width="1145" height="1374" loading="lazy" alt="Alafito, mascota de ALAF"></aside></div></section>
<section class="section"><div class="container faq-layout">${sectionTitle('DUDAS SOBRE EL PROGRAMA','Antes de elegir<br>esta modalidad.')}<div>${faq(p.questions,'preguntas')}</div></div></section>
<section class="other-program"><div class="container other-program-layout"><div><p class="eyebrow">COMPARA LA OTRA OPCIÓN</p><h2>${p.otherName}</h2><p>${p.otherText}</p></div>${button(`../${p.otherRoute}/index.html`,'Ver esta modalidad',{secondary:true})}</div></section>
${cta(site,'../')}`};
}
