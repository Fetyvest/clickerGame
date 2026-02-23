//#region elements

const modalHeaderInfo = document.getElementById('modalHeaderInfo')
const emergencyModal = document.getElementById('emergencyModal');
const emergencyBtn = document.getElementById('emergencyBtn');
const gold = document.getElementById('goldCount')
const emerald = document.getElementById('emeraldCount')
const suffGold = document.getElementById('suffGold');
const suffEmerald = document.getElementById('suffEmerald');
const versionElement = document.getElementById('versionElement');
// const clearButton = document.getElementById('clearButton')

//#endregion


//#region lets

let version = '0.3.0'
let goldCount = 0n
let goldSuff = ''
let emeraldCount = 0n
let emeraldSuff = ''
let resetProgressBtnPressFlag = 0
let isMobile = false
let isMainModalWindow = 1
let isEmergencyUpdate = 0

let sessionStats = {
    //main
    clicks: 0n,
    //times
    firstClickTime: null,
    lastClickTime: null,
    sessionStart: null,
    timePlayed: 0,
    lastActivity: null,
    //counts
    isValidSession: 0,
}

let stats = {
    //main
    clicks: 0n,
    maxClickSpeed: 0n,
    maxGoldCount: 0n,
    allGoldCount: 0n,
    maxEmeraldCount: 0n,
    allEmeraldCount: 0n,
    //times
    firstClickTime: null,
    lastClickTime: null,
    playStart: null,
    lastActivity: null,
    timePlayed: 0,
    timePlayedAll: 0,
    //counts
    sessionCount: 0,
    validSessionCount: 0,
}

const suffixes = [
    {value: BigInt(10) ** 0n, suff: ''},     // Единица (Unit)
    {value: BigInt(10) ** 3n, suff: 'K'},    // Тысяча (Kilo)
    {value: BigInt(10) ** 6n, suff: 'M'},    // Миллион (Mega)
    {value: BigInt(10) ** 9n, suff: 'B'},    // Миллиард (Billion, Giga)
    {value: BigInt(10) ** 12n, suff: 'T'},   // Триллион (Trillion, Tera)
    {value: BigInt(10) ** 15n, suff: 'Qa'},  // Квадриллион (Quadrillion, Peta)
    {value: BigInt(10) ** 18n, suff: 'Qi'},  // Квинтиллион (Quintillion, Exa)
    {value: BigInt(10) ** 21n, suff: 'Sx'},  // Секстиллион (Sextillion, Zetta)
    {value: BigInt(10) ** 24n, suff: 'Sp'},  // Септиллион (Septillion, Yotta)
    {value: BigInt(10) ** 27n, suff: 'Oc'},  // Октиллион (Octillion)
    {value: BigInt(10) ** 30n, suff: 'No'},  // Нониллион (Nonillion)
    {value: BigInt(10) ** 33n, suff: 'De'},  // Дециллион (Decillion)
    {value: BigInt(10) ** 36n, suff: 'UnD'}, // Ундециллион (Undecillion)
    {value: BigInt(10) ** 39n, suff: 'DuD'}, // Дуодециллион (Duodecillion)
    {value: BigInt(10) ** 42n, suff: 'TrD'}, // Тредециллион (Tredecillion)
    {value: BigInt(10) ** 45n, suff: 'QaD'}, // Кватуордециллион (Quattuordecillion)
    {value: BigInt(10) ** 48n, suff: 'QiD'}, // Квиндециллион (Quindecillion)
    {value: BigInt(10) ** 51n, suff: 'SxD'}, // Сексдециллион (Sexdecillion)
    {value: BigInt(10) ** 54n, suff: 'SpD'}, // Септендециллион (Septendecillion)
    {value: BigInt(10) ** 57n, suff: 'OcD'}, // Октодециллион (Octodecillion)
    {value: BigInt(10) ** 60n, suff: 'NoD'}, // Новемдециллион (Novemdecillion)
    {value: BigInt(10) ** 63n, suff: 'Vg'},  // Вигинтиллион (Vigintillion)
    {value: BigInt(10) ** 66n, suff: 'UnVg'},// Унвигинтиллион (Unvigintillion)
    {value: BigInt(10) ** 69n, suff: 'DuVg'},// Дуовигинтиллион (Duovigintillion)
    {value: BigInt(10) ** 72n, suff: 'TrVg'},// Тревигинтиллион (Trevigintillion)
    {value: BigInt(10) ** 75n, suff: 'QaVg'},// Кватуорвигинтиллион (Quattuorvigintillion)
    {value: BigInt(10) ** 78n, suff: 'QiVg'},// Квинвигинтиллион (Quinquevigintillion)
    {value: BigInt(10) ** 81n, suff: 'SxVg'},// Сексвигинтиллион (Sexvigintillion)
    {value: BigInt(10) ** 84n, suff: 'SpVg'},// Септенвигинтиллион (Septenvigintillion)
    {value: BigInt(10) ** 87n, suff: 'OcVg'},// Октовигинтиллион (Octovigintillion)
    {value: BigInt(10) ** 90n, suff: 'NoVg'},// Новемвигинтиллион (Novemvigintillion)
    {value: BigInt(10) ** 93n, suff: 'Tg'},  // Тригинтиллион (Trigintillion)
    {value: BigInt(10) ** 96n, suff: 'UnTg'},// Унтригинтиллион (Untrigintillion)
    {value: BigInt(10) ** 99n, suff: 'DuTg'} // Дуотригинтиллион (Duotrigintillion)
]


