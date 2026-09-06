// Importación de librerías
import { render, screen } from "@testing-library/react";
import RegistroPedido from "./RegistroPedido";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "@jest/globals";

// Suite principal de pruebas
describe("Test Component RegistroPedido", () => {

  // Render del componente
  test("Render Component", () => {
    render(<RegistroPedido />);

    expect(
      screen.getByText("Registro de Pedido")
    ).toBeInTheDocument();
  });

  // Verificar campos
  test("Verify fields", () => {
    render(<RegistroPedido />);

    expect(screen.getByLabelText(/identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de entrega/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/método de pago/i)).toBeInTheDocument();
  });

  // Escribir nombre
  test("Write name", async () => {
    render(<RegistroPedido />);

    const inputName = screen.getByLabelText(/nombre completo/i);

    await userEvent.type(inputName, "Cristal Gonzalez");

    expect(inputName).toHaveValue("Cristal Gonzalez");
  });

  // Escribir cantidad
  test("Write quantity", async () => {
    render(<RegistroPedido />);

    const inputQuantity = screen.getByLabelText(/cantidad/i);

    await userEvent.type(inputQuantity, "5");

    expect(inputQuantity).toHaveValue(5);
  });

  // Seleccionar fecha
  test("Select delivery date", async () => {
    render(<RegistroPedido />);

    const inputDate = screen.getByLabelText(/fecha de entrega/i);

    await userEvent.type(inputDate, "2026-09-15");

    expect(inputDate).toHaveValue("2026-09-15");
  });

  // Seleccionar método de pago
  test("Select payment method", async () => {
    render(<RegistroPedido />);

    const selectPayment = screen.getByLabelText(/método de pago/i);

    await userEvent.selectOptions(selectPayment, "pse");

    expect(selectPayment).toHaveValue("pse");
  });

  // Seleccionar radio button
  test("Select priority", async () => {
    render(<RegistroPedido />);

    const radioHigh = screen.getByLabelText(/alta/i);

    await userEvent.click(radioHigh);

    expect(radioHigh).toBeChecked();
  });

  // Activar checkbox
  test("Check gift option", async () => {
    render(<RegistroPedido />);

    const checkboxGift = screen.getByLabelText(/empaque de regalo/i);

    await userEvent.click(checkboxGift);

    expect(checkboxGift).toBeChecked();
  });

  // Registro completo
  test("Validate Register", async () => {
    render(<RegistroPedido />);

    await userEvent.type(
      screen.getByLabelText(/identificación/i),
      "123456"
    );

    await userEvent.type(
      screen.getByLabelText(/nombre completo/i),
      "Cristal Gonzalez"
    );

    await userEvent.type(
      screen.getByLabelText(/producto/i),
      "Laptop"
    );

    await userEvent.type(
      screen.getByLabelText(/cantidad/i),
      "2"
    );

    await userEvent.type(
      screen.getByLabelText(/fecha de entrega/i),
      "2026-09-15"
    );

    await userEvent.selectOptions(
      screen.getByLabelText(/método de pago/i),
      "card"
    );

    await userEvent.click(
      screen.getByLabelText(/alta/i)
    );

    await userEvent.click(
      screen.getByLabelText(/empaque de regalo/i)
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /registrar pedido/i,
      })
    );

    expect(
      screen.getByText(/pedido registrado exitosamente/i)
    ).toBeInTheDocument();
  });

  // Verificar botón
  test("Verify submit button", () => {
    render(<RegistroPedido />);

    expect(
      screen.getByRole("button", {
        name: /registrar pedido/i,
      })
    ).toBeInTheDocument();
  });

});