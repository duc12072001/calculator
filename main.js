let runningTotal = 0
let buffer = "0"
let previousOperation
const screen = document.querySelector(".screen")
let boolean = false

document.querySelector(".calc-buttons").addEventListener("click", e => {
    buttonClick(e.target.innerHTML)
})

function buttonClick(value){
    if(isNaN(value))
        handleSymbol(value)
    else{
        if(boolean){
            buffer = "0"
            boolean = false
        }
        handleNumber(value)
    }
}

function handleNumber(value){
    if(buffer === "0")
        buffer = value
    else 
        buffer += value
    render()
}

function handleSymbol(value){
    switch(value){
        case "AC":
            buffer = "0"
            runningTotal = 0
            previousOperation = null
            render()
            break
        case "Del":
            if(buffer.length > 1){
                buffer = buffer.slice(0, -1)
                render()
            }
            else{
                buffer = "0"
                render()
            }
            break
        case ".":
            break
        case "=":
            if(previousOperation === null)
                return
            doOperation(parseInt(buffer))
            previousOperation = null
            buffer = +runningTotal
            runningTotal = 0
            boolean = true
            render()
            break
        case "%":
        case "/":
        case "*":
        case "-":
        case "+":
            handleOperation(value)
            break
    }
}

function handleOperation(value){
    // if(buffer === "0")
    //     return
    screen.innerHTML = value
    let intBuffer = parseInt(buffer)
    if(runningTotal === 0){
        runningTotal = intBuffer
    }else{
        doOperation(intBuffer)
    }

    previousOperation = value
    buffer = "0"
}

function doOperation(value){
    switch(previousOperation){
        case "+":
            runningTotal += value;
            break
        case "-":
            runningTotal -= value;
            break
        case "*":
            runningTotal *= value;
            break
        case "/":
            runningTotal /= value;
            break
        case "%":
            runningTotal %= value;
            break
    }
}

function render(){
    screen.innerHTML = buffer
}

