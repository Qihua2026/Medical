import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Assessment from "./page";

describe("Assessment", () => {
  it("starts with one focused identity question", () => {
    render(<Assessment />);

    expect(screen.getByText("第 1 步，共 4 步")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "先从你现在所处的阶段开始" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(6);
  });

  it("explains why the advisor asks the question", () => {
    render(<Assessment />);

    expect(screen.getByText(/这会影响岗位门槛与求职节奏/)).toBeInTheDocument();
  });
});
