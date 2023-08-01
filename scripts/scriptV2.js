
const URL_COTIZACIONES = "https://api.bluelytics.com.ar/v2/latest";
let misCotizaciones;
///////////////////////////// constantes
const tasaAnual = 97;
const mvm = 0;
const canastaBasica = 0;
const indiceInflacion = 1;
const dolarOficial = 0;
const dolarBlue = 0;
let usuario = new Persona();

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
            let mes = new Mes(fechaAux.getDate(), fechaAux.getMonth(), fechaAux.getFullYear(), indiceInflacion, cantidadInvertida, tasaMensual);
            let op = new Operacion(mes);
            usuario.operaciones.push(op);
            fechaAux.setDate(fechaAux.getDate() + 31);
        }
        // usuario.saveToLocalStorage();
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
const buttonClear = document.getElementById("btnClear");


// Obtener los "metodos" de radio
var radioButtons = document.getElementsByName("metodo");

// Modificar card de resultados
const cardOptiones = document.getElementById("cardOptions");


// Recorrer los elementos de radio y aplicar el evento de cambio a cada uno
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        metodo = document.querySelector('input[name="metodo"]:checked').value;
        cardOptiones.innerHTML += metodo === "intCompuesto" ? "MÉTODO: INTERES COMPUESTO" : "MÉTODO: POR MES ";
    });
});

function checkMonto(valor) {
    return (valor <= 0 || valor.trim() === "");
}
function checkPlazo(unValor) {
    return (unValor <= 0 || unValor > 36);
}

button.addEventListener('click', function (e) {
    e.preventDefault();
    const montoInput = document.getElementById("montoInput");
    const radioInput = document.getElementById("radioOptionCard");
    const plazoInput = document.getElementById("plazoInput");
    let cardBienvenida = document.getElementById("cardBienvenida");
    let cardInicial = document.getElementById("cardInicial");
    const selectedRadio = document.querySelector('input[name="metodo"]:checked');

    // Validacion monto
    if (checkMonto(montoInput.value)) {
        montoInput.classList.add("is-invalid");
        montoInput.classList.remove("is-valid");
    } else {
        montoInput.classList.remove("is-invalid");
        montoInput.classList.add("is-valid");
    }

    // Validacion plazo
    if (checkPlazo(plazoInput.value)) {
        plazoInput.classList.add("is-invalid");
        plazoInput.classList.remove("is-valid");
    } else {
        plazoInput.classList.remove("is-invalid");
        plazoInput.classList.add("is-valid");
    }

    // Validacion opcionRadio
    if (!selectedRadio) {
        radioInput.classList.add("is-invalid");
    } else {
        radioInput.classList.remove("is-invalid");
    }

    if (checkMonto(montoInput.value) || checkPlazo(plazoInput.value) || !selectedRadio) {
        Swal.fire('Quedaron campos erróneos o incompletos!')
    } else {
        cardBienvenida.classList.add('hide');
        cardInicial.classList.add('hide');
        cardResultDisplay.style.display = 'block';

        aInvertir();
        usuario.calcularRetorno(metodo);
        usuario.saveToLocalStorage();

        const fomatoMoney2 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(usuario.calcularRetorno(metodo));
        const fomatoMoney3 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(usuario.calcularRetorno(metodo)) + Number(usuario.operaciones[0].getMes().getInversion()));

        cardOptiones.innerHTML += `<br> RETORNO DE INTERESES: ${fomatoMoney2}
                               <br> RETORNO TOTAL: (INV + INT) ${fomatoMoney3}\n`;

        mostrarTarjetas(usuario.getOperaciones());
        crearTarjetaInfoAdicional(usuario.getOperaciones());
    }
});

function crearTarjeta(op) {
    const fomatoMoney = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(op.calcularRetornoPorMes());
    const id = "cardModal" + usuario.operaciones.indexOf(op);
    return `
    <div class="col-md-auto animate__animated animate__bounce">
    <div class="card border-light bg-transparent">
        <div class="card-body">
            <h4 class="card-title"> ${op.getMes().getNombreMes().toUpperCase()} ${op.getMes().getAnio()} </h4>
            <p> Retorno este mes: ${fomatoMoney} 💵</p> 
            <button id="${id}" type="button" class="btn btn-outline-success btn-sm fs-5" data-bs-toggle="modal" data-bs-target="#${id}"> saber + </button>
        </div>
    </div>
    </div>`;
}

