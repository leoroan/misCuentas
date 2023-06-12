console.log("Hello cuentitas!");


/// START OF THE HISTORY 
let intentos = 3;
let nameUser = "default";
let saludo = (nom) => { return `Hola ${nom.toUpperCase()}, Bienvenido a cuentitas!` }
let tna = 91;
let tasaRetorno = tna / 12;
tasaRetorno = parseFloat(tasaRetorno.toFixed(2));
console.log(tasaRetorno);

if (nameUser == "default" || nameUser == null) {
  nameUser = prompt("Hola 🙎‍♂️ o 🙎, comencemos por saber quién sos!, me dirías tu nombre?");
  while (nameUser == null || nameUser == "default" || nameUser == "" && intentos != 0) {
    nameUser = prompt("Te pedí un nombre!!");
    intentos = intentos - 1;
  }

}

// SI HAY USUARIO
let amountQuantity = 9999;
let cantidadInvertida = 0;
let cantidadMeses = 0;
let totalRetorno = 0;

function aInvertir() {
  cantidadInvertida = prompt("Ingresá cuanto 💵 deseas destinar a invertir! 🎈 ");
  if (cantidadInvertida == 0) {
    cantidadInvertida = prompt("no vas a invertir nada? que aburrido! 🤨 ");
  } else if (cantidadInvertida < (amountQuantity / 2)) {
    alert("Solo eso? 🙄");
  } else if (cantidadInvertida < amountQuantity) {
    alert("Todavía puedes invertir más 💪");
  } else if (cantidadInvertida > amountQuantity) {
    alert("De eso me refiero! 😏");
  }
}
function calcularRetornoInteresCto(monto, tasa, cantMeses) {
  let total = monto;
  for (let i = 0; i < cantMeses; i++) {
    total = Number(total) + Number((total*tasa)/100);
    console.log("for: ",i," tot: ",total);
  }
  return total-monto;
}

// MAIN
if (nameUser !== "default" || nameUser !== "" || nameUser !== null) {
  alert(saludo(nameUser));
  console.log("Lets start!");
  aInvertir();
  cantidadMeses = prompt("cuantos meses vas a destinar a invertir el dinero? minimo 1");
  //calcular ganancia con interes compuesto
  totalRetorno = parseFloat(calcularRetornoInteresCto(cantidadInvertida, tasaRetorno, cantidadMeses)).toFixed(2);
  alert(`A los ${cantidadMeses} meses, invirtiendo: ${cantidadInvertida}$, vas a recibir: ${totalRetorno}$ en intereses!😁, un total de 🤤 ${Number(cantidadInvertida) + Number(totalRetorno)}$`);

}
