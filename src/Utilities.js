export const ShuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}
