scene.setBackgroundImage(sprites.background.cityscape)
test1()
test2()

function test1() {
    game.setDialogFrame(sprites.dialog.mediumStar)
    const helpImg = image.create(40 + 80, 8 * 12 - 3)
    const text = [
        ["A", "pause"],
        ["B", "Restart"],
        ["↑↓", "BPM/Tempo"],
        ["←→", "Sentences"],
        ["", ""],
        ["pausing:", ""],
        ["↑↓", "Pitch tune"],
        ["←→", "Note width"]]
    text.forEach((s, i) => {
        helpImg.print(s[0], 0, i * 12, 4)
        helpImg.print(s[1], 40, i * 12, 15)
    })
    const titleImg = image.create(40 + 80, 10)
    titleImg.print("  Example Help Page", 0, 0, 4)
    titleImg.drawLine(10, 9, 110, 9, 4)
    game.showImageDialog(DialogLayout.Full, helpImg, titleImg)
}

function test2() {

    const imgStar = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . b . . . . . . .
    . . . . . . . b d b . . . . . .
    . . . . . . b 5 5 5 b . . . . .
    . . . . . b b 5 5 5 b b . . . .
    . . b b b b 5 5 5 1 1 b b b b .
    . . b 5 5 5 5 5 5 1 1 5 5 5 b .
    . . b d d 5 5 5 5 5 5 5 d d b .
    . . . b d d 5 5 5 5 5 d d b . .
    . . . c b 5 5 5 5 5 5 5 b c . .
    . . . c b 5 5 5 5 5 5 5 b c . .
    . . . c 5 5 d d b d d 5 5 c . .
    . . . c 5 d d c c c d d 5 c . .
    . . . c c c c . . . c c c c . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `

    const iconPlane = img`
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        . . f 2 c . . . . c 4 . 
        . . c 4 4 2 2 c c 4 2 . 
        . 9 9 2 2 2 2 2 2 2 f . 
        2 2 1 1 9 2 2 c c c c 2 
        2 2 2 2 2 2 2 2 2 c f f 
        . f 2 2 2 c f 4 2 2 . . 
        . . . . f c f f 2 2 c . 
        . . . . . c 2 f f . . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        `
    function lPadding(s: string, length: number): string {
        while (s.length < length)
            s = " " + s
        return s
    }

    function rPadding(s: string, length: number): string {
        while (s.length < length)
            s += " "
        return s
    }

    let enemyList: number[][] = []  // [[subKind, score, countByPlayer1, countByPlayer2], ...]
    let enemyIcons: Image[] = []
    function printGridToImage() {
        const iCharsScore = 8
        const iCharsCount = 6
        const W = (iCharsScore + iCharsCount * 2) * 6 + 8
        const fontColor = 15

        const imgHeader = image.create(W, 13)
        const imgItems = image.create(W, enemyList.length * 13)
        const imgFooter = image.create(W, 12)

        //draw score board
        let xPadding = 0

        //header: title
        // img.fillRect(xPadding,0,160-xPadding*2,18,0)
        imgHeader.print(lPadding("Scores", iCharsScore) + lPadding("P1", iCharsCount) + lPadding("P2", iCharsCount), xPadding, 0, 4)
        imgHeader.drawLine(10, 10, imgHeader.width - 10, 10, 4)

        //items
        const total = [0, 0]
        let y = 0
        enemyList.forEach((item, i) => {
            imgItems.drawTransparentImage(enemyIcons[i], xPadding + 5, y)
            let s = lPadding(item[1].toString(), iCharsScore) + lPadding("x" + item[2], iCharsCount) + lPadding("x" + item[3], iCharsCount)
            imgItems.print(s, xPadding, y + 1, fontColor)
            total[0] += item[1] * item[2]
            total[1] += item[1] * item[3]
            y += 13
        })

        //footer: total
        imgFooter.drawLine(10, 2, imgFooter.width - 10, 2, 4)
        imgFooter.print(lPadding(total[0] + "", iCharsScore + iCharsCount) + lPadding(total[1] + "", iCharsCount), xPadding, 4, fontColor)

        //star
        if (total[0] != total[1])
            music.playSound(' a5:1 c6:1 e6:3')
        if (total[0] != total[1]) {
            imgHeader.drawTransparentImage(imgStar, xPadding + (iCharsScore + iCharsCount + (total[0] > total[1] ? 0 : iCharsCount)) * 6 - 28, -1)
        }
        return { items: imgItems, header: imgHeader, footer: imgFooter }
    }

    //fill data
    for (let i = 0; i < 11; i++) {
        enemyList.push([
            0,
            Math.randomRange(1, 20) * 50,
            Math.randomRange(0, 15),
            Math.randomRange(0, 15)])
        enemyIcons.push(iconPlane.clone())
        enemyIcons[i].replace(2, Math.randomRange(3, 15))
    }

    const imgs = printGridToImage()
    game.setDialogFrame(sprites.dialog.largeStar)
    game.showImageDialog(DialogLayout.Full, imgs.items, imgs.header, imgs.footer)

}

