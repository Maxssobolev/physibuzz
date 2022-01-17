import React from "react"
import Link from "next/link"
import moment from 'moment'
import { getCountryFlag } from "../../CommonUtils/getCountryFlag"
import Like from "../../Like/Like"

function VacancyCard({ info }) {
    const { id, title, description, date, rate, company, country, city, isLiked } = info
    const FlagIcon = getCountryFlag(country)

    return (
        <div className="vacancyCard">
            <div className="vacancyCard-head">
                <div className="vacancyCard-head__title"><Link href={`/view/vacancy/${encodeURIComponent(id)}`}>{title}</Link></div>
                <div className="vacancyCard-head__like"><Like __id={id} __isLiked={isLiked} /></div>
            </div>
            <div className="vacancyCard-additionalInfo">
                <div className="vacancyCard-additionalInfo__address"><div className="address-icon"><FlagIcon /></div><div className="address-text">{city}, {country}</div></div>
                <div className="vacancyCard-additionalInfo__date">{moment(date).fromNow()}</div>
            </div>
            <div className="vacancyCard-description">{description}</div>
            <div className="vacancyCard-footer">
                <div className="vacancyCard-footer__company">{company}</div>
                <div className="vacancyCard-footer__rate">{rate}</div>
            </div>
        </div>
    )
}

export default React.memo(VacancyCard)