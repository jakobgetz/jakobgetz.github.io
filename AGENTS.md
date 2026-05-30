<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Developer Rules

- **Mobile Responsiveness is Mandatory**: All UI views, components, and pages must be fully mobile responsive. Ensure that all CSS styles use flexible layouts, media queries, and responsive units to fit mobile screens down to 320px perfectly. Never use hardcoded pixel widths on layout containers.
- **Minimalist Aesthetic**: Maintain the sharp-cornered (0px border-radius), flat, high-contrast, warm pastel beige Korean cafe aesthetic. Do not add heavy 3D transforms, rotating keyframes, or floating/sliding animations.
- **Strict Separation of Content**: Never hardcode text content, blog items, projects, or publications directly into page/layout components. Always append new items to the JSON/markdown files under `/src/content/`.
