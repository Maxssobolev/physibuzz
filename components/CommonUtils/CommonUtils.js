function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
export const years = range(2000, new Date().getFullYear())


export const counries = ['Italy']
export const counriesOfRegAd = ['None']
export const counriesOfReg = ['']
