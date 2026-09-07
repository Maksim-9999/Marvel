import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders an svg element", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
