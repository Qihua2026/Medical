import Link from "next/link";
import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "个人背景与求职需求分析",
    description:
      "综合分析教育经历、工作偏好与现实限制，明确职业选择的关键条件。",
  },
  {
    number: "02",
    title: "职业和岗位方向判断",
    description: "结合个人情况评估岗位适配性，说明判断依据与潜在风险。",
  },
  {
    number: "03",
    title: "求职行动方案制定",
    description: "围绕简历、面试与能力准备，形成可执行的行动方案。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-glow" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center px-6 py-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="医途首页">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <HeartPulse
              aria-hidden="true"
              className="size-5"
              strokeWidth={2.2}
            />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight text-foreground">
              医途
            </span>
            <span className="block text-[11px] tracking-[0.18em] text-muted-foreground">
              MEDICAL CAREER
            </span>
          </span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary-dark">
            <Sparkles aria-hidden="true" className="size-4" />
            医药行业职业方向诊断
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.14] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.75rem]">
            明确适合你的
            <span className="block text-primary">医药职业方向</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            基于教育背景、职业经历、工作偏好与现实限制，形成有依据的职业和岗位方向判断。
          </p>
        </div>

        <ul
          aria-label="职业诊断步骤"
          className="mx-auto mt-9 grid w-full max-w-4xl grid-cols-3 gap-2 sm:w-[92%] sm:gap-3 lg:gap-4"
        >
          {steps.map((step) => (
            <li className="min-w-0" key={step.number}>
              <Card className="h-full gap-0 rounded-2xl bg-card/85 py-0">
                <CardContent className="p-3 sm:p-4">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-primary sm:text-xs sm:tracking-[0.16em]">
                    {step.number}
                  </span>
                  <h2 className="mt-3 break-words text-xs font-semibold leading-5 text-foreground sm:text-sm sm:leading-6 lg:text-base">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 break-words text-[11px] leading-5 text-muted-foreground sm:text-xs sm:leading-5 lg:text-sm lg:leading-6">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col items-center gap-2 text-center">
          <Button asChild size="lg">
            <Link href="/assessment">
              开始职业诊断
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">预计用时 5–8 分钟</span>
        </div>

      </section>
    </main>
  );
}
