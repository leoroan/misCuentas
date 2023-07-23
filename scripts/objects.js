
class Mes {
  meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  constructor(dia, mes, anio, tasaInflacion = 0, inversion = 0, tasaMensual) {
    this.icono = "💵";
    this.dia = dia;
    this.mes = mes;
    this.anio = anio;
    this.tasaInflacion = tasaInflacion;
    this.inversion = inversion;
    this.tasaMensual = tasaMensual;
    this.porcentajeRelacionIngreso = 0;
    this.porcentajeRelacionInflacion = 0;
  }

  // setters & getters
  getNombreMes() {
    return this.meses[this.mes];
  }

  getNumeroDia() {
    return this.dia;
  }

  getAnio() {
    return this.anio;
  }

  getMesNumero() {
    return this.mes;
  }
  /**
   * Devuelve la suma del dia, mes y año -1
   * @returns Number
   */
  getFecha() {
    return this.dia + this.mes + this.anio;
  }

  getInversion() {
    return parseFloat(this.inversion).toFixed(2);
  }

  setInversion(monto) {
    this.inversion = monto;
  }

  getTasaMensual() {
    return this.tasaMensual;
  }

  toString = function () {
  return `
      ${this.icono}
      Fecha inversion: ${this.dia}/${this.mes}/${this.anio} <br>\n
      Tasa de inflación: ${this.tasaInflacion}%<br>\n
      Inversión: ${this.inversion}<br>\n
      Tasa mensual: ${this.tasaMensual}%<br>\n
      Porcentaje de relación con ingresos: ${this.porcentajeRelacionIngreso}%<br>\n
      Porcentaje de relación con inflación: ${this.porcentajeRelacionInflacion}%<br>\n
    `;
};
}
class Operacion {
  constructor(Mes) {
    this.mes = Mes;
  }

  getMes() {
    return this.mes;
  }

  /**
   * Devuelve la ganancia generada este mes.
   * @returns  Number
   */
  calcularRetornoPorMes() {
    return Number(((this.mes.getTasaMensual() / 100) * (Number(this.mes.getInversion()))).toFixed(2));
  }

  /**
   * @returns {string} 
   */
  toString() {
    return `En el mes de: ${this.mes.getNombreMes()}, invirtiendo: $${this.mes.getInversion()}, obtiene de retorno: $${this.calcularRetornoPorMes()}`;
  }
}

class Persona {
  constructor() {
    this.nombre = "";
    this.operaciones = [];
  }

  saludar() {
    console.log(`Hola, mi nombre es ${this.getName()}.`);
  }

  getName() {
    return this.nombre;
  }

  /**
   * @returns un array con operaciones.
   */
  getOperaciones() {
    return this.operaciones;
  }

  setOperaciones(operaciones) {
    this.operaciones = operaciones;
  }

  agregarOperacion(op) {
    this.operaciones.push(o);
  }

  buscarMesPorNumeroMes(numeroMes) {
    const pos = this.getOperaciones().findIndex(op => op.getMes().getMesNumero() === numeroMes);
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
      const mes = this.getOperaciones()[i].getMes();
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
    return ops.filter(op => op.getMes().getAnioMes() >= anio);
  }

  calcularRetornoPorMes() {
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
  calcularRetornoAcumulado() {
    let suma = 0;
    let opAnt = this.getOperaciones()[0];
    this.operaciones.forEach(op => {
      // si es el primer mes del cálculo
      if (opAnt.getMes().getNombreMes() === op.getMes().getNombreMes()) {
        suma += op.calcularRetornoPorMes();
      } else {
        op.getMes().setInversion(Number(opAnt.getMes().getInversion()) + Number(opAnt.calcularRetornoPorMes()));
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
  calcularRetorno(metodo) {
    let suma = 0;
    if (this.operaciones.length !== 0) {
      if (metodo == "porMes") {
        suma = this.calcularRetornoPorMes();
      } else { // sies interes compuesto...
        suma = this.calcularRetornoAcumulado();
      }
    }
    return parseFloat(suma).toFixed(2);
  }

  // Guardar LocalStorage
  saveToLocalStorage() {
    const personaJSON = JSON.stringify(this);
    localStorage.setItem("persona", personaJSON);
  }

  // Borrar LocalStorage
  eraseSavedData() {
    localStorage.removeItem("persona");
  }


}


