const modalHeaderInfo = document.getElementById('modalHeaderInfo')

modalHeaderInfo.addEventListener('click', () => {
    modalHeaderInfo.style.display = 'none'
})

headerInfo.addEventListener('click', () => {
    modalHeaderInfo.style.display = 'flex'
})

headerConsole.addEventListener('click', () => {
    alert('Скоро здесь что-то будет...')
})