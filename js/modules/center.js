const headerInfo = document.getElementById('headerInfo')
const headerConsole = document.getElementById('headerConsole')
const mainClicks = document.getElementById('mainClicks')
const mainSpeed = document.getElementById('mainSpeed')
const mainBlock = document.getElementById('mainBlock')

let clicks = 0
let clicksAndSuff = '0'
let suff = ''
let clicksPerSec = 0
let clicksTime = []


function pageStart(){
    // clicks = +localStorage.getItem('clicks')
    // mainBlock.textContent = +localStorage.getItem('clicks')
    
    clicks = +localStorage.getItem('clicks') != null ? +localStorage.getItem("clicks") : 0
    clicksAndSuff = localStorage.getItem('clicksAndSuff') != null ? +localStorage.getItem("clicksAndSuff") : 0
    suff = localStorage.getItem('Suff') != null ? +localStorage.getItem("suff") : 0

    clicksSuff()
    mainClicks.textContent = clicksAndSuff
}

function clicksSuff(){
    switch(Math.floor(((clicks.toString()).length - 1) / 3)){
        case 0: 
            suff = ''
            clicksAndSuff = ((clicks / (10 ** (3 * 0))).toFixed(0)) + suff
            localStorage.clicksAndSuff = clicksAndSuff
            localStorage.suff = suff
            break
        case 1: 
            suff = 'K'
            clicksAndSuff = ((clicks / (10 ** (3 * 1))).toFixed(2)) + suff
            localStorage.clicksAndSuff = clicksAndSuff
            localStorage.suff = suff
            break
        case 2:
            suff = 'M'
            clicksAndSuff = ((clicks / (10 ** (3 * 2))).toFixed(2)) + suff
            localStorage.clicksAndSuff = clicksAndSuff
            localStorage.suff = suff
            break
        default:
            clicksAndSuff = 'Слишком большое число'
    }
}

mainBlock.addEventListener(('click'), () => {
    clicks += 1
    clicksSuff()
    mainClicks.textContent = clicksAndSuff
    localStorage.clicks = +clicks
    localStorage.clicksAndSuff = clicksAndSuff
    localStorage.suff = suff
    clicksTime.push(Date.now())
    // res = +(Math.floor(((clicks.toString()).length - 1) / 3))
})

function clearClicksTime(){
    while(clicksTime.length != 0 && clicksTime[0] < Date.now() - 1000){
        clicksTime.shift()
    }
    mainSpeed.textContent = clicksTime.length
} setInterval(clearClicksTime, 100)

pageStart()