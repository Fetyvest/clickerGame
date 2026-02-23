//#region code

if(stats.playStart == null){
    stats.playStart = Date.now()
}
sessionStats.sessionStart = Date.now()

loadProgress()

if(isEmergencyUpdate){
    emergencyModal.style.display = 'flex'
}
else{
    emergencyModal.style.display = 'none'
}

//#endregion