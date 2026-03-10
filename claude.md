# CLAUDE.md — Sitio Web Lanzamiento Ebook
## "Odontología desde la panza" — Od. Victoria Bernardi

---

## Contexto del proyecto

Sitio web / landing page para la venta del ebook **"Odontología desde la panza: cómo cuidar tu sonrisa y la de tu bebé"** de Od. Victoria Bernardi.

El sitio tiene un único objetivo: **convertir visitas en compras**. No es un portfolio ni un blog — es una landing page de venta directa con link a Hotmart.

---

## Sobre la autora

- **Nombre:** Od. Bernardi Victoria
- **Especialidad:** Odontología pediátrica y general
- **Instagram:** @victoriabernardi.od (2.861 seguidores)
- **TikTok:** @victoriabernardii (1.184 seguidores, 45.4K me gusta)
- **Ubicación:** San Luis Capital, Argentina (mudanza a CABA en 2027)
- **Tono de comunicación:** Cercano, coloquial, profesional. Tutea. Usa "vos", "che". Habla como le hablaría a una paciente.

---

## Sobre el ebook

- **Título:** "Odontología desde la panza: cómo cuidar tu sonrisa y la de tu bebé"
- **Formato:** PDF digital, 48 páginas, diseño profesional en tonos pastel/rosa
- **Precio de lanzamiento:** USD 7
- **Precio regular:** USD 12
- **Plataforma de venta:** Hotmart
- **Público objetivo:** Embarazadas, mamás/papás con bebés de 0 a 2 años, familiares que buscan regalo útil

### Contenido del ebook (4 partes)
1. **La salud bucal empieza antes de nacer** — ventana de infectividad, transmisión bacteriana madre-bebé
2. **Para la embarazada** — seguridad de tratamientos, caries/gingivitis/granuloma del embarazo
3. **Para el nuevo integrante** — primera consulta, erupción dentaria, higiene desde recién nacido, técnicas de cepillado
4. **Flúor, lactancia y chupete** — dentífrico, concentraciones, mitos de lactancia, caries de biberón, recomendaciones de chupete

### Propuesta de valor principal
- Único ebook en español argentino que cubre embarazo + primeros 2 años
- Escrito por odontóloga con experiencia clínica real
- Lenguaje accesible, sin jerga técnica
- Historias reales del consultorio
- Promesa de actualizaciones futuras incluidas

---

## Estructura de la landing page

El sitio tiene una sola página con estas secciones en orden:

### 1. HERO
- Título del ebook
- Imagen de la portada del ebook
- Subtítulo: "Todo lo que necesitás saber sobre la salud bucal durante el embarazo y los primeros años de tu bebé"
- Botón CTA principal: "Quiero el ebook — USD 7"
- Urgencia: "Precio especial de lanzamiento"

### 2. PARA QUIÉN ES
- "Si estás embarazada, tenés un bebé de 0 a 2 años, o conocés a alguien que sí, este ebook es para vos"
- 3 bullets con las situaciones que resuelve

### 3. EL PROBLEMA (neuroventas — dolor antes que solución)
- Sección que nombra la confusión y los mitos que tienen las mamás
- Tono: empático, no alarmista
- Ejemplos: "¿Podés ir al dentista embarazada?", "¿Cuándo cepillarle los dientes al bebé?", "¿El gel anestésico es seguro?"

### 4. QUÉ VAS A APRENDER
- Los 4 temas principales del ebook con íconos o ilustraciones
- Bullets con los temas más específicos (ventana de infectividad, técnicas de cepillado, flúor, chupete, etc.)

### 5. SOBRE LA AUTORA
- Foto de Victoria
- Bio breve: odontóloga, San Luis, especializada en niños y embarazadas
- Mención de su Instagram
- Tono cercano, no curricular

### 6. TESTIMONIOS
- Placeholder para 2-3 testimonios reales (se completan después del lanzamiento)
- Diseño preparado para agregar quotes con nombre y foto

### 7. CTA FINAL
- Repetir botón de compra
- Precio: USD 7 (lanzamiento) → USD 12 (regular)
- "Acceso inmediato al descargar"
- Link a Hotmart (placeholder: `HOTMART_LINK`)

### 8. FOOTER
- Nombre de la autora
- Instagram: @victoriabernardi.od
- Sin links innecesarios — mantener foco en la conversión

---

## Diseño y estética

### Paleta de colores
Inspirada en el ebook — minimalista, suave, profesional pero cálida.

