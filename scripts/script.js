// START OF THE HISTORY 

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
let cantidadMeses = 0;
let totalRetorno = 0;
let intentos = 3;
let saludo = (nom) => { return `Hola ${nom.toUpperCase()}, Bienvenido a cuentitas!` }
let metodo = "";


///////////////////////////// funciones del sistema

/**
 *  Evalua si la cadena recibida tenga almenos un caracter.
 * @param {String} cad 
 * @returns boolean
 */
function puedeContinuar(cad) {
  try {
    return (cad.length !== 0);
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene por medio de un prompt un valor 
 * @returns Number
 */
function obtenerInversion() {
  let monto = parseFloat(prompt("Ingresá cuanto 💵 deseas invertir! 🎈 "));
  if (monto <= 0) {
    alert("no vas a invertir nada? que aburrido! 🤨 ");
    return 0;
  } else {
    alert("Asì se habla! 😉 ");
    return monto;
  }
}

/**
 * Obtiene por medio de un prompt una opcion 
 * @returns String
 */
function obntenerMetodo() {
  let opc = 0;
  opc = prompt(`que metodo de inversion preferis?\n 
                (1) Interes Compuesto \n 
                (2) Retirar mensualmente la ganancia, (no la inversion)
              `);
  while (opc != "1" && opc != "2") {
    opc = prompt('Debe elegir OPCION 1 (Int.Compuesto) o 2 (Retirar x Mes)');
  }
  if (opc === "1") {
    return "intCompuesto";
  } else if (opc === "2") {
    return "porMes";
  }
}

/**
 * Obtiene por medio de un prompt un numero (cantidad de meses)
 * @returns Number
 */
function obtenerPlazo() {
  let cant = 0;
  while (cant == 0) {
    cant = prompt("cuantos meses vas a destinar a invertir el dinero? (minimo 1)");
  }
  return cant;
}

/**
 * Disparador de otras tres funciones,
 * que en conjunto "inicializan" la aplicacion.
 * @param {Number} monto 
 * @param {String} tipo 
 * @param {Number} plazo 
 * @returns monto, tipo , plazo 
 */
function obtenerMontoTipoyPlazo(monto, tipo, plazo) {
  monto = obtenerInversion();
  if (monto) {
    tipo = obntenerMetodo();
    plazo = obtenerPlazo();
    return {
      monto: monto,
      tipo: tipo,
      plazo: plazo
    };
  } else {
    return false;
  }
}

/**
 * Devulve una cadena para identificar el modo de visualizar los "meses"
 * @returns string
 */
function modoDeContarLosMeses() {
  let opc = 0;
  while (opc != "1" && opc != "2") {
    opc = prompt(`Cómo deseas ver la fecha de la cuenta? \n
                   - (1) "mes a mes"  \n
                   - (2) "desdes hoy" \n
                   << ELEGÍ LA OPCION 1 o 2 >>
                  `);
  }
  if (opc === "1") {
    return "mesAmes";
  } else if (opc === "2") {
    return "desdeHoy";
  }
}

/**
 * Cálculo para cada operacion, segun la opcion del usuario.
 * @returns boolean
 */
function aInvertir() {
  // cantidadInvertida como acumulador para futuros "inputs"
  // let ingreso1= 123;
  // let ingreso2= 123;
  // let ingreson= 123;
  // cantidadInvertida = ingreso1+ingreso2+ingreson;

  try {
    const res = obtenerMontoTipoyPlazo(cantidadInvertida, metodo, cantidadMeses);
    if (res) {
      let modoOp = "";
      cantidadInvertida = res.monto;
      metodo = res.tipo;
      cantidadMeses = res.plazo;
      fechaAux = new Date();
      let mes;
      let op;

      //la tasa mensual se establece de la constante y a medida que "avanzan" los meses, se ajustam por el indice
      // de inflacion y el promedio de aumetnos de puntos mensual al año
      // el retorno lo calcula CADA MES en virtud de los valores mensuales..
      // aca hay q ver el tema del cambio de año y mes superior a 12
      // el indice de inflacion varia cada mes/es
      modoOp = modoDeContarLosMeses();
      // TO BE UPDATED SOON
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
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  return false;
}

// MAIN
if (!puedeContinuar(usuario.nombre)) {
  try {
    usuario.nombre = prompt("Hola 🙎‍♂️ o 🙎, comencemos por saber quién sos!, me dirías tu nombre?").trim();
    while (usuario.nombre.length == 0 && intentos != 0) {
      usuario.nombre = prompt("Ingrese su nombre para continuar");
      intentos = intentos - 1;
    }
  } catch (error) {
    alert("Que lastima que no queres aprender a invetir?? 😫");
  }
}

if (puedeContinuar(usuario.nombre)) {
  //greetings
  alert(saludo(usuario.nombre + "! 🔥🔥"));
  if (aInvertir()) {
    //devolver cadaMes.toString();
    // usuario.getOperaciones().forEach(opr => {
    //   console.log(opr.devolverMes().getNombreMes(), "retorno este mes: ", opr.calcularRetornoPorMes());
    // });

    //resultado
    totalRetorno = usuario.calcularRetornoTotal(metodo);
    alert(`A los ${cantidadMeses} meses, invirtiendo: ${cantidadInvertida}$, vas a recibir: ${totalRetorno}$ en intereses!😁, un total de 🤤 ${parseFloat(Number(cantidadInvertida) + Number(totalRetorno)).toFixed(2)}$`);
  }
} else {
  alert("⛔ CANCELÓ LA OPERACION!! - PRESIONE [F5] PARA RECARGAR ⛔");
  console.warn("OPERACION CANCELADA");
  console.clear();
}

