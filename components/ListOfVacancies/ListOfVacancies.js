import React, { useState } from "react"
import VacancyCard from "../Cards/Vacancy/VacancyCard"
function ListOfVacancies() {
    const [vacancyCards, setVacansyCards] = useState([{
        id: 1,
        title: 'Physiotherapist MSK Full Time',
        address: 'London, England',
        date: '2021-12-10T17:00:00',
        description: 'We are loking for a full time MSK physiotherapist to work at 2 of our sires.We have an excellent canseload of sports, private medical insurance and self pay patients.',
        company: 'PhysioQinetics',
        rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
        isLiked: true
    }])

    return (
        <div className="listOfVacancies">
            {vacancyCards.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} info={itm} />)}
        </div>
    )
}

export default React.memo(ListOfVacancies)