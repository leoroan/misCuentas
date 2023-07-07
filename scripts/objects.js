
class Mes {
  constructor(numeroMes, numeroAnio, nombreMes, tasaInflacion = 0, inversion = 0, tasaMensual) {
    this.icono = "💵";
    this.nombreMes = nombreMes;
    this.numeroMes = numeroMes;
    this.numeroAnio = numeroAnio;
    this.tasaInflacion = tasaInflacion;
    this.inversion = inversion;
    this.tasaMensual = tasaMensual;
    this.porcentajeRelacionIngreso = 0;
    this.porcentajeRelacionInflacion = 0;
  }

  // setters & getters
  getNombreMes() {
    return this.nombreMes;
  }

  getInversion() {
    return this.inversion;
  }

  setInversion(monto){
    this.inversion = monto;
  }
}
class Operacion {
  constructor(Mes) {
    this.mes = Mes;
  }

  devolverMes() { //getMes()
    return this.mes;
  }

  /**
   * Devuelve la ganancia generada este mes.
   * @returns  Number
   */
  calcularRetornoPorMes() {
    return Number(((this.mes.tasaMensual / 100) * (Number(this.mes.inversion))).toFixed(2));
  }
}

class Persona {
  constructor() {
    this.nombre = "";
    this.operaciones = [];
  }

  saludar() {
    console.log(`Hola, mi nombre es ${this.nombre}.`);
  }

  buscarMesPorNumeroMes(numeroMes) {
    const pos = this.operaciones.findIndex(m => m.devolverMes().numeroMes === numeroMes);
    return this.operaciones[pos];
  }

  buscarMesPorNombreMes(nombreMes) {
    const pos = this.operaciones.findIndex(m => m.devolverMes().nombreMes === nombreMes);
    return this.operaciones[pos];
  }

  /**
   * 
   * @returns un array con operaciones.
   */
  getOperaciones(){
    return this.operaciones;
  }

  /**
   * Este metodo de la clase itera por cada operacion, de acuerdo al parametro recibido,
   * devuelvo un resultado u otro. (mes a mes o interes compuesto)
   * 
   * @param {*} metodo 
   * @returns 
   */
  calcularRetornoTotal(metodo) {
    let suma = 0;
    if (this.operaciones.length !== 0) {
      if (metodo == "porMes") {
        this.operaciones.forEach(op => {
          suma += op.calcularRetornoPorMes();
        });
      } else {
        let opAnt = this.operaciones[0];
        this.operaciones.forEach(op => {      
          // si es el primer mes del calculo
          if (opAnt.devolverMes().getNombreMes() === op.devolverMes().getNombreMes()) {
            suma += op.calcularRetornoPorMes();
          } else {
            op.devolverMes().setInversion(Number(opAnt.devolverMes().getInversion()) + Number(opAnt.calcularRetornoPorMes())); 
            suma += op.calcularRetornoPorMes();
          }
          opAnt = op;
        });
      }
    }
    return parseFloat(suma).toFixed(2);
  }
}


