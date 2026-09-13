import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Assessment from "./page";

describe("Assessment", () => {
  it("starts with one focused identity question", () => {
    render(<Assessment />);

    expect(screen.getByText("第 1 步，共 4 步")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "请选择当前求职阶段" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(6);
  });

  it("explains why the advisor asks the question", () => {
    render(<Assessment />);

    expect(screen.getByRole("complementary")).toHaveTextContent(
      "填写说明",
    );
  });

  it("keeps the confirmation visually primary while disabling it until a stage is selected", () => {
    render(<Assessment />);

    const confirmButton = screen.getByRole("button", { name: "确认" });

    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveClass("disabled:opacity-100");

    fireEvent.click(screen.getByRole("radio", { name: "博士 / 博后" }));

    expect(confirmButton).toBeEnabled();
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
