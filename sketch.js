var lines = [] //array de vetores
var points = [] //array de pontos
var intersecPoint;
var currentLine; //vetor atual (o que muda com o mouse)
var currentPoint;
var drawingLine = false; //diz se está em processo de desenhar um segmento
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
  fill (0,0,0)
  text ("[DEL] - Deletar segmento", 10, 30)
  
  lines.forEach(v =>{ //desenhando os vetores
    v.draw()
  })

  points.forEach(p =>{ //desenhando os pontos
    p.draw()
  })

  if(isDrawing && !drawingLine){
    currentPoint.draw()
  }
  else if(isDrawing && points.length > 0){
    currentLine = new Line(
      points[points.length-1], 
      currentPoint, 
      color(1,31,75)
      )
    currentLine.draw()
  }

  if (intersecPoint){intersecPoint.draw()}

}


function mousePressed(){
  if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
    if(lines.length > 1){
      console.log("apague uma reta")
    }
    else{
      if(drawingLine){
        lines.push(currentLine) //adiciona o vetor atual ao array de vetores
      }
      
      drawingLine = !drawingLine
  
      points.push(currentPoint)
  
      if(lines.length > 1){
        intersecPoint = intersectionPoint(lines[0],lines[1])
        if(!intersecPoint){console.log("o segmentos de reta não se cruzam")}
      }
    }
  }
}

function keyPressed(){
  switch(keyCode){
    
    case(83): //somar
      sum()
      break
      
    case(27): //"pausar"
      isDrawing = !(isDrawing)
      break
    
    case(67): //limpar
      clearAll()
      break
    
    case(69): //embaralharar
    if(vectors.length > 1){
      shuffleVectors()
    }
      break
    
    case(46): //apagar um elemento
      deleteElement()
      break

    case(65): //centralizar pontos
      if(points.length > 1){
        centralizePoints()
      }
      break

    default:
      break
  }
}
