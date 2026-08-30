# Taller TDD — Frontend React + Jest

Aplicación frontend desarrollada con **React** como parte del taller de **Test-Driven Development (TDD)**. El proyecto implementa un formulario para la validación de pedidos y utiliza pruebas automatizadas para comprobar tanto el renderizado de la interfaz como las interacciones del usuario y las reglas de validación.

---

## 📌 Descripción

Este proyecto corresponde a la parte **Frontend** del taller TDD.

Se desarrolló una interfaz gráfica que permite ingresar la información básica de un pedido:

* Producto.
* Total del pedido.
* Método de pago.

A partir de estos datos, la aplicación ejecuta diferentes reglas de validación y muestra al usuario si el pedido es válido o cuáles son los errores encontrados.

El proyecto toma como referencia la estructura y metodología trabajada durante el taller, pero adapta la implementación al contexto propio de **validación de pedidos**.

---

## 🎯 Objetivos

### Objetivo general

Implementar una interfaz web en React que permita validar pedidos y comprobar su comportamiento mediante pruebas automatizadas utilizando Jest y React Testing Library.

### Objetivos específicos

* Construir un formulario interactivo utilizando React.
* Administrar el estado de los campos mediante `useState`.
* Implementar reglas de validación para los pedidos.
* Manipular y consultar el DOM mediante React Testing Library.
* Simular acciones reales del usuario con `userEvent`.
* Ejecutar pruebas automatizadas mediante Jest.
* Utilizar JSDOM como entorno de ejecución de las pruebas.
* Utilizar Jest DOM para realizar comprobaciones sobre elementos HTML.
* Generar un informe de cobertura mediante Jest.
* Verificar que el proyecto pueda compilarse correctamente mediante Vite.

---

# 🏗️ Arquitectura del Frontend

La aplicación está construida utilizando una arquitectura sencilla basada en componentes React.

```text
Taller-TDD-Frontend-React-Jest
│
├── src/
│   ├── components/
│   │   ├── PedidoForm.jsx
│   │   ├── PedidoForm.css
│   │   └── PedidoForm.test.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── babel.config.cjs
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

### Componentes principales

| Archivo               | Responsabilidad                              |
| --------------------- | -------------------------------------------- |
| `PedidoForm.jsx`      | Formulario y lógica de validación del pedido |
| `PedidoForm.css`      | Estilos visuales del formulario              |
| `PedidoForm.test.jsx` | Pruebas automatizadas del componente         |
| `App.jsx`             | Componente principal de la aplicación        |
| `main.jsx`            | Punto de entrada de React                    |
| `babel.config.cjs`    | Configuración de Babel para Jest y JSX       |
| `vite.config.js`      | Configuración del entorno Vite               |

---

# ⚛️ Componente `PedidoForm`

El componente principal se encuentra en:

```text
src/components/PedidoForm.jsx
```

Este componente administra el formulario y contiene la lógica necesaria para validar un pedido.

## Estado del formulario

Se utiliza `useState()` para mantener los valores introducidos por el usuario:

```javascript
const [formulario, setFormulario] = useState(estadoInicial)
```

Los campos manejados son:

```text
Producto
Total
Método de pago
```

Cada cambio realizado por el usuario actualiza el estado correspondiente.

---

# 🔎 Reglas de validación

El componente implementa diferentes reglas de negocio.

### Producto

El pedido debe contener al menos un producto.

```text
Si no existe producto:
→ Pedido inválido
```

### Total

El total debe ser mayor que cero.

```text
Si total <= 0:
→ Pedido inválido
```

### Método de pago

Solamente se permiten los siguientes métodos:

```text
Tarjeta
PSE
Contraentrega
```

### Restricción de contraentrega

Los pedidos mediante contraentrega no pueden superar:

```text
$500.000
```

Por lo tanto:

```text
Contraentrega + total > $500.000
→ Pedido inválido
```

---

# 🖥️ Interfaz de usuario

La interfaz fue desarrollada utilizando **React + CSS**.

El formulario permite:

1. Introducir el producto.
2. Introducir el valor total.
3. Seleccionar el método de pago.
4. Ejecutar la validación.
5. Visualizar el resultado.

Cuando el pedido es válido se muestra un mensaje indicando que puede continuar con la compra.

Cuando existen errores, la interfaz presenta las reglas que no fueron cumplidas.

---

# 🧪 Estrategia de pruebas

Las pruebas se encuentran en:

```text
src/components/PedidoForm.test.jsx
```

Se utilizó:

* **Jest** para ejecutar las pruebas.
* **React Testing Library** para renderizar y consultar componentes.
* **JSDOM** para proporcionar un DOM simulado.
* **@testing-library/user-event** para simular interacciones reales.
* **@testing-library/jest-dom** para utilizar matchers específicos del DOM.
* **Babel** para permitir que Jest interprete JSX.

El flujo de ejecución es:

```text
PedidoForm.jsx
       ↓
React
       ↓
JSDOM
       ↓
React Testing Library
       ↓
Jest
       ↓
Resultado de las pruebas
       ↓
