import Flags from "country-flag-icons/react/3x2";
import { ISOCountriesList } from './ISOCountriesList'

export const getCountryFlag = (country) => {
    let ccode;
    ISOCountriesList.forEach(({ name, code }) => {
        if (name.toLowerCase().includes(country.toLowerCase()))
            ccode = code
    })

    return Flags[ccode] || ''
}