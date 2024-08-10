var btns = document.querySelectorAll('.btn')
var plusBtn = document.querySelector('.plus')
var minusBtn = document.querySelector('.minus')
var multiplyBtn = document.querySelector('.multiply')
var devideBtn = document.querySelector('.devide')
var percentBtn = document.querySelector('.percent')
var input = document.querySelector('.inp')
var result = document.querySelector('.result')
var clearBtn = document.querySelector('.clear')
var erazeBtn = document.querySelector('.eraze')
var equal = document.querySelector('.equal')
var save = []
var currentInput = ''

input.textContent = ''
result.textContent = ''


for (let btn of btns) {
    btn.onclick = function() {
        input.textContent += btn.innerText
        if (Number.parseFloat(save[save.length - 1])) {
            save[save.length - 1] += btn.innerText
        } else  {
            currentInput += btn.innerText
        }
        input.style.bottom = '0'
        input.style.fontSize = '30px'
        result.textContent = ''
    }
}

plusBtn.onclick = function() {
    input.textContent += '+'
    if (currentInput) {
        save.push(currentInput)
        currentInput = ''
    }
    if (save[save.length - 1] == '%' || Number.parseFloat(save[save.length - 1])) {
        save.push('+')
    } else {
        currentInput += '+'
    }
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    result.textContent = ''
}

minusBtn.onclick = function() {
    input.textContent += '-'
    if (currentInput != '') {
        save.push(currentInput)
        currentInput = ''
    }
    if (save[save.length - 1] == '%' || Number.parseFloat(save[save.length - 1])) {
        save.push('-')
    } else {
        currentInput += '-'
    }
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    result.textContent = ''
}

multiplyBtn.onclick = function() {
    input.textContent += 'x'
    if (currentInput) {
        save.push(currentInput)
        currentInput = ''
    }
    if (save[save.length - 1] == '%' || Number.parseFloat(save[save.length - 1])) {
        save.push('x')
    } else {
        currentInput += 'x'
    }
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    result.textContent = ''
}

devideBtn.onclick = function() {
    input.textContent += '/'
    if (currentInput) {
        save.push(currentInput)
        currentInput = ''
    }
    if (save[save.length - 1] == '%' || Number.parseFloat(save[save.length - 1])) {
        save.push('/')
    } else {
        currentInput += '/'
    }
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    result.textContent = ''
}

percentBtn.onclick = function() {
    input.textContent += '%'
    if (currentInput) {
        save.push(currentInput)
        currentInput = ''
    }
    save.push('%')
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    result.textContent = ''
}

clearBtn.onclick = function() {
    input.style.bottom = '0'
    input.style.fontSize = '30px'
    input.textContent = ''
    currentInput = ''
    result.textContent = ''
    save = []
}

erazeBtn.onclick = function() {
    if (input.innerText.length > 0) {
        if (currentInput != '') {
            save.push(currentInput)
        }
        input.innerText = input.innerText.slice(0, -1)
        save[save.length - 1] = save[save.length - 1].slice(0, -1)
        if (save[save.length - 1] === '') {
            save.pop()
        }
        currentInput = ''
        input.style.bottom = '0'
        input.style.fontSize = '30px'
        result.textContent = ''
    }
}

function countPercent(arr) {
    var cnt = 0
    arr.forEach(function(element) {
        if (element == '%') {
            ++cnt
        }
    })
    return cnt
}

function countChar(arr) {
    var cnt = 0
    arr.forEach(function(element) {
        if (element == 'x' || element == '/') {
            ++cnt
        }
    })
    return cnt
}

equal.onclick = function() {
    let loopCnt = 0
    if (input.innerText.length > 0) {
        input.style.bottom = '40px'
        input.style.fontSize = '20px'
        if (currentInput != '') {
            save.push(currentInput)
            currentInput = ''
        }
        var tmpArr = [...save]
        var len = tmpArr.length
        while (countPercent(tmpArr)) {
            for (let i = 0; i < len; i++) {
                if (tmpArr[i] == '%') {
                    let cal = Number.parseInt(tmpArr[i-1])/100
                    tmpArr.splice(i-1, 2, cal)
                }
                len = tmpArr.length
            }
            ++loopCnt
            if (loopCnt > 200) {
                break
            } 
        }
        while (countChar(tmpArr)) {
            for (let i = 0; i < len; i++) {
                if (tmpArr[i] == 'x') {
                    let cal = Number.parseFloat(tmpArr[i-1]) * Number.parseFloat(tmpArr[i+1])
                    tmpArr.splice(i-1, 3, cal)
                } else if (tmpArr[i] == '/') {
                    let cal = Number.parseFloat(tmpArr[i-1]) / Number.parseFloat(tmpArr[i+1])
                    tmpArr.splice(i-1, 3, cal)
                }
                len = tmpArr.length
            }
            ++loopCnt
            if (loopCnt > 200) {
                break
            }
        }
        var i = 0
        while (tmpArr.length > 1) {
            if (tmpArr[i] == '+') {
                let cal = Number.parseFloat(tmpArr[i-1]) + Number.parseFloat(tmpArr[i+1])
                tmpArr.splice(i-1, 3, cal)
                i = 0
            } else if (tmpArr[i] == '-') {
                let cal = Number.parseFloat(tmpArr[i-1]) - Number.parseFloat(tmpArr[i+1])
                tmpArr.splice(i-1, 3, cal)
                i = 0
            }
            ++i
            ++loopCnt
            if (loopCnt > 200) {
                break
            }
        }
        if (loopCnt > 600) {
            result.textContent = 'Biểu thức sai vui lòng nhập lại!'
            save = []
            currentInput = ''
            input.innerText = ''
        } else {
            result.textContent = Number.parseFloat(tmpArr[0]).toFixed(2)
            if (result.textContent == 'NaN') {
                result.textContent = 'Biểu thức sai vui lòng nhập lại!'
                save = []
                currentInput = ''
                input.innerText = ''
            }
        }
    }
}