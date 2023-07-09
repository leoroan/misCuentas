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
let cantidadMeses = 1;
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
  if (monto === 0 || isNaN(monto)) {
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
  while (cant <= 0) {
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
 * @returns string ("mesAmes" || "desdeHoy")
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
 * Recibida una coleccion, de cada operacion, imprime sus datos apra ver en una tabla.
 * @param {Operacion[]} operaciones 
 */
function verCuentas(operaciones) {
  operaciones.forEach(op => {
    const datosAMostrar = {
      Mes: op.devolverMes().getNombreMes().toUpperCase(),
      Anio: op.devolverMes().getAnioMes(),
      Inversion: op.devolverMes().getInversion(),
      RetornoEsteMes: op.calcularRetornoPorMes(),
    };
    console.table(datosAMostrar);
  });
}

function buscarPorNombre(usuario) {
  console.clear();
  const nombreBuscado = prompt("Ingresa el nombre del mes que querés buscar:").toLowerCase();
  const cuentasDelMes = usuario.buscarMesPorNombreMes(nombreBuscado);
  if (usuario.buscarMesPorNombreMes(nombreBuscado).length === 0) {
    alert("La busqueda no arrojó resultados")
  } else {
    console.log("TABLE CON RESULTADO DE BUSQUEDA");
    verCuentas(cuentasDelMes);
  }
}

function filtrar(usuario) {
  console.clear();
  const anioBuscado = prompt("Ingresa apartir de que año queres filtrar los datos:").toLowerCase();
  const cuentasDelMes = usuario.filtrarOperacionesPorAnio(anioBuscado);
  if (usuario.filtrarOperacionesPorAnio(anioBuscado).length === 0) {
    alert("La busqueda no arrojó resultados")
  } else {
    console.log("TABLE CON RESULTADO DE BUSQUEDA");
    verCuentas(cuentasDelMes);
  }

}


/**
 * Cálculo para cada operacion, segun la opcion del usuario.
 * @returns boolean
 */
function aInvertir() {

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
  let continuar = true;

  //un saludo
  alert(saludo(usuario.nombre + "! 🔥🔥"));

  // si puede inicializa la operacion...
  if (aInvertir()) {

    // con los datos provistos, realiza el calculo total
    totalRetorno = usuario.calcularRetornoTotal(metodo);

    // muestro las "cuentas" por consola
    verCuentas(usuario.getOperaciones());

    //Informo el resultado final de mis cuentas.
    alert(`${usuario.getName() + "! "} A los ${cantidadMeses} meses,\n
           invirtiendo: ${cantidadInvertida}$, \n
           de manera ${metodo},\n
           vas a recibir: ${totalRetorno}$ en intereses!😁,\n
           un total de 🤤 ${parseFloat(Number(cantidadInvertida) + Number(totalRetorno)).toFixed(2)}$`);
    
    // un menu para facilitar la busqueda y filtro
    while (continuar) {
      const opc = prompt(`Elige una opción:\n
                          1. Buscar cuentas del mes\n
                          2. Aplicar Filtros\n
                          4. Salir
                        `);

      switch (opc) {
        case "1":
          buscarPorNombre(usuario);
          break;

        case "2":
          filtrar(usuario);
          break;

        case "4":
          continuar = false;
          break;

        default:
          alert("Opción no válida");
          break;
      }
    }
  }

} else {
  //control de fin
  alert("⛔ CANCELÓ LA OPERACION!! - PRESIONE [F5] PARA RECARGAR ⛔");
  console.warn("OPERACION CANCELADA");
  console.clear();
}

