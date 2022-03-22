import { useState, useEffect } from 'react'
import api from '../../apiConfig'
function useProfessions() {
    //GETTING PROFESSIONS
    const [professions, setProfessions] = useState([])
    useEffect(() => {
        api.get('/api/v1/profession/all').then(r => {
            let preparedData = [

            ]
            r.data.forEach(profession => {
                preparedData.push({
                    id: profession.id,
                    value: profession.title,
                    label: profession.title,

                })
            })
            setProfessions(preparedData)
        })

    }, [])

    return professions
}

export default useProfessions