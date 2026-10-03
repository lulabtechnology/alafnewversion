# Biblioteca artística ALAF

La entrega incluye **11 assets nuevos** creados con la herramienta integrada **ImageGen de OpenAI**. Los originales PNG se conservan en `src/assets/*-original.png`; la web utiliza las exportaciones WebP. `src/assets/assets.json` registra las dimensiones, transparencia y peso de cada exportación.

## Dirección artística

Collage de papel recortado, textura de fibras, lápiz e ilustración editorial. Celeste #A2DBE0, rosa #E8BFDA, verde #B0D468, blanco y tinta #183545. Las ilustraciones de personas son ficticias; no se presentan como fotos de estudiantes ni docentes de ALAF.

El logo oficial se conserva sin redibujar en `src/assets/logo.png`, procedente de https://alafinternationalacademy.com/alaf/logo.png. Alafito conserva su cabeza de pantalla, marco oscuro, rostro sonriente, suéter con la marca, pantalón verde y violeta y zapatos turquesa. Sus tres nuevas poses tienen fondo transparente.

## Uso de las piezas

| Archivo WebP | Uso |
|---|---|
| mundo-alaf | Portada y propuesta del colegio |
| familia-collage | Homeschool y Nosotros |
| alafito-saludo | Bienvenida en la portada |
| alafito-leyendo | Presentación de la mascota |
| alafito-guia | Orientación y página 404 |
| virtual-school | Página de clases virtuales |
| programacion | Área de pensamiento lógico y programación |
| finanzas | Educación financiera |
| emprendimiento | Proyectos de emprendimiento |
| campus-digital | Acceso de estudiantes |
| mural-cierre | Cierre artístico antes del bloque de admisiones |

Abre `ASSETS.html` para recorrer la biblioteca y abrir los PNG originales. `scripts/optimize-assets.py` solo redimensiona y comprime; conserva la composición, los originales y el canal alfa. Requiere Python y Pillow únicamente si deseas volver a exportar imágenes.

## Prompts finales

Los prompts siguientes corresponden a las llamadas de generación de las piezas seleccionadas. Para las tres poses de Alafito se proporcionaron como referencias el render del personaje y el logo oficial. El modo utilizado fue la herramienta integrada; no se utilizó una clave API ni el modo CLI.

### mundo-alaf

```text
Use case: stylized-concept.
Asset type: original artistic website hero for ALAF, a virtual school and homeschool academy.
Create a striking, sophisticated handmade paper collage with ink and colored pencil details. It should feel like a real art director commissioned a joyful contemporary children's book cover, with physical cut-paper edges, visible paper grain, restrained imperfect black linework and deliberate bold composition.

Scene: an open school notebook unfolds into a small imaginative world of learning. From its pages rise a crisp architectural staircase, a small house with a plant, a flat laptop, a looping path, a large striped pencil and three interlocking puzzle-inspired shapes. The arrangement is an editorial visual metaphor for learning from home and creating projects. Use a few bold oversized forms rather than many tiny scattered icons. Balanced asymmetry, layered planes and energetic diagonals with generous breathing space. The notebook is the visual anchor in the lower center.

Palette: sky cyan #A2DBE0, pastel pink #E8BFDA and lively lime green #B0D468 from the ALAF logo, complemented by white paper and dark ink #183545. Use these actual hues in large confident fields rather than muddy pastel blends. Solid white outer background with collage edges cleanly meeting white; the composition must work inside a white web page. A tiny amount of tactile cast shadow between paper layers only. Wide 3:2 composition; keep the main art crop-safe and all objects fully in frame.

No people, no faces, no mascot, no brand logo, no text, no letters, no numerals, no watermark. The original ALAF logo and Alafito will be placed separately in the website code. No glossy plastic, no 3D toy rendering, no gradients, no AI fantasy sheen, no generic SaaS floating UI cards, no confetti, no background blob, no photograph. Expressive, artful, clean and professionally composed.
```

### familia-collage

