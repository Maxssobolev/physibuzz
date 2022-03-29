import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import LeftSidebar from '../../../components/Layout/LeftSidebar/LeftSidebar'
import MainContent from '../../../components/Layout/MainContent/MainContent'
import RightSidebar from '../../../components/Layout/RightSidebar/RightSidebar'
import Like from '../../../components/Like/Like'
import moment from 'moment'
import { getCountryFlag } from '../../../components/CommonUtils/getCountryFlag'
import Header from '../../../components/Header/Header'
import { LOGGEDIN_HEADER } from '../../../components/Header/HeadersVariants'
import ReadMore from '../../../components/ReadMore/ReadMore'
import api from '../../../apiConfig'

export default function ViewVacancy() {
    const router = useRouter()
    const { id } = router.query //here id - id of vacancy


    const [vacancy, setVacancy] = useState({ country: 'US' }) //country just for 'placeholder'
    const { FlagComponent } = getCountryFlag(vacancy.country)

    const handlerApplyNow = () => {
        //?
    }

    useEffect(() => {
        if (!router.isReady) return;
        api.get(`/api/v1/vacancies/${id}`).then((r) => {
            const recievedData = r.data.data
            setVacancy({
                title: recievedData.title,
                country: 'United Kingdom', //temporary
                date: recievedData.updated_at,
                description: recievedData.description,
                company: recievedData.user.company,
                rate: `${recievedData.hourly_min_pay} ~ ${recievedData.hourly_max_pay}/hr | ${recievedData.annual_min_pay} ~ ${recievedData.annual_max_pay}/yr`,
                contactType: 'Full Time', //??
                location: recievedData.address,
                isLiked: false
            })
        })
        //api.post(`/api/v1/vacancies/views/add/${id}`).then(r => console.log('you just read this vacancy', r))


    }, [router.isReady])


    return (
        <>
            <Header variant={LOGGEDIN_HEADER} />
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
                                <div className="vacancyCard-additionalInfo__address"><div className="address-icon"><FlagComponent /></div><div className="address-text">{vacancy.location}</div></div>
                                <div className="vacancyCard-additionalInfo__date">{moment(vacancy.date).fromNow()}</div>
                            </div>
                            <div className="vacancyCard-description"><ReadMore content={vacancy.description} /></div>
                            <div className="vacancyCard-footer">
                                <div className="vacancyCard-footer__item">
                                    <div className="vacancyCard-footer__item-name">Country</div>
                                    <div className="vacancyCard-footer__item-value">{vacancy.country}</div>
                                </div>
                                <div className="vacancyCard-footer__item">
                                    <div className="vacancyCard-footer__item-name">Location</div>
                                    <div className="vacancyCard-footer__item-value">{vacancy.location}</div>
                                </div>
                                <div className="vacancyCard-footer__item">
                                    <div className="vacancyCard-footer__item-name">Company</div>
                                    <div className="vacancyCard-footer__item-value">{vacancy.company}</div>
                                </div>
                                <div className="vacancyCard-footer__item">
                                    <div className="vacancyCard-footer__item-name">Contact Type</div>
                                    <div className="vacancyCard-footer__item-value">{vacancy.contactType}</div>
                                </div>
                                <div className="vacancyCard-footer__item">
                                    <div className="vacancyCard-footer__item-name">Salary Range</div>
                                    <div className="vacancyCard-footer__item-value">{vacancy.rate}</div>
                                </div>
                            </div>
                            <div className="apply-now">
                                <button type='button' onClick={handlerApplyNow}>Apply Now</button>
                            </div>
                        </div>






                    </MainContent>
                    <RightSidebar />
                </Layout>
            </div>
        </>
    )
}