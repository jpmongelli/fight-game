const canvas=document.querySelector(`canvas`);/*declara constante canvas para determinar uma area de renderizaçao de graficos, querySelector seleciona  area do site onde vai ser alterado*/

const c = canvas.getContext('2d');/*cria uma constante onde define no canvas o mode de renderizaçao grafica para 2d, podendo ser alterada para 3d*/

canvas.width = 1024/*define a largura da area de renderizaçao */
canvas.height = 576/*define a altura da area de renderizaçao*/

c.fillRect(0,0 , canvas.width, canvas.height)/*desenha um retangulo na tela*/
const gravity = 0.7



const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position:{
        x: 625,
        y: 133
    },
    imageSrc: './img/shop.png',
    scale:2.70,
    framesMax:6
})

const player = new Fighter({
    position:{/* cria um objeto player */
        x:0,
        y:0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset:{
        x:0,
        y:0
    }
})


const inimigo = new Fighter({/*cria um objeto inimigo */
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    color: 'blue',
    offset:{
        x:-50,
        y:0
    }
})


console.log(player)/* */
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed:false
    }
}


decreaseTimer()

function animation(){/*cria uma funçao de animaçao em um loop infinito a te ser mandado parar*/
    window.requestAnimationFrame(animation)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    background.update()
    shop.update()
    player.update()
    inimigo.update()

    player.velocity.x = 0
    inimigo.velocity.x = 0
    //player moviment
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }
    // enemy moviment
    if(keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft'){
        inimigo.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight'){
        inimigo.velocity.x = 5
    }
    //detec for colision
    if(rectangularColision({
        rectangle1: player,
        rectangle2: inimigo
    }) &&
        player.isAttaking
    )   {
        player.isAttaking = false
        inimigo.health -= 20
        document.querySelector('#enemyHealth').style.width = inimigo.health + '%'
    }
    if(rectangularColision({
        rectangle1: inimigo,
        rectangle2: player
    }) &&
        inimigo.isAttaking
    )   {
        inimigo.isAttaking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
    //end game based on health
    if(inimigo.health <= 0 || player.health <= 0){
        determineWinner({player, inimigo,timerId})
    }
}
animation()
/*window.addEventListener('keydown',()=>{}) cria um leitor de evento q le caso uma tecla seja precionada */
/* movimentaçao player*/
window.addEventListener('keydown',(event)=>{   
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true 
            player.lastKey ='a'
            break
        case 'w':
            player.velocity.y =-20
            break
        case ' ':
            player.attack()
            break
        /* movimentaçao inimigo*/
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            inimigo.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true 
            inimigo.lastKey ='ArrowLeft'
        break
        case 'ArrowUp':
            inimigo.velocity.y =-20
        break
        case 'ArrowDown':
            inimigo.isAttaking=true
             break
    }
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 'w':
            keys.w.pressed = false
        break
    }
    /* movimentaçao inimigo*/
    switch(event.key){
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
            inimigo.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            inimigo.lastKey ='ArrowLeft'
        break
    }
})




