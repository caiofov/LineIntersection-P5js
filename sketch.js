var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var currentPoint;
var isDrawing = true; //diz se está "pausado" ou não

//dimensoes canva
var cnvWidth = 550
var cnvHeight = 500


function setup() {
  createCanvas(cnvWidth, cnvHeight);
}

function draw() {
  background(220);
  currentPoint = new Point(mousePosition(), color(1,31,75))
  
  vectors.forEach(v =>{ //desenhando os vetores
    v.draw()
  })

  points.forEach(p =>{ //desenhando os pontos
    p.draw()
  })
  
  if(isDrawing && points.length > 0){
    currentVector = new Vector(
      points[points.length-1], 
      currentPoint, 
      color(1,31,75)
      )
    currentVector.draw()
  }

}


function mousePressed(){
  if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
    
      if(points.length > 0 ){
      vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
    }
    
    points.push(currentPoint)
  }
  
  else if(mouseButton === "left" && !(isDrawing)){ //se não tiver desenhando e acionar o mouse
    buttons.forEach( b=> { //verifica se clicou em algum botão e, então realizar sua ação
      if(b.isHover()){
        b.onClick()
      }
      return
    })
  }
  
}