//#endregion

//#region pre-code

if(localStorage.stats != undefined){
    if(typeof (JSON.parse(localStorage.stats, JSONbigParse)).clicks == 'number' || localStorage.isEmergencyUpdate == 1){
        isEmergencyUpdate = 1
        localStorage.isEmergencyUpdate = 1
        isMainModalWindow = 1
        localStorage.isMainModalWindow = '1'
    }
}

//#endregion

//#region functions

function JSONbigStringify(key, value){
    if(typeof value === 'bigint'){
        return (value.toString()) + 'n'
    }
    else{
        return value
    }
}

function JSONbigParse(key, value){
    if(typeof value === 'string' && value.at(-1) == 'n' && !isNaN(Number(value.slice(0, -1)))){
        return BigInt(value.slice(0, -1))
    }
    else{
        return value
    }
}

function saveProgress(){
    localStorage.setItem('stats', JSON.stringify(stats, JSONbigStringify))
    localStorage.version = version
    localStorage.clicks = clicks
    localStorage.suff = suff
    localStorage.maxClicksPerSec = maxClicksPerSec
    localStorage.maxLengthClicks = maxLengthClicks
    localStorage.goldCount = goldCount
    localStorage.goldSuff = goldSuff
    localStorage.emeraldCount = emeraldCount
    localStorage.emeraldSuff = emeraldSuff
    localStorage.isMainModalWindow = isMainModalWindow
    localStorage.isEmergencyUpdate = isEmergencyUpdate
}

function loadProgress(){
    stats = localStorage.stats != undefined ? JSON.parse(localStorage.stats, JSONbigParse) : stats
    version = localStorage.version != undefined ? localStorage.version : version
    clicks = localStorage.clicks != undefined ? BigInt(localStorage.clicks) : 0n
    maxLengthClicks = localStorage.maxLengthClicks != undefined ? BigInt(localStorage.maxLengthClicks) : 0n
    suff = localStorage.suff != undefined ? localStorage.suff : ''
    maxClicksPerSec = localStorage.maxClicksPerSec != undefined ? BigInt(localStorage.maxClicksPerSec) : 0n
    goldCount = localStorage.goldCount != undefined ? BigInt(localStorage.goldCount) : 0n
    goldSuff = localStorage.goldSuff != undefined ? localStorage.goldSuff : ''
    emeraldCount = localStorage.emeraldCount != undefined ? BigInt(localStorage.emeraldCount) : 0n
    emeraldSuff = localStorage.emeraldSuff != undefined ? localStorage.emeraldSuff : ''
    isMainModalWindow = localStorage.isMainModalWindow != undefined ? +localStorage.isMainModalWindow : 1
    isEmergencyUpdate = localStorage.isEmergencyUpdate != undefined ? +localStorage.isEmergencyUpdate : isEmergencyUpdate
    
    pageStart()
}

function pageStart(){    
    mainClicks.textContent = editNumber(clicks)
    mainSuff.textContent = suff
    mainSpeed.textContent = 0n
    suffSpeed.textContent = ''
    gold.textContent = editNumber(goldCount)
    suffGold.textContent = goldSuff
    emerald.textContent = editNumber(emeraldCount)
    suffEmerald.textContent = emeraldSuff

    stats.sessionCount += 1

    if(isMainModalWindow == 1){
        modalHeaderInfo.style.display = 'flex'
    }
    else{
        modalHeaderInfo.style.display = 'none'
    }
    mainBlock.style.transform = 'scale(1.00)'

    saveProgress()
}

function clearProgress(){
    localStorage.clear()
    sessionStats = {
        //main
        clicks: 0n,
        //times
        firstClickTime: null,
        lastClickTime: null,
        sessionStart: null,
        timePlayed: 0,
        lastActivity: null,
        //counts
        isValidSession: 0,
    }
    stats = {
        //main
        clicks: 0n,
        maxClickSpeed: 0n,
        maxGoldCount: 0n,
        allGoldCount: 0n,
        maxEmeraldCount: 0n,
        allEmeraldCount: 0n,
        //times
        firstClickTime: null,
        lastClickTime: null,
        playStart: null,
        lastActivity: null,
        timePlayed: 0,
        timePlayedAll: 0,
        //counts
        sessionCount: 0,
        validSessionCount: 0,
    }
    version = '0.3.0'
    goldCount = 0n
    goldSuff = ''
    emeraldCount = 0n
    emeraldSuff = ''
    resetProgressBtnPressFlag = 0
    isMobile = false
    isMainModalWindow = 1
    isEmergencyUpdate = 0

    clicks = 0n
    suff = ''
    clicksPerSec = 0n
    speedSuff = ''
    maxClicksPerSec = 0n
    clicksTime = []
    maxLengthClicks = 0n
    rainbowCombo = []
    keyClicks = {
        isMouseDown: 0,
        isSpaceDown: 0,
        isEnterDown: 0,
        isNumEnterDown: 0,
    }

    mainBlock.style.animation = ''

    saveProgress()
    pageStart()
}

