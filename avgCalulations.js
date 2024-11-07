let avg_Rice = [], avg_Maize = [], avg_Beans_Red = [];
let avgRice = 0, avgMaize = 0, avgBeansRed = 0; 
let x = 0;
let price = 0;

function averageRice() {
  for(let i = 2012; i < 2023; i++) {
    price = 0;
    for(let z = 0; z < arr_Rice.length; z++){
      if(i === arr_Rice[z].year){
        x++;
        let iD = arr_Rice[z].iD;
        price += dataArray[iD].usdPrice;
      }
    }
    let ttPrice = Math.round((price / x) * 100) / 100;

    if(isNaN(ttPrice)){
      ttPrice = 0;
    }

    let avg = { 
      year: i,
      average: ttPrice
    };
    avg_Rice.push(avg);
  }
}

function averageMaize() {
  for(let i = 2012; i < 2023; i++) {
    price = 0;
    for(let z = 0; z < arr_Maize.length; z++){
      if(i === arr_Maize[z].year){
        x++;
        let iD = arr_Maize[z].iD;
        price += dataArray[iD].usdPrice;
      }
    }
    let ttPrice = Math.round((price / x) * 100) / 100;

    if(isNaN(ttPrice)){
      ttPrice = 0;
    }

    let avg = { 
      year: i,
      average: ttPrice
    };
    avg_Maize.push(avg);
  }
}

function averageBeansRed() {
  for(let i = 2012; i < 2023; i++) {
    price = 0;
    for(let z = 0; z < arr_Beans_Red.length; z++){
      if(i === arr_Beans_Red[z].year){
        x++;
        let iD = arr_Beans_Red[z].iD;
        price += dataArray[iD].usdPrice;
      }
    }
    let ttPrice = Math.round((price / x) * 100) / 100;

    if(isNaN(ttPrice)){
      ttPrice = 0;
    }

    let avg = { 
      year: i,
      average: ttPrice
    };
    
    avg_Beans_Red.push(avg);
  }
}