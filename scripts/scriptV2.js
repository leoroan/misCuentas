

///////////////////////////// constantes
const tasaAnual = 97;
const mvm = 0;
const canastaBasica = 0;
const indiceInflacion = 1;
const dolarOficial = 0;
const dolarBlue = 0;
const usuario = new Persona();

///////////////////////////// variables
let tasaMensual = Number(((tasaAnual * 8.21918) / 100).toFixed(6));
let cantidadBasePromedio = 9999;
let cantidadInvertida = 0;
let cantidadMeses = 1;
let totalRetorno = 0;
let metodo = "intCompuesto";

// Funciones ayudantes

/**
 * Cálculo para cada operacion, segun la opcion del usuario.
 * @returns boolean
 */
function aInvertir() {
    try {
        let cantidadInvertida = document.getElementById("montoInput").value;
        let cantidadMeses = document.getElementById("plazoInput").value;
        let fechaAux = new Date();
        for (let i = 0; i < cantidadMeses; i++) {
            let mes = new Mes(fechaAux, indiceInflacion, cantidadInvertida, tasaMensual);
            let op = new Operacion(mes);
            usuario.operaciones.push(op);
            fechaAux.setDate(fechaAux.getDate() + 31);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}


////////////////////  SegundaPartes o 3er Entrega

// Hacerle "focus" al input
function scrollToComponent(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Al cargar la página
window.onload = function () {
    scrollToComponent('montoInput');
};


// Obtener el cuerpo de la tarjeta de resultado 
const cardResultDisplay = document.getElementById("cardResultDisplay");

// Obtener el botón por su ID
const button = document.getElementById("mainButton");

// Obtener los "metodos" de radio
var radioButtons = document.getElementsByName("metodo");

// Modificar card de resultados
const cardOptiones = document.getElementById("cardOptions");

// Recorrer los elementos de radio y aplicar el evento de cambio a cada uno
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        metodo = document.querySelector('input[name="metodo"]:checked').value;
        cardOptiones.innerHTML = metodo === "intCompuesto" ? "MÉTODO: INTERES COMPUESTO" : "MÉTODO: POR MES ";
    });
});

function checkMonto(unValor) {
    return unValor === 0;
}
function checkPlazo(unValor) {
    return (unValor <= 0 || unValor >= 36);
}

button.addEventListener('click', function (e) {
    e.preventDefault();
    const montoInput = document.getElementById("montoInput");
    const radioInput = document.getElementById("radioOptionCard");
    const plazoInput = document.getElementById("plazoInput");
    let cardBienvenida = document.getElementById("cardBienvenida");
    let cardInicial = document.getElementById("cardInicial");
    const selectedRadio = document.querySelector('input[name="metodo"]:checked');

    if (checkMonto(montoInput.value) || checkPlazo(plazoInput.value) || !selectedRadio) {
        montoInput.classList.add("is-invalid");
        plazoInput.classList.add("is-invalid");
        radioInput.classList.add("is-invalid");
    } else {
        cardBienvenida.classList.add('hide');
        cardInicial.classList.add('hide');
        cardResultDisplay.style.display = 'block';
        aInvertir();
        usuario.calcularRetorno(metodo);
        const fomatoMoney2 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(usuario.calcularRetorno(metodo));
        const fomatoMoney3 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(usuario.calcularRetorno(metodo)) + Number(usuario.operaciones[0].getMes().getInversion()));

        cardOptiones.innerHTML += `<br> RETORNO DE INTERESES: ${fomatoMoney2}
                                   <br> RETORNO TOTAL: (INV + INT) ${fomatoMoney3}\n
                                  `;
        mostrarTarjetas(usuario.getOperaciones());
    }
});

function crearTarjeta(op) {
    const fomatoMoney = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(op.calcularRetornoPorMes());
    return `
    <div class="col-md-auto animate__animated animate__bounce">
    <div class="card border-light bg-transparent">
        <div class="card-body">
            <h4 class="card-title"> ${op.getMes().getNombreMes().toUpperCase()} ${op.getMes().getAnio()} </h4>
            <p> Retorno este mes: ${fomatoMoney} 💵</p> 
        </div>
    </div>
    </div>`;

    // esto para mostrar en un "acercamiento"

    // <h4 class="card-title"> ${op.getMes().getNombreMes().toUpperCase()} ${op.getMes().getAnio()} </h4>
    //         <p> Invertido este mes: $${op.getMes().getInversion()}</p>
    //         <p> Retorno este mes: $${op.calcularRetornoPorMes()}</p>
    //         <p> Metodo: ${metodo}</p>
}

function mostrarTarjetas(operaciones) {
    let contenedorTarjetas = document.getElementById("cardMes");
    let tarjetas = "";
    operaciones.forEach(op => {
        tarjetas += crearTarjeta(op);
    });
    contenedorTarjetas.innerHTML = tarjetas;
}