function getNumberDate(){
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const milliseconds = now.getMilliseconds()
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds + ':' + milliseconds
}

function addSuff(num){
    num = BigInt(num)
    for(el of suffixes.toReversed()){
        if(num / el.value >= 1n){
            return el.suff
        }
    }
}

function editNumber(num){
    num = BigInt(num)
    if(num === 0n){
        return num
    }
    for(el of suffixes.toReversed()){
        if(num / el.value >= 1n){
            if(num % el.value == 0n){
                return parseFloat((Number(num / el.value)).toFixed(2))
            }
            else{
                return ((Number((num * 100n) / el.value)) / 100).toFixed(2)
            }
        }
    }
}

function convertTime(time){
    time = time / 1000
    timeSec = parseFloat((time % 60).toFixed(3))
    timeMin = ((Math.floor(time / 60)) % 60)
    timeHour = ((Math.floor((Math.floor(time / 60)) / 60)) % 60)
    timeDay = ((Math.floor((Math.floor((Math.floor(time / 60)) / 60)) / 24)) % 24)
    return (`${timeDay} дней, ${timeHour} часов, ${timeMin} минут, ${timeSec} секунд`)
}

//#endregion

//#region eventListeners

modalHeaderInfo.addEventListener('click', () => {
    modalHeaderInfo.style.display = 'none'
    isMainModalWindow = 0
    localStorage.isMainModalWindow = isMainModalWindow
})

headerInfo.addEventListener('click', () => {
    modalHeaderInfo.style.display = 'flex'
    isMainModalWindow = 1
    localStorage.isMainModalWindow = isMainModalWindow
})

headerInfo.addEventListener('mousedown', () => {
    if(!isMobile){
        pressTimer = setTimeout(() => {
            let resetProgressFlag = confirm('Вы действительно хотите сбросить весь прогресс? Вы не сможете его восстановить и вам ничего за это не будет!')
            if(resetProgressFlag){
                clearProgress()
            }
            resetProgressBtnPressFlag = 1
        }, 3000)
    }
})

headerInfo.addEventListener('mouseup', () => {
    clearTimeout(pressTimer)
    resetProgressBtnPressFlag = 0
})

headerInfo.addEventListener('mouseleave', () => {
    if(resetProgressBtnPressFlag){
        clearTimeout(pressTimer)
    }
})

headerInfo.addEventListener('touchstart', () => {
    isMobile = true
    pressTimer = setTimeout(() => {
        let resetProgressFlag = confirm('Вы действительно хотите сбросить весь прогресс? Вы не сможете его восстановить и вам ничего за это не будет!')
        if(resetProgressFlag){
            clearProgress()
        }
        resetProgressBtnPressFlag = 1
    }, 3000)
    setTimeout(() => {
        isMobile = false
    }, 500)
})

headerInfo.addEventListener('touchend', () => {
    clearTimeout(pressTimer)
    resetProgressBtnPressFlag = 0
})

headerInfo.addEventListener('touchleave', () => {
    if(resetProgressBtnPressFlag){
        clearTimeout(pressTimer)
    }
})

document.addEventListener('mousedown', () => {
    stats.lastActivity = Date.now()
    sessionStats.lastActivity = Date.now()

    stats.timePlayedAll = stats.lastActivity - stats.playStart

    stats.timePlayed -= sessionStats.timePlayed
    sessionStats.timePlayed = sessionStats.lastActivity - sessionStats.sessionStart
    stats.timePlayed += sessionStats.lastActivity - sessionStats.sessionStart
    
    saveProgress()
})

document.addEventListener('keydown', () => {
    stats.lastActivity = Date.now()
    sessionStats.lastActivity = Date.now()

    stats.timePlayedAll = stats.lastActivity - stats.playStart

    stats.timePlayed -= sessionStats.timePlayed
    sessionStats.timePlayed = sessionStats.lastActivity - sessionStats.sessionStart
    stats.timePlayed += sessionStats.lastActivity - sessionStats.sessionStart
    
    saveProgress()
})

document.addEventListener('touchstart', () => {
    stats.lastActivity = Date.now()
    sessionStats.lastActivity = Date.now()

    stats.timePlayedAll = stats.lastActivity - stats.playStart

    stats.timePlayed -= sessionStats.timePlayed
    sessionStats.timePlayed = sessionStats.lastActivity - sessionStats.sessionStart
    stats.timePlayed += sessionStats.lastActivity - sessionStats.sessionStart
    
    saveProgress()
})

emergencyBtn.addEventListener('click', () => {
    let resetProgressFlag = confirm('Вы действительно хотите сбросить весь прогресс? Вы не сможете его восстановить и вам ничего за это не будет!')
    if(resetProgressFlag){
        clearProgress()
        emergencyModal.style.display = 'none'
    }
})

//#endregion

//#region code

versionElement.textContent = version

//#endregion