Coverage
```

---

# 🌐 Manipulación del DOM

React Testing Library permite realizar las pruebas desde una perspectiva cercana a la interacción de un usuario real.

Para renderizar el componente se utiliza:

```javascript
render(<PedidoForm />)
```

Para localizar elementos mediante sus etiquetas:

```javascript
screen.getByLabelText(/producto/i)
```

Para localizar botones:

```javascript
screen.getByRole('button', {
    name: /validar/i
})
```

Para simular escritura:

```javascript
await user.type(inputProducto, 'Computador')
```

Para seleccionar una opción:

```javascript
await user.selectOptions(
    screen.getByLabelText(/método de pago/i),
    'tarjeta'
)
```

Para hacer clic:

```javascript
await user.click(boton)
```

De esta manera se comprueba el comportamiento del componente mediante interacciones similares a las realizadas por un usuario.

---

# 🧩 Jest DOM y Matchers

Se utilizó:

```text
@testing-library/jest-dom
```

Esta biblioteca proporciona matchers adicionales para comprobar el estado de elementos HTML.

Por ejemplo:

```javascript
expect(elemento).toBeInTheDocument()
```

permite verificar que un elemento se encuentre presente en el DOM.

También:

```javascript
expect(inputProducto).toHaveValue('Computador')
```

permite comprobar que el campo contiene el valor esperado después de una interacción.

---

# 🧪 Casos de prueba implementados

Actualmente el componente cuenta con **11 pruebas automatizadas**.

| #  | Prueba                               | Objetivo                                               |
| -- | ------------------------------------ | ------------------------------------------------------ |
| 1  | Render Component                     | Verificar que el componente se renderice correctamente |
| 2  | Verify fields                        | Comprobar que los campos principales existan           |
| 3  | Write product and validate           | Comprobar la escritura del producto                    |
| 4  | Write total and validate             | Comprobar la escritura del total                       |
| 5  | Select payment method                | Comprobar la selección del método de pago              |
| 6  | Validate valid order                 | Validar un pedido correcto                             |
| 7  | Order without product                | Validar el comportamiento sin producto                 |
| 8  | Order with total equal to zero       | Validar el total igual a cero                          |
| 9  | Invalid payment method               | Validar un método de pago inválido                     |
| 10 | Cash on delivery greater than 500000 | Validar la restricción de contraentrega                |
| 11 | Verify submit button                 | Comprobar la existencia del botón                      |

---

# ⚙️ Configuración de Jest

El proyecto utiliza Jest como framework de pruebas.

La configuración se encuentra principalmente en:

```text
package.json
```

y:

```text
babel.config.cjs
```

La configuración de Babel permite transformar JSX para que Jest pueda procesar los archivos React.

```javascript
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
}
```

El entorno de pruebas utilizado es:

```text
jsdom
```

Esto permite ejecutar los componentes React dentro de un DOM simulado sin abrir un navegador real.

---

# 📦 Dependencias principales

### Dependencias de ejecución

```text
React
React DOM
```

### Dependencias de desarrollo

```text
Jest
Jest Environment JSDOM
React Testing Library
Testing Library DOM
Testing Library Jest DOM
Testing Library User Event
Babel
Babel Jest
Babel Preset Env
Babel Preset React
Vite
ESLint
```

Las versiones exactas utilizadas pueden consultarse en:

```text
package.json
```

y:

```text
package-lock.json
```

---

# ▶️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd Taller-TDD-Frontend-React-Jest
```

Instalar las dependencias:

```bash
npm install
```

---

# 🚀 Ejecución del Frontend

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite iniciará el entorno de desarrollo y proporcionará la dirección local para visualizar la aplicación en el navegador.

---

# 🧪 Ejecución de pruebas

Para ejecutar todas las pruebas:

```bash
npm test
```

Resultado obtenido durante la validación del proyecto:

```text
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
```

Esto indica que:

```text
1 suite de pruebas
      ↓
11 casos ejecutados
      ↓
11 pruebas exitosas
      ↓
0 pruebas fallidas
```

---

# 📊 Cobertura de código

Para generar el informe de cobertura:

```bash
npm run test:coverage
```

Resultado obtenido:

| Métrica    |   Cobertura |
| ---------- | ----------: |
| Statements | **96.29 %** |
| Branches   |   **100 %** |
| Functions  | **85.71 %** |
| Lines      | **96.15 %** |

### Interpretación

**Statements — 96.29 %**

Indica el porcentaje de instrucciones del código que fueron ejecutadas durante las pruebas.

**Branches — 100 %**

Indica que las diferentes ramas condicionales analizadas fueron recorridas por las pruebas.

**Functions — 85.71 %**

Indica el porcentaje de funciones que fueron ejecutadas durante las pruebas.

**Lines — 96.15 %**

Indica el porcentaje de líneas de código ejecutadas durante las pruebas.

Un porcentaje elevado de cobertura indica que una gran parte del código fue ejercitada por los casos de prueba. Sin embargo, **coverage no garantiza por sí mismo que el software esté libre de errores**; solamente mide qué parte del código fue ejecutada.

---

# 📄 Informe HTML de Coverage

Jest genera automáticamente:

