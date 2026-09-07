import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Bomb = () => {
  throw new Error("Boom");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    // React логирует ошибку в консоль — глушим её на время теста
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(document.querySelector("img")).toBeInTheDocument(); // ErrorMessage
  });
});
