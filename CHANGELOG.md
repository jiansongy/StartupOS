# Changelog

All notable changes to StartupOS (SOS) will be documented in this file. This file is maintained by skill "continuity-ledger".

## [1.0.0] - 2026-01-16

### Overview

Major refactoring from "methodology showcase" to "startup validation pipeline" using a pyramid architecture:

```
                ┌─────────────────┐
                │   VISION 愿景层  │  ← EOS V/TO Framework
                └────────┬────────┘
          ┌──────────────┴──────────────┐
          │       FOUNDATION 基础层       │  ← Click Foundation Sprint
          └──────────────┬───────────────┘
┌────────────────────────┴────────────────────────┐
│                VALIDATION 验证层                  │  ← AI-Powered Validation
└────────────────────────┬────────────────────────┘
                ┌────────┴────────┐
                │   BUILD 执行层   │  ← Shape Up + EOS Rocks
                └─────────────────┘
```

### Added

#### New Pages

- **vision.html** - EOS V/TO Vision Hub (49KB)
  - Core Focus module (Purpose/Passion + Niche)
  - 10-3-1 Goal Pyramid with tab navigation
  - Three Uniques with gradient badges
  - Core Values with add/remove functionality
  - Marketing Strategy (Target Market, Proven Process, Guarantee)

- **foundation.html** - Click Foundation Sprint (2026 lines)
  - The Basics: 2x2 grid (Customer/Problem/Advantage/Competition)
  - Classic Differentiators: 8 interactive sliders with reset
  - Approach Summary: What/Why/How 3-column layout
  - Four Lenses: 4 draggable 2x2 matrices
  - Founding Hypothesis: Fill-in template with completion checker

#### New Features

- **AI Validation Assistant** (validation.html)
  - Purple floating action button (FAB) with pulsing animation
  - Full-screen modal with 4 tabs:
    - 市场研究 (Competitor analysis, TAM/SAM/SOM)
    - 痛点雷达 (Verbatim quotes from 知乎/小红书)
    - 实验方案 (3 experiment cards with metrics)
    - 专家委员会 (Simulated reviews from Bill Aulet, Ash Maurya, Jake Knapp)

- **Quarterly Rocks** (betting-table.html)
  - EOS Rocks module with revenue/profit targets
  - 7 Rock items with owner, priority, and checkbox tracking

- **Dashboard Enhancements** (dashboard.html)
  - Rocks Progress mini-card (3/7 progress indicator)
  - Issues List section (4 open issues with priority)
  - Fixed Quick Actions links to new pages

### Changed

- **Navigation**: Updated across all 5 HTML files
  - New structure: `Dashboard | Vision | Foundation | Validation | Betting`
  
- **Landing Page** (index.html)
  - Feature cards updated to match new architecture:
    - 真相画布 → 愿景中心 (Vision Hub)
    - 下注台 → 创始假设 (Foundation Sprint)
    - 点击时刻 → 验证中心 (Validation Hub)
    - 脉搏 → 下注台 (Betting Table)
  - Journey section updated: 愿景 → 基础 → 验证 → 执行
  - Added "Explore →" links on each feature card

- **truth-canvas.html**: Converted to redirect page → foundation.html

### Technical Details

- **Tech Stack**: Pure HTML/CSS/JS (no frameworks, no build tools)
- **Hosting**: GitHub Pages ready
- **Design System**: Apple-inspired, dark theme for dashboard pages, light theme for landing
- **Responsive**: Mobile-first, tested at 375px minimum width

### Development Process

1. **Planning Phase** (plan.md)
   - Analyzed current pain points
   - Designed pyramid architecture
   - Prioritized features (P0/P1/P2)

2. **Phase 1: Navigation & Framework**
   - Updated nav structure in all files
   - Created vision.html and foundation.html frameworks

3. **Phase 2: Module Implementation**
   - Built all 5 EOS V/TO modules in vision.html
   - Built all 5 Click Foundation modules in foundation.html
   - Added AI validation FAB + modal to validation.html
   - Added Quarterly Rocks to betting-table.html

4. **Phase 3: Integration**
   - Updated dashboard.html with Rocks Progress + Issues List
   - Fixed all Quick Actions links
   - Converted truth-canvas.html to redirect
   - Updated landing page feature cards

### Files Structure

```
SOS/
├── index.html           # Landing page (light theme)
├── dashboard.html       # The Pulse - Rocks Progress + Issues List
├── vision.html          # EOS V/TO Vision Hub (NEW)
├── foundation.html      # Click Foundation Sprint (NEW)
├── validation.html      # AI Validation Assistant
├── betting-table.html   # Shape Up + Quarterly Rocks
├── truth-canvas.html    # Redirect → foundation.html
├── assets/
│   ├── css/styles.css   # Global CSS framework
│   └── js/main.js       # Shared navigation/interactions
├── AGENTS.md            # AI coding guidelines
├── CHANGELOG.md         # This file
└── plan.md              # Original planning document
```

### References

- **EOS V/TO**: Entrepreneurial Operating System Vision/Traction Organizer
- **Click Foundation Sprint**: Jake Knapp's startup validation methodology
- **Shape Up**: Basecamp's product development framework
- **Rocks**: EOS quarterly priorities system

---

## [0.1.0] - 2026-01-15

### Initial Release

- Basic landing page (index.html)
- Dashboard with The Pulse metrics (dashboard.html)
- Truth Canvas with Lean Canvas grid (truth-canvas.html)
- Betting Table with Shape Up cycles (betting-table.html)
- Validation Center with commitment tracker (validation.html)
- Global CSS framework (assets/css/styles.css)
- Shared JavaScript (assets/js/main.js)
