// Obtén una referencia al botón por su ID
const button = document.getElementById("mainButton");

// Agrega un evento de clic al botón
button.addEventListener("click", function (e) {
    e.preventDefault();
    const montoInput = document.getElementById("montoInput").value;
    const plazoInput = document.getElementById("plazoInput").value;
    console.log(montoInput, plazoInput);
});

