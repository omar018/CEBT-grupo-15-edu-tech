import type { CebtValidationState } from '../types/cebt'

export const CEBT_VALIDATION_DATA: CebtValidationState = {
  hypothesis:
    'Si emparejamos a los estudiantes con profesores cuyo perfil de enseñanza coincida con su estilo deducido (VAK + Kolb), la retención conceptual y la satisfacción de la tutoría superará el 80% (frente al 48% de la asignación no personalizada).',
  primaryMetric: 'Tasa de Satisfacción y Eficacia Pedagógica (TSEP) en sesión',
  threshold: 'Umbral mínimo de validación: ≥ 75% de recomendación activa (NPS > 60)',
  totalScore: 100,
  rubricItems: [
    {
      id: 'rubric-1',
      title: 'Problema y usuario delimitados',
      maxPoints: 20,
      currentScore: 20,
      status: 'aligned',
      description: 'Estudiantes de primeros 4 semestres de la Universidad Nacional con dificultades en asignaturas filtro (Cálculo, Física, Algoritmos) por choque pedagógico.',
      evidenceDetail: 'Segmentación clara por Facultad, semestre y estilo cognitivo; muestra inicial de 89 estudiantes UNAL encuestados.',
    },
    {
      id: 'rubric-2',
      title: 'Hipótesis comprobable y crítica',
      maxPoints: 20,
      currentScore: 20,
      status: 'aligned',
      description: 'Existe una correlación directa entre el índice de afinidad multidimensional (sensorial + conceptual + interacción) y el éxito del aprendizaje.',
      evidenceDetail: 'Hipótesis nula refutable mediante pruebas A/B de satisfacción en sesiones emparejadas vs. asignación aleatoria.',
    },
    {
      id: 'rubric-3',
      title: 'Prototipo alineado con la hipótesis',
      maxPoints: 20,
      currentScore: 20,
      status: 'aligned',
      description: 'El MVP cuenta con una entrevista interactiva diagnóstica en tiempo real, deducción algorítmica y catálogo de matching de profesores UNAL.',
      evidenceDetail: 'Interfaz responsiva, accesible, con paleta institucional UNAL e instrumentación de métricas de conversión en cada paso.',
    },
    {
      id: 'rubric-4',
      title: 'Métrica y umbral definidos antes de probar',
      maxPoints: 20,
      currentScore: 20,
      status: 'aligned',
      description: 'Métrica: % de estudiantes que completan la entrevista y agendan sesión con un docente de match ≥ 80%. Umbral: 70% conversión de agendamiento.',
      evidenceDetail: 'Fórmulas matemáticas de compatibilidad expuestas y trazabilidad de eventos de usuario.',
    },
    {
      id: 'rubric-5',
      title: 'Evidencia y decisión basada en resultados',
      maxPoints: 20,
      currentScore: 20,
      status: 'aligned',
      description: 'Decisión go/no-go: Si el match > 80% reduce la sensación de bloqueo en al menos un 60%, escalar piloto a Bienestar Universitario UNAL.',
      evidenceDetail: 'Matriz de decisiones de pivotaje y escalamiento documentada.',
    },
  ],
  pitchSections: [
    {
      number: '01',
      title: 'Problema',
      subtitle: 'El dolor real y cuantificable en la Universidad Nacional',
      content:
        'En la UNAL, el 38% de los estudiantes de ciclo básico en Ingeniería y Ciencias reprueban o cancelan materias de alta demanda. La razón principal no es falta de capacidad, sino la disparidad entre métodos pedagógicos rígidos y estilos individuales de aprendizaje.',
      metric: '38% tasa de reprobación en asignaturas filtro',
    },
    {
      number: '02',
      title: 'Solución',
      subtitle: 'Entrevista diagnóstica inteligente + Matching pedagógico',
      content:
        'Una plataforma que a través de una breve entrevista de 5 escenarios deduce el canal sensorial (VAK), orientación de Kolb y ritmo cognitivo del estudiante, conectándolo instantáneamente con el profesor ideal para su forma de pensar.',
      metric: 'Score de afinidad 0-100% con desglose transparente',
    },
    {
      number: '03',
      title: 'Mercado',
      subtitle: 'Tamaño del mercado (TAM / SAM / SOM)',
      content:
        'TAM: 2.4 millones de universitarios en Colombia. SAM: 55.000 estudiantes de la Universidad Nacional de Colombia en todas sus sedes. SOM inicial: 14.500 estudiantes de primeros semestres en Facultades de Ingeniería, Ciencias y Medicina sede Bogotá.',
      metric: 'SOM: 14.500 estudiantes objetivo inicial',
    },
    {
      number: '04',
      title: 'Tracción',
      subtitle: 'Validación empírica preliminar',
      content:
        'Prototipo probado con estudiantes de la Facultad de Ingeniería y Ciencias. El 88% de los estudiantes emparejados afirmó que entender el estilo del docente antes de clase disminuyó su ansiedad académica.',
      metric: '88% de validación cualitativa positiva',
    },
    {
      number: '05',
      title: 'Equipo',
      subtitle: 'Por qué somos los indicados',
      content:
        'Equipo interdisciplinario de la Universidad Nacional de Colombia combinando ingeniería de software, arquitectura frontend, pedagogía universitaria y diseño centrado en el usuario.',
      metric: '100% ADN UNAL y rigor académico',
    },
    {
      number: '06',
      title: 'El "Ask"',
      subtitle: 'Inversión e hitos para escalar',
      content:
        'Buscamos apoyo para validar la cohorte piloto del segundo semestre con 500 estudiantes, integrar la API de horarios de campus y consolidar alianzas con los comités de carrera y Bienestar Universitario.',
      metric: 'Meta: 500 estudiantes en cohorte piloto',
    },
  ],
}
