"use client";

import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stages = ["应届生", "往届生", "在职转型", "博士 / 博后", "海归求职", "gap / 短履历"];
const workPreferences = [
  "深入分析专业信息和复杂问题",
  "与人沟通并影响专业决策",
  "推进项目、协调团队把事情落地",
  "将科研能力转化为行业价值",
  "在稳定流程中持续积累专业能力",
];

export default function Assessment() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const isStageStep = step === 1;
  const options = isStageStep ? stages : workPreferences;
  const selectedOption = isStageStep ? selectedStage : selectedPreference;

  function selectOption(value: string) {
    if (isStageStep) {
      setSelectedStage(value);
      return;
    }

    setSelectedPreference(value);
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="/"><ArrowLeft aria-hidden="true" className="size-4" />返回首页</Link>
        <span className="text-sm font-semibold text-foreground">医途职业诊断</span>
      </header>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-8 sm:pt-14">
        <div className="flex items-center justify-between text-sm"><span className="font-medium text-primary-dark">第 {step} 步，共 4 步</span><span className="text-muted-foreground">约 2 分钟</span></div>
        <Progress className="mt-4" value={step * 25} aria-label={`诊断进度：${step * 25}%`} />
        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-semibold text-primary-dark">{isStageStep ? "先认识一下你" : "了解你的工作偏好"}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{isStageStep ? "先从你现在所处的阶段开始" : "如果不考虑岗位名称，你更希望怎样工作？"}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{isStageStep ? "不同阶段适合的岗位入口和准备方式并不相同。请选择最接近你当前情况的一项。" : "先选最接近你的工作状态，而不是你觉得更容易入职的岗位。"}</p>
        </div>
        <fieldset className="mt-10 grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">{isStageStep ? "当前求职阶段" : "工作偏好"}</legend>
          {options.map((option) => (
            <label className="group flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/35 hover:bg-primary/5" key={option}>
              <input
                checked={selectedOption === option}
                className="size-4 accent-primary"
                name={isStageStep ? "career-stage" : "work-preference"}
                onChange={(event) => selectOption(event.target.value)}
                type="radio"
                value={option}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <aside className="mt-8 flex gap-3 rounded-2xl bg-secondary/70 p-4 text-sm leading-6 text-secondary-foreground"><Lightbulb aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><p><strong className="font-semibold">为什么要问：</strong>{isStageStep ? "这会影响岗位门槛与求职节奏，也帮助我们避免给出不切实际的建议。" : "真实的工作偏好会改变 MSL、CRA 与市场等方向的优先级。"}</p></aside>
        <div className="mt-8 flex justify-end">
          <Button
            className="w-full disabled:opacity-100 sm:w-auto sm:min-w-32"
            disabled={!selectedOption}
            onClick={() => {
              if (isStageStep) setStep(2);
            }}
            size="lg"
            type="button"
          >
            确定
          </Button>
        </div>
      </section>
    </main>
  );
}
