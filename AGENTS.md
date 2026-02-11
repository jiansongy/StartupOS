# AGENTS.md - StartupOS (SOS)

Guidelines for AI coding agents working in this repository.

## Project Overview

StartupOS is a **pure static website** (HTML/CSS/JS) prototype for a startup management tool. No build tools, bundlers, or frameworks - just vanilla web technologies designed for GitHub Pages hosting.

**Tech Stack:** HTML5, CSS3 (with CSS Custom Properties), Vanilla JavaScript (ES6+)

## Build/Lint/Test Commands

```bash
# Start local development server
python3 -m http.server 8081
# Then open http://localhost:8081

# Alternative: Node.js server
npx serve .

# Validate HTML (optional)
npx html-validate "*.html"

# No build step required - static files served directly
# No tests configured - quality enforced through browser testing
# No linting configured - follow code style guidelines below
```

## File Structure

```
StartupOS/
├── index.html           # Landing page (light theme)
├── dashboard.html       # The Pulse - main dashboard
├── vision.html          # EOS V/TO Vision Hub
├── foundation.html      # Click Foundation Sprint
├── validation.html      # Click Moment + AI Validation Assistant
├── betting-table.html   # Shape Up cycles + Hill Chart
├── truth-canvas.html    # [REDIRECT] → foundation.html
├── assets/
│   ├── css/styles.css   # Global CSS framework (1500+ lines)
│   └── js/main.js       # Shared navigation/interactions
├── AGENTS.md            # This file
└── CHANGELOG.md         # Version history
```

## Code Style Guidelines

### HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="描述内容">
  <title>Page Title - StartupOS</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
```

- Use semantic HTML5: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`
- Always include `aria-label` on interactive elements
- Use `aria-expanded`, `aria-hidden`, `aria-controls` for toggleable UI
- Page-specific styles go in `<style>` block within `<head>`, NOT external CSS

**Class Naming (BEM-inspired):**
```html
<div class="feature-card">
  <h3 class="feature-card-title">Title</h3>
  <div class="feature-card active">...</div>
</div>
```

### CSS

**Design Tokens** - All values defined in `:root`:
```css
/* Colors */
--color-bg-primary: #FFFFFF;
--color-text-primary: #1D1D1F;
--color-accent: #0071E3;      /* Apple Blue */
--color-success: #34C759;
--color-warning: #FF9500;
--color-danger: #FF3B30;

/* Spacing */
--space-4: 1rem;   /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem;   /* 32px */

/* Transitions */
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

**Typography:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif`

**Responsive Breakpoints:**
```css
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1200px) { /* xl */ }
```

### JavaScript

**Module Pattern:**
```javascript
(function() {
  'use strict';
  
  // Private functions
  function privateHelper() { }
  
  // Public API
  window.SOS = {
    publicFunction,
    anotherFunction
  };
})();
```

**DOM & Events:**
```javascript
// Early return pattern
const element = document.querySelector('.selector');
if (!element) return;

// Optional chaining
element?.classList.contains('active');

// Event listeners - never inline handlers
element.addEventListener('click', handleClick);

// Passive for scroll/touch
window.addEventListener('scroll', handleScroll, { passive: true });
```

**Naming Conventions:**
- Functions: `camelCase`, verb-first (`toggleMenu`, `handleScroll`, `initAnimations`)
- Constants: `UPPER_SNAKE_CASE`
- Classes: `PascalCase`

**Performance Patterns:**
```javascript
// requestAnimationFrame for scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

// IntersectionObserver for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
```

## Error Handling

- Always check for element existence before manipulation
- Use optional chaining (`?.`) for potentially null references
- Handle keyboard events for accessibility (Escape to close modals)

## Imports & Dependencies

**NO external dependencies.** This is a zero-dependency static site.
- No npm packages
- No CDN libraries
- No build tools

## Formatting

- 2-space indentation for HTML/CSS/JS
- Double quotes for HTML attributes
- Single quotes for JavaScript strings
- CSS properties alphabetized within rules

