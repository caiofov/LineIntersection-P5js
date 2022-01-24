function mousePosition(){ //quando chamada, retorna a posição do mouse
    let x = mouseX
    let y = mouseY

    //verificando os limites do canvas -> se passar do limite, será considerado como se fosse o próprio limite

    //limite para o eixo X (largura)
    if(x > cnvWidth){x = cnvWidth}
    else if(x<0){x = 0}

    //limite para o eixo Y (altura)
    if(y > cnvHeight){ y = cnvHeight }
    else if(y < 0){ y = 0}

    return [x, y]
}


//adaptado de https://www.inf.pucrs.br/~pinho/CG/Aulas/OpenGL/Interseccao/CalcIntersec.html#:~:text=Para%20obter%20o%20ponto%20de,Pi.
function intersectionPoint(line1,line2){
    let det = (line2.point2.x - line2.point1.x) * (line1.point2.y - line1.point1.y)  -  (line2.point2.y - line2.point1.y) * (line1.point2.x - line1.point1.x)
    if(det == 0){
        return false
    }
    let s = ((line2.point2.x - line2.point1.x) * (line2.point1.y - line1.point1.y) - (line2.point2.y - line2.point1.y) * (line2.point1.x - line1.point1.x))/ det ;
    let t = ((line1.point2.x - line1.point1.x) * (line2.point1.y - line1.point1.y) - (line1.point2.y - line1.point1.y) * (line2.point1.x - line1.point1.x))/ det ;

    let x = line1.point1.x + (line1.point2.x-line1.point1.x)*s
    let y = line1.point1.y + (line1.point2.y-line1.point1.y)*s;
    
    let intersecPoint = new Point([x,y], color(0,0,0))

    if(line1.isHover(intersecPoint.pos) && line2.isHover(intersecPoint.pos)){ //verifica se o ponto está em cima das linhas, pois essa função projeta os segmentos como se fossem retas
        return intersecPoint
    }
    else{
        return false
    }
}

function deleteElement(){ //deleta elemento que o mouse está por cima -> só é chamada quando a tecla DEL é pressionada

    lines.forEach( v =>{ //verifica se está por cima de um vetor
      if(v.isHover(mousePosition())){
        lines.splice(lines.indexOf(v),1) //tira o vetor da lista de vetores. Então, automaticamente, ele não será mais desenhado
        regeneratePoints() //recalcula os pontos quanto for eliminado um vetor
        return;
      }
    })
}


function regeneratePoints(){ //repopula o vetor de pontos baseado nos pontos dos vetores existentes
    points = []
    if(lines.length < 2){intersecPoint = null} //se não tiverem duas linhas, então não terá ponto de intersecção
    
    lines.forEach(v =>{ //para cada vetor da lista
        points.push(v.point1)
        points.push(v.point2) //adicionará o último ponto desse vetor
    })
  }