import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Assessment from "./page";

describe("Assessment", () => {
  it("starts with one focused identity question", () => {
    render(<Assessment />);

    const logo = screen.getByRole("link", { name: "医途首页" });

    expect(logo).toHaveAttribute("href", "/");
    expect(logo.firstElementChild).toHaveClass("size-[25px]");
    expect(screen.queryByText("医途职业诊断")).not.toBeInTheDocument();
    expect(screen.queryByText("当前状态")).not.toBeInTheDocument();
    expect(screen.getByText("第 1 步，共 4 步")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "请选择当前求职阶段" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(6);
  });

  it("places the diagnostic rationale directly after the supporting copy", () => {
    render(<Assessment />);

    const guidance = screen.getByRole("note", { name: "问题说明" });

    expect(guidance).toHaveTextContent(
      "求职阶段将影响可选岗位入口及准备节奏，请选择与当前情况最接近的一项。求职阶段是判断岗位门槛、履历风险与准备周期的基础信息。",
    );
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("uses the same type size for supporting copy and its rationale", () => {
    render(<Assessment />);

    const guidance = screen.getByRole("note", { name: "问题说明" });
    const rationale = screen.getByText(
      "求职阶段是判断岗位门槛、履历风险与准备周期的基础信息。",
    );

    expect(guidance).toHaveClass("text-base");
    expect(rationale).toHaveClass("text-base");
    expect(rationale).not.toHaveClass("text-sm");
  });

  it("shows named milestones and moves the current marker forward", () => {
    render(<Assessment />);

    const milestones = screen.getByRole("list", { name: "诊断步骤" });

    expect(within(milestones).getAllByRole("listitem")).toHaveLength(4);
    expect(within(milestones).getByText("求职阶段").closest("li")).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(within(milestones).getByText("工作偏好")).toBeInTheDocument();
    expect(within(milestones).getByText("求职底线")).toBeInTheDocument();
    expect(within(milestones).getByText("优先目标")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: "应届生" }));
    fireEvent.click(screen.getByRole("button", { name: "确认" }));

    expect(within(milestones).getByText("求职阶段").closest("li")).toHaveAttribute(
      "data-state",
      "complete",
    );
    expect(within(milestones).getByText("工作偏好").closest("li")).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("stacks every option vertically and keeps confirmation full width", () => {
    render(<Assessment />);

    const optionGroup = screen.getByRole("group", {
      name: "当前求职阶段",
    });
    const confirmButton = screen.getByRole("button", { name: "确认" });

    expect(optionGroup).toHaveClass("grid-cols-1");
    expect(optionGroup).not.toHaveClass("sm:grid-cols-2");
    expect(confirmButton).toHaveClass("w-full");
    expect(confirmButton.parentElement).toHaveClass("w-full");
    expect(confirmButton.parentElement).not.toHaveClass("sm:col-start-2");
  });

  it("keeps the confirmation visually primary while disabling it until a stage is selected", () => {
    render(<Assessment />);

    const confirmButton = screen.getByRole("button", { name: "确认" });

    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveClass(
      "w-full",
      "disabled:opacity-100",
    );

    fireEvent.click(screen.getByRole("radio", { name: "博士 / 博后" }));

    expect(confirmButton).toBeEnabled();
  });

  it("shows a selection prompt only while confirmation is disabled", () => {
    render(<Assessment />);

    const confirmButton = screen.getByRole("button", { name: "确认" });

    expect(confirmButton).toHaveAttribute(
      "aria-describedby",
      "confirm-disabled-hint",
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("请先选择选项");

    fireEvent.click(screen.getByRole("radio", { name: "应届生" }));

    expect(confirmButton).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("moves from the career stage question to the work preference question", () => {
    render(<Assessment />);

    fireEvent.click(screen.getByRole("radio", { name: "在职转型" }));
    fireEvent.click(screen.getByRole("button", { name: "确认" }));

    expect(screen.getByText("第 2 步，共 4 步")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "请选择符合预期的工作方式",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    expect(screen.getByRole("button", { name: "确认" })).toBeDisabled();
  });

  it("continues through every question and reaches the completion summary", () => {
    render(<Assessment />);

    fireEvent.click(screen.getByRole("radio", { name: "在职转型" }));
    fireEvent.click(screen.getByRole("button", { name: "确认" }));
    fireEvent.click(
      screen.getByRole("radio", {
        name: "将科研能力转化为行业价值",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "确认" }));

    expect(
      screen.getByRole("heading", {
        name: "请选择当前不可妥协的求职条件",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );

    fireEvent.click(
      screen.getByRole("radio", { name: "不接受高频出差" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "确认" }));

    expect(
      screen.getByRole("heading", {
        name: "请选择当前求职的首要目标",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );

    fireEvent.click(
      screen.getByRole("radio", { name: "建立长期职业发展路径" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "确认" }));

    expect(
      screen.getByRole("heading", { name: "核心求职信息已完成整理" }),
    ).toBeInTheDocument();
    expect(screen.getByText("在职转型")).toBeInTheDocument();
    expect(screen.getByText("不接受高频出差")).toBeInTheDocument();
  });
});
