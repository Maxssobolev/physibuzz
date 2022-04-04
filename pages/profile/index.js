import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import LeftSidebar from '../../components/Layout/LeftSidebar/LeftSidebar'
import MainContent from '../../components/Layout/MainContent/MainContent'
import RightSidebar from '../../components/Layout/RightSidebar/RightSidebar'
import Header from '../../components/Header/Header'
import ReadMore from '../../components/ReadMore/ReadMore'
import Link from 'next/link'
import api from '../../apiConfig'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader/Loader'
export default function ViewVacancy() {
    const [user, setUser] = useState(null)
    const router = useRouter()
    const { id } = router.query //here id - id of user

    useEffect(() => {

        if (!router.isReady) return;
        api.get(`/api/v1/user/id/show/${id}`).then((r) => {
            const recievedData = r.data.data
            setUser({
                firstName: recievedData.name,
                lastName: recievedData.last_name,
                email: recievedData.email,
                gender: recievedData.gender,
                yearsOfGraduation: recievedData.years,
                countriesQualified: recievedData.country,
                countryReg: recievedData.country_of_reg,
                addCountryReg: recievedData.country_of_reg_ad || '',
                get name() {
                    return this.firstName + ' ' + this.lastName
                },
                availableFrom: recievedData.available_from,
                profession: recievedData.professions,
                description: recievedData.cover_letter
            })
        })



    }, [router])

    if (!user) {
        return (
            <>
                <Header />
                <div className="page page-profile">
                    <Layout>
                        <LeftSidebar />
                        <MainContent>


                            <div className="profile-wrapper">
                                <div className='flex flex_space-between'>

                                    <Loader />
                                </div>
                            </div>
                        </MainContent>
                        <RightSidebar />
                    </Layout>
                </div>
            </>)
    }
    return (
        <>
            <Header />
            <div className="page page-profile">
                <Layout>
                    <LeftSidebar />
                    <MainContent>


                        <div className="profile-wrapper">
                            <div className='flex flex_space-between'>
                                <div>Profile</div>
                                <div><Link href='/profile/cv'>View CV</Link></div>
                            </div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-info">
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Firts Name</div>
                                    <div className="user-info__item-value">{user.firstName}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Last Name</div>
                                    <div className="user-info__item-value">{user.lastName}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Gender</div>
                                    <div className="user-info__item-value">{user.gender}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Email</div>
                                    <div className="user-info__item-value">{user.email}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Year of Graduation</div>
                                    <div className="user-info__item-value">{user.yearsOfGraduation}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Country where the employee qualified</div>
                                    <div className="user-info__item-value">{user.countriesQualified}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Country registration</div>
                                    <div className="user-info__item-value">{user.countryReg}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Additional country of registration</div>
                                    <div className="user-info__item-value">{user.addCountryReg || '- -'}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Available from</div>
                                    <div className="user-info__item-value">{user.availableFrom}</div>
                                </div>
                                <div className="user-info__item">
                                    <div className="user-info__item-name">Profession</div>
                                    <div className="user-info__item-value">{user.profession.map((itm, index) => <div key={index}>* {itm.title}</div>)}</div>
                                </div>

                            </div>

                            <div className="user-description">
                                <ReadMore content={user.description} />
                            </div>

                        </div>




                    </MainContent>
                    <RightSidebar />
                </Layout>
            </div>
        </>
    )
}







