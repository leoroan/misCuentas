# misCuentas
Proyecto de webApp para calculo de inversion y finanza argentina.

Una WebApp, que me permita proyectar, de acuerdo a un monto dado, mis futuros ingresos/ganancias, teniendo en cuenta los diversos parámetros del sistema, como valores en moneda extranjera, o tasas nominales y de inflacion entre otros.

La mecánica sería:
  V1:
  - Dado un valor, donde "VALOR" hace referencia al importe o monto a invertir( originado de un/os ingreso/s, de ahorros, u otras fuentes)
  - Debemos tener en cuenta un "PERIODO", no menor a 30 días (y con un maximo calculable a 5 años o hasta que el retorno acomulado iguale o supere el maximo asegurado)
  - Como parámetros, tendré en cuenta, el promedio de retorno de las casas de banco, provinciales, nacionales y privados, y las principales billeteras eléctronicas. (TNA y CFT anual y mensual)
  - Sabremos de montos minimos y maximos. Este último teniendo en cuenta que en un plazo fijo, en un banco disponemos de un seguro por "X" importe del capital que reconoce la entidad, más allá de ese valor, la casa no se responsabiliza, entonces, ese serie el tope (por banco-marca, por ejemplo podria alcanzar el tope en Nacion, Provincia, HSBC y así diversificar y estar "asegurado")
  - La herramienta de inversion sería en moneda extranjera USD, EURO, OTRO, y en metodos como PLAZOS FIJOS en sus versiones, comenzando por el mas básico.
  - En cuanto a las monedadas, hay que tener en cuenta su tasa de crecimiento mensual, oficial y paralelo.
  - se seguirá actualizando en cuanto se avance el proyecto.

  V1.1:
  - Sumado a lo anterior, (o independiente), un calculo que me permita controlar mis gastos de tarjeta de CREDITO.
  - Se podrána registrar las COMPRAS realizadas (FechaDeCompra, valorTotal, cantidadDeCuotas, descripcionCompra...etc)
  - Con las compras, podemos ver para cada MES, el total de gastos acumulados, (promedio, ya que hay gastos como de sellados de las tarjetas, que no voy a tener en cuenta, en ppio).
  - en virtud del total, podemos saber si estamos a cierto % de nuestros ingresos, que tan mal/bien lo llevamos, poder ver el total, o establecer un porcentaje limite, saber si lo superamos (rojo/verde) o si tenemos margen y CUANTO margen queda.


  V1.101:
  - Estadistica
  - Cuan bien estas, cuan mal... comparado con un estandar PRE-definido. 
  - para un feedBack de tu SALUD ECONÓMICA.
