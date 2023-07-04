
class Mes {
  constructor(numero, nombre, tasaInflacion = 0, inversion = 0, retorno = 0) {
    this.icono = "💵";
    this.nombre = nombre;
    this.numero = numero;
    this.tasaInflacion = tasaInflacion;
    this.inversion = inversion;
    this.retorno = retorno;
    this.porcentajeRelacionIngreso = 0;
    this.porcentajeRelacionInflacion = 0;
  }
}

class Persona {
  constructor() {
    this.nombre = "";
  }

}
