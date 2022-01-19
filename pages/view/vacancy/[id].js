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

export default function ViewVacancy() {
    const router = useRouter()
    const { id } = router.query //here id - id of vacancy, ccode - country code 



    const [vacancy, setVacancy] = useState({ country: 'US' }) //country just for 'placeholder'
    const { FlagComponent } = getCountryFlag(vacancy.country)

    const handlerApplyNow = () => {
        //?
    }

    useEffect(() => {

        setVacancy({
            title: 'Physiotherapist MSK Full Time',
            country: 'United Kingdom',
            date: '2022-01-15T17:00:00',
            description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aut vel rerum expedita a soluta, alias nisi nam ea nihil ab quam perferendis atque. Vel, eos, voluptatem alias magnam molestias vero hic aliquid eligendi, ipsum cupiditate saepe iure sunt ea ratione. Vitae ipsum asperiores tenetur aperiam ducimus illum, iure voluptatum natus ut voluptas amet reiciendis odio debitis quas recusandae, dignissimos eaque animi ratione dolorum assumenda laboriosam modi eius aliquam? Debitis tempore perferendis enim cupiditate provident ab ad maiores ullam suscipit, unde asperiores, rerum explicabo pariatur sunt itaque temporibus non modi sequi hic dolorem, reprehenderit autem! A aut aliquam autem! Nobis culpa quas eum! Officia fugit consequatur voluptates nemo mollitia sed libero laboriosam! Accusantium commodi omnis maxime repellendus mollitia officiis aliquid nostrum quasi esse, harum facilis ipsa magni dolores, illo blanditiis fugiat repellat, nobis eligendi? Officia expedita dolores illo consequuntur error possimus magnam quo? Ab, officiis ratione. Non ex doloribus nobis iste nemo atque at itaque iusto aliquid amet? Fugiat officiis non unde aliquam quia dicta nostrum numquam. Possimus harum obcaecati ratione vero recusandae! Repellendus voluptatum velit harum aliquam sit rem corrupti nulla fugit deserunt dignissimos, dolor nobis modi. Officia consectetur eaque nobis vero a quas, pariatur sequi expedita ipsa ducimus `,
            company: 'PhysioQinetics',
            rate: '$30 ~ $42/hr | $25000 ~ $30000/yr',
            contactType: 'Full Time',
            location: 'London, England',
            isLiked: false
        })


    }, [])


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