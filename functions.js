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