```text
coverage/
```

El informe visual puede consultarse mediante:

```text
coverage/lcov-report/index.html
```

Este informe permite:

* Consultar porcentajes de cobertura.
* Identificar archivos analizados.
* Revisar líneas ejecutadas.
* Identificar código que no fue recorrido.
* Analizar las ramas condicionales cubiertas.

La carpeta `coverage/` se encuentra excluida del repositorio mediante `.gitignore`, debido a que es un resultado generado automáticamente.

---

# 🏗️ Verificación de compilación

Además de las pruebas automatizadas, se verificó que el proyecto pueda ser construido correctamente mediante Vite.

```bash
npm run build
```

Este proceso comprueba que el código React, JSX, CSS y demás recursos puedan ser procesados correctamente para generar una versión de producción.

El resultado genera:

```text
dist/
```

Esta carpeta también se encuentra excluida mediante `.gitignore` porque corresponde a archivos generados automáticamente.

---

# 🔗 Relación con el Backend

El taller completo contempla dos partes:

```text
                  TALLER TDD
                      │
             ┌────────┴────────┐
             │                 │
          BACKEND           FRONTEND
             │                 │
             ▼                 ▼
       Lógica de negocio    React
             │                 │
             ▼                 ▼
         Pruebas            Jest
       correspondientes       │
                               ▼
                            JSDOM
                               │
                               ▼
                         React Testing
                            Library
                               │
                               ▼
                           Coverage
```

El **backend y frontend se mantienen separados en sus respectivos proyectos/repositorios**, permitiendo que cada capa tenga sus propias responsabilidades y pruebas.

La integración entre ambas partes puede realizarse posteriormente mediante una API o servicio HTTP.

---

# 🔄 Flujo general del proyecto

```text
Usuario
   │
   ▼
Formulario React
   │
   ├── Producto
   ├── Total
   └── Método de pago
          │
          ▼
    validarPedido()
          │
     ┌────┴────┐
     │         │
   Válido    Inválido
     │         │
     ▼         ▼
 Mensaje    Lista de
 exitoso    errores
```

Para las pruebas:

```text
Test
 │
 ▼
render()
 │
 ▼
JSDOM
 │
 ▼
DOM simulado
 │
 ▼
userEvent
 │
 ▼
Interacción
 │
 ▼
Matcher
 │
 ▼
PASS / FAIL
```

---

# 📋 Scripts disponibles

Los principales comandos definidos en `package.json` son:

| Comando                 | Función                                      |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Ejecutar el frontend en modo desarrollo      |
| `npm run build`         | Construir la aplicación para producción      |
| `npm run preview`       | Previsualizar la construcción de producción  |
| `npm run lint`          | Analizar problemas de código mediante ESLint |
| `npm test`              | Ejecutar las pruebas de Jest                 |
| `npm run test:coverage` | Ejecutar pruebas y generar cobertura         |

---

# 🧹 Control de archivos

El proyecto utiliza `.gitignore` para evitar subir archivos generados automáticamente o dependencias locales.

Entre los principales elementos excluidos se encuentran:

```text
node_modules/
coverage/
dist/
.env
```

Mientras que sí forman parte del repositorio:

```text
src/
package.json
package-lock.json
babel.config.cjs
vite.config.js
eslint.config.js
index.html
README.md
```

Esto permite que otra persona pueda clonar el repositorio e instalar nuevamente las dependencias mediante:

```bash
npm install
```

---

# 📈 Resultado del taller

El frontend alcanzó los siguientes resultados durante la ejecución:

```text
✅ 1 suite de pruebas aprobada
✅ 11 pruebas aprobadas
✅ 0 pruebas fallidas
✅ 100 % de cobertura de branches
✅ 96.29 % de statements
✅ 96.15 % de líneas
✅ 85.71 % de funciones
✅ Build de Vite verificado
```

Estos resultados muestran que el componente cuenta con pruebas para el renderizado, interacción con los campos, selección de opciones, validación de pedidos y escenarios de error definidos.

---

# 📝 Conclusión

El desarrollo permitió aplicar los principales conceptos de pruebas automatizadas en un frontend React.

Se construyó un componente funcional para la validación de pedidos y posteriormente se implementaron pruebas utilizando Jest, React Testing Library, JSDOM, `userEvent` y Jest DOM.

Las pruebas permitieron verificar tanto la presencia de los elementos de la interfaz como las interacciones del usuario y las diferentes reglas de validación.

El informe de cobertura obtenido muestra un nivel elevado de código ejecutado durante las pruebas, mientras que la ejecución exitosa de Jest y la compilación mediante Vite permiten comprobar que el proyecto funciona correctamente dentro del entorno configurado.

El repositorio constituye la parte frontend del taller y puede complementarse con el repositorio correspondiente al backend para documentar posteriormente la integración completa del sistema.

---

## 👨‍💻 Proyecto académico

**Proyecto:** Taller TDD — Frontend
**Tecnologías:** React · Jest · React Testing Library · JSDOM · Vite · Babel
**Lenguaje:** JavaScript / JSX
**Enfoque:** Test-Driven Development (TDD)
