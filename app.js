const colorsEL = document.querySelectorAll(".color")

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
    let colorsArray = []
    for (let i = 0; i <= 5; i++) {
        colorsArray.push(generateSingleColorValue())
    }
    return `#${colorsArray.join("")}`
}

const isNextColorEqualsPrevious = (colorsArray, nextColor) => {
    let isEqual = false
    if (colorsArray.length === 0) {
        return isEqual
    }
    colorsArray.forEach((color) => {
        if (color === nextColor) {
            isEqual = true
        }
    })
    return isEqual
}

const fillColorsArray = () => {
    for (let i = 0; i <= 5; i++) {
        const actualColor = generateColorString()
        if (!isNextColorEqualsPrevious(colors, actualColor)) {
            colors.push(actualColor);
        }
    }
}

const applyColorsIntoDOM = () => {
    colorsEL.forEach((item, index) => {
        item.style.backgroundColor = colors[index]
    })
}

fillColorsArray()

applyColorsIntoDOM()

console.log(colorsEL)