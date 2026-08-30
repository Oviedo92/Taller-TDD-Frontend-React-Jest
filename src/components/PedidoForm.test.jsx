
// ============================================================
// IMPORTACIÓN DE HERRAMIENTAS
// ============================================================

// render: permite renderizar el componente React en un DOM de prueba.
import { render, screen } from '@testing-library/react'

// userEvent: permite simular acciones reales del usuario.
import userEvent from '@testing-library/user-event'

// Funciones de Jest.
import { describe, test, expect } from '@jest/globals'

// Componente que vamos a probar.
import PedidoForm from './PedidoForm'


// ============================================================
// TEST DEL COMPONENTE PEDIDOFORM
// ============================================================

describe('Test Component PedidoForm', () => {

    // ========================================================
    // PRUEBA 1: Verificar que el componente se renderiza
    // ========================================================

    test('Render Component', () => {

        // ARRANGE + ACT
        // Renderizamos el componente dentro del DOM de prueba.
        render(<PedidoForm />)

        // ASSERT
        // Comprobamos que el título exista en el DOM.
        expect(
            screen.getByText('Validación de Pedido')
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 2: Verificar que los campos existen
    // ========================================================

    test('Verify fields', () => {

        // Renderizamos el formulario.
        render(<PedidoForm />)

        // Verificamos que exista el campo Producto.
        expect(
            screen.getByLabelText(/producto/i)
        ).toBeInTheDocument()

        // Verificamos que exista el campo Total.
        expect(
            screen.getByLabelText(/total/i)
        ).toBeInTheDocument()

        // Verificamos que exista el campo Método de pago.
        expect(
            screen.getByLabelText(/método de pago/i)
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 3: Escribir un producto
    // ========================================================

    test('Write product and validate', async () => {

        // Renderizamos el formulario.
        render(<PedidoForm />)

        // Buscamos el input mediante su label.
        const inputProducto = screen.getByLabelText(/producto/i)

        // Simulamos que un usuario escribe un producto.
        await userEvent.type(
            inputProducto,
            'Computador'
        )

        // Comprobamos que React actualizó
        // correctamente el valor del input.
        expect(inputProducto).toHaveValue('Computador')
    })


    // ========================================================
    // PRUEBA 4: Escribir el total
    // ========================================================

    test('Write total and validate', async () => {

        // Renderizamos el formulario.
        render(<PedidoForm />)

        // Buscamos el campo Total.
        const inputTotal = screen.getByLabelText(/total/i)

        // Simulamos que el usuario escribe un valor.
        await userEvent.type(
            inputTotal,
            '100000'
        )

        // Verificamos que el input tenga ese valor.
        expect(inputTotal).toHaveValue(100000)
    })


    // ========================================================
    // PRUEBA 5: Seleccionar método de pago
    // ========================================================

    test('Select payment method', async () => {

        // Renderizamos el formulario.
        render(<PedidoForm />)

        // Buscamos el select.
        const selectMetodo = screen.getByLabelText(/método de pago/i)

        // Simulamos que el usuario selecciona Tarjeta.
        await userEvent.selectOptions(
            selectMetodo,
            'tarjeta'
        )

        // Verificamos que la opción seleccionada
        // sea realmente "tarjeta".
        expect(selectMetodo).toHaveValue('tarjeta')
    })


    // ========================================================
    // PRUEBA 6: Pedido válido
    // ========================================================

    test('Validate valid order', async () => {

        // Renderizamos el formulario.
        render(<PedidoForm />)

        // Creamos un usuario para simular
        // interacciones reales.
        const user = userEvent.setup()

        // ----------------------------------------------------
        // ARRANGE
        // ----------------------------------------------------

        // Producto.
        await user.type(
            screen.getByLabelText(/producto/i),
            'Computador'
        )

        // Total.
        await user.type(
            screen.getByLabelText(/total/i),
            '100000'
        )

        // Método de pago.
        await user.selectOptions(
            screen.getByLabelText(/método de pago/i),
            'tarjeta'
        )

        // ----------------------------------------------------
        // ACT
        // ----------------------------------------------------

        // Presionamos el botón Validar Pedido.
        await user.click(
            screen.getByRole('button', {
                name: /validar pedido/i
            })
        )

        // ----------------------------------------------------
        // ASSERT
        // ----------------------------------------------------

        // Verificamos que aparezca el mensaje
        // indicando que el pedido es válido.
        expect(
            screen.getByText(
                /pedido válido\. puede continuar con la compra/i
            )
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 7: Pedido sin producto
    // ========================================================

    test('Order without product', async () => {

        render(<PedidoForm />)

        const user = userEvent.setup()

        // Solo colocamos total y método de pago.
        await user.type(
            screen.getByLabelText(/total/i),
            '100000'
        )

        await user.selectOptions(
            screen.getByLabelText(/método de pago/i),
            'tarjeta'
        )

        // Ejecutamos la validación.
        await user.click(
            screen.getByRole('button', {
                name: /validar pedido/i
            })
        )

        // Debe aparecer el error correspondiente.
        expect(
            screen.getByText(
                /el pedido debe tener al menos un producto/i
            )
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 8: Total igual a cero
    // ========================================================

    test('Order with total equal to zero', async () => {

        render(<PedidoForm />)

        const user = userEvent.setup()

        // Producto válido.
        await user.type(
            screen.getByLabelText(/producto/i),
            'Computador'
        )

        // Total igual a cero.
        await user.type(
            screen.getByLabelText(/total/i),
            '0'
        )

        // Método válido.
        await user.selectOptions(
            screen.getByLabelText(/método de pago/i),
            'tarjeta'
        )

        // Ejecutamos la validación.
        await user.click(
            screen.getByRole('button', {
                name: /validar pedido/i
            })
        )

        // Debe aparecer el error del total.
        expect(
            screen.getByText(
                /el total debe ser mayor a 0/i
            )
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 9: Método de pago no válido
    // ========================================================

    test('Invalid payment method', async () => {

        render(<PedidoForm />)

        const user = userEvent.setup()

        // Producto válido.
        await user.type(
            screen.getByLabelText(/producto/i),
            'Computador'
        )

        // Total válido.
        await user.type(
            screen.getByLabelText(/total/i),
            '100000'
        )

        // No seleccionamos ningún método.
        // El valor será "" y validarPedido()
        // deberá considerarlo inválido.

        await user.click(
            screen.getByRole('button', {
                name: /validar pedido/i
            })
        )

        // Verificamos el error.
        expect(
            screen.getByText(
                /método de pago no válido/i
            )
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 10: Contraentrega superior a $500.000
    // ========================================================

    test('Cash on delivery greater than 500000', async () => {

        render(<PedidoForm />)

        const user = userEvent.setup()

        // Producto.
        await user.type(
            screen.getByLabelText(/producto/i),
            'Computador'
        )

        // Total superior al límite.
        await user.type(
            screen.getByLabelText(/total/i),
            '600000'
        )

        // Contraentrega.
        await user.selectOptions(
            screen.getByLabelText(/método de pago/i),
            'contraentrega'
        )

        // Ejecutamos la validación.
        await user.click(
            screen.getByRole('button', {
                name: /validar pedido/i
            })
        )

        // Verificamos el error específico.
        expect(
            screen.getByText(
                /el pago contraentrega no admite pedidos mayores a \$500\.000/i
            )
        ).toBeInTheDocument()
    })


    // ========================================================
    // PRUEBA 11: Verificar botón
    // ========================================================

    test('Verify submit button', () => {

        render(<PedidoForm />)

        // Buscamos el botón mediante su rol accesible.
        const boton = screen.getByRole('button', {
            name: /validar pedido/i
        })

        // Verificamos que exista.
        expect(boton).toBeInTheDocument()
    })

})

