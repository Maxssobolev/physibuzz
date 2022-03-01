
function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
export const years = range(2000, new Date().getFullYear()) //generate an array of years from 2000 to now


export const state = ['Employed']
export const currency = ['USD']
export const city = ['London']
export const profession = ["Skin Specialist"]
export const countries = ['United Kingdom']
export const countriesOfRegAd = ['None']
export const countriesOfReg = ['']
export const gender = ['Male', 'Female', 'Other']


//custom react-select styles
export const customSelectStyles = {
    control: styles => ({
        ...styles,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #00000033',
        outline: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        width: '100%',
        height: '40px',

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

