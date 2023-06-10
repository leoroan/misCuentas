console.log("Hello cuentitas!");


/// START OF THE HISTORY 
let intentos = 3;
let nameUser = "default";
let saludo = (nom) => { return `Hola ${nom}, Bienvenido a cuentitas!` }
let tna = 91;
let tasaRetorno = tna/12;

if (nameUser == "default" || nameUser == null) {
  nameUser = prompt("Hola 🙎‍♂️ o 🙎, comencemos por saber quién sos!, me dirías tu nombre?");
  while (nameUser == null || nameUser == "default" || nameUser == "" && intentos != 0) {
    nameUser = prompt("Te pedí un nombre!!");
    intentos = intentos - 1;
  }

}

// SI HAY USUARIO
let amountQuantity = 9999;
let cantidadaInvertida = 0;
let cantidadMeses = 0;

function aInvertir() {
  cantidadaInvertida = prompt("Ingresá cuanto 💵 deseas destinar a invertir! 🎈 ");

  if (cantidadaInvertida == 0) {
    cantidadaInvertida = prompt("no vas a invertir nada? que aburrido! 🤨 ");
  } else if (cantidadaInvertida < (amountQuantity / 2)) {
    alert("Solo eso? 🙄");
  } else if (cantidadaInvertida < amountQuantity) {
    alert("Todavía puedes invertir más 💪");
  } else if (cantidadaInvertida > amountQuantity) {
    alert("De eso me refiero! 😏");
    // Handle other cases
  }
}

// the app
if (nameUser !== "default" || nameUser !== "" || nameUser !== null) {
  alert(saludo(nameUser));
  console.log("Lets start!");

  aInvertir();
  cantidadMeses = prompt("cuantos meses vas a destinar a invertir el dinero? minimo 1");
  alert(`A los ${cantidadMeses}, invirtiendo: ${cantidadaInvertida}, vas a recibir: algo`);

}
