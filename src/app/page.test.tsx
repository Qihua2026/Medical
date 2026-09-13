import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("focuses paid users on entering the medical career assessment", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /明确适合你的\s*医药职业方向/,
    });
    const primaryAction = screen.getByRole("link", {
      name: "开始职业诊断",
    });
    const timing = screen.getByText("预计用时 5–8 分钟");

    expect(heading.parentElement).toHaveClass("text-center");
    expect(primaryAction).toHaveAttribute("href", "/assessment");
    expect(primaryAction.parentElement).toHaveClass("flex-col", "items-center");
    expect(primaryAction.parentElement).toContainElement(timing);
    expect(screen.queryByText(/免费获得/)).not.toBeInTheDocument();
  });

  it("does not distract users with a secondary header action", () => {
    render(<Home />);

    expect(
      screen.queryByRole("link", { name: "了解诊断方式" }),
    ).not.toBeInTheDocument();
  });

  it("does not repeat outcome labels below the primary action", () => {
    render(<Home />);

    expect(
      screen.queryByRole("list", { name: "诊断结果包括" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("优先岗位方向")).not.toBeInTheDocument();
    expect(screen.queryByText("备选职业方向")).not.toBeInTheDocument();
    expect(screen.queryByText(/两周/)).not.toBeInTheDocument();
  });

  it("places three responsive diagnostic step cards before the primary action", () => {
    render(<Home />);

    const stepList = screen.getByRole("list", { name: "职业诊断步骤" });
    const primaryAction = screen.getByRole("link", {
      name: "开始职业诊断",
    });

    expect(within(stepList).getAllByRole("listitem")).toHaveLength(3);
    expect(stepList).toHaveClass("grid-cols-3", "max-w-4xl");
    within(stepList)
      .getAllByRole("listitem")
      .forEach((item) => {
        expect(item.firstElementChild).toHaveClass("py-0");
      });
    expect(
      stepList.compareDocumentPosition(primaryAction) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("removes the example card and secondary process introduction", () => {
    render(<Home />);

    expect(screen.queryByText("诊断示例")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "从个人信息分析到求职行动方案",
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps the process section focused on the three diagnostic steps", () => {
    render(<Home />);

    expect(
      screen.queryByText(/诊断仅基于真实经历提供方向判断/),
    ).not.toBeInTheDocument();
  });
});
