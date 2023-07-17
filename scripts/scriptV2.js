

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

// Obtener el cuerpo de la tarjeta de resultado 
const cardResultDisplay = document.getElementById("cardResultDisplay");

// Obtener el botón por su ID
const button = document.getElementById("mainButton");

// Obtener los "metodos" de radio
var radioButtons = document.getElementsByName("metodo");

// Obtener los "modos" de radio
var radioButtons2 = document.getElementsByName("modo");

// Recorrer los elementos de radio y aplicar el evento de cambio a cada uno
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        metodo = document.querySelector('input[name="metodo"]:checked').value;
        // console.log("Seleccionaste: " + selectedValue);
    });
});

// Recorrer los elementos de radio y aplicar el evento de cambio a cada uno
radioButtons.forEach(function (radioButton2) {
    radioButton2.addEventListener("change", function () {
        modoOp = document.querySelector('input[name="modo"]:checked').value;
        // console.log("Seleccionaste: " + selectedValue);
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
    const plazoInput = document.getElementById("plazoInput");
    let cardBienvenida = document.getElementById("cardBienvenida");
    let cardInicial = document.getElementById("cardInicial");

    if (checkMonto(montoInput.value) || checkPlazo(plazoInput.value)) {
        montoInput.classList.add("is-invalid");
        plazoInput.classList.add("is-invalid");
    } else {
        cardBienvenida.classList.add('hide');
        cardInicial.classList.add('hide');
        cardResultDisplay.style.display = 'block';
        aInvertir();
        usuario.calcularRetorno(metodo);
        console.log("tot ", usuario.calcularRetorno(metodo));
        console.log("tot ", Number(usuario.calcularRetorno(metodo)) + Number(usuario.operaciones[0].getMes().getInversion()));
        mostrarTarjetas(usuario.getOperaciones());
    }
});

function crearTarjeta(op) {
    return `
    <div class="col-md-auto animate__animated animate__bounce">
    <div class="card border-light bg-transparent">
        <div class="card-body">
            <h4 class="card-title"> ${op.getMes().getNombreMes().toUpperCase()} ${op.getMes().getAnio()} </h4>
            <p> Invertido este mes: $${op.getMes().getInversion()}</p>
            <p> Retorno este mes: $${op.calcularRetornoPorMes()}</p>
            <p> Metodo: ${metodo}</p>
        </div>
    </div>
    </div>`;
}

function mostrarTarjetas(operaciones) {
    let contenedorTarjetas = document.getElementById("cardMes");
    let tarjetas = "";
    operaciones.forEach(op => {
        tarjetas += crearTarjeta(op);
    });
    contenedorTarjetas.innerHTML = tarjetas;
}
