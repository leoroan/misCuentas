
// Obtener el cuerpo principal (box)
const mainBox = document.getElementById("mainBox");

// Obtener el cuerpo principal (box)
const cardResultDisplay = document.getElementById("cardResultDisplay");


// Obtener el botón por su ID
const button = document.getElementById("mainButton");

button.addEventListener('click', function (e) {
    e.preventDefault();
    const montoInput = document.getElementById("montoInput").value;
    const plazoInput = document.getElementById("plazoInput").value;
    let cardBienvenida = document.getElementById("cardBienvenida");
    let cardInicial = document.getElementById("cardInicial");

    document.getElementById('montoInput').addEventListener('input', function() { condicion ? hacerAlgo() : hacerOtraCosa(); });

    function hacerAlgo() {
        console.log("haciendo algo");
    }
    function hacerOtraCosa() {
        console.log("haciendo OtraCosa");
    }

    if ((plazoInput > 0 && plazoInput <= 36) && montoInput > 0)  {
        cardBienvenida.classList.add('hide');
        cardInicial.classList.add('hide');
        cardResultDisplay.style.display = 'block';
    } else {
        document.getElementById("validationPlazoInputFeedback").style.display = 'block';
        document.getElementById("validationMontoInputFeedback").style.display = 'block';
    }
});