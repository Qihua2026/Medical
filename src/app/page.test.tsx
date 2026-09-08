import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("focuses paid users on entering the medical career assessment", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /找到更适合你的\s*医药职业方向/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "进入职业诊断" }),
    ).toHaveAttribute("href", "/assessment");
    expect(screen.queryByText(/免费获得/)).not.toBeInTheDocument();
  });

  it("sets clear expectations for the assessment outcome", () => {
    render(<Home />);

    expect(screen.getByText("1 条主线岗位")).toBeInTheDocument();
    expect(screen.getByText("1 条备选方向")).toBeInTheDocument();
    expect(screen.getByText("未来 2 周行动建议")).toBeInTheDocument();
  });

  it("states the truthful career guidance boundary", () => {
    render(<Home />);

    expect(
      screen.getByText(/只基于你的真实经历提供判断/),
    ).toBeInTheDocument();
  });
});
