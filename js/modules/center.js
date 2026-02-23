//#region elements
const headerInfo = document.getElementById('headerInfo')
const mainClicks = document.getElementById('mainClicks')
const mainSuff = document.getElementById('mainSuff')
const mainSpeed = document.getElementById('mainSpeed')
const suffSpeed = document.getElementById('suffSpeed')
const mainBlock = document.getElementById('mainBlock')
//#endregion

//#region lets
let clicks = 0n
let suff = ''
let clicksPerSec = 0n
let speedSuff = ''
let maxClicksPerSec = 0n
let clicksTime = []
let maxLengthClicks = 0n
let rainbowCombo = []
let keyClicks = {
    isMouseDown: 0,
    isSpaceDown: 0,
    isEnterDown: 0,
    isNumEnterDown: 0,
}
//#endregion

//#region functions

function click(count){
    if(count == undefined){
        count = 1
    }
    for(i = 0; i < count; i++){
        if(!isMobile){
            clicks += 1n
            goldCount += 1n
            stats.allGoldCount += 1n
        }   
        else{
            clicks += BigInt((event.touches).length)
            goldCount += BigInt((event.touches).length)
            stats.allGoldCount += BigInt((event.touches).length)
        }
        stats.clicks = clicks
        suff = addSuff(clicks)
        mainClicks.textContent = editNumber(clicks)
        mainSuff.textContent = suff
        clicksTime.push(Date.now())
    
        if(maxClicksPerSec < clicksTime.length){
            maxClicksPerSec = clicksTime.length
            stats.maxClickSpeed = maxClicksPerSec
        }
        goldSuff = addSuff(goldCount)
        gold.textContent = editNumber(goldCount)
        suffGold.textContent = goldSuff
        if(maxLengthClicks < (clicks.toString()).length){
            emeraldCount += BigInt(BigInt((clicks.toString()).length) - maxLengthClicks)
            stats.allEmeraldCount += BigInt(BigInt((clicks.toString()).length) - maxLengthClicks)
            maxLengthClicks = BigInt((clicks.toString()).length)
            emeraldSuff = addSuff(emeraldCount)
            emerald.textContent = editNumber(emeraldCount)
            suffEmerald.textContent = emeraldSuff
        }


        if(stats.maxGoldCount < goldCount){
            stats.maxGoldCount = goldCount
        }
        if(stats.maxEmeraldCount < emeraldCount){
            stats.maxEmeraldCount = emeraldCount
        }
        stats.lastClickTime = Date.now()
        sessionStats.lastClickTime = Date.now()
        // stats.timePlayedAll = stats.lastClickTime - stats.playStart

        if(!sessionStats.isValidSession){
            sessionStats.isValidSession = 1
            stats.validSessionCount += 1
        }

        sessionStats.clicks += 1n
        if(sessionStats.firstClickTime == null){
            sessionStats.firstClickTime = Date.now()
            if(stats.firstClickTime == null){
                stats.firstClickTime = Date.now()
            }
        }
        // stats.timePlayed -= sessionStats.timePlayed
        // sessionStats.timePlayed = sessionStats.lastClickTime - sessionStats.sessionStart
        // stats.timePlayed += sessionStats.lastClickTime - sessionStats.sessionStart
        
        saveProgress()
    }
}

function clearClicksTime(){
    while(clicksTime.length != 0 && clicksTime[0] < Date.now() - 1000){
        clicksTime.shift()
    }
    if(mainSpeed.textContent == 0 && clicksTime.length == 0){
        return
    }
    mainSpeed.textContent = editNumber(clicksTime.length)
    suffSpeed.textContent = addSuff(clicksTime.length)
    
} setInterval(clearClicksTime, 100)

//#endregion

//#region eventListners

mainBlock.addEventListener('mousedown', () => {
    if(!isMobile){
        mainBlock.style.transform = 'scale(1.05)'
        keyClicks.isMouseDown == 0 ? click() : 0
        keyClicks.isMouseDown = 1
    }
})

mainBlock.addEventListener('mouseup', () => {
    if(!isMobile){
        mainBlock.style.transform = 'scale(1.00)'
        keyClicks.isMouseDown = 0
    }
})


document.addEventListener('keydown', (event) => {
    switch(event.code){
        case 'Space':
            mainBlock.style.transform = 'scale(1.05)'
            keyClicks.isSpaceDown == 0 ? click() : 0
            keyClicks.isSpaceDown = 1
            break
        case 'Enter':
            mainBlock.style.transform = 'scale(1.05)'
            keyClicks.isEnterDown == 0 ? click() : 0
            keyClicks.isEnterDown = 1
            break
        case 'NumpadEnter':
            mainBlock.style.transform = 'scale(1.05)'
            keyClicks.isNumEnterDown == 0 ? click() : 0
            keyClicks.isNumEnterDown = 1
            break

        case 'KeyR':
            if(rainbowCombo[0] == undefined){
                rainbowCombo.push('r')
            }
            break
        case 'KeyA':
            if(rainbowCombo[0] == 'r'){
                rainbowCombo.push('a')
            }
            break
        case 'KeyI':
            if(rainbowCombo[1] == 'a'){
                rainbowCombo.push('i')
            }
            break
        case 'KeyN':
            if(rainbowCombo[2] == 'i'){
                rainbowCombo.push('n')
            }
            break
        case 'KeyB':
            if(rainbowCombo[3] == 'n'){
                rainbowCombo.push('b')
            }
            break
        case 'KeyO':
            if(rainbowCombo[4] == 'b'){
                rainbowCombo.push('o')
            }
            break
        case 'KeyW':
            if(rainbowCombo[5] == 'o'){
                rainbowCombo.push('w')
            }
            break
    }

    if(event.code != 'KeyR' && event.code != 'KeyA' && event.code != 'KeyI' && event.code != 'KeyN' && event.code != 'KeyB' && event.code != 'KeyO' && event.code != 'KeyW'){
        rainbowCombo = []
    }
    let rainbow = ''
    for(el of rainbowCombo){
        rainbow += el
    }
    if(rainbow == 'rainbow'){
        mainBlock.style.animation = 'rainbow 10s infinite ease-in-out'
    }
})

document.addEventListener('keyup', (event) => {
    switch(event.code){
        case 'Space':
            mainBlock.style.transform = 'scale(1.00)'
            keyClicks.isSpaceDown = 0
            break
        case 'Enter':
            mainBlock.style.transform = 'scale(1.00)'
            keyClicks.isEnterDown = 0
            break
        case 'NumpadEnter':
            mainBlock.style.transform = 'scale(1.00)'
            keyClicks.isNumEnterDown = 0
            break
    }
})

mainBlock.addEventListener('touchstart', (event) => {
    event.preventDefault()
    isMobile = true
    mainBlock.style.transform = 'scale(1.05)'
    keyClicks.isMouseDown == 0 ? click() : 0
    keyClicks.isMouseDown = 1
    setTimeout(() => {
        isMobile = false;
    }, 500)
})

mainBlock.addEventListener('touchend', () => {
    mainBlock.style.transform = 'scale(1.00)'
    keyClicks.isMouseDown = 0
})

//#endregion