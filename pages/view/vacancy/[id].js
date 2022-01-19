import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import LeftSidebar from '../../../components/Layout/LeftSidebar/LeftSidebar'
import MainContent from '../../../components/Layout/MainContent/MainContent'
import RightSidebar from '../../../components/Layout/RightSidebar/RightSidebar'
import Like from '../../../components/Like/Like'
import moment from 'moment'
import { getCountryFlag } from '../../../components/CommonUtils/getCountryFlag'
export default function ViewVacancy() {
    const router = useRouter()
    const { id } = router.query //here id - id of vacancy, ccode - country code 



    const [vacancy, setVacancy] = useState({ country: 'US' }) //country just for 'placeholder'
    const { FlagComponent } = getCountryFlag(vacancy.country)
    useEffect(() => {

        setVacancy({
            title: 'Physiotherapist MSK Full Time',
            country: 'England',
            city: 'London',
            date: '2022-01-15T17:00:00',
            description: 'We are loking for a full time MSK physiotherapist to work at 2 of our sires.We have an excellent canseload of sports, private medical insurance and self pay patients.',
            company: 'PhysioQinetics',
            rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
            isLiked: false
        })


    }, [])


    return (
        <div className="page page-view page-view_vacancy">
            <Layout>
                <LeftSidebar />
                <MainContent>

                    <div className="vacancyCard">
                        <div className="vacancyCard-head">
                            <div className="vacancyCard-head__title">
                                {vacancy.title}
                            </div>
                            <div className="vacancyCard-head__like"><Like __id={id} __isLiked={vacancy.isLiked} /></div>
                        </div>
                        <div className="vacancyCard-additionalInfo">
                            <div className="vacancyCard-additionalInfo__address"><div className="address-icon"><FlagComponent /></div><div className="address-text">{vacancy.city}, {vacancy.country}</div></div>
                            <div className="vacancyCard-additionalInfo__date">{moment(vacancy.date).fromNow()}</div>
                        </div>
                        <div className="vacancyCard-description">{vacancy.description}</div>
                        <div className="vacancyCard-footer">
                            <div className="vacancyCard-footer__company">{vacancy.company}</div>
                            <div className="vacancyCard-footer__rate">{vacancy.rate}</div>
                        </div>
                    </div>

                </MainContent>
                <RightSidebar />
            </Layout>
        </div>
    )
}