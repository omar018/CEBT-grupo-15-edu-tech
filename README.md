# Sintaxis Pedagógica · Plataforma de Match Estudiante-Docente UNAL

Plataforma inteligente y prototipo MVP para el proyecto de **Creación de Empresas de Base Tecnológica (CEBT)** de la **Universidad Nacional de Colombia**. 

Conecta a estudiantes con profesores y tutores basándose en la deducción interactiva de su **estilo de aprendizaje** (VAK, Ciclo de Kolb y ritmo de interacción), previniendo la deserción y reprobación en materias filtro.

---

## 🎨 Identidad Visual y Paleta de Colores UNAL (Sin kitUnal)
Inspirada en los valores y colores institucionales de la Universidad Nacional de Colombia:
- **Verde Institucional Clásico UNAL**: `#006837` (Acentos de rigor, identidad y encabezados).
- **Verde Lima UNAL**: `#94B43B` / `#84BD00` (Insignias de alto match, estados activos e interacción).
- **Verde Petróleo Oscuro**: `#081E12` / `#0B1711` (Superficies de alto contraste y tipografía sólida).
- **Superficie Lienzo / Marfil Académico**: `#F8FAF7` / `#FFFFFF` (Fondo limpio que evita la fatiga visual).
- **Acento Dorado / Ámbar**: `#D97706` (Indicadores de advertencia y compatibilidad intermedia).
- **Accesibilidad**: Cumplimiento estricto con WCAG AA y AAA en contraste de texto.

---

## 🧩 Arquitectura Microfrontends (`microfrontends.json`)
La plataforma implementa una arquitectura desacoplada por dominios funcionales:
1. **`diagnostic`**: Módulo interactivo de 5 pasos para deducir el método de aprendizaje del estudiante.
2. **`matcher`**: Motor algorítmico multidimensional de compatibilidad y explorador de profesores UNAL.
3. **`booking`**: Módulo de agendamiento de tutorías, acuerdos de aprendizaje y seguimiento.
4. **`cebt-metrics`**: Panel de validación de negocio según la estructura de pitch en 6 pasos y la **rúbrica de 100 puntos** de CEBT.

---

## 🧠 Algoritmo de Deducción y Matching Pedagógico
El motor calcula la distancia euclidiana normalizada sobre un vector de 6 dimensiones cognitivas:
$$\text{Similitud} = \max\left(50, \min\left(99, 100 \times \left(1 - \sqrt{\frac{1}{6} \sum_{i=1}^{6} \left(\frac{D_{\text{estudiante}, i} - D_{\text{docente}, i}}{100}\right)^2}\right)\right)\right)$$

### Dimensiones evaluadas:
1. **Canal Visual**: Diagramas de bloques, mapas conceptuales, visualización geométrica.
2. **Canal Auditivo**: Explicación dialéctica, analogías orales, debate socrático.
3. **Canal Kinestésico**: Práctica directa, código en vivo, simuladores y modelos a escala.
4. **Abstracción Teórica**: Rigor formal, deducción desde axiomas y demostraciones.
5. **Resolución Práctica**: Casos de estudio contextuales en Colombia y problemas tipo examen.
6. **Autonomía y Descubrimiento**: Mayéutica socrática vs. instrucción estructurada directiva.

---

## 🚀 Puesta en Marcha

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar pruebas unitarias (Vitest con tests parametrizados)
npm test

# Compilar para producción
npm run build
```

---

## 📋 Cumplimiento de Guardrails de Calidad
- **PR-01**: Cero artefactos de depuración (`console.log` eliminado).
- **PR-02**: Desestructuración segura con encadenamiento opcional `?.` y `??`.
- **PR-03**: Componentes modulares y cohesivos con menos de 180 líneas.
- **PR-04**: Cero props en estado inicial susceptible a cambios externos.
- **PR-07**: Validación temprana fail-fast con errores descriptivos.
- **PR-10**: Región accesible permanente con `role="status"` y `aria-live="polite"` montada en el DOM.
- **PR-12**: *Single Source of Truth* en envío de formularios reactivos.
- **PR-14**: Formateo nativo de fechas con `Intl.DateTimeFormat("es-CO")`.
- **PR-15**: Pruebas unitarias parametrizadas con `it.each` en Vitest (0% duplicación).
