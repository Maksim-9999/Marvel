import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CharSearchForm from "./CharSearchForm";
import useMarvelService from "../../services/MarvelService";

vi.mock("../../services/MarvelService");

describe("CharSearchForm", () => {
  beforeEach(() => {
    useMarvelService.mockReturnValue({
      getCharacterByName: vi.fn().mockResolvedValue([{ id: 1, name: "Hulk" }]),
      clearError: vi.fn(),
      process: "confirmed",
      setProcess: vi.fn(),
    });
  });

  it("shows a validation error on empty submit", async () => {
    render(<CharSearchForm />, { wrapper: MemoryRouter });
    await userEvent.click(screen.getByText("Find"));
    expect(
      await screen.findByText(/this field is required/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it("shows a success link when a character is found", async () => {
    render(<CharSearchForm />, { wrapper: MemoryRouter });
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "Hulk");
    await userEvent.click(screen.getByText("Find"));

    await waitFor(() => {
      expect(screen.getByText(/There is! Visit Hulk/)).toBeInTheDocument();
    });
  });
});
