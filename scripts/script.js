// START OF THE HISTORY 

///////////////////////////// constantes
const tasaAnual = 97;
const mvm = 0;
const canastaBasica = 0;
const indiceInflacion = 1;
const dolarOficial = 0;
const dolarBluew = 0;
const d = new Date();
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
  opc = prompt('que metodo de inversion preferis?\n (1) Interes Compuesto \n (2) Retirar mensualmente la ganancia, (no la inversion)');
  while (opc != 1 && opc != 2) {
    opc = prompt('Debe elegir OPCION 1 (Int.Compuesto) o 2 (Retirar x Mes)');
  }
  if (opc === 1) {
    return "intCompuesto";
  } else if (opc === 2) {
    return "porMes";
  }
}

/**
 * Obtiene por medio de un prompt un numero 
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
 * Esta funcion actua como disparador de otras tres funciones, que en conjunto "inicializan" la aplicacion.
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
 * Esta funcion realiza el proceso de cálculo para cada operacion, segun la opcion del usuario.
 * @returns boolean
 */
function aInvertir() {
  // cantidadInvertida como acumulador para futuros "inputs"
  // let ingreso1= 123;
  // let ingreso2= 123;
  // let ingreson= 123;
  // cantidadInvertida = ingreso1+ingreso2+ingreson;

  try {
    // es a partir de la fecha actual o fijo, mes-a-mes..?
    const res = obtenerMontoTipoyPlazo(cantidadInvertida, metodo, cantidadMeses);
    if (res) {
      cantidadInvertida = res.monto;
      metodo = res.tipo;
      cantidadMeses = res.plazo;

      for (let i = d.getMonth(); i < (parseInt(cantidadMeses) + parseInt(d.getMonth())); i++) {
        // aca va O interes compuesto o con retiro mensual.-..
        //  si es compuesto, hay q sumarle a la cantidadInvertida el retorno del mes actual, y re invertirlo
        //  sino, quitarlo, discriminarlo mensualmente, y sumarlo a alguna acumulador.

        //la tasa mensual se establece de la constante y a medida que "avanzan" los meses, se ajustam por el indice
        // de inflacion y el promedio de aumetnos de puntos mensual al año

        // el retorno lo calcula CADA MES en virtud de los valores mensuales..
        // aca hay q ver el tema del cambio de año y mes superior a 12
        // funcion obtenerAnio(); 
        // funcion obtenerMes();
        // el indice de inflacion varia cada mes/es
        let mes = new Mes(i + 1, d.getFullYear(), meses[i], indiceInflacion, cantidadInvertida, tasaMensual);
        let op = new Operacion(mes);
        // console.log("unMes: ",op.devolverMes().getNombreMes());

        // totalRetorno = cta.calcularRetornoMensual();
        usuario.operaciones.push(op);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  return true;
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
  alert(saludo(usuario.nombre + "!"));
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
  alert("Canceló el ingreso de su nombre, [F5] para recargar");
}

