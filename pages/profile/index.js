import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import LeftSidebar from '../../components/Layout/LeftSidebar/LeftSidebar'
import MainContent from '../../components/Layout/MainContent/MainContent'
import RightSidebar from '../../components/Layout/RightSidebar/RightSidebar'
import Header from '../../components/Header/Header'
import { LOGGEDIN_EMPLOYEE } from '../../components/Header/HeadersVariants'
import ReadMore from '../../components/ReadMore/ReadMore'
import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'

export default function ViewVacancy() {
    const [user, setUser] = useState({})

    useEffect(() => {

        setUser({
            firstName: 'Jon',
            lastName: 'Walton',
            email: 'JW@gmail.com',
            gender: 'Male',
            yearsOfGraduation: 2005,
            countriesQualified: '',
            countryReg: 'United Kingdom',
            addCountryReg: '',
            get name() {
                return this.firstName + ' ' + this.lastName
            },
            availableFrom: '08/12/20',
            profession: '* Physiotherapy / Physical Therapy* Osteopathy',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt, sapiente odio, sit rerum molestias, ipsum consectetur perspiciatis laborum sint beatae blanditiis quibusdam ea quae eaque ex esse voluptatum totam quisquam! Alias omnis, debitis iure numquam pariatur laboriosam ad accusamus! Veniam dicta aspernatur eligendi maiores, tenetur cumque, velit quasi optio quidem reiciendis voluptatibus aliquam numquam rem sapiente, earum explicabo maxime dignissimos nostrum odit eos inventore veritatis id? Iure fuga aspernatur repudiandae officiis, rerum nostrum eos necessitatibus natus vel odio dignissimos itaque, rem quod quos eligendi tenetur labore asperiores veniam ullam. Quidem, expedita. Similique veritatis ex nemo nostrum numquam corrupti velit asperiores, dolorum minus ut quasi laboriosam odit harum at illo aut quidem. Aperiam, iure earum consequatur assumenda tempore quibusdam dolores rem in ducimus nemo dolore ab officiis eaque voluptatibus eius aliquid dolorem numquam autem. Error, non! Aspernatur cumque deserunt voluptas alias reprehenderit facere laudantium quasi numquam corrupti quaerat a dolores at saepe debitis, adipisci dolorem praesentium harum blanditiis nesciunt fuga ea veritatis nihil. Eius eveniet a quis dolore recusandae, reiciendis voluptates maxime, consequatur laborum ab eos laboriosam odio perspiciatis quidem minima. Eveniet, ipsa error. Soluta, deleniti. Repudiandae harum facere incidunt necessitatibus fugiat voluptatibus nemo! Velit at vel ipsa magnam est?`
        })



    }, [])


    return (
        <>
            <Header variant={LOGGEDIN_EMPLOYEE} />
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
                                    <div className="user-info__item-value">{user.profession}</div>
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







