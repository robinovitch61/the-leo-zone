const numImages = 14

const imagePath = "img/"
const extension = "jpg"

function generateImagePaths(prefix) {
    const paths = []
    for (let i = 1; i <= numImages; i++) {
        paths.push(imagePath + `${prefix}-${('0' + i).slice(-2)}.${extension}`)
    }
    return paths
}

const topImages = generateImagePaths("top")
const midImages = generateImagePaths("mid")
const lowImages = generateImagePaths("low")

function setup(prefix, images) {
    const image = document.getElementById(`${prefix}-img`)
    let idx = 0
    image.src = images[idx]
    const backButton = document.getElementById(`${prefix}-back`)
    backButton.onclick = () => {
        if (idx === 0) {
            idx = images.length - 1
        } else {
            idx--
        }
        image.src = images[idx]
    }
    const nextButton = document.getElementById(`${prefix}-next`)
    nextButton.onclick = () => {
        if (idx === images.length - 1) {
            idx = 0
        } else {
            idx++
        }
        image.src = images[idx]
    }
}

setup("top", topImages)
setup("mid", midImages)
setup("low", lowImages)
