
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

  getNombreMes() {
    return this.nombreMes;
  }

  getInversion() {
    return this.inversion;
  }
}
class Operacion {
  constructor(Mes) {
    this.mes = Mes;
  }

  devolverMes() {
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

  calcularRetornoTotal(metodo) {
    let suma = 0;
    if (this.operaciones.length !== 0) {
      if (metodo == "porMes") {
        this.operaciones.forEach(op => {
          suma += op.calcularRetornoPorMes();
        });
      } else {

        let opAnt = this.operaciones[0].mes;
        this.operaciones.forEach(op => {          
          if (opAnt.nombreMes === op.devolverMes().getNombreMes()) {
            // suma += op.calcularRetornoIntCompuesto(opAnt);
            suma += op.calcularRetornoPorMes();
          } else {
            op.mes.inversion = Number(opAnt.mes.inversion) + Number(opAnt.calcularRetornoPorMes());
            suma += op.calcularRetornoPorMes();
          }
          opAnt = op;
        });
      }
    }
    return parseFloat(suma).toFixed(2);
  }
}


