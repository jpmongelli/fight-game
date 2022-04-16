const canvas=document.querySelector(`canvas`);/*declara constante canvas para determinar uma area de renderizaçao de graficos, querySelector seleciona  aarea do site onde vai ser alterado*/

const c = canvas.getContext('2d');/*cria uma constante onde define no canvas o mode de renderizaçao grafica para 2d, podendo ser alterada para 3d*/

canvas.width = 1024/*define a largura da area de renderizaçao */
canvas.height = 576/*define a altura da area de renderizaçao*/

c.fillRect(0,0 , canvas.width, canvas.height)/*desenha um retangulo na tela*/


class Sprite {/* cria uma clase para usar orientaçao a objetos*/
    constructor(position){/*cria um construtor, q recebe uma posiçao do objeto na tela*/
       this.position = position
    }
    desenho(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,50,150)
    }
}
const player = new Sprite({/* cria um objeto player */
    x:0,
    y:0
})
player.desenho()

const inimigo = new Sprite({/*cria um objeto inimigo */
    x:400,
    y:100
})
inimigo.desenho()

console.log(player)/* */


function animacao(){
    window.requestAnimationFrame
}