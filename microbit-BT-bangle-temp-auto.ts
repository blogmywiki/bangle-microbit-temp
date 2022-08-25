loops.everyInterval(60000, function () {
    basic.showIcon(IconNames.Heart)
    bluetooth.advertiseUrl(
    "https://microbit.org#" + convertToText(input.temperature()),
    7,
    false
    )
    basic.clearScreen()
})
