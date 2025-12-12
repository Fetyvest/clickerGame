const headerInfo = document.getElementById('headerInfo')
const mainClicks = document.getElementById('mainClicks')
const mainSpeed = document.getElementById('mainSpeed')
const mainBlock = document.getElementById('mainBlock')

let clicks = 0
let clicksAndSuff = '0'
let clicksPerSec = 0
let maxClicksPerSec = 0
let clicksTime = []
let maxLengthClicks = 0
let keyClicks = {
    isSpaceDown: 0,
    isEnterDown: 0,
    isEnterNumDown: 0,
}


function pageStart(){    
    clicks = +localStorage.getItem('clicks') != null ? +localStorage.getItem("clicks") : 0
    clicksAndSuff = localStorage.getItem('clicksAndSuff') != null ? +localStorage.getItem("clicksAndSuff") : 0
    suff = localStorage.getItem('Suff') != null ? localStorage.getItem("suff") : 0
    goldCount = localStorage.getItem('gold') != null ? +localStorage.getItem("gold") : 0
    emeraldCount = localStorage.getItem('emerald') != null ? +localStorage.getItem("emerald") : 0
    maxLengthClicks = localStorage.getItem('maxLengthClicks') != null ? +localStorage.getItem("maxLengthClicks") : 0

    clicksAndSuff = addSuff(clicks)
    mainClicks.textContent = clicksAndSuff
    gold.textContent = goldCount
    emerald.textContent = emeraldCount

    if(localStorage.getItem('stats') != undefined){
        loadProgress()
    }
    
    if(stats.sessionCount == undefined){
        stats.sessionCount = 1
        saveProgress()
    }
    else{
        stats.sessionCount += 1
        saveProgress()
    }

    if(isMainModalWindow == 1){
        modalHeaderInfo.style.display = 'flex'
    }
    else{
        modalHeaderInfo.style.display = 'none'
    }
}

function click(count){
    if(count == undefined){
        count = 1
    }
    for(i = 0; i < count; i++){
        if(!isMobile){
            clicks += 1
            goldCount += 1
        }
        else{
            clicks += (event.touches).length
            goldCount += (event.touches).length
        }
        stats.clicks = clicks
        clicksAndSuff = addSuff(clicks)
        mainClicks.textContent = clicksAndSuff
        localStorage.clicks = +clicks
        localStorage.clicksAndSuff = clicksAndSuff
        clicksTime.push(Date.now())
    
        if(maxClicksPerSec < clicksTime.length){
            maxClicksPerSec = clicksTime.length
            stats.maxClickSpeed = maxClicksPerSec
        }
        goldAndSuff = addSuff(goldCount)
        gold.textContent = goldAndSuff
        if(maxLengthClicks < (clicks.toString()).length){
            emeraldCount += (clicks.toString()).length - maxLengthClicks
            maxLengthClicks = (clicks.toString()).length
            emeraldAndSuff = addSuff(emeraldCount)
            emerald.textContent = emeraldAndSuff
        }
        if(stats.maxGoldCount < goldCount){
            stats.maxGoldCount = goldCount
        }
        if(stats.maxEmeraldCount < emeraldCount){
            stats.maxEmeraldCount = emeraldCount
        }
    
        if(stats.firstClickTime == null){
            stats.firstClickTime = getNumberDate()
        }
        saveProgress()
    }
}

pageStart()

mainBlock.addEventListener(('click'), () => {
    if(!isMobile){
        click()
    }
})

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space' && keyClicks.isSpaceDown == 0){
        click()
        keyClicks.isSpaceDown = 1
    }
    if(event.code === 'Space'){
        mainBlock.classList.add('main__click-active')
    }
})

document.addEventListener('keyup', (event) => {
    if(event.code === 'Space' && keyClicks.isSpaceDown == 1){
        keyClicks.isSpaceDown = 0
    }
    if(event.code === 'Space'){
        mainBlock.classList.remove('main__click-active')
    }
})

document.addEventListener('keydown', (event) => {
    if(event.code === 'Enter' && keyClicks.isEnterDown == 0){
        click()
        keyClicks.isEnterDown = 1
    }
    if(event.code === 'Enter'){
        mainBlock.classList.add('main__click-active')
    }
})

document.addEventListener('keyup', (event) => {
    if(event.code === 'Enter' && keyClicks.isEnterDown == 1){
        keyClicks.isEnterDown = 0
    }
    if(event.code === 'Enter'){
        mainBlock.classList.remove('main__click-active')
    }
})

document.addEventListener('keydown', (event) => {
    if(event.code === 'NumpadEnter' && keyClicks.isEnterNumDown == 0){
        click()
        keyClicks.isEnterNumDown = 1
    }
    if(event.code === 'NumpadEnter'){
        mainBlock.classList.add('main__click-active')
    }
})

document.addEventListener('keyup', (event) => {
    if(event.code === 'NumpadEnter' && keyClicks.isEnterNumDown == 1){
        keyClicks.isEnterNumDown = 0
    }
    if(event.code === 'NumpadEnter'){
        mainBlock.classList.remove('main__click-active')
    }
})

mainBlock.addEventListener('touchstart', (event) => {
    event.preventDefault()
    isMobile = true
    mainBlock.classList.add('main__click-active')
    click()
    setTimeout(() => {
        isMobile = false;
    }, 500)
})

mainBlock.addEventListener('touchend', () => {
    mainBlock.classList.remove('main__click-active')
})

function clearClicksTime(){
    while(clicksTime.length != 0 && clicksTime[0] < Date.now() - 1000){
        clicksTime.shift()
    }
    mainSpeed.textContent = clicksTime.length
} setInterval(clearClicksTime, 100)

// pageStart()