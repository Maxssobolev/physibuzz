

const initialState = {

    user: {
        firstName: 'Jon',
        lastName: 'Walton',
        email: 'JW@gmail.com',
        gender: 'Male',
        yearsOfGraduation: 2005,
        countriesQualified: '',
        countryReg: 'United Kingdom',
        addCountryReg: '',
        get name() {
            return this.firstName + ' ' + this.lastName
        }
    }

}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}