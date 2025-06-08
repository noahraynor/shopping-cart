import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from './App';
import { fetchProducts, fetchCart, deleteProduct } from './services/apiService';
import userEvent from "@testing-library/user-event";

vi.mock('./services/apiService.ts')
const mockedAPI = vi.mocked({ fetchProducts, fetchCart, deleteProduct }, true);

afterEach(() => {
  vi.resetAllMocks();
});

const mockedProducts = [
  {
    _id: "adjf353j",
    title: "Computer",
    quantity: 55,
    price: 984.12,
  },
  {
    _id: "fdjfx53j",
    title: "Monitor",
    quantity: 22,
    price: 84.12,
  },
  {
    _id: "5djf353j",
    title: "Mouse",
    quantity: 1,
    price: 411.12,
  },
];

const mockedCart = [
  {
    _id: "1",
    productId: "adjf353j",
    title: "Cart Item1",
    quantity: 1,
    price: 984.12,
  },
  {
    _id: "2",
    productId: "fdjfx53j",
    title: "Cart Item2",
    quantity: 2,
    price: 84.12,
  },
  {
    _id: "3",
    productId: "5djf353j",
    title: "Cart Item3",
    quantity: 3,
    price: 411.12,
  },
];

describe("App", () => {
  it("shows a product and cart on render", async () => {
    mockedAPI.fetchProducts.mockResolvedValue(mockedProducts);
    mockedAPI.fetchCart.mockResolvedValue(mockedCart);

    render(<App />);

    expect(await screen.findByText("Monitor")).toBeInTheDocument();
    expect(await screen.findByText("Computer")).toBeInTheDocument();
    expect(await screen.findByText("Mouse")).toBeInTheDocument();

    expect(await screen.findByText("Cart Item1")).toBeInTheDocument();
    expect(await screen.findByText("Cart Item2")).toBeInTheDocument();
    expect(await screen.findByText("Cart Item3")).toBeInTheDocument();
  });

  it("deletes a product when the x is clicked", async () => {
    mockedAPI.fetchProducts.mockResolvedValue(mockedProducts);
    mockedAPI.fetchCart.mockResolvedValue(mockedCart);

    render(<App />);

    expect(await screen.findByText("Monitor")).toBeInTheDocument();

    const deleteButton = await screen.findByTestId(`fdjfx53j`);

    await userEvent.click(deleteButton);

    await expect(screen.findByText("Monitor")).rejects.toThrow();
  });
});
