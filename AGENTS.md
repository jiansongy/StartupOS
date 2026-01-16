# AGENTS.md - StartupOS (SOS)

Guidelines for AI coding agents working in this repository.

## Project Overview

StartupOS is a **pure static website** (HTML/CSS/JS) prototype for a startup management tool. No build tools, bundlers, or frameworks - just vanilla web technologies designed for GitHub Pages hosting.

## Development Commands

```bash
# Start local development server
python3 -m http.server 8081
# Then open http://localhost:8081

# Alternative: Node.js server
npx serve .

# Validate HTML (optional)
npx html-validate "*.html"
```

**No build step, no tests, no linting configured.** Quality is enforced through code review and browser testing.

## File Structure

```
SOS/
├── index.html           # Landing page (light theme)
├── dashboard.html       # The Pulse - main dashboard with Rocks progress + Issues List
├── vision.html          # EOS V/TO Vision Hub (Core Focus, 10-3-1 Goals, Three Uniques, Values, Marketing)
├── foundation.html      # Click Foundation Sprint (The Basics, Differentiators, Four Lenses, Hypothesis)
├── validation.html      # Click Moment validation hub + AI Validation Assistant
├── betting-table.html   # Shape Up cycles + Hill Chart + Quarterly Rocks
├── truth-canvas.html    # [REDIRECT] → foundation.html
├── assets/
│   ├── css/styles.css   # Global CSS framework
│   └── js/main.js       # Shared navigation/interactions
└── AGENTS.md            # This file
```

## Code Style Guidelines

### HTML

- Use `<!DOCTYPE html>` with `lang="zh-CN"`
- Include proper meta tags (charset, viewport, description)
- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- Always include `aria-label` on interactive elements
- Use `aria-expanded`, `aria-hidden`, `aria-controls` for toggleable UI

**Class Naming (BEM-inspired):**
```html
<div class="feature-card">
  <h3 class="feature-card-title">Title</h3>
  <div class="feature-card active">...</div>
</div>
```

**Page-Specific Styles:** Put in `<style>` block within `<head>`, NOT in external CSS.

### CSS

**Design Tokens** - All colors, fonts, spacing defined in `:root`:
```css
--color-bg-primary: #FFFFFF;
--color-text-primary: #1D1D1F;
--color-accent: #0071E3;      /* Apple Blue */
--color-success: #34C759;
--color-warning: #FF9500;
--color-danger: #FF3B30;
```

**Typography:** Font stack `-apple-system, BlinkMacSystemFont, 'SF Pro Display'...`

**Component Patterns:**
- Cards: `border-radius: var(--radius-xl)`, subtle shadows
- Buttons: `border-radius: var(--radius-full)` for primary
- Transitions: `var(--transition-base)` (200ms ease)
- Spacing: Use `--space-*` variables, generous whitespace (48-80px section padding)

### JavaScript

**Module Pattern:**
```javascript
(function() {
  'use strict';
  // All code here
  window.SOS = { publicFunction };
})();
```

**DOM & Events:**
```javascript
const element = document.querySelector('.selector');
if (!element) return;  // Early return pattern
element?.classList.contains('active')  // Optional chaining
```

- Use `addEventListener`, never inline handlers
- Include `{ passive: true }` for scroll/touch events
- Handle keyboard events for accessibility (Escape to close)

**Naming:** Functions `camelCase` verb-first (`toggleMenu`, `handleScroll`)

**Performance:**
- Use `requestAnimationFrame` for scroll handlers
- Debounce/throttle expensive operations
- Use `IntersectionObserver` for scroll animations

## Design Philosophy

**Visual Style (Apple-Inspired):**
- Clean, minimal, generous whitespace
- Dark theme for dashboard pages, light for landing
- Glassmorphism effects (backdrop-filter: blur)

**Responsive Breakpoints:**
```css
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1200px) { /* xl */ }
```

**Animation:** Staggered fade-in (0.1s delays), subtle hover lifts, 200-300ms transitions. Respect `prefers-reduced-motion`.

## Navigation Structure

