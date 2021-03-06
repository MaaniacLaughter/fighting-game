const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
//To make value editing easier
const latVel = 5
const jumpVel = 15

class Sprite
{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        let lastKey
    }

    draw()
    {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0
        }
        else this.velocity.y += gravity

    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    }, 
    velocity: {
        x: 0,
        y: 0
    }
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

function animate()
{
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //Player Movement
    if(keys.a.pressed && player.lastKey == 'a')
        player.velocity.x = -latVel
    else if(keys.d.pressed && player.lastKey == 'd')
        player.velocity.x = latVel

    //Enemy Movement
    if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft')
        enemy.velocity.x = -latVel
    else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight')
        enemy.velocity.x = latVel
}

animate()

window.addEventListener('keydown', (event)=>{
    switch (event.key)
    {
        //Player Keys
        case 'd':
            keys.d.pressed = true 
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break
        case 'w':
            //To fix Double Jump
            if(player.position.y + player.height + player.velocity.y >= canvas.height)
                player.velocity.y = -jumpVel
        break

        //Enemy Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break 
        case 'ArrowUp':
            //To fix Double Jump
            if(enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height)
                enemy.velocity.y = -jumpVel
        break
    }
    //console.log(event.key)
})

window.addEventListener('keyup', (event)=>{
    switch (event.key)
    {
        //Player keys
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break

        //Enemy keys
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
    console.log(event.key)
})