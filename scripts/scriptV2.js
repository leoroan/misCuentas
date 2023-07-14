

///////////////////////////// constantes
const tasaAnual = 97;
const mvm = 0;
const canastaBasica = 0;
const indiceInflacion = 1;
const dolarOficial = 0;
const dolarBlue = 0;
const usuario = new Persona();

///////////////////////////// variables
var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
let tasaMensual = Number(((tasaAnual * 8.21918) / 100).toFixed(6));
let cantidadBasePromedio = 9999;
let cantidadInvertida = 0;
let cantidadMeses = 1;
let totalRetorno = 0;
let metodo = "";
let modoOp = "";


// Funciones ayudantes

/**
 * Cálculo para cada operacion, segun la opcion del usuario.
 * @returns boolean
 */
function aInvertir() {
    try {
        let mes;
        let op;
        cantidadInvertida = document.getElementById("montoInput").value;
        cantidadMeses = document.getElementById("plazoInput").value;
        fechaAux = new Date();

        //la tasa mensual se establece de la constante y a medida que "avanzan" los meses, se ajustam por el indice
        // de inflacion y el promedio de aumetnos de puntos mensual al año
        // el retorno lo calcula CADA MES en virtud de los valores mensuales..
        // aca hay q ver el tema del cambio de año y mes superior a 12
        // el indice de inflacion varia cada mes/es
        // ******************
        // TO BE UPDATED SOON!
        // ******************
        for (let i = 0; i < cantidadMeses; i++) {
            if (modoOp == "mesAmes") {
                mes = new Mes(fechaAux.getMonth() + 1, 1, meses[fechaAux.getMonth()], fechaAux.getFullYear(), indiceInflacion, cantidadInvertida, tasaMensual);
            } else if (modoOp == "desdeHoy") {
                // para las operaciones de este tipo se consideran 31 días o más..
                // no se tienen en cuenta feriados ni fines de semana.
                mes = new Mes(fechaAux.getMonth() + 1, fechaAux.getDate(), meses[fechaAux.getMonth()], fechaAux.getFullYear(), indiceInflacion, cantidadInvertida, tasaMensual);
            }
            op = new Operacion(mes);
            usuario.operaciones.push(op);
            fechaAux.setDate(fechaAux.getDate() + 31);
        }
        return true;

    } catch (error) {
        console.error("Error:", error.message);
    }
    return false;
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
    }
});