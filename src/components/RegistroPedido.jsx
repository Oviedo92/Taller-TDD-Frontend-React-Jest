import { useState } from "react";
import "./RegistroPedido.css";

// Estado inicial del formulario
const initialState = {
  customerId: "",
  fullName: "",
  product: "",
  quantity: "",
  deliveryDate: "",
  paymentMethod: "",
  priority: "normal",
  gift: false,
};

function RegistroPedido() {
  // Estado del formulario
  const [formData, setFormData] = useState(initialState);

  // Estado del mensaje de registro
  const [registered, setRegistered] = useState(false);

  // Captura cualquier cambio del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setRegistered(false);
  };

  // Envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Registered:", formData);

    setRegistered(true);
    setFormData(initialState);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <span className="icon">📦</span>
          <h2>Registro de Pedido</h2>
          <p>Manipulación del DOM con React Testing Library</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="customerId">Identificación</label>
            <input
              id="customerId"
              name="customerId"
              type="text"
              value={formData.customerId}
              onChange={handleChange}
              placeholder="12345678"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="fullName">Nombre completo</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="product">Producto</label>
            <input
              id="product"
              name="product"
              type="text"
              value={formData.product}
              onChange={handleChange}
              placeholder="Computador"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="1"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="deliveryDate">Fecha de entrega</label>
            <input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="paymentMethod">Método de pago</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="card">Tarjeta</option>
              <option value="pse">PSE</option>
              <option value="cash">Contraentrega</option>
            </select>
          </div>

          <div className="field">
            <label>Prioridad</label>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={formData.priority === "normal"}
                  onChange={handleChange}
                />
                Normal
              </label>

              <label>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={handleChange}
                />
                Alta
              </label>
            </div>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="gift"
                checked={formData.gift}
                onChange={handleChange}
              />
              ¿Empaque de regalo?
            </label>
          </div>

          <button type="submit" className="btn-register">
            Registrar Pedido
          </button>

          {registered && (
            <div className="success-message">
              Pedido registrado exitosamente
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistroPedido;