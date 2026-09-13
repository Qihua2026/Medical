"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, HeartPulse, Lightbulb } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    eyebrow: "当前状态",
    title: "请选择当前求职阶段",
    description:
      "求职阶段将影响可选岗位入口及准备节奏，请选择与当前情况最接近的一项。",
    legend: "当前求职阶段",
    options: [
      "应届生",
      "往届生",
      "在职转型",
      "博士 / 博后",
      "海归求职",
      "gap / 短履历",
    ],
    reason:
      "求职阶段是判断岗位门槛、履历风险与准备周期的基础信息。",
  },
  {
    eyebrow: "工作偏好",
    title: "请选择符合预期的工作方式",
    description:
      "请基于长期工作意愿选择，不必考虑当前岗位机会或录用难度。",
    legend: "工作偏好",
    options: [
      "分析专业信息与复杂问题",
      "沟通并影响专业决策",
      "推进项目与协调团队",
      "将科研能力转化为行业价值",
      "在稳定流程中积累专业能力",
    ],
    reason:
      "工作方式偏好用于评估医学事务、临床运营与市场等方向的长期适配性。",
  },
  {
    eyebrow: "求职约束",
    title: "请选择当前不可妥协的求职条件",
    description:
      "如有多项重要条件，请优先选择当前限制最强的一项。",
    legend: "求职底线",
    options: [
      "不接受高频出差",
      "不接受纯销售岗位",
      "不再从事实验工作",
      "工作城市不可调整",
      "暂无明确限制",
    ],
    reason:
      "硬性约束用于排除明显不适配的岗位方向，减少无效准备与投递。",
  },
  {
    eyebrow: "求职目标",
    title: "请选择当前求职的首要目标",
    description:
      "首要目标将作为多个可行方向之间的排序依据。",
    legend: "优先目标",
    options: [
      "尽快获得合适 offer",
      "进入更具发展空间的平台",
      "提高薪资水平",
      "留在目标城市",
      "建立长期职业发展路径",
    ],
    reason:
      "首要目标用于确定岗位、平台与机会的优先顺序。",
  },
] as const;

const answerLabels = ["求职阶段", "工作偏好", "求职底线", "优先目标"];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() =>
    questions.map(() => ""),
  );
  const [isComplete, setIsComplete] = useState(false);

  function selectOption(value: string) {
    setAnswers((currentAnswers) =>
      currentAnswers.map((answer, index) =>
        index === currentStep ? value : answer,
      ),
    );
  }

  function confirmAnswer() {
    if (currentStep < questions.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    setIsComplete(true);
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          href="/"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          返回首页
        </Link>
        <Link className="flex items-center gap-2" href="/" aria-label="医途首页">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <HeartPulse
              aria-hidden="true"
              className="size-4"
              strokeWidth={2.2}
            />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight text-foreground">
              医途
            </span>
            <span className="block text-[9px] tracking-[0.16em] text-muted-foreground">
              MEDICAL CAREER
            </span>
          </span>
        </Link>
      </header>

      {isComplete ? (
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-12 sm:pt-20">
          <CheckCircle2
            aria-hidden="true"
            className="size-12 text-primary"
          />
          <p className="mt-8 text-sm font-semibold text-primary-dark">
            已完成四项核心信息
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            核心求职信息已完成整理
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            将基于上述信息形成优先职业方向、岗位适配依据与后续准备建议。
          </p>
          <dl className="mt-10 grid gap-3 sm:grid-cols-2">
            {answers.map((answer, index) => (
              <div
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                key={answerLabels[index]}
              >
                <dt className="text-sm text-muted-foreground">
                  {answerLabels[index]}
                </dt>
                <dd className="mt-2 font-semibold text-foreground">{answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex justify-end">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </section>
      ) : (
        <QuestionStep
          answer={answers[currentStep]}
          currentStep={currentStep}
          onConfirm={confirmAnswer}
          onSelect={selectOption}
        />
      )}
    </main>
  );
}

function QuestionStep({
  answer,
  currentStep,
  onConfirm,
  onSelect,
}: {
  answer: string;
  currentStep: number;
  onConfirm: () => void;
  onSelect: (value: string) => void;
}) {
  const question = questions[currentStep];
  const stepNumber = currentStep + 1;
  const progress = stepNumber * 25;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-8 sm:pt-14">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-primary-dark">
          第 {stepNumber} 步，共 4 步
        </span>
        <span className="text-muted-foreground">预计用时 2 分钟</span>
      </div>
      <Progress
        aria-label={`诊断进度：${progress}%`}
        className="mt-4"
        value={progress}
      />
      <div className="mt-14 max-w-2xl">
        <p className="text-sm font-semibold text-primary-dark">
          {question.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {question.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {question.description}
        </p>
      </div>
      <fieldset className="mt-10 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">{question.legend}</legend>
        {question.options.map((option) => (
          <label
            className="group flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/35 hover:bg-primary/5"
            key={option}
          >
            <input
              checked={answer === option}
              className="size-4 accent-primary"
              name={question.legend}
              onChange={(event) => onSelect(event.target.value)}
              type="radio"
              value={option}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <aside className="mt-8 flex gap-3 rounded-2xl bg-secondary/70 p-4 text-sm leading-6 text-secondary-foreground">
        <Lightbulb
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0"
        />
        <p>
          <strong className="font-semibold">填写说明：</strong>
          {question.reason}
        </p>
      </aside>
      <div className="mt-8 flex justify-end">
        <Button
          className="w-full disabled:opacity-100 sm:w-auto sm:min-w-32"
          disabled={!answer}
          onClick={onConfirm}
          size="lg"
          type="button"
        >
          确认
        </Button>
      </div>
    </section>
  );
}
