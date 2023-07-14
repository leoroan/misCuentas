
class Mes {
  constructor(numeroMes, numeroDia, nombreMes, numeroAnio, tasaInflacion = 0, inversion = 0, tasaMensual) {
    this.icono = "💵";
    this.nombreMes = nombreMes;
    this.numeroDia = numeroDia;
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

  getAnioMes() {
    return this.numeroAnio;
  }

  getInversion() {
    return parseFloat(this.inversion).toFixed(2);
  }

  setInversion(monto) {
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

  /**
   * @returns {string} 
   */
  toString() {
    return `Este mes: ${this.mes.getNombreMes()}, invirtiendo: $${this.mes.getInversion()}, obtiene de retorno: $${this.calcularRetornoPorMes()}`;
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

  getName() {
    return this.nombre;
  }

  getOperaciones() {
    return this.operaciones();
  }

  buscarMesPorNumeroMes(numeroMes) {
    const pos = this.operaciones.findIndex(m => m.devolverMes().numeroMes === numeroMes);
    return this.operaciones[pos];
  }

  /**
   * Realiza la busqueda en la coleccion por nombre del mes indicado por parametro. 
   * @param {String} nombreMes 
   * @returns coleccion de "Operaciones" | null
   */
  buscarMesPorNombreMes(nombreMes) {
    const operacionesEncontradas = [];
    for (let i = 0; i < this.getOperaciones().length; i++) {
      const mes = this.getOperaciones()[i].devolverMes();
      if (mes.getNombreMes() === nombreMes || mes.getNombreMes().includes(nombreMes)) {
        operacionesEncontradas.push(this.getOperaciones()[i]);
      }
    }
    return operacionesEncontradas;
  }

  /**
   * Funcion que filtra por año
   * @param {Number} anio 
   * @returns collecion de Operaciones
   */
  filtrarOperacionesPorAnio(anio) {
    const ops = this.getOperaciones();
    return ops.filter(op => op.devolverMes().getAnioMes() >= anio);
  }

  /**
   * @returns un array con operaciones.
   */
  getOperaciones() {
    return this.operaciones;
  }

  calcularRetornoTotalPorMes() {
    let suma = 0;
    this.operaciones.forEach(op => {
      suma += op.calcularRetornoPorMes();
    });
    return suma;
  }

  /**
   * Realiza la suma de los retornos de cada mes en cada operacion.
   * y la retorna. tiene en cuenta si es primer mes o siguiente. 
   * @returns Float
   */
  calcularRetornoTotalAcumulado() {
    let suma = 0;
    let opAnt = this.operaciones[0];
    this.operaciones.forEach(op => {
      // si es el primer mes del cálculo
      if (opAnt.devolverMes().getNombreMes() === op.devolverMes().getNombreMes()) {
        suma += op.calcularRetornoPorMes();
      } else {
        op.devolverMes().setInversion(Number(opAnt.devolverMes().getInversion()) + Number(opAnt.calcularRetornoPorMes()));
        suma += op.calcularRetornoPorMes();
      }
      opAnt = op;
    });
    return suma;
  }

  /**
   * Este metodo itera por cada Operacion y de acuerdo al parametro recibido,
   * devuelvo un resultado u otro. (mes a mes o interes compuesto)
   * 
   * @param {String} metodo 
   * @returns {Float}
   */
  calcularRetornoTotal(metodo) {
    let suma = 0;
    if (this.operaciones.length !== 0) {
      if (metodo == "porMes") {
        suma = this.calcularRetornoTotalPorMes();
      } else { // sies interes compuesto...
        suma = this.calcularRetornoTotalAcumulado();
      }
    }
    return parseFloat(suma).toFixed(2);
  }



}


