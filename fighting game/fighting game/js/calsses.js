
class Sprite {/* cria uma clase para usar orientaçao a objetos*/
    constructor({position,imageSrc,scale = 1,framesMax = 1}){/*cria um construtor,({}serve para passar osargumentos como uma propriedade dentro de um objeto)*/
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7
    }
    draw(){/*desenha animaçao e plano de fundo */
        c.drawImage(
            this.image,
            this.framesCurrent* (this.image.width/this.framesMax) ,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax)*this.scale,
            this.image.height*this.scale
            
        )
    }

    update(){/*atualiza a posição */
        this.draw()
        this.framesElapsed++
        if(this.framesElapsed%this.framesHold===0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent = 0
            }
        }
    }
}

class Fighter extends Sprite{/* cria uma clase para usar orientaçao a objetos*/
constructor({position, velocity,color='red',offset,imageSrc,scale = 1,framesMax = 1}){/*cria um construtor,({}serve para passar osargumentos como uma propriedade dentro de um objeto)*/
   this.position = position
   this.velocity = velocity
   this.width = 50
   this.height = 150
   this.lastKey
   this.attackBox = {
        position: {
            x:this.position.x,
            y:this.position.y
        },
        offset, 
        width: 100,
        height: 50
        
   }
   this.color=color
   this.isAttaking
   this.health=100
}


update(){/*atualiza a posição */
    this.draw()
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if(this.position.y + this.height + this.velocity.y >= canvas.height - 97){/* se aposiçao y + o tamanho do objeto + a velocidade de y forem verdade, entao velocidade de y = 0 ,ou seja para*/
        this.velocity.y = 0
    }
    else{/*se nao velocidade aumenta na velocidade da gravidade*/
        this.velocity.y += gravity
    }  
}
attack(){
    this.isAttaking = true
    setTimeout(()=>{
        this.isAttaking = false
    }, 100)
}
}