export const ShuffleArray = (array) => {
    [...array].sort(() => Math.random() - 0.5)
}
