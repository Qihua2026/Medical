import { render, screen, within } from "@testing-library/react";
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

  it("does not distract users with a secondary header action", () => {
    render(<Home />);

    expect(
      screen.queryByRole("link", { name: "了解诊断方式" }),
    ).not.toBeInTheDocument();
  });

  it("sets clear expectations for the assessment outcome", () => {
    render(<Home />);

    const outcomeList = screen.getByRole("list", {
      name: "诊断结果包括",
    });

    expect(within(outcomeList).getAllByRole("listitem")).toHaveLength(3);
  });

  it("states the truthful career guidance boundary", () => {
    render(<Home />);

    expect(
      screen.getByText(/只基于你的真实经历提供判断/),
    ).toBeInTheDocument();
  });
});
