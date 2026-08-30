import { useState } from 'react'
import './PedidoForm.css'

const estadoInicial = {
    items: '',
    total: '',
    metodoPago: '',
}

const metodosPagoValidos = ['tarjeta', 'PSE', 'contraentrega']

function validarPedido(pedido) {

    const errores = []

    if (pedido.items.length === 0) {
        errores.push('El pedido debe tener al menos un producto')
    }

    if (pedido.total <= 0) {
        errores.push('El total debe ser mayor a 0')
    }

    if (!metodosPagoValidos.includes(pedido.metodoPago)) {
        errores.push('Método de pago no válido')
    }

    if (pedido.metodoPago === 'contraentrega' && pedido.total > 500000) {
        errores.push('El pago contraentrega no admite pedidos mayores a $500.000')
    }

    return {
        valido: errores.length === 0,
        errores: errores,
    }
}

function PedidoForm() {

    const [formulario, setFormulario] = useState(estadoInicial)
    const [resultado, setResultado] = useState(null)

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormulario((prev) => ({
            ...prev,
            [name]: value,
        }))

        setResultado(null)
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        const pedido = {
            items: formulario.items
                ? [formulario.items]
                : [],
            total: Number(formulario.total),
            metodoPago: formulario.metodoPago,
        }

        const resultadoValidacion = validarPedido(pedido)

        setResultado(resultadoValidacion)
    }

    return (
        <div className="pedido-page">

            <div className="pedido-form">

                <div className="pedido-header">
                    <span className="icono">🛒</span>

                    <h2>Validación de Pedido</h2>

                    <p>
                        Ingresa los datos del pedido para validar la compra
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="campo">

                        <label htmlFor="items">
                            Producto
                        </label>

                        <input
                            id="items"
                            type="text"
                            name="items"
                            value={formulario.items}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                        />

                    </div>

                    <div className="campo">

                        <label htmlFor="total">
                            Total
                        </label>

                        <input
                            id="total"
                            type="number"
                            name="total"
                            value={formulario.total}
                            onChange={handleChange}
                            placeholder="Valor total del pedido"
                        />

                    </div>

                    <div className="campo">

                        <label htmlFor="metodoPago">
                            Método de pago
                        </label>

                        <select
                            id="metodoPago"
                            name="metodoPago"
                            value={formulario.metodoPago}
                            onChange={handleChange}
                        >

                            <option value="">
                                Seleccionar...
                            </option>

                            <option value="tarjeta">
                                Tarjeta
                            </option>

                            <option value="PSE">
                                PSE
                            </option>

                            <option value="contraentrega">
                                Contraentrega
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn-validar"
                    >
                        Validar Pedido
                    </button>

                    {resultado && (

                        <div className={resultado.valido
                            ? 'resultado-exito'
                            : 'resultado-error'}>

                            {resultado.valido ? (
                                <p>Pedido válido. Puede continuar con la compra.</p>
                            ) : (
                                <div>

                                    <p>El pedido no es válido:</p>

                                    <ul>
                                        {resultado.errores.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>

                                </div>
                            )}

                        </div>

                    )}

                </form>

            </div>

        </div>
    )
}

export default PedidoForm