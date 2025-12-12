const modalHeaderInfo = document.getElementById('modalHeaderInfo')
const gold = document.getElementById('goldCount')
const emerald = document.getElementById('emeraldCount')
// const clearButton = document.getElementById('clearButton')

let goldCount = 0
let goldAndSuff = '0'
let emeraldCount = 0
let emeraldAndSuff = '0'
let resetProgressBtnPressFlag = 0
let isMobile = false
let isMainModalWindow

let stats = {
    clicks: 0,
    maxClickSpeed: 0,
    maxGoldCount: 0,
    maxEmeraldCount: 0,
    firstClickTime: null,
    sessionCount: 0,
}


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
        }, 3000);
    }
});

headerInfo.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    resetProgressBtnPressFlag = 0
});

headerInfo.addEventListener('mouseleave', () => {
    if(resetProgressBtnPressFlag){
        clearTimeout(pressTimer);
    }
});

headerInfo.addEventListener('touchstart', () => {
    isMobile = true
    pressTimer = setTimeout(() => {
        let resetProgressFlag = confirm('Вы действительно хотите сбросить весь прогресс? Вы не сможете его восстановить и вам ничего за это не будет!')
        if(resetProgressFlag){
            clearProgress()
        }
        resetProgressBtnPressFlag = 1
    }, 3000);
    setTimeout(() => {
        isMobile = false;
    }, 500)
});

headerInfo.addEventListener('touchend', () => {
    clearTimeout(pressTimer);
    resetProgressBtnPressFlag = 0
});

// headerInfo.addEventListener('touchleave', () => {
//     if(resetProgressBtnPressFlag){
//         clearTimeout(pressTimer);
//     }
// });

// headerConsole.addEventListener('click', () => {
//     alert('Скоро здесь что-то будет...')
// })

function saveProgress(){
    const statSave = JSON.stringify(stats)
    localStorage.setItem('stats', statSave)
    localStorage.maxLengthClicks = maxLengthClicks
    localStorage.gold = goldCount
    localStorage.goldAndSuff = goldAndSuff
    localStorage.emerald = emeraldCount
    localStorage.emeraldAndSuff = emeraldAndSuff
    localStorage.isMainModalWindow = isMainModalWindow
}

function loadProgress(){
    const statsLoad = localStorage.getItem('stats')
    stats = JSON.parse(statsLoad);
    isMainModalWindow = localStorage.getItem('isMainModalWindow')
}

function clearProgress(){
    localStorage.clear()
    stats = {
        clicks: 0,
        maxClickSpeed: 0,
        maxGoldCount: 0,
        maxEmeraldCount: 0,
        firstClickTime: null,
        sessionCount: 0
    }
    clicks = 0
    clicksAndSuff = '0'
    clicksPerSec = 0
    maxClicksPerSec = 0
    clicksTime = []
    maxLengthClicks = 0
    goldCount = 0
    emeraldCount = 0

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
    switch(Math.floor(((num.toString()).length - 1) / 3)){
        case 0: 
            numSuff = ''
            numAndSuff = ((num / (10 ** (3 * 0))).toFixed(0)) + numSuff
            return numAndSuff
        case 1: 
            numSuff = 'K'
            numAndSuff = ((num / (10 ** (3 * 1))).toFixed(2)) + numSuff
            return numAndSuff
        case 2:
            numSuff = 'M'
            numAndSuff = ((num / (10 ** (3 * 2))).toFixed(2)) + numSuff
            return numAndSuff
        case 3:
            numSuff = 'B'
            numAndSuff = ((num / (10 ** (3 * 3))).toFixed(2)) + numSuff
            return numAndSuff
        case 4:
            numSuff = 'T'
            numAndSuff = ((num / (10 ** (3 * 4))).toFixed(2)) + numSuff
            return numAndSuff
        case 5:
            numSuff = 'Qa'
            numAndSuff = ((num / (10 ** (3 * 5))).toFixed(2)) + numSuff
            return numAndSuff
        default:
            numAndSuff = 'Слишком большое число'
            return numAndSuff
    }
}