
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
}
class Operacion {
  constructor(Mes) {
    this.mes = Mes;
  }

  devolverMes() {
    return this.mes;
  }

  calcularRetorno() {
    return Number(((this.mes.tasaMensual / 100) * this.mes.inversion).toFixed(2));
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

  buscarRetornoPorNumeroMes(numeroMes) {
    const pos = this.operaciones.findIndex(m => m.devolverMes().numeroMes === numeroMes);
    return this.operaciones[pos];
  }

  buscarRetornoPorNombreMes(nombreMes) {
    const pos = this.operaciones.findIndex(m => m.devolverMes().nombreMes === nombreMes);
    return this.operaciones[pos];
  }

  calcularRetornoTotal() {
    let suma = 0;
    if (this.operaciones.length !== 0) {
      this.operaciones.forEach(op => {
        console.log("calc: ", op.calcularRetorno());
        suma += op.calcularRetorno();
      });
      return suma;
    }
    return 0;
  }
}


