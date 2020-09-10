import {randomColor, isDark} from '@nature-ui/color'

export const randomBgColors = (name?: string) => {
    const bg = name ? randomColor({string: name}): "rgb(226, 232, 240)"
    const isBgDark = isDark(bg)
    console.log(isBgDark)

    const color = name ? (isBgDark ? "#fff" : "#1A202C") : "#fff"
    const borderColor = "#fff"

    return {
        bg,
        color,
        borderColor
    }
}
