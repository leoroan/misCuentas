console.log("Hello cuentitas!");


/// START OF THE HISTORY 
let nameUser = " ";
let saludo = (nom) => { return `Hola ${nom}, Bienvenido a cuentitas!` }

if (nameUser == " " || nameUser == null) {
  nameUser = prompt("Hola 🙎‍♂️ o 🙎, comencemos por saber quién sos!, me dirías tu nombre?");
  while (nameUser == null || nameUser == " " || nameUser == "") {
    nameUser = prompt("Te pedí un nombre!!");
  }
}

// SI HAY USUARIO
if (nameUser !== " ") {
  prompt(saludo(nameUser));
  console.log("Lets start!");
}

