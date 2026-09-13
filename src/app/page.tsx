import Link from "next/link";
import { ArrowRight, Check, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const outcomes = [
  "优先尝试的岗位",
  "可以保留的方向",
  "未来两周准备计划",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-glow" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center px-6 py-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="医途首页">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <HeartPulse aria-hidden="true" className="size-5" strokeWidth={2.2} />
          </span>
          <span><span className="block text-base font-semibold tracking-tight text-foreground">医途</span><span className="block text-[11px] tracking-[0.18em] text-muted-foreground">MEDICAL CAREER</span></span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary-dark"><Sparkles aria-hidden="true" className="size-4" />为医药求职者提供职业方向判断</div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.14] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.75rem]">找到更适合你的<span className="block text-primary">医药职业方向</span></h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">不必再只凭岗位名称猜方向。告诉我们你的教育背景、经历和求职需求，你会得到更适合优先考虑的岗位方向与具体理由。</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg"><Link href="/assessment">进入职业诊断<ArrowRight aria-hidden="true" className="size-4" /></Link></Button>
            <span className="text-sm text-muted-foreground">预计需要 5–8 分钟</span>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-foreground/80 sm:grid-cols-3" aria-label="诊断结果包括">
            {outcomes.map((outcome) => <li className="flex items-center gap-2" key={outcome}><span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary-dark"><Check aria-hidden="true" className="size-3" strokeWidth={3} /></span>{outcome}</li>)}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/6 blur-2xl" />
          <Card className="overflow-hidden border-primary/10 bg-card/90 shadow-[0_28px_80px_-38px_rgba(39,91,59,0.35)] backdrop-blur">
            <CardContent className="p-7 sm:p-9">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-[0.16em] text-primary-dark">回答示例</span><span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">正在了解你的情况</span></div>
              <div className="mt-9"><p className="text-sm text-muted-foreground">如果不考虑岗位名称，你更希望怎样工作？</p><p className="mt-3 text-2xl font-semibold leading-9 tracking-tight text-foreground">“我想保留专业优势，但不想继续做纯实验。”</p></div>
              <div className="mt-8 space-y-3"><div className="rounded-2xl border border-primary/25 bg-primary/8 p-4"><p className="font-medium text-foreground">将科研能力转化为行业价值</p><p className="mt-1 text-sm leading-6 text-muted-foreground">医学事务 · 市场策略 · 临床开发</p></div><div className="rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">在稳定流程中持续积累专业能力</div></div>
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-sm text-muted-foreground"><ShieldCheck aria-hidden="true" className="size-5 text-primary" />你的回答只用于生成职业建议</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-border/70 bg-card/60">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold text-primary-dark">先了解你，再给出判断</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">从职业方向判断到下一步准备</h2><p className="mt-4 leading-7 text-muted-foreground">你会看到更适合优先考虑的方向、需要注意的现实风险，以及接下来可以采取的具体行动。</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[["01", "了解你的背景与求职需求", "综合你的教育经历、工作偏好和现实限制，明确职业选择中的关键条件。"], ["02", "职业和岗位方向判断", "结合个人情况分析岗位适配性，并说明判断依据与需要注意的风险。"], ["03", "制定下一阶段的求职计划", "围绕简历、面试和能力准备，形成未来两周可以执行的具体安排。"]].map(([number, title, description]) => <Card key={number} className="bg-background/85"><CardContent className="p-6"><span className="text-xs font-semibold tracking-[0.16em] text-primary">{number}</span><h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></CardContent></Card>)}
          </div>
          <p className="mt-10 flex items-start gap-2 text-sm leading-6 text-muted-foreground"><ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />只基于你的真实经历提供判断与表达建议，不虚构经历，不承诺 offer、薪资或录用概率。</p>
        </div>
      </section>
    </main>
  );
}
