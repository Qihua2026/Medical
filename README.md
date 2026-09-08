# 医途 Medical Career Advisor

面向医疗、生物、药学、临床、器械和公共卫生背景求职者的垂直职业决策产品。第一阶段聚焦“职业画像 → 岗位推荐 → 策略报告”，不是招聘信息平台。

## 本地运行

```bash
nvm use
npm install
npm run dev
```

打开 `http://localhost:3000`。质量检查：

```bash
npm test
npm run lint
npm run build
```

## 项目资料

- [PROJECT.md](./PROJECT.md)：产品边界、技术栈、目录与协作流程
- [DESIGN.md](./DESIGN.md)：视觉方向、设计 token、组件与交互原则
- [实施计划](./docs/superpowers/plans/2026-09-08-next-shadcn-foundation.md)

## 分支流程

稳定开发基线为 `dev`。所有变更从最新 `origin/dev` 建立 `codex/*` 工作分支，经测试、lint 与 production build 后，通过 Pull Request 合并回 `dev`；禁止直接修改 `main`。
