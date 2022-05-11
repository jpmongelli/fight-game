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
    },
    imageSrc: './img/samuraiMack/Idle.png',
    scale:2.5,
    framesMax:8,
    offset:{
        x:215,
        y:154
    },
    sprites : {
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            framesMax:8,
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            framesMax:8,

        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            framesMax:2,
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            framesMax:2,
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6,
        },
        takeHit:{
            imageSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4
        },
        death:{
            imageSrc:'./img/samuraiMack/Death.png',
            framesMax:6
        }
     },    
        attackBox: {
            offset:{
                x: 100,
                y: 50
            },
            width: 160,
            height: 50
        },
        
   
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
    },
    imageSrc: './img/Kenji/Idle.png',
    scale:2.5,
    framesMax:4,
    offset:{
        x:215,
        y:170
    },
    sprites : {
        idle:{
            imageSrc:'./img/Kenji/Idle.png',
            framesMax:4,
        },
        run:{
            imageSrc:'./img/Kenji/Run.png',
            framesMax:8,

        },
        jump:{
            imageSrc:'./img/Kenji/Jump.png',
            framesMax:2,
        },
        fall:{
            imageSrc:'./img/Kenji/Fall.png',
            framesMax:2,
        },
        attack1:{
            imageSrc:'./img/Kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            imageSrc:'./img/Kenji/Take hit.png',
            framesMax:3
        },
        death:{
            imageSrc:'./img/Kenji/Death.png',
            framesMax:7
        }
    },
        attackBox: {
            offset:{
                x: -170,
                y: 50 
            },
            width: 170,
            height: 50
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
    c.fillStyle = 'rgba(255,255,255,0.15 )'
    c.fillRect(0,0 ,canvas.width,canvas.height)
    player.update()
    inimigo.update()

    player.velocity.x = 0
    inimigo.velocity.x = 0

    //player moviment


    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else{
        player.switchSprite('idle')
    }    
    //jumping
    if(player.velocity.y<0){
        player.switchSprite('jump')
    }
    else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }



    // enemy moviment
    inimigo.switchSprite('idle')

    if(keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft'){
        inimigo.velocity.x = -5
        inimigo.switchSprite('run')

    }
    else if(keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight'){
        inimigo.velocity.x = 5
        inimigo.switchSprite('run')
    }
    else{
        inimigo.switchSprite('idle')
    }    
    //jumping
    if(inimigo.velocity.y<0){
        inimigo.switchSprite('jump')
    }
    else if(player.velocity.y > 0){
        inimigo.switchSprite('fall')
    }


    //detec for colision && inimigo recebe hit
    if(rectangularColision({
        rectangle1: player,
        rectangle2: inimigo
    }) &&
        player.isAttaking &&player.framesCurrent === 4
    )   {
        inimigo.takeHit()
        player.isAttaking = false
      
        
        gsap.to('#enemyHealth',{
            width:inimigo.health + '%'
        })
    }

    //if player misses
    if(player.isAttaking && player.framesCurrent === 4){
        player.isAttaking = false
    }



    if(rectangularColision({
        rectangle1: inimigo,
        rectangle2: player
    }) &&
        inimigo.isAttaking && inimigo.framesCurrent === 2
    )   {
        player.takeHit()
        inimigo.isAttaking = false
        
        
        gsap.to('#playerHealth',{
            width:player.health + '%'
        })
       
    }
    //if enemy misses
    if(inimigo.isAttaking && inimigo.framesCurrent === 2){
        inimigo.isAttaking = false
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
    if(!player.dead){
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
        }
    }
    if(!inimigo.dead){
        switch(event.key){
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
                inimigo.attack()
            break
    }
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




