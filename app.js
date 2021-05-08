const colorsEL = document.querySelectorAll('.color')
const btnRefreshAllEL = document.querySelector('.btn-refresh-all')

const colors = []

const generateSingleColorValue = () => {
    const randomNumber = Math.floor(Math.random() * 16)
    if (randomNumber <= 9) {
        return `${randomNumber}`
    }

    switch(randomNumber) {
        case 10:
            return 'A'
        case 11:
            return 'B'
        case 12:
            return 'C'
        case 13:
            return 'D'
        case 14:
            return 'E'
        case 15:
            return 'F'
    }
}

const generateColorString = () => {
    let colorArray = []
    for (let i = 0; i <= 5; i++) {
        colorArray.push(generateSingleColorValue())
    }
    return `#${colorArray.join("")}`
}

const isNextColorEqualsPrevious = (colorArray, nextColor) => {
    let isEqual = false
    if (colorArray.length === 0) {
        return isEqual
    }
    colorArray.forEach((color) => {
        if (color === nextColor) {
            isEqual = true
        }
    })
    return isEqual
}

const fillcolorArray = (colorArray) => {
    for (let i = 0; i <= 5; i++) {
        const actualColor = generateColorString()
        if (!isNextColorEqualsPrevious(colorArray, actualColor)) {
            colorArray.push(actualColor);
        }
    }
}

const showColorHexValue = (colorContainers, colorArray) => {
    colorContainers.forEach((item, index) => {
        const colorLabel = item.querySelector('.color-name')
        colorLabel.textContent = colorArray[index]
        colorLabel.style.color = colorArray[index]
    })
}

const applyColorsIntoDOM = (colorsContainer, colorArray) => {
    colorsContainer.forEach((item, index) => {
        item.style.backgroundColor = colorArray[index]
    })
}

const clearColorArray = () => {
    const initialIndex = colors.length
    for (let i = 0; i < initialIndex; i++) {
        colors.pop()
    }
}

const initialize = () => {
    fillcolorArray(colors)
    applyColorsIntoDOM(colorsEL, colors)
    showColorHexValue(colorsEL, colors) 
}

const refreshAllColors = () => {
    clearColorArray()
    initialize()
    console.log(colors);
}

btnRefreshAllEL.addEventListener('click', refreshAllColors)

document.addEventListener('keypress', (event) => {
    const isRightKey = event.code === 'Enter'
    if (isRightKey) {
        refreshAllColors()
    }
})

window.addEventListener('load', initialize)

console.log(colors);