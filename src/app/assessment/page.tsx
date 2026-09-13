"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    eyebrow: "先认识一下你",
    title: "先从你现在所处的阶段开始",
    description:
      "不同阶段适合的岗位入口和准备方式并不相同。请选择最接近你当前情况的一项。",
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
      "你的求职阶段会影响适合的岗位入口，也会影响接下来需要投入的准备时间。",
  },
  {
    eyebrow: "了解你的工作偏好",
    title: "如果不考虑岗位名称，你更希望怎样工作？",
    description:
      "先选最接近你的工作状态，而不是你觉得更容易入职的岗位。",
    legend: "工作偏好",
    options: [
      "深入分析专业信息和复杂问题",
      "与人沟通并影响专业决策",
      "推进项目、协调团队把事情落地",
      "将科研能力转化为行业价值",
      "在稳定流程中持续积累专业能力",
    ],
    reason:
      "了解你真正喜欢的工作方式，才能判断 MSL、CRA、市场等方向是否适合长期发展。",
  },
  {
    eyebrow: "明确你的现实约束",
    title: "这次求职，你最需要坚持的底线是什么？",
    description:
      "如果有多项都重要，请先选择最不能妥协的一项，后续仍可补充。",
    legend: "求职底线",
    options: [
      "不接受高频出差",
      "不接受纯销售",
      "不想继续做实验",
      "城市选择不能妥协",
      "暂时没有明确底线",
    ],
    reason:
      "先明确最不能妥协的条件，可以帮你避开不合适的方向，减少无效准备和投递。",
  },
  {
    eyebrow: "确定你的排序标准",
    title: "这次求职，你最希望优先得到什么？",
    description:
      "不同目标会改变岗位与机会的排序，请选择现阶段最重要的一项。",
    legend: "优先目标",
    options: [
      "尽快拿到合适 offer",
      "进入更好的平台",
      "获得更有竞争力的薪资",
      "留在目标城市",
      "建立长期发展路径",
    ],
    reason:
      "当多个方向都可行时，你最看重的目标会决定应该先争取哪一类机会。",
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
        <span className="text-sm font-semibold text-foreground">
          医途职业诊断
        </span>
      </header>

      {isComplete ? (
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-12 sm:pt-20">
          <CheckCircle2
            aria-hidden="true"
            className="size-12 text-primary"
          />
          <p className="mt-8 text-sm font-semibold text-primary-dark">
            已完成四项核心问题
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            你的求职需求已完成整理
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            接下来会根据这些选择，为你判断值得优先考虑的岗位方向，并整理具体的求职准备建议。
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
        <span className="text-muted-foreground">约 2 分钟</span>
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
          <strong className="font-semibold">为什么要问：</strong>
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
          确定
        </Button>
      </div>
    </section>
  );
}
