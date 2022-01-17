import Link from "next/link"
import moment from 'moment'
export default function VacancyCard({ info }) {
    const { id, title, description, date, rate, company, address, isLiked } = info
    return (
        <div className="vacancyCard">
            <div className="vacancyCard-head">
                <div className="vacancyCard-head__title"><Link href={`/view/vacancy/${encodeURIComponent(id)}`}>{title}</Link></div>
                <div className="vacancyCard-head__like">Like</div>
            </div>
            <div className="vacancyCard-additionalInfo">
                <div className="vacancyCard-additionalInfo__address">{address}</div>
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

