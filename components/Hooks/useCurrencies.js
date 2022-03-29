import { useState, useEffect } from 'react'
import api from '../../apiConfig'
function useCurrencies() {
    //GETTING CURRENCIES
    const [currencies, setCurrencies] = useState([{ id: 1, value: 'usd', label: 'USD' }])
    useEffect(() => {
        /*api.get('/api/v1/currencies/all').then(r => {
            let preparedData = [

            ]
            r.data.forEach(currency => {
                preparedData.push({
                    id: currency.id,
                    value: currency.title,
                    label: currency.title,

                })
            })
            setCurrencies(preparedData)
        })*/

    }, [])

    return currencies
}

export default useCurrencies