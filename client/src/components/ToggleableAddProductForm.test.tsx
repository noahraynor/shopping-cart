import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleableAddProductForm } from './ToggleableAddProductForm';


describe("ToggleableAddProductForm", () => {
  it("toggles visibility of AddProductForm by clicking Add a Product button", async () => {
    const onAddProduct = vi.fn();
    render(<ToggleableAddProductForm onAddProduct={onAddProduct}/>);
    expect(screen.queryByLabelText("Product Name:")).not.toBeInTheDocument();

    const addProductButton = screen.getByRole("button", { name: /add a product/i});
    await userEvent.click(addProductButton);
    expect(screen.getByLabelText("Product Name:")).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i});
    await userEvent.click(cancelButton);
    expect(screen.queryByLabelText("Product Name:")).not.toBeInTheDocument();
  });
});