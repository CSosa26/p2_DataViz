let table;
let dataArray = [];
let riceArray = [];
let bubblesArray = [];
let img;

function preload() {
  table = loadTable("wfp_food_prices_slv.csv", "header");
  img = loadImage('https://foodsofnations.com/cdn/shop/products/images_b01b2bb9-fcf3-4118-a1aa-39b1d0382b8e-removebg-preview.png?v=1651174442');
  bgImg = loadImage('https://images.squarespace-cdn.com/content/v1/58b72eac46c3c480fcbe7366/1488919957810-Z6HBQRJU6TZ3EL7IQ12N/Plantas.jpg');
}

function setup() {
  createCanvas(800, 600);
  background(255);

  let refreshButton = createButton('Refresh Canvas');
  refreshButton.style('font-size', '30px');
  refreshButton.position(800, 900);
  refreshButton.mousePressed(() => {
    location.reload();
  });

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
      if (value2 == 'National Average') {
        if (value3 == 'Rice') {
          dataArray.push(rowData);
        }
      }
    }
  }  
  noLoop();
}

function draw() {
  image(bgImg, 0, 0, width, height);
  textSize(30);
  fill('black');
  textAlign(CENTER, TOP);
  text('Price of Rice', width / 2, 10);
  visualizeData();
  for (let i = 0; i < bubblesArray.length; i++){
    let bubble = bubblesArray[i];
    bubble.display();
  }
}

function averageRice() {
  for(let i = 2012; i < 2023; i++){
    let price = 0;
    let counts = 0;
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
}

function visualizeData(){
  averageRice();
  let xSpacing = width / (riceArray.length + .5);
  for(let i = 0; i < riceArray.length; i++){
    let yPos = random(150, 300);
    let bubbles = new bubble((i + 1) * xSpacing, yPos, riceArray[i].average * 5, riceArray[i].year, riceArray[i].year);
    bubblesArray.push(bubbles);
  }
}

class bubble {
  constructor(x, y, size, year, text) {
    this.x = x + 30;
    this.y = y + 50;
    this.size = size;
    this.year = year;
    this.text = text;
  }
  display() {
    let imgSize = this.size;
    imageMode(CENTER);
    image(img, this.x, this.y, imgSize, imgSize);
    
    noStroke();
    fill('black');
    textSize(15);
    text(this.text, this.x - 15, this.y);
  }
}