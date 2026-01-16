# SOS 改进计划：基于 Antoine Rousseaux 的 PRD-First 方法论

> 来源：[Antoine Rousseaux (@AntoineRSX) - Claude Code + Ralph Can Replace Your Marketing Team](https://x.com/AntoineRSX/status/2010713146743562246)
> 
> 35万浏览量 | 16分钟演示视频 | 2026年1月12日

---

## 一、Antoine 的核心方法论

### 1.1 传统方式 vs PRD-First

```
传统方式（已死）：
prompt → response → prompt → response → prompt → response
（手动循环，每次都要人工干预）

PRD-First 方式：
PRD → 自主执行全流程 → 专家代理验证 → 完整输出
（AI 自动执行任务清单，直到完成）
```

### 1.2 关键组件

| 组件                | 作用                                        | 工具                                                                   |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| **PRD**           | 驱动 AI 自主执行的「剧本」                           | Product Requirements Document                                        |
| **Ralph 插件**      | 让 Claude Code 进入执行循环，直到任务完成               | [Ralph Wiggum Plugin](https://github.com/ethanolivertroy/ralph-loop) |
| **专家代理验证**        | 模拟专家（Russell Brunson / Alex Hormozi）验证每一步 | AI Persona Agents                                                    |
| **Verbatim 用户语言** | 从 Reddit/论坛抓取用户原话，而非泛泛描述                  | Web Scraping                                                         |

### 1.3 Antoine 的 PRD 结构（Offer 构建）

```markdown
## PRD: $100M Offer Builder

### Phase 1: Research
- [ ] 竞品分析（自动执行 17+ 次搜索）
- [ ] 定价研究
- [ ] 市场规模估算
- [ ] Reddit/论坛痛点抓取（verbatim）

### Phase 2: Avatar Creation
- [ ] 深度心理特征
- [ ] 原话痛点（verbatim quotes）
- [ ] 购买动机分析
- [ ] 购买力验证（buyers, not browsers）

### Phase 3: Offer Validation
- [ ] Russell Brunson 代理验证：「适合低票漏斗吗？」
- [ ] Alex Hormozi 代理验证：「符合价值公式吗？」
- [ ] Avatar 代理验证：「会购买吗？」

### Phase 4: Copy Generation
- [ ] 完整价值堆栈
- [ ] 异议处理清单
- [ ] 文案生成

### Phase 5: Output
- [ ] 完整落地页 HTML
- [ ] 定价策略
- [ ] 发布计划
```

### 1.4 核心洞察

> "如果你还在 prompt → response → prompt → response，你只利用了 10% 的 AI 能力。"
> — Antoine Rousseaux

关键点：
- **Verbatim matters**: 用户原话比概括更有说服力
- **Buyers, not browsers**: 画像应聚焦有购买力的人
- **Validation loops**: 每一步都需要专家代理验证才能通过
- **Full autonomous execution**: AI 执行完整任务清单，而非单个提示

---

## 二、SOS 现状分析

### 2.1 当前架构

```
SOS/
├── index.html           # 落地页
├── dashboard.html       # The Pulse - 三个关键指标
├── truth-canvas.html    # 真相画布 - Lean Canvas + 风险热图
├── betting-table.html   # 下注台 - Shape Up 周期 + 山坡图
├── validation.html      # 验证中心 - Click Moment 承诺追踪
└── assets/
```

### 2.2 当前方法论融合

| 方法论 | 来源 | SOS 实现 |
|--------|------|----------|
| Lean Canvas | Ash Maurya | 真相画布 9 宫格 |
| Disciplined Entrepreneurship | Bill Aulet | 滩头阵地锁定器 + TAM/SAM/SOM |
| Shape Up | Ryan Singer | 下注台 + 山坡图 |
| Click | Jake Knapp | 验证中心 - 承诺追踪器 |

### 2.3 当前痛点

1. **手动填写**: 用户需要手动填写每个格子，缺乏智能辅助
2. **假设验证主观**: 用户自己判断假设风险，缺乏客观验证
3. **用户画像可能是假设**: 画像基于创始人想象，而非真实用户数据
4. **输出不可执行**: 填完画布后缺乏可执行的下一步（落地页、实验设计）

---

## 三、改进计划

### 3.1 Phase 1: 快速实现（静态原型增强）

#### 功能 A: 「一键市场研究」

**位置**: truth-canvas.html - 新增按钮

**输入**: 产品想法（一句话描述）

**输出**:
- 竞品分析报告（3-5 个竞品）
- 用户痛点（verbatim 从知乎/小红书/V2EX 抓取）
- TAM/SAM/SOM 估算
- 预填充的 Lean Canvas 草稿

**实现方式**: 
```javascript
// 调用 Claude API，返回结构化 JSON
async function oneClickResearch(ideaDescription) {
  const prd = `
    ## Research PRD
    1. Search for 5 competitors in: ${ideaDescription}
    2. Extract pricing, features, estimated revenue
    3. Find verbatim user complaints from Zhihu/Xiaohongshu
    4. Estimate TAM/SAM/SOM for China market
    5. Generate Lean Canvas draft
  `;
  return await executeWithClaude(prd);
}
```

#### 功能 B: 「专家验证委员会」

**位置**: truth-canvas.html - 每个 Canvas 卡片

**触发**: 用户填写/修改卡片内容后

**输出**: 模态框显示 3 位「专家」评价

```
┌─────────────────────────────────────────────────┐
│           专家验证委员会                          │
├─────────────────────────────────────────────────┤
│  🎯 Bill Aulet (Disciplined Entrepreneurship)   │
│  "这个客户群还是太大了，建议缩小到..."              │
│  评分: ⭐⭐⭐ (3/5)                               │
├─────────────────────────────────────────────────┤
│  📊 Ash Maurya (Lean Canvas)                    │
│  "这不是最危险的假设，优先验证..."                  │
│  评分: ⭐⭐⭐⭐ (4/5)                              │
├─────────────────────────────────────────────────┤
│  ⚡ Jake Knapp (Click)                          │
│  "缺少明确的 Click Moment，建议..."               │
│  评分: ⭐⭐ (2/5)                                 │
└─────────────────────────────────────────────────┘
```

#### 功能 C: 「Verbatim 痛点雷达」

**位置**: truth-canvas.html - 用户画像卡片

**输入**: 目标用户群描述

**输出**: 真实用户原话 + 痛点分类

```
┌─────────────────────────────────────────────────┐
│  💬 真实用户声音 (Verbatim)                       │
├─────────────────────────────────────────────────┤
│  来源: 知乎 - "大学生创业" 话题                    │
│                                                 │
│  "创业课学了一堆理论，但真正动手的时候              │
│   完全不知道从哪开始..."                          │
│   — 匿名用户, 2024-11                            │
│                                                 │
│  "参加比赛最痛苦的是评委的问题根本回答不上来"        │
│   — @创业小白, 2024-10                           │
│                                                 │
│  "花了三个月做 APP，上线发现没人用，崩溃"           │
│   — @技术宅转产品, 2024-09                       │
└─────────────────────────────────────────────────┘
```

#### 功能 D: 「验证实验生成器」

**位置**: validation.html - 新增模块

**输入**: 待验证假设

**输出**: 
- 3 种实验方案（按成本/时间排序）
- 自动生成的访谈脚本（Mom Test 风格）
- 预注册落地页模板

```
┌─────────────────────────────────────────────────┐
│  🧪 验证实验方案                                  │
├─────────────────────────────────────────────────┤
│  假设: "大学生愿意为创业工具付费 29元/月"          │
│                                                 │
│  方案 1 (最快): 假按钮测试                        │
│  - 时间: 1 天                                    │
│  - 成本: ¥0                                      │
│  - 方法: 落地页 + "购买"假按钮                    │
│  - 成功标准: 10+ 点击                            │
│                                                 │
│  方案 2 (中等): 预售测试                          │
│  - 时间: 3 天                                    │
│  - 成本: ¥0                                      │
│  - 方法: 收集定金 ¥9.9（可退）                    │
│  - 成功标准: 5+ 付款                             │
│                                                 │
│  方案 3 (深入): 用户访谈                          │
│  - 时间: 1 周                                    │
│  - 成本: ¥0                                      │
│  - 方法: 5 次 30 分钟访谈                         │
│  - 成功标准: 3+ 表达付费意愿                      │
│                                                 │
│  [生成访谈脚本] [生成落地页]                       │
└─────────────────────────────────────────────────┘
```

---

### 3.2 Phase 2: 深度集成（需要后端）

#### 功能 E: PRD 模板系统

用户定义 PRD → AI 自动执行全流程

```markdown
## 我的创业验证 PRD

### 输入
- 产品想法: [用户输入]
- 目标用户: [用户输入]
- 时间预算: [1周/2周/4周]

### 自动执行
1. [ ] 市场研究 → 填充 Truth Canvas
2. [ ] 竞品分析 → 生成差异化建议
3. [ ] 用户画像 → 抓取 verbatim 验证
4. [ ] 假设排序 → 专家委员会验证
5. [ ] 实验设计 → 生成验证方案
6. [ ] 落地页 → 生成测试页面

### 输出
- [ ] 完整 Lean Canvas
- [ ] 风险排序报告
- [ ] 2 周验证计划
- [ ] 测试落地页 HTML
```

#### 功能 F: Ralph 式验证循环

每个假设验证直到「通过」或「失败」

```
while (假设.status !== 'validated' && 假设.status !== 'invalidated') {
  执行验证实验();
  收集数据();
  专家代理评估();
  
  if (达到成功标准) {
    假设.status = 'validated';
  } else if (超过尝试次数 || 明确失败) {
    假设.status = 'invalidated';
  } else {
    生成改进建议();
    继续循环();
  }
}
```

#### 功能 G: 落地页生成器

验证通过后自动生成测试用落地页

```
输入: 已验证的 Canvas + 用户画像
输出: 
  - 完整响应式落地页 HTML
  - 价值主张文案
  - CTA 按钮（预注册/预购）
  - 社会证明占位符
  - 分析代码集成
```

---

### 3.3 Phase 3: 完整生态（长期愿景）

#### 功能 H: 数据闭环

```
Truth Canvas ←→ Betting Table ←→ Validation Center
     ↓                ↓                 ↓
     └────────── Dashboard ──────────────┘
                     ↓
              AI 洞察报告
```

- 所有模块数据互通
- AI 自动生成周报/月报
- 预测跑道、验证速度趋势
- 建议下一步行动

#### 功能 I: 社区验证网络

- 连接其他 SOS 用户
- 交叉验证假设
- 虚拟用户访谈匹配
- 创业者互评系统

---

## 四、实施优先级

| 优先级 | 功能 | 工作量 | 价值 |
|--------|------|--------|------|
| P0 | A. 一键市场研究 | 3天 | 高 - 降低使用门槛 |
| P0 | B. 专家验证委员会 | 2天 | 高 - 核心差异化 |
| P1 | C. Verbatim 痛点雷达 | 3天 | 中 - 提升画像质量 |
| P1 | D. 验证实验生成器 | 4天 | 高 - 可执行输出 |
| P2 | E. PRD 模板系统 | 1周 | 高 - 需要后端 |
| P2 | F. Ralph 式循环 | 1周 | 中 - 高级功能 |
| P3 | G. 落地页生成器 | 1周 | 高 - 需要后端 |
| P3 | H. 数据闭环 | 2周 | 高 - 需要后端 |

---

## 五、技术栈建议

### 5.1 Phase 1 (静态原型)

```
前端: 现有 HTML/CSS/JS
AI 调用: 
  - Claude API (claude-3-opus / claude-3-sonnet)
  - 直接在前端调用（需要代理或 Cloudflare Worker）
数据存储: localStorage
```

### 5.2 Phase 2+ (需要后端)

```
后端: 
  - Cloudflare Workers (推荐 - 免费额度高)
  - 或 Vercel Serverless Functions

数据库:
  - Cloudflare D1 (SQLite)
  - 或 Supabase

AI 服务:
  - Anthropic Claude API
  - 可选: OpenAI for embeddings

搜索/抓取:
  - Exa API (已有)
  - 或 SerpAPI for 知乎/小红书
```

---

## 六、参考资源

### 6.1 Antoine Rousseaux 相关

- [X 帖子原文](https://x.com/AntoineRSX/status/2010713146743562246)
- [YouTube 视频: Claude Code Built My Entire $100M Offer](https://www.youtube.com/watch?v=Ur-P_DDQflw)
- [Vibe Combinator 社区](https://skool.com/vibe-combinator-3341)

### 6.2 Ralph 插件

- [ralph-loop 插件](https://www.claudepluginhub.com/plugins/ethanolivertroy-ralph-loop-ralph-loop-plugin)
- [smart-ralph (带规格驱动)](https://github.com/tzachbon/smart-ralph)
- [使用指南](https://apidog.com/blog/use-ralph-wiggum-plugin/)

### 6.3 PRD Workflow

- [PRD → Plan → Todo 方法论](https://developertoolkit.ai/en/claude-code/quick-start/prd-workflow/)
- [完整 PRD 指南](https://developertoolkit.ai/en/shared-workflows/development-workflows/prd-plan-todo-methodology/)

---

## 七、下一步行动

1. [ ] 评审此计划，确定 Phase 1 优先级
2. [ ] 设计「一键市场研究」的 PRD 模板
3. [ ] 创建「专家验证委员会」的提示词系统
4. [ ] 实现 UI 原型（Figma 或直接 HTML）
5. [ ] 集成 Claude API（通过代理）

---

*最后更新: 2026年1月16日*
*基于 Antoine Rousseaux 的 PRD-First 方法论*