```text
Use case: illustration-story.
Asset type: original artistic website illustration for ALAF, matching a handmade paper-collage education art direction.
Create a joyful, sophisticated cut-paper and colored-pencil illustration of a Latin American mother and her school-aged daughter studying together at a home table. The daughter is writing in an open notebook; the mother sits beside her, pointing gently to one exercise. A simple open laptop, a pencil cup and a small plant complete the scene. A small paper house motif behind the table connects the idea of school and home. Faces and bodies should be deliberately illustrated, flat and expressive, with simple tasteful dark-ink features, human warmth and confident handcrafted shapes. Fictional people, no photographic likeness.

Use tangible paper layers with irregular cut edges, subtle fiber grain, restrained pencil hatching and a few crisp imperfect ink lines. Solid blocks of sky cyan #A2DBE0, pastel pink #E8BFDA and lime green #B0D468, white paper and dark ink #183545. Dark curly hair, simple comfortable clothes. Wide 3:2 scene with generous white outer margins and an airy white background; all people and objects comfortably inside frame. A strong centered composition suited to responsive cropping.

No text, no letters, no numerals, no watermark, no branded clothing, no logo, no mascot, no 3D toy figures, no glossy plastic, no photograph, no gradient, no generic stock vector figures, no confetti or floating interface cards. Make it feel like commissioned contemporary children's book art, with intentional drawing and a distinctive human-made visual rhythm.
```

### alafito-saludo

```text
Use case: style-transfer with identity preservation.
Image 1 is Alafito, the existing mascot and the identity reference. Image 2 is the original ALAF logo, a supporting reference for the small mark on the sweater.
Transform Alafito into a sophisticated handmade cut-paper and colored-pencil illustration that matches an artistic school website. Preserve the exact recognizable square white screen face, rounded charcoal frame, expressive black oval eyes and eyebrows, warm smiling mouth, light cream knit sweater, the small ALAF pastel three-piece puzzle and ALAF wordmark on the chest, viewer-left green trouser leg, viewer-right purple trouser leg, peach hands and rounded turquoise shoes. Keep the head-to-body proportions. Do not redesign the mascot or logo. The logo on the sweater is small and faithful to the reference, with only the word ALAF.
Tactile paper fiber, slightly irregular cut edges, gentle pencil hatching, crisp restrained dark ink linework. Flat illustrated character with a little layered paper depth, no glossy plastic and no toy 3D rendering. Full body centered, all hands, head and shoes visible with comfortable margins. One mascot only, no other people or objects except the stated prop. True transparent background, no backdrop, no white rectangle, no floor or ground shadow. No words outside the existing sweater logo, no watermark.
Pose: standing in a welcoming three-quarter front view, smiling and waving one hand, the other arm relaxed. No props.
```

### alafito-leyendo

```text
Use case: style-transfer with identity preservation.
Image 1 is Alafito, the existing mascot and the identity reference. Image 2 is the original ALAF logo, a supporting reference for the small mark on the sweater.
Transform Alafito into a sophisticated handmade cut-paper and colored-pencil illustration that matches an artistic school website. Preserve the exact recognizable square white screen face, rounded charcoal frame, expressive black oval eyes and eyebrows, warm smiling mouth, light cream knit sweater, the small ALAF pastel three-piece puzzle and ALAF wordmark on the chest, viewer-left green trouser leg, viewer-right purple trouser leg, peach hands and rounded turquoise shoes. Keep the head-to-body proportions. Do not redesign the mascot or logo. The logo on the sweater is small and faithful to the reference, with only the word ALAF.
Tactile paper fiber, slightly irregular cut edges, gentle pencil hatching, crisp restrained dark ink linework. Flat illustrated character with a little layered paper depth, no glossy plastic and no toy 3D rendering. Full body centered, all hands, head and shoes visible with comfortable margins. One mascot only, no other people or objects except the stated prop. True transparent background, no backdrop, no white rectangle, no floor or ground shadow. No words outside the existing sweater logo, no watermark.
Pose: seated comfortably with the full legs and turquoise shoes visible, holding and reading an open cyan paper book, looking down toward the book with happy curious eyes. Keep the cream sweater chest logo visible above the book. The book contains no text.
```

### alafito-guia

