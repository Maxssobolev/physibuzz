import React from "react"
import Link from "next/link"
import moment from 'moment'
import { getCountryFlag } from "../../CommonUtils/getCountryFlag"
import Like from "../../Like/Like"

function VacancyCard({ info, type, userId }) {
    //i know these fields from data base 
    const {
        id,
        title,
        description,
        updated_at,
        user,
        city,
        address,
        wishlist,
        country,
        currency,
        annual_max_pay, //yearly rate
        annual_min_pay, //yearly rate
        hourly_max_pay, //hourly rate
        hourly_min_pay  //hourly rate

    } = info
    const { FlagComponent } = getCountryFlag(country)
    const isLiked = wishlist.find(({ user_id }) => user_id == userId) ? true : false

    return (
        <div className="vacancyCard">
            <div className="vacancyCard-head">
                <div className="vacancyCard-head__title"><Link href={{
                    pathname: `/view/vacancy/${encodeURIComponent(id)}`,

                }}
                >
                    {title}
                </Link>
                </div>
                <div className="vacancyCard-head__like"><Like __id={id} type={type} __isLiked={isLiked} /></div>
            </div>
            <div className="vacancyCard-additionalInfo">
                <div className="vacancyCard-additionalInfo__address"><div className="address-icon"><FlagComponent /></div><div className="address-text">{city}</div></div>
                <div className="vacancyCard-additionalInfo__date">{moment(updated_at).fromNow()}</div>
            </div>
            <div className="vacancyCard-description">{description}</div>
            <div className="vacancyCard-footer">
                <div className="vacancyCard-footer__company">{user.company}</div>
                <div className="vacancyCard-footer__rate">{currency.symbol}{hourly_min_pay} ~ {currency.symbol}{hourly_max_pay}/hr | {currency.symbol}{annual_min_pay} ~ {currency.symbol}{annual_max_pay}/yr</div>
            </div>
        </div>
    )
}

export default React.memo(VacancyCard)