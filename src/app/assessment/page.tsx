import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";

import { Progress } from "@/components/ui/progress";

const stages = ["应届生", "往届生", "在职转型", "博士 / 博后", "海归求职", "gap / 短履历"];

export default function Assessment() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="/"><ArrowLeft aria-hidden="true" className="size-4" />返回首页</Link>
        <span className="text-sm font-semibold text-foreground">医途职业诊断</span>
      </header>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-8 sm:pt-14">
        <div className="flex items-center justify-between text-sm"><span className="font-medium text-primary-dark">第 1 步，共 5 步</span><span className="text-muted-foreground">约 2 分钟</span></div>
        <Progress className="mt-4" value={20} aria-label="诊断进度：20%" />
        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-semibold text-primary-dark">先认识一下你</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">先从你现在所处的阶段开始</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">不同阶段适合的岗位入口和准备方式并不相同。请选择最接近你当前情况的一项。</p>
        </div>
        <fieldset className="mt-10 grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">当前求职阶段</legend>
          {stages.map((stage) => (
            <label className="group flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/35 hover:bg-primary/5" key={stage}>
              <input className="size-4 accent-primary" type="radio" name="career-stage" value={stage} />
              {stage}
            </label>
          ))}
        </fieldset>
        <aside className="mt-8 flex gap-3 rounded-2xl bg-secondary/70 p-4 text-sm leading-6 text-secondary-foreground"><Lightbulb aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><p><strong className="font-semibold">为什么要问：</strong>这会影响岗位门槛与求职节奏，也帮助我们避免给出不切实际的建议。</p></aside>
      </section>
    </main>
  );
}
