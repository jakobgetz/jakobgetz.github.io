---
title: The Power of Modern CSS light-dark()
date: 2026-05-28
description: Exploring how the new Baseline-supported light-dark() function makes theme management in modern web design cleaner and easier than ever.
tags: CSS, Webdev
---

For a long time, implementing dark mode on the web required writing duplicate media queries or complex class-based selector overrides:

```css
/* The old way */
:root {
  --bg: #ffffff;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #121212;
  }
}
```

With the introduction of the standard `light-dark()` function (Baseline since mid-2024), we can declare this directly in a single line:

```css
/* The modern way */
:root {
  color-scheme: light dark;
  --bg: light-dark(#ffffff, #121212);
}
```

### How does it work?

The browser computes the value of `light-dark()` based on the calculated `color-scheme` property of the element itself (or inherited from its parent). 

By dynamically updating the `color-scheme` property of the `html` tag via a simple JavaScript switch, we can override the system setting instantly:

```javascript
// Toggle logic
document.documentElement.style.colorScheme = 'dark';
```

This represents a major step forward for clean styling architecture, and is fully utilized on this personal website!
