let data; 
let dataArray = [];
let arr_Rice = [], arr_Maize = [], arr_Beans_Red = [];

let iD_Check; 
let url = "wfp_food_prices_slv.csv";
let bt_Rice, bt_Maize, bt_Beans_Red;
let bHeight = 0;

let animBoxCheck = false;
let choice_cat = 0;

function preload() {
  data = loadTable(url, 'header');
}

function setup() {
  let cc = createCanvas(1000, 800);
  iD_Check = 0;

  //Collect data from the CSV file
  if(data.getRowCount() > 3164) {
    for(let i = 3164; i < data.getRowCount(); i++) {
      let date = data.getNum(i, 'date'); //Grabs the year (Possible error)
      let city = data.getString(i, 'market'); 
      let category = data.getString(i, 'category');
      let commodity = data.getString(i, 'commodity');
      let priceType = data.getString(i, 'pricetype'); 
      let currency = data.getString(i, 'currency');
      let price = data.getNum(i, 'price');
      let usdPrice = data.getNum(i, 'usdprice');

      let rowData = {
        date: date,
        city: city, 
        categoty: category, 
        commodity: commodity, 
        priceType: priceType, 
        currency: currency,
        price: price, 
        usdPrice: usdPrice
      };


      if(city == 'National Average') {
        dataArray.push(rowData);

        let infoSP = {
          iD: iD_Check, 
          year: date
        };

        switch(commodity) {
          case 'Rice': arr_Rice.push(infoSP); break; 
          case 'Maize (white)': arr_Maize.push(infoSP); break;
          case 'Beans (red)': arr_Beans_Red.push(infoSP); break;
          default: break;
        }
        iD_Check++;
      }
    }
  } else {
    console.log("Error check the table!");
  }

  //Adjusts the button's position based on the canvas's location. (No Screen response)
  let canvasX = cc.position().x; 
  let canvasY = cc.position().y; 

  bt_Rice = createButton('Rice');
  bt_Rice.position(canvasX + 85, canvasY + 720);
  bt_Rice.mousePressed(optionRice);

  bt_Maize = createButton('Maize'); 
  bt_Maize.position(canvasX + 425, canvasY + 720); 
  bt_Maize.mousePressed(optionMaize);

  bt_Beans_Red = createButton('Beans (Red)'); 
  bt_Beans_Red.position(canvasX + 725, canvasY + 720);
  bt_Beans_Red.mousePressed(optionBeansRed);

  bbCreate();
}

function draw() {
  background(color(77, 154, 240));
  textStyle(BOLD);

  //Draws the bubble
  for (let i = 0; i < arr_bubbles.length; i++) {
    let bubble = arr_bubbles[i];
    bubble.display();  
  }

  //Draws the bottom rect
  noStroke();
  fill('yellow');
  rect(0, 700, width, 100);


  //Draws the title 
  fill(215, 215, 222);
  rect(140, 17, 650, 70, 5);
  textSize(50);
  fill('black');
  text('Annual Price Comparison', 160, 70);
  
  switch(choice_cat){
    case 1: fill(255, 128, 0); break; 
    case 2: fill(255, 255, 51); break; 
    case 3: fill(56, 255, 179); break; 
    default: break; 
  }

  boxAnim();

}

//Box Animation
function boxAnim() {
  if(animBoxCheck) {
    bHeight = lerp(bHeight, height, 0.05); // Grabs the numbers between lerp(a, b, Constant Rate); Source: p5js Reference
  } else {
    bHeight = lerp(bHeight, 0, 0.05);
  }

  rect(0, 0, width, bHeight);
  
  //Draws the table
  if(bHeight >= 780){
    tableAnim(185, 80, 315, 65, false, choice_cat);
    tableAnim(185, 15, 315, 65, true);
  }
}

//Draws the table and contents
function tableAnim(x, y, sizeX, sizeY, header, category) {
  stroke(1);
  if(header){
    fill('gray');
    rect(x, y, sizeX, sizeY);
    rect(x + sizeX, y, sizeX, sizeY);
    fill('yellow');
    textSize(45);
    text("Year", x + 100, y + 50);
    text("Price USD", x + sizeX + 45, y + 50);
  } else{ 
    textSize(35);
    let txtY = y - 15;

    for (let i = 0; i < 9; i++) {
      fill('white');
      rect(x, y + sizeY * i, sizeX, sizeY);
      rect(x + sizeX, y + sizeY * i, sizeX, sizeY);
      fill('Black');
      switch(category){
        case 1:
          text(avg_Rice[i].year, x + 107, txtY + sizeY + 65 * i);
          text("$" + avg_Rice[i].average, x + sizeX + 107, txtY + sizeY + 65 * i);
          break; 
        case 2: 
          text(avg_Maize[i].year, x + 107, txtY + sizeY + 65 * i);
          text("$" + avg_Maize[i].average, x + sizeX + 107, txtY + sizeY + 65 * i);
          break; 
        case 3: 
          text(avg_Beans_Red[i].year, x + 107, txtY + sizeY + 65 * i);
          text("$" + avg_Beans_Red[i].average, x + sizeX + 107, txtY + sizeY + 65 * i);
          break;
        default: break; 
      }
    }
  }
  
}