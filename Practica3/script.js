
//API KEY :E1DXTF7C83E9F1O5
const stocksElement = document.getElementById('stocks');
let form=document.getElementById('formulario');
//Por defecto muestro IBM
var buscarElement="IBM";
getCotizaciones(buscarElement);
//Recojo busqueda de empresa para hacer fetch
form.addEventListener('submit',(event)=>{
     buscarElement = document.getElementById('search').value;
     getCotizaciones(buscarElement);
    
});

async function getCotizaciones() {
  fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+buscarElement+'&apikey=E1DXTF7C83E9F1O5',
  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
	 
    }
  })
  //Suscribimos a la promesa Response
  .then(res => {
    if(res.ok){
      //Si la respuesta se resolvió bien, procedemos a resolver la promesa Body
      return res.json()
    }else{
      throw res;
    }
  })
  //Suscribimos a la promesa Body
  .then(r => {
    //Una vez resuelta la última promesa, asignamos el valor de la respuesta a una variable JSON
    stocks=r
    displayStocks(stocks);

  })
  //Errores de RED y respuestas KO
  .catch(e => console.log(e))

  console.log(stocks);

}


  


function displayStocks(stocks) {
  stocksElement.innerHTML = '';
  var tSeries=stocks['Time Series (Daily)']; 
  for(var tempData in tSeries)
 {  	
   const stockElement = document.createElement('div'); 
   stockElement.classList.add('card');
   stockElement.innerHTML = `
            
            <div class="card-body">
                <h3 class="FECHA">${tempData}</h3>
                <p>
                    <strong>Open:</strong>
                    ${tSeries[tempData]['1. open']}
                </p>
                <p>
                    <strong>High:</strong>
                    ${tSeries[tempData]['2. high']}
                </p>                              
                <p>
                  <strong>Low:</sx trong>
                  ${tSeries[tempData]['3. low']}
                </p>        
                <p>
                    <strong>Close:</strong>
                    ${tSeries[tempData]['4. close']}
                </p>
                <p class="Volume">
                    <strong>Región:</strong>
                    ${tSeries[tempData]["5. volume"]}
                </p>
            </div>
        `;
    console.log(tSeries[tempData]['1. open']);
    
    stocksElement.appendChild(stockElement);
 }

}