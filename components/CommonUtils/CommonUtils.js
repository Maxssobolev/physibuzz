function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
export const years = range(2000, new Date().getFullYear())


export const counries = ['Italy']
export const counriesOfRegAd = ['None']
export const counriesOfReg = ['']

export const customSelectStyles = {
    control: styles => ({
        ...styles,
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #00000033',
        outline: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        width: '300px',

        '&:hover': {
            borderColor: 'var(--gray)'
        }

    }),
    valueContainer: styles => ({
        ...styles,
        padding: '0px',
        color: 'var(--black)',
        fontWeight: 600
    }),
    indicatorSeparator: styles => ({
        ...styles,
        backgroundColor: 'transparent',
    }),

};