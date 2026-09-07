import { render, screen } from "@testing-library/react";
import setContent from "./setContent";

const DummyComponent = ({ data }) => <div>Data: {data}</div>;

describe("setContent", () => {
  it("renders Skeleton on 'waiting'", () => {
    render(setContent("waiting", DummyComponent, null));
    expect(document.querySelector(".skeleton")).toBeInTheDocument();
  });

  it("renders Spinner on 'loading'", () => {
    render(setContent("loading", DummyComponent, null));
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the given Component with data on 'confirmed'", () => {
    render(setContent("confirmed", DummyComponent, "hello"));
    expect(screen.getByText("Data: hello")).toBeInTheDocument();
  });

  it("renders ErrorMessage on 'error'", () => {
    render(setContent("error", DummyComponent, null));
    expect(document.querySelector("img")).toBeInTheDocument(); // ErrorMessage — картинка ошибки
  });

  it("throws on unknown status", () => {
    expect(() => setContent("unknown", DummyComponent, null)).toThrow(
      "Unexpected process state",
    );
  });
});
