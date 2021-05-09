const colorsEL = document.querySelectorAll('.color')
const btnRefreshAllEL = document.querySelector('.btn-refresh-all')

const colors = Array(5).fill('')

let numberOfColorsVisibleInDOM = colorsEL.length

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
    for (let i = 0; i < colorArray.length; i++) {
        let actualColor = generateColorString()
        while (isNextColorEqualsPrevious(colorArray, actualColor)) {
            actualColor = generateColorString()
        } 
        if (!isActionTargetLocked(colorsEL[i])) {
            colorArray[i] = actualColor
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

const applySingleColorIntoDOM = (color, index, colorArray) => {
    color.style.backgroundColor = colorArray[index]
}

const applyAllColorsIntoDOM = (colorsContainer, colorArray) => {
    colorsContainer.forEach((item, index) => {
        applySingleColorIntoDOM(item, index, colorArray)
    })
}

const clearColorArray = () => {
    const initialIndex = colors.length - 1
    console.log(colors.length);
    for (let i = 0; i < initialIndex; i++) {
        if (!isActionTargetLocked(colorsEL[i])) {
            colors[i] = ''
        }
    }
}

const refreshAllColors = () => {
    clearColorArray()
    initialize()
    console.log(colors);
}

const getActionTarget = (eventTarget, actionType) => {
    let actionTarget = null
    if (eventTarget.parentNode.dataset.js === actionType) {
        actionTarget = eventTarget.parentNode.parentNode
    } else {
        actionTarget = eventTarget.parentNode
    }
    return actionTarget
}

const isActionTargetLocked = (actionTarget) => {
    if (actionTarget.dataset.isLocked === 'false') {
        return false
    }
    if (actionTarget.dataset.isLocked === 'true') {
        return true
    }
}

const changeLockButton = (actionTarget) => {
    const btnLockImg = actionTarget.querySelector('[data-js="lock"]').querySelector('[data-js="lock"]')
    if (isActionTargetLocked(actionTarget)) {
        btnLockImg.src = './img/lock.svg'
    } else {
        btnLockImg.src = './img/unlock.svg'
    }
}

const refreshSingleColor = (eventTarget) => {
    let refreshTarget = getActionTarget(eventTarget, 'refresh')
    const colorIndex = Number(refreshTarget.dataset.initialOrder) - 1

    if (!isActionTargetLocked(refreshTarget)) {
        const newColor = generateColorString()
        while (isNextColorEqualsPrevious(colors, newColor)) {
            newColor = generateColorString()
        }
        colors[colorIndex] = newColor
        applySingleColorIntoDOM(colorsEL[colorIndex], colorIndex, colors)
    }
}

const lockSingleColor = (eventTarget) => {
    const lockTarget = getActionTarget(eventTarget, 'lock')
    const isTargetLocked = isActionTargetLocked(lockTarget)
    if (isTargetLocked) {
        lockTarget.dataset.isLocked = 'false'
    } else {
        lockTarget.dataset.isLocked = 'true'
    }
    changeLockButton(lockTarget)
}

const excludeSingleColor = (eventTarget) => {
    let exclusionTarget = getActionTarget(eventTarget, 'exclude')
   
    if (numberOfColorsVisibleInDOM > 1 && !isActionTargetLocked(exclusionTarget)) {
        exclusionTarget.parentNode.removeChild(exclusionTarget)
        numberOfColorsVisibleInDOM--
    }
}

const addListenersInActionButtons = () => {
    colorsEL.forEach( element => {
        element.addEventListener('click', (event) => {
            const clickTarget = event.target
            const targetDataset = clickTarget.dataset.js
            switch (targetDataset) {
                case 'refresh':
                    refreshSingleColor(clickTarget)
                    break
                case 'lock':
                    lockSingleColor(clickTarget)
                    break
                case 'exclude':
                    excludeSingleColor(clickTarget)
                    break
            }
        })
    } )
}

const initialize = () => {
    fillcolorArray(colors)
    applyAllColorsIntoDOM(colorsEL, colors)
    showColorHexValue(colorsEL, colors)
    addListenersInActionButtons()
}

btnRefreshAllEL.addEventListener('click', refreshAllColors)

document.addEventListener('keypress', (event) => {
    const isRightKey = event.code === 'Enter'
    if (isRightKey) {
        refreshAllColors()
    }
})

window.addEventListener('load', initialize)