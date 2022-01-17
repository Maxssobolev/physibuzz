import { useState } from "react"
import VacancyCard from "../Cards/Vacancy/VacancyCard"
function ListOfVacancies() {
    const [vacancyCards, setVacansyCards] = useState([{
        id: 1,
        title: 'Physiotherapist MSK Full Time',
        country: 'England',
        city: 'London',
        date: '2022-01-15T17:00:00',
        description: 'We are loking for a full time MSK physiotherapist to work at 2 of our sires.We have an excellent canseload of sports, private medical insurance and self pay patients.',
        company: 'PhysioQinetics',
        rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
        isLiked: false
    },
    {
        id: 2,
        title: 'Physiotherapist MSK Full Time',
        country: 'England',
        city: 'London',
        date: '2022-01-10T17:00:00',
        description: 'We are loking for a full time MSK physiotherapist to work at 2 of our sires.We have an excellent canseload of sports, private medical insurance and self pay patients.',
        company: 'PhysioQinetics',
        rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
        isLiked: true
    },
    {
        id: 3,
        title: 'Physiotherapist MSK Full Time',
        country: 'England',
        city: 'London',
        date: '2021-12-10T17:00:00',
        description: 'We are loking for a full time MSK physiotherapist to work at 2 of our sires.We have an excellent canseload of sports, private medical insurance and self pay patients.',
        company: 'PhysioQinetics',
        rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
        isLiked: false
    }])

    return (
        <div className="listOfVacancies">
            {vacancyCards.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} info={itm} />)}
        </div>
    )
}

export default ListOfVacancies