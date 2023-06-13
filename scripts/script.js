console.log("Hello cuentitas!");

/// START OF THE HISTORY 
let intentos = 3;
let nameUser = "";
let saludo = (nom) => { return `Hola ${nom.toUpperCase()}, Bienvenido a cuentitas!` }

function puedeContinuar(dato) {
  return (dato.length != 0);
}

if (!puedeContinuar(nameUser)) {
  nameUser = prompt("Hola 🙎‍♂️ o 🙎, comencemos por saber quién sos!, me dirías tu nombre?");
  while (nameUser.length == 0 && intentos != 0) {
    nameUser = prompt("Te pedí un nombre!!");
    intentos = intentos - 1;
  }
}

// SI HAY USUARIO
const tna = 91;
const tasaRetorno = tna / 12;
let cantidadBasePromedio = 9999;
let cantidadInvertida = 0;
let cantidadMeses = 0;
let totalRetorno = 0;

function aInvertir() {
  cantidadInvertida = prompt("Ingresá cuanto 💵 deseas destinar a invertir! 🎈 ");
  if (cantidadInvertida == 0) {
    cantidadInvertida = alert("no vas a invertir nada? que aburrido! 🤨 ");
  } else if (cantidadInvertida < (cantidadBasePromedio / 2)) {
    alert("Solo eso? 🙄");
  } else if (cantidadInvertida < cantidadBasePromedio) {
    alert("Todavía puedes invertir más 💪");
  } else if (cantidadInvertida > cantidadBasePromedio) {
    alert("De eso me refiero! 😏");
  }
  if (cantidadInvertida > 0) {
    while (cantidadMeses == 0) {
      cantidadMeses = prompt("cuantos meses vas a destinar a invertir el dinero? minimo 1");
    }
    totalRetorno = parseFloat(calcularRetornoInteresCto(cantidadInvertida, tasaRetorno, cantidadMeses)).toFixed(2);
    return true;
  }
  return false;
}
function calcularRetornoInteresCto(monto, tasa, cantMeses) {
  let total = monto;
  for (let i = 0; i < cantMeses; i++) {
    total = Number(total) + Number((total * tasa) / 100);
  }
  return total - monto;
}

// MAIN
if (puedeContinuar(nameUser)) {
  if (true) {
    alert(saludo(nameUser));
    console.log("Lets start!");
    if (aInvertir()) {
      alert(`A los ${cantidadMeses} meses, invirtiendo: ${cantidadInvertida}$, vas a recibir: ${totalRetorno}$ en intereses!😁, un total de 🤤 ${parseFloat(Number(cantidadInvertida) + Number(totalRetorno)).toFixed(2)}$`);
    }
  }
} else {
  alert("Que lastima que no queres aprender a invetir?? 😫");
}

