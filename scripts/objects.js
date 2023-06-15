
class Anio {
  constructor(numero, meses) {
    this.numero = numero;
    this.meses = meses;
  }

  mostrarMeses() {
    console.log(`El año ${this.numero} tiene los siguientes meses:`);
    this.meses.forEach((mes, indice) => {
      console.log(`${indice + 1}. ${mes}`);
    });
  }
}


class Mes {
  constructor(nombre, numero, tasaInflacion, inversion, retorno) {
    this.nombre = nombre;
    this.numero = numero;
    this.tasaInflacion = tasaInflacion;
    this.inversion = inversion;
    this.retorno = retorno;
    this.retornoTotal = 0;
    this.porcentajeRelacionIngreso = 0;
    this.porcentajeRelacionInflacion = 0;
  }
}


const mesesDelAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const anio2023 = new Anio(2023, mesesDelAnio);
console.log(mesesDelAnio[asdas ]);
wfd 