All pages share the same navigation. Mark active page with `.active` class:
- **Dashboard** → `dashboard.html`
- **Vision** → `vision.html`
- **Foundation** → `foundation.html`
- **Validation** → `validation.html`
- **Betting** → `betting-table.html`

## Adding a New Page

1. Copy structure from existing page (dashboard.html for dark theme)
2. Update `<title>` and meta description
3. Set correct `.active` class on nav link
4. Add page-specific styles in `<head>` `<style>` block

## Constraints

**DO NOT:**
- Add external dependencies (no npm packages, no CDN)
- Create mock data that looks fake - use realistic Chinese content
- Break existing navigation links

**DO:**
- Keep all styles inline or in styles.css (no new CSS files)
- Test on mobile viewport (375px minimum)
- Maintain bilingual content (Chinese primary, English terms)
- Use CSS-only solutions where possible before JS

---

## 🚀 SOS 重构计划 (2026-01) - ✅ 已完成

> **状态**: ✅ 已完成
> **目标**: 从"方法论陈列馆"变成"创业验证流水线"

### 重构完成总结

**已实现的架构改进：**

```
                    ┌─────────────────┐
                    │   VISION 愿景层  │  ← vision.html (EOS V/TO)
                    └────────┬────────┘
              ┌──────────────┴──────────────┐
              │       FOUNDATION 基础层       │  ← foundation.html (Click Sprint)
              └──────────────┬───────────────┘
    ┌────────────────────────┴────────────────────────┐
    │                VALIDATION 验证层                  │  ← validation.html + AI助手
    └────────────────────────┬────────────────────────┘
                    ┌────────┴────────┐
                    │   BUILD 执行层   │  ← betting-table.html + Rocks
                    └─────────────────┘
```

### 任务完成清单

| # | 任务 | 状态 |
|---|------|------|
| 1.1 | 更新导航结构 (5 files) | ✅ 完成 |
| 1.2 | 创建 vision.html 框架 | ✅ 完成 |
| 1.3 | 创建 foundation.html 框架 | ✅ 完成 |
| 1.4 | validation.html AI FAB | ✅ 完成 |
| 2.1 | vision.html 5模块 | ✅ 完成 |
| 2.2 | foundation.html 滑块/矩阵 | ✅ 完成 |
| 2.3 | validation.html AI Modal | ✅ 完成 |
| 2.4 | betting-table.html Rocks | ✅ 完成 |
| 3.1 | dashboard.html 更新 | ✅ 完成 |
| 3.5 | truth-canvas.html 重定向 | ✅ 完成 |
| 3.6 | AGENTS.md 更新 | ✅ 完成 |

### 新页面功能详情

**vision.html** - EOS V/TO 愿景中心
- Core Focus (Purpose/Passion + Niche)
- 10-3-1 Goal Pyramid (Tab navigation)
- Three Uniques (Gradient badges)
- Core Values (Add/remove functionality)
- Marketing Strategy (Target Market, Proven Process, Guarantee)

**foundation.html** - Click Foundation Sprint
- The Basics (2x2 grid: Customer/Problem/Advantage/Competition)
- Classic Differentiators (8 interactive sliders)
- Approach Summary (What/Why/How 3-column)
- Four Lenses (4 draggable 2x2 matrices)
- Founding Hypothesis (Fill-in template with completion checker)

**validation.html** - AI 验证助手
- Purple FAB (pulsing animation)
- AI Modal with 4 tabs:
  - 市场研究 (Competitor analysis, TAM/SAM/SOM)
  - 痛点雷达 (Verbatim quotes from 知乎/小红书)
  - 实验方案 (3 experiment cards with metrics)
  - 专家委员会 (Simulated reviews from Bill Aulet, Ash Maurya, Jake Knapp)

**betting-table.html** - Rocks 模块
- Quarterly Rocks section (EOS)
- Revenue/Profit targets
- 7 Rock items with owner, priority, and checkbox

**dashboard.html** - 更新
- Fixed Quick Actions links (Vision, Foundation, Validation, Betting)
- Rocks Progress mini-card (3/7 progress)
- Issues List section (4 open issues)
