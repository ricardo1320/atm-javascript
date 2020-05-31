//Arreglo para guardar las rutas de las imagenes
var images = [];
images[5] = "images/fiveBill.png";
images[10] = "images/tenBill.png";
images[20] = "images/twentyBill.png";
images[50] = "images/fiftyBill.png";
images[100] = "images/hundredBill.png";

//Clase billetes
class Bill{
  constructor(value, quantity){
    this.value = value;
    this.quantity = quantity;
    this.image = new Image();
    this.image.src = images[this.value];
  }
}

//Variables
var button = document.getElementById("getMoney");
var result = document.getElementById("result");
var statistics = document.getElementById("statistics");
var cashBox = [];
var delivered = [];
//Para que este algoritmo funcione, el arreglo cashBox tiene que estar ordenado de acuerdo al valor del billete, de mayor a menor.
cashBox.push( new Bill(100,2) );
cashBox.push( new Bill(50,4) );
cashBox.push( new Bill(20,2) );
cashBox.push( new Bill(10,2) );
cashBox.push( new Bill(5,1) );

var money = 0;
var div = 0;
var papers = 0;
var deliveredAmount = 0;
var availableAmount;
button.addEventListener("click", deliverCash);

showStatistics();

//---------------------- Funciones ----------------------
//Funcion para entregar billetes al apretar el boton.
function deliverCash(){
  //
  var moneyHtml = document.getElementById("money");
  money = parseInt(moneyHtml.value);

  //Recorrer la Caja, con los billetes disponibles en el cajero.
  for(var bill of cashBox){
    //Mientras la cantidad solicitada sea mayor a cero.
    if(money > 0){
      div = Math.floor(money/bill.value);
      //Controlar que la division no sea mayor al numero de billetes disponible.
      if(div > bill.quantity){
        papers = bill.quantity;
      }else{
        papers = div;
      }

      //Agregar billetes al array de Entregables.
      delivered.push( new Bill(bill.value, papers) );
      //Actualizar la cantidad de dinero solicitado.
      money = money - (bill.value * papers);
    }
  }

  //Limpiar pantalla de resultados
  result.innerHTML = "";
  //Cuando no alcanza el dinero en el cajero para entregar la cantidad solicitada.
  if(money > 0){
    result.innerHTML = "This ATM can not give the requested amount. Please try again.";
  }else{
    //Recorrer el arreglo de Entregables, para mostrar los billetes en pantalla.
    for(var d of delivered){
      if(d.quantity > 0){
        //result.innerHTML += d.quantity + " $" + d.value + " bills<br>";
        deliveredAmount += d.value * d.quantity;

        //Dibujar los billetes en pantalla
        for(var x=0; x<d.quantity; x++){
          result.appendChild(d.image);
          result.innerHTML += "<br/>";
        }

        //Actualizar el dinero en el cajero, restando lo entregado.
        for(var c of cashBox)
          if(d.value == c.value)
            c.quantity = c.quantity - d.quantity;
      }
    }
  }

  //Cuando acaba la funcion de entregar dinero, limpiar el arreglo de Entregables.
  delivered = [];

  //Al final de la funcion mostrar estadisticas del cajero y limpiar variable.
  showStatistics();
  deliveredAmount = 0;
}

//Funcion para mostrar estadisticas del cajero.
function showStatistics(){
  availableAmount = 0;
  //Sacar la cantidad disponible en el cajero.
  for(var c of cashBox){
    if(c.quantity > 0){
      availableAmount += c.value * c.quantity;
    }
  }

  statistics.innerHTML = "Available amount in this ATM: $" + availableAmount + "<br/>" +
                          "Delivered amount: $ " + deliveredAmount;
}
