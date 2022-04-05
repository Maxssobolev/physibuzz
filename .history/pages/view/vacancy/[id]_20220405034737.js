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
import ReadMore from '../../../components/ReadMore/ReadMore'
import api from '../../../apiConfig'
import useStorage from '../../../components/Hooks/useStorage'
import Loader from '../../../components/Loader/Loader'
import Swal from 'sweetalert2'

export default function ViewVacancy() {
    const router = useRouter()
    const { id } = router.query //here id - id of vacancy

    const { getItem, removeItem } = useStorage()
    const type = getItem('userType', 'local')

    const [vacancy, setVacancy] = useState()
    const { FlagComponent } = getCountryFlag()

    const handlerApplyNow = () => {
        api.post(`/api/v1/candidate/add/${id}`).then(r => {
            Swal.fire(
                'Your application has been sent',
                '',
                'success'
            )
        }).catch(err => {
            console.log(err)
            Swal.fire(
                'Oops..',
                `Sorry, something went wrong, please, reload page and try again`,
                'error'
            )
        })
    }


    useEffect(() => {
        if (!router.isReady) return;
        api.get(`/api/v1/vacancies/${id}`).then((r) => {
            const recievedData = r.data.data
            api.get('/api/v1/user/edit/current')
                .then(res => {
                    const userId = res.data.data.id
                    const isLiked = recievedData.wishlist.find(({ user_id }) => user_id == userId) ? true : false

                    api.get(`api/v1/candidate/my/vacancies`).then(resp => {
                        const myApplyed = resp.data.data
                        const isApplyed = myApplyed.find(({ vacancies_id }) => vacancies_id == id) ? true : false
                        setVacancy({
                            title: recievedData.title,
                            country: recievedData.country,
                            date: recievedData.updated_at,
                            description: recievedData.description,
                            company: recievedData.user.company,
                            rate: `${recievedData.currency.symbol}${recievedData.hourly_min_pay} ~ ${recievedData.currency.symbol}${recievedData.hourly_max_pay}/hr | ${recievedData.currency.symbol}${recievedData.annual_min_pay} ~ ${recievedData.currency.symbol}${recievedData.annual_max_pay}/yr`,
                            contactType: 'Full Time', //??
                            location: `${recievedData.city} ${recievedData.address}`,
                            isLiked,
                            isApplyed
                        })
                    })
                })
        })
        api.post(`/api/v1/vacancies/views/add/${id}`).then(r => console.log('you just read this vacancy', r))
    }, [router.isReady])

    if (!vacancy) {
        return <>
            <Header />
            <div className="page page-view page-view_vacancy">
                <Layout>
                    <LeftSidebar />
                    <MainContent>

                        <div className="vacancyCard">
                            <Loader />
                        </div>
                    </MainContent>
                </Layout>
            </div>
        </>
    }
    return (
        <>
            <Header />
            <div className="page page-view page-view_vacancy">
                <Layout>
                    <LeftSidebar />
                    <MainContent>

                        <div className="vacancyCard">
                            <div className="vacancyCard-head">
                                <div className="vacancyCard-head__title">
                                    {vacancy.title}
                                </div>
                                <div className="vacancyCard-head__like"><Like __id={id} type="vacancy" __isLiked={vacancy.isLiked} /></div>
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
                            {type == 'candidate' && !vacancy.isApplyed &&
                                <div className="apply-now">
                                    <button type='button' onClick={handlerApplyNow}>Apply Now</button>
                                </div>
                            }
                        </div>






                    </MainContent>
                    <RightSidebar />
                </Layout>
            </div>
        </>
    )
}