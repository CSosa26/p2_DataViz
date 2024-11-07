let arr_bubbles = []; 

class bubble {
    constructor(x, y, size, year, text, col){
      this.x = x + 30; 
      this.y = y + 50; 
      this.size = size; 
      this.year = year; 
      this.col = col;
      this.text = text;
    }
  
    display() {
      stroke(1);
      fill(this.col);
      ellipse(this.x, this.y, this.size, this.size);
  
      noStroke();
      fill('black');
      textSize(15);
      text(this.text, this.x - 15, this.y + 7);
    }
}

function bbCreate(){
  averageRice();
  averageMaize()
  averageBeansRed();
    
  
  let ySpacing1 = height / (avg_Rice.length + .5); 
  let ySpacing2 = height / (avg_Maize.length + 1); 
  let ySpacing3 = height / (avg_Beans_Red.length + 1); 
  
  for(let i = 0; i < avg_Rice.length; i++){
    let xPos = random(50, 150);
    let bubbles = new bubble(xPos, (i + 1) * ySpacing1, avg_Rice[i].average * 5, avg_Rice[i].year, avg_Rice[i].year, color(255, 128, 0)); 
    arr_bubbles.push(bubbles);
  }
  
  for(let i = 0; i < avg_Maize.length; i++){
    let bubbles = new bubble(random(350, 550), (i + 1) * ySpacing2, avg_Maize[i].average * 35, avg_Maize[i].year, avg_Maize[i].year, color(255, 255, 51)); 
    arr_bubbles.push(bubbles);
  }
  
  for(let i = 0; i < avg_Beans_Red.length; i++){
    let bubbles = new bubble(random(700, 850), (i + 1) * ySpacing3, avg_Beans_Red[i].average * 15, avg_Beans_Red[i].year, avg_Beans_Red[i].year, color(56, 255, 179)); 
    arr_bubbles.push(bubbles);
  }
}