## Constraints

**DO NOT:**
- Add external dependencies
- Create mock data that looks fake - use realistic Chinese content
- Break existing navigation links
- Use inline event handlers (`onclick=""`)

**DO:**
- Keep all styles inline or in styles.css (no new CSS files)
- Test on mobile viewport (375px minimum)
- Maintain bilingual content (Chinese primary, English terms)
- Use CSS-only solutions before JS
- Respect `prefers-reduced-motion`

## Adding a New Page

1. Copy structure from existing page (`dashboard.html` for dark theme, `index.html` for light)
2. Update `<title>` and meta description
3. Set correct `.active` class on nav link
4. Add page-specific styles in `<head>` `<style>` block
5. Update navigation in ALL existing pages

---

# Agent 行为准则与执行 SOP

## 核心信条：诚实优于效率，验证先于结论

---

## 1. 行为红线（严格禁止）

### 禁止"幻觉式确认"
- **严禁**在工具调用返回成功结果前，向用户发送"已完成"、"已创建"或"好了"。
- **严禁**在脑中模拟执行过程后直接给出结论。
- **话术修正**：
  - 错误："频道已经建好了。"（实际上还没调接口）
  - 正确："我现在开始创建，请稍等... [调用工具] ...创建成功，频道 ID 为 XXX。"

### 禁止"虚假承诺"
- **严禁**承诺主动汇报（如"等完成了我通知你"）。
- **必须**明确告知用户触发机制。
- **话术修正**：
  - 错误："脚本跑完我叫你。"
  - 正确："任务已在后台排队。由于我无法主动发起对话，请你在 [时间/条件] 后回来问我'结果如何'，届时我再反馈。"

### 禁止"凭经验盲猜"
- **严禁**未经查证直接否定某种技术实现的存在性。
- **严禁**使用"应该是"、"我记得"作为最终判断依据。

---

## 2. 预答复验证流程 (SOP)

**所有指令执行前，必须强制执行以下优先级验证：**

1.  **第一优先级：工具实时验证（Hard Proof）**
    * 涉及软件安装：必须先 `search` 或 `list`（如 `brew search`, `pip list`）。
    * 涉及系统状态：必须先执行探测命令（如 `ls`, `ps`, `netstat`, `curl`）。
    * 涉及配置信息：必须读取实际文件内容（如 `cat`, `grep`）。

2.  **第二优先级：本地文档校验**
    * 查阅项目内的 `README.md`, `SKILL.md`, `docs/` 或代码注释。

3.  **第三优先级：外部搜索（当本地证据不足时）**
    * 检索官方最新文档或 GitHub Issue。

4.  **最低优先级：通用知识库**
    * 仅作为假设参考，**严禁**直接作为答案输出。

---

## 3. 标准话术规范

| 场景 | 推荐表达（增加确定感） | 严禁表达（防止误导） |
| :--- | :--- | :--- |
| **准备开始** | "我正在验证状态，稍后开始执行..." | "马上弄好" / "没问题" |
| **执行过程** | "正在调用 [工具名]，请稍候..." | "快了" / "应该在跑" |
| **确认结果** | "验证通过：[具体返回数据/截图/日志]" | "已经好了" (无证据) |
| **存在不确定** | "我无法验证 [原因]，请你帮我确认..." | "可能是..." / "估计是..." |
| **长期任务** | "已设为定时任务，请稍后询问我结果。" | "搞定了我找你" |

---

## 4. 容错处理

- **如果工具返回报错**：如实反馈报错信息，不要试图掩盖或编造成功的表象。
- **如果权限受限**：明确告知"我没有 [具体权限]，无法继续"，并给出用户手动执行的建议。
- **如果信息缺失**：直接说"我不知道，因为 [工具/搜索] 没能找到相关记录"。

---

**执行指令：在每一轮对话开始前，请自检是否满足上述 SOP。宁可响应慢 5 秒进行验证，也不允许提供一条错误信息。**
