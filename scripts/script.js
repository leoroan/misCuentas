console.log("Hello cuentitas!");

/// START OF THE HISTORY 
let intentos = 3;
let usuario = new Persona();
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
    alert("Canceló el ingreso de su nombre, F5 para recargar");
  }
}

//INICIALIZACIONES Y VARIABLES
var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const d = new Date();
const tasaAnual = 97;
const tasaMensual = (tasaAnual / 12).toFixed(2);
let indiceInflacion = 2.01;
let cantidadBasePromedio = 9999;
let cantidadInvertida = 0;
let cantidadMeses = 0;
let totalRetorno = 0;
let cuentas = [];

function calcularInteresRetorno(monto, tasa) {
  return Number(tasa / 100 * monto);
}

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
    try {
      while (cantidadMeses == 0) {
        Error("La cantidad invertida no puede ser cero y debe ser una cadena numérica");
        cantidadMeses = prompt("cuantos meses vas a destinar a invertir el dinero? minimo 1");
      }
      // es a partir de la fecha actual o fijo mes-a-mes..?

      for (let i = d.getMonth(); i < (parseInt(cantidadMeses) + parseInt(d.getMonth())); i++) {
        // aca va O interes compuesto o con retiro mensual.-..

        totalRetorno = parseFloat(calcularInteresRetorno(cantidadInvertida, tasaMensual)).toFixed(2);
        let mes = new Mes(i + 1, meses[i], indiceInflacion, cantidadInvertida, totalRetorno);
        cuentas.push(mes);
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
    cuentas.forEach(mes => {
      console.log(mes);
    });
    alert(`A los ${cantidadMeses} meses, invirtiendo: ${cantidadInvertida}$, vas a recibir: ${totalRetorno}$ en intereses!😁, un total de 🤤 ${parseFloat(Number(cantidadInvertida) + Number(totalRetorno)).toFixed(2)}$`);
  }
} else {
  alert("Que lastima que no queres aprender a invetir?? 😫");
}

