import { useState, useEffect } from 'react'
import api from '../../apiConfig'
function useCurrencies() {
    //GETTING CURRENCIES
    const [currencies, setCurrencies] = useState([])
    useEffect(() => {
        api.get('/api/v1/currencies').then(r => {
            let preparedData = []
            r.data.forEach(currency => {
                preparedData.push({
                    id: currency.id,
                    value: currency.name,
                    label: currency.name,
                    symbol: currency.symbol
                })
            })
            setCurrencies(preparedData)
        })

    }, [])

    return currencies
}

export default useCurrencies