function crearModals(op) {
    const id = "cardModal" + usuario.operaciones.indexOf(op);
    return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="ModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm">
                        <div class="modal-content border-light">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">${op.getMes().getNombreMes().toUpperCase()} ${op.getMes().getAnio()}</h1>
                            </div>
                            <div class="modal-body">
                            ${op.getMes().toString()}
                            <br>
                            ${op.toString()}
                            </div>
                            <div class="modal-footer">
                                misCuentas.com
                            </div>
                        </div>
                    </div>
                </div>`
}


function crearTarjetaInfoAdicional(operaciones) {
    let contenedorModal = document.getElementById("Modals");
    let modales = "";
    operaciones.forEach(op => {
        modales += crearModals(op);
    });
    contenedorModal.innerHTML = modales;
}

function mostrarTarjetas(operaciones) {
    let contenedorTarjetas = document.getElementById("cardMes");
    let tarjetas = "";
    operaciones.forEach(op => {
        tarjetas += crearTarjeta(op);
    });
    contenedorTarjetas.innerHTML = tarjetas;
}


buttonClear.addEventListener('click', function () {
    alertBorrar();
});

/**
 * 
 */
function alertBorrar() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de borrarlo?',
        text: "Esta accion no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: ' BORRAR ',
        cancelButtonText: ' CANCELAR ',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Tu calculo de inversion!',
                'fue borrado!',
                'success',
                cardResultDisplay.style.display = 'none',
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 2000)
            )
            usuario.eraseSavedData();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'No se borró nada!',
                "",
                'error'
            )
        }
    })
}


/**
 * Funcion que permite, al cargar la pagina, chequear si el local storage tiene "algo",
 * en caso afirmativo procede a la carga de los datos para visualizarlos.
 */
document.addEventListener("DOMContentLoaded", function () {
    if (checkLocalStorage()) {
        cardBienvenida.classList.add('hide');
        cardInicial.classList.add('hide');
        cardResultDisplay.style.display = 'block';
        // usuario.calcularRetorno(metodo);
        // const fomatoMoney2 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(usuario.calcularRetorno(metodo));
        // const fomatoMoney3 = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(usuario.calcularRetorno(metodo)) + Number(usuario.operaciones[0].getMes().getInversion()));
        // cardOptiones.innerHTML += `<br> RETORNO DE INTERESES: ${fomatoMoney2}
        //                            <br> RETORNO TOTAL: (INV + INT) ${fomatoMoney3}\n
        //                           `;
        mostrarTarjetas(usuario.getOperaciones());
        crearTarjetaInfoAdicional(usuario.getOperaciones());
    }
});

/**
 * Devuelve si hay datos en el LocalStorage y los carga
 * @returns boolean
 */
function checkLocalStorage() {
    const storedData = localStorage.getItem("persona");
    if (storedData !== null) {
        // loadFromLocalStorage(storedData);
        const personaData = JSON.parse(storedData);
        const usr = new Persona();
        usr.nombre = personaData.nombre;
        usuario = usr;
        personaData.operaciones.forEach(op => {
            m = Object.assign(new Mes(), op.mes);
            o = Object.assign(new Operacion(m));
            usuario.agregarOperacion(o);
        });
        console.log("Data existente:", usuario);
        return true;
    } else {
        return false;
    }
}

/**
 * Manejar el reset
 */
// const handleReset = () => {
//     inputBuscarMes.value = "";
//     inputFiltroAnio.value = "";

//     // Remove the reset button
//     const resetButton = document.getElementById("resetButton");
//     if (resetButton) {
//         resetButton.remove();
//     }
// };



/**
 * Escuchar si presiona enter en busqueda
 * @param {*} event 
 */
const busqueda = (event) => {
    if (event.keyCode === 13) {
        const numeroMes = event.target.value;
        console.log(usuario.buscarMesPorNombreMes(numeroMes));
        mostrarTarjetas(usuario.buscarMesPorNombreMes(numeroMes));
    }
};

/**
 * Escuchar si presiona enter en filtro
 * @param {*} event 
 */
const filtro = (event) => {
    if (event.keyCode === 13) {
        const numeroMes = event.target.value;
        console.log(usuario.filtrarOperacionesPorAnio(numeroMes));
        mostrarTarjetas(usuario.filtrarOperacionesPorAnio(numeroMes));
    }
};

// Obtener los inputs x dom.
const inputBuscarMes = document.getElementById("inputBuscarMes");
const inputFiltroAnio = document.getElementById("inputFiltroAnio");
inputBuscarMes.addEventListener("keydown", busqueda);
inputFiltroAnio.addEventListener("keydown", filtro);

// Obtener el contenedor de botones
const buttonsContainer = document.getElementById("buttons");

/**
 * Escuchar el evento "click" del boton reset.
 */
buttonsContainer.addEventListener("click", (event) => {
    if (event.target.id === "resetButton") {
        handleReset();
    }
});


//funcion asincrona + fetch con funciones "flecha"

const obtenerDatos = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        return null;
    }
};

obtenerDatos(URL_COTIZACIONES)
    .then((datos) => {
        misCotizaciones = datos;
    })
    .catch((error) => {
        console.error('Error al obtener los datos:', error.message);
    });




