let table;
let dataArray = [];
let riceArray = [];
let bubblesArray = [];

function preload() {
  table = loadTable("wfp_food_prices_slv.csv", "header");
}

function setup() {
  createCanvas(800, 600);
  background(255);

  if (table.getRowCount() > 3164) {
    for (let i = 3164; i < table.getRowCount(); i++) {
      let value1 = table.getNum(i, 'date');
      let value2 = table.getString(i, 'market');
      let value3 = table.getString(i, 'commodity');
      let value4 = table.getNum(i, 'usdprice');

      let rowData = {
        date: value1,
        market: value2,
        commodity: value3,
        usdprice: value4,
      };
console.log(value2);
      if (value2 == 'National Average') {
        if (value3 == 'Rice') {
          dataArray.push(rowData);
        }
      }
    }
  }  
  console.log(dataArray);
  noLoop();
}

function draw() {
  visualizeData();
  for (let i = 0; i < bubblesArray.length; i++){
    let bubble = bubblesArray[i];
    bubble.display();
  }
}

let counts = 0;

function averageRice() {
  for(let i = 2012; i < 2023; i++){
        price = 0;
        for(let z = 0; z < dataArray.length; z++){
          if(i === dataArray[z].date){
            counts++;
            price += dataArray[z].usdprice;
          }
        }
        let avgprice = Math.round((price / counts) * 100) / 100;

        if(isNaN(avgprice)){
          avgprice = 0;
        }
        let avgr = {
          year: i,
          average: avgprice
        };
        riceArray.push(avgr);
  }
  console.log(riceArray);
}
  
function visualizeData(){
  averageRice();
  let xSpacing = width / (riceArray.length + .5);
  for(let i = 0; i < riceArray.length; i++){
    let yPos = random(150, 300);
    let bubbles = new bubble((i + 1) * xSpacing, yPos, riceArray[i].average * 5, riceArray[i].year, riceArray[i].year);
    bubblesArray.push(bubbles);
    console.log(riceArray[i].year);
  }
  console.log(bubblesArray);
  
}


class bubble{
  constructor(x, y , size, year, text){
    this.x = x + 30;
    this.y = y + 50;
    this.size = size;
    this.year = year;
    this.text = text;
  }
  display(){
    stroke(1);
    fill('yellow');
    ellipse(this.x, this.y, this.size, this.size);

    noStroke();
    fill('black');
    textSize(15);
    text(this.text, this.x - 15, this.y);
  }
}