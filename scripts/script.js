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

function puedeContinuar(dato) {
  try {
    return (dato.length !== 0);
  } catch (error) {
    return false;
  }
}

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

// function obtenerMontoAinvertir() {
//   return 0;
// }

// function obtenerCantidadMeses() {
//   return 0;
// }

// function calcularResultado() {
//   return 0;
// }


function aInvertir() {
  // cantidadInvertida como acumulador para futuros "inputs"
  // let ingreso1= 123;
  // let ingreso2= 123;
  // let ingreson= 123;
  // cantidadInvertida = ingreso1+ingreso2+ingreson;

  cantidadInvertida = prompt("Ingresá cuanto 💵 deseas destinar a invertir! 🎈 ");
  if (cantidadInvertida == 0 || cantidadInvertida.trim() == " ") {
    cantidadInvertida = alert("no vas a invertir nada? que aburrido! 🤨 ");
    return false;
  } else {
    alert("Asì se habla! 😉 ");

    // No promptear x eleccion, sino q calcular x intCto y retiroAvto..
    try {
      while (cantidadMeses == 0) {
        cantidadMeses = prompt("cuantos meses vas a destinar a invertir el dinero? minimo 1");
      }
      // es a partir de la fecha actual o fijo, mes-a-mes..?

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
        let mes = new Mes(i + 1, 2023, meses[i], indiceInflacion, cantidadInvertida, tasaMensual);
        let op = new Operacion(mes);
        // console.log("unMes: ",op.devolverMes().getNombreMes());

        // totalRetorno = cta.calcularRetornoMensual();
        usuario.operaciones.push(op);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  return true;
}

// MAIN
if (puedeContinuar(usuario.nombre)) {
  alert(saludo(usuario.nombre + "!"));

  if (aInvertir()) {
    //devolver cadaMes.toString();

    usuario.operaciones.forEach(opr => {
      console.log("una opr: ", opr.calcularRetorno());
    });

    totalRetorno = usuario.calcularRetornoTotal();

    alert(`A los ${cantidadMeses} meses, invirtiendo: ${cantidadInvertida}$, vas a recibir: ${totalRetorno}$ en intereses!😁, un total de 🤤 ${parseFloat(Number(cantidadInvertida) + Number(totalRetorno)).toFixed(2)}$`);
  }
} else {
  alert("Canceló el ingreso de su nombre, [F5] para recargar");
}