```
--color-primary: #C8A4A4      /* Rosa palo — color principal */
--color-secondary: #E8D5D5    /* Rosa claro — fondos suaves */
--color-accent: #8B5E5E       /* Rosa oscuro — CTAs y énfasis */
--color-text: #2C2C2C         /* Casi negro — texto principal */
--color-text-light: #666666   /* Gris — texto secundario */
--color-bg: #FDFAF9           /* Blanco cálido — fondo general */
--color-bg-section: #F5EDED   /* Rosa muy suave — secciones alternadas */
--color-white: #FFFFFF
```

### Tipografía
```
--font-heading: 'Playfair Display', serif    /* Títulos — elegante, femenino */
--font-body: 'Lato', sans-serif             /* Cuerpo — legible, moderno */
```

### Estilo general
- Diseño limpio y minimalista
- Mucho espacio en blanco
- Ilustraciones suaves (si se usan — SVG simples de dientes, bebés, embarazo)
- Fotografía: foto real de Victoria (profesional o de buena calidad)
- Mobile-first — la mayoría del tráfico viene de Instagram y TikTok (mobile)
- Sin elementos que distraigan del CTA principal

### Botones CTA
- Fondo: `--color-accent` (#8B5E5E)
- Texto: blanco
- Hover: oscurecer 10%
- Border radius: 8px
- Padding generoso
- Texto: "Quiero el ebook — USD 7"

---

## Stack técnico recomendado

### Opción A — HTML/CSS/JS puro (recomendado para rapidez)
- Un solo archivo `index.html`
- CSS en `styles.css`
- Sin frameworks — máxima velocidad de carga
- Deploy en Netlify o Vercel (gratis, drag & drop)

### Opción B — Next.js (si se quiere escalar)
- Para cuando se agreguen más ebooks o blog
- Deploy en Vercel

**Para el lanzamiento en menos de 2 semanas: usar Opción A.**

---

## Integraciones

### Hotmart (venta)
- El botón CTA abre el link de Hotmart en nueva pestaña
- Placeholder en el código: `HOTMART_LINK`
- Reemplazar con el link real una vez que esté configurado en Hotmart

### Analytics (opcional para lanzamiento)
- Google Analytics 4 o Plausible
- Evento de conversión: click en botón CTA
- Placeholder: `GA_MEASUREMENT_ID`

### Instagram link
- El footer y la sección de la autora linkean a `https://www.instagram.com/victoriabernardi.od/`

---

## SEO básico

```html
Odontología desde la panza — Ebook de Od. Victoria Bernardi




```

---

## Contenido de texto (copy listo para usar)

### Hero
```
Headline: "Odontología desde la panza"
Subheadline: "Todo lo que nadie te explica sobre la salud bucal durante el embarazo y los primeros años de tu bebé"
CTA: "Quiero el ebook — USD 7"
Urgencia: "Precio especial de lanzamiento · Sube a USD 12 pronto"
```

### Para quién es
```
"Si te preguntaste alguna vez si podías ir al dentista embarazada,
cuándo llevar a tu bebé por primera vez, o cómo cepillarle los dientes
desde que sale el primero — este ebook es para vos."
```

### Sobre la autora
```
"Soy Victoria Bernardi, odontóloga especializada en niños y embarazadas
en San Luis, Argentina. En el consultorio me pasa mucho que las mamás
llegan con dudas que nadie les resolvió, o con creencias que llevan
generaciones y resultan ser mitos.

Este ebook es todo lo que les digo a mis pacientes en la consulta,
escrito para que lo tengas siempre a mano."
```

### CTA final
```
"Acceso inmediato · PDF descargable · Actualizaciones incluidas"
"Precio de lanzamiento: USD 7"
Botón: "Quiero el ebook ahora"
```

---

## Archivos necesarios

- `portada-ebook.jpg` — imagen de la portada del ebook (exportar del PDF)
- `foto-victoria.jpg` — foto profesional o de buena calidad de Victoria
- `favicon.ico` — puede ser un ícono de diente simple

---

## Lo que NO hacer

- No agregar menú de navegación con múltiples links — mantener foco en conversión
- No usar más de 2 fuentes tipográficas
- No poner precio en la sección hero sin el contexto de "lanzamiento" — siempre acompañado de urgencia
- No usar colores brillantes o contrastantes — mantener la paleta suave
- No hacer scroll infinito — la página tiene que ser larga pero no agotadora
- No poner el botón de compra solo en el footer — repetirlo al menos 3 veces a lo largo de la página

---

## Frase que resume el objetivo del sitio

> El visitante llega desde Instagram o TikTok, ya con algo de confianza en Victoria.
> El sitio tiene que confirmar esa confianza y eliminar cualquier fricción para comprar.
> Cada sección existe para llevar al visitante al botón de compra.