```text
Use case: style-transfer with identity preservation.
Image 1 is Alafito, the existing mascot and the identity reference. Image 2 is the original ALAF logo, a supporting reference for the small mark on the sweater.
Transform Alafito into a sophisticated handmade cut-paper and colored-pencil illustration that matches an artistic school website. Preserve the exact recognizable square white screen face, rounded charcoal frame, expressive black oval eyes and eyebrows, warm smiling mouth, light cream knit sweater, the small ALAF pastel three-piece puzzle and ALAF wordmark on the chest, viewer-left green trouser leg, viewer-right purple trouser leg, peach hands and rounded turquoise shoes. Keep the head-to-body proportions. Do not redesign the mascot or logo. The logo on the sweater is small and faithful to the reference, with only the word ALAF.
Tactile paper fiber, slightly irregular cut edges, gentle pencil hatching, crisp restrained dark ink linework. Flat illustrated character with a little layered paper depth, no glossy plastic and no toy 3D rendering. Full body centered, all hands, head and shoes visible with comfortable margins. One mascot only, no other people or objects except the stated prop. True transparent background, no backdrop, no white rectangle, no floor or ground shadow. No words outside the existing sweater logo, no watermark.
Pose: standing full body, one hand pointing toward the upper left of the image like a friendly guide, the other hand relaxed. Keep the frame face and sweater logo unobstructed. No props.
```

### virtual-school

```text
Use case: illustration-story. Show a lively artistic metaphor for a virtual class: two school-aged children, a girl and a boy, each seated at their own small home desk using a laptop, and a friendly illustrated adult teacher visible inside a large central computer screen. Curving ink paths connect the three learning spaces. Books, one pencil cup and one plant add human detail. Fictional flat illustrated faces with expressive simple ink features. An airy horizontal composition, clear silhouettes and no branded clothing. This is a book illustration of remote learning, not a screenshot of software.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

### programacion

```text
Use case: stylized-concept. A tactile paper laptop, a large striped pencil and a winding path of geometric blocks form a playful coding workshop. On the screen show three simple colored geometric blocks joined by a black line; no written code. Add a small folded-paper robot made only from simple cubes, and a tiny plant. Bold, clever, compact centered still life; no people or mascot.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

### finanzas

```text
Use case: stylized-concept. A friendly sculpted-paper piggy bank, a stack of simple round paper coins, three blank savings envelopes and a tiny plant growing from a jar create an artistic still life for children's financial education. The objects sit on one cut-paper tabletop fragment. Different sizes, subtle asymmetry, calm confident composition. No dollar signs, numbers, bank logos, investment charts, people or mascot.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

### emprendimiento

```text
Use case: stylized-concept. An imaginative miniature paper market stall with a pastel cyan and pink striped awning, small handmade notebooks, a potted plant, kraft paper parcels and a simple lime green shopping bag. A few sketchy construction lines and an open notebook below suggest planning and creating a small project. Artful, bold still life, no readable signs, money symbols, people or mascot.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

### campus-digital

```text
Use case: stylized-concept. A central open paper laptop surrounded by an open book, three clean paper folders in cyan, pink and lime, and a small pencil. A drawn arching connection line brings the resources together. On the laptop screen show abstract blocks and one paper-book symbol only, no actual app UI and no invented course text. Airy optimistic collage of digital study resources, no people or mascot.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

### mural-cierre

```text
Use case: stylized-concept. Create a sweeping panoramic handmade collage landscape for the closing section of an artistic education website. A large open paper book becomes a bridge connecting a small home, a schoollike doorway without signs, a tall striped pencil, curving stairs, leafy plants, and three pastel puzzle-inspired forms. The composition has strong diagonals, purposeful visual rhythm and a quiet white sky. Arrange all essential elements along the central horizontal band so the art works as a panoramic 3:1 crop; no elements near the top or bottom edge. Do not copy a literal existing hero image; create a new wider landscape. No people or mascot.
Art direction: sophisticated handmade cut-paper collage with colored-pencil hatching and restrained imperfect dark ink linework. Physical paper fiber, irregular cut edges, a little tactile layer depth, deliberate bold composition, contemporary children's book art. Palette: sky cyan #A2DBE0, pastel pink #E8BFDA, lime green #B0D468, white paper and dark ink #183545. Warm, joyful and artfully composed. Solid white outer background and crop-safe margins. No text, letters, numerals, logo, watermark, glossy plastic, toy 3D, photograph, gradients, confetti or generic floating SaaS interface cards. Wide 3:2 composition unless otherwise stated.
```

## Tipografía e íconos

Plus Jakarta Sans se sirve localmente, con su licencia SIL OFL en `OFL.txt`. Los íconos de navegación son SVG incluidos en el código. Los textos y botones se renderizan como HTML, no dentro de las imágenes.

