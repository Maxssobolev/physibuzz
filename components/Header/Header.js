import Link from 'next/link'
import { LOGGEDIN_EMPLOYEE, LOGGEDIN_EMPLOYER } from './HeadersVariants'
import LogoImg from '../../assets/img/logo.svg'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWindowDimensions } from '../CommonUtils/useWindowDimensions'
import BurgerIcon from '../../assets/img/burger.svg'
import MobileMenu from '../MobileMenu/MobileMenu'
import { cookies } from '../../pages/_app'
import api from '../../apiConfig'
import HeaderPlaceholder from './HeaderPlaceholder'
import { handleUpdateUserState } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
    const ISSERVER = typeof window === "undefined";
    let token = ''
    if (!ISSERVER) {
        token = localStorage.getItem('userToken') || cookies.get('userToken')
    }

    const dispatch = useDispatch()
    const userFromRedux = useSelector(state => state.user)

    const router = useRouter()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    //mobile definition
    const [isMobile, setIsMobile] = useState(undefined)
    const { width, height } = useWindowDimensions()
    useEffect(() => {
        setIsMobile(width <= 425)
    }, [width])

    useEffect(() => {
        if (!userFromRedux.type)
            api.get('/api/v1/user/edit/current') //why edit?? idfk, but it is. |||=> return all user info
                .then(r => {
                    dispatch(handleUpdateUserState(r.data.data))
                })
                .catch(err => {
                    router.push('/logIn')
                })
    }, [])

    if (!userFromRedux.type && token) {
        return <HeaderPlaceholder />
    }
    else

        switch (userFromRedux.type) {
            case LOGGEDIN_EMPLOYEE:
                return (
                    <>
                        <header data-variant='loggedIn_EMPLOYEE'>
                            <nav className="header">
                                <div className="header-leftside">
                                    <div className="header-leftside__logo">
                                        <Link href='/'>
                                            {isMobile ? (
                                                <span>
                                                    <LogoImg height={38} />

                                                    Physibuzz
                                                </span>
                                            ) :
                                                (
                                                    <LogoImg height={38} />
                                                )}
                                        </Link>
                                    </div>
                                    {!isMobile && (
                                        <>
                                            <div className="header-leftside__menu-item"><Link href='/' >Jobs</Link></div>
                                            <div className="header-leftside__menu-item"><Link href='/' >Favorites</Link></div>
                                            <div className="header-leftside__menu-item"><Link href='/' >Applied</Link></div>
                                        </>
                                    )}

                                </div>
                                <div className="header-rightside">
                                    {isMobile ? (
                                        <div className="burger">
                                            <button type='button' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                                <BurgerIcon width={40} />
                                            </button>
                                        </div>
                                    )
                                        :
                                        (
                                            <div className="header-rightside__user user-dropdown" tabIndex={0} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 100)} >
                                                <div className="user-dropbtn">{user.name}</div>
                                                <div className="user-dropdown-content" style={{
                                                    display: isUserMenuOpen ? 'block' : 'none',
                                                }} >
                                                    <div className='user-dropdown-content_settings'><button type='button' onClick={() => router.push('/settings')}>Settings</button></div>
                                                    <div className='user-dropdown-content_logout'><button type='button' onClick={() => router.push('/logout')}>Log Out</button></div>
                                                </div>
                                            </div>
                                        )}

                                </div>
                            </nav>
                        </header>
                        <MobileMenu isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} variant={LOGGEDIN_EMPLOYEE} />

                    </>

                )

            case LOGGEDIN_EMPLOYER:

                return (
                    <>
                        <header data-variant='loggedIn_EMPLOYER'>
                            <nav className="header">
                                <div className="header-leftside">
                                    <div className="header-leftside__logo">
                                        <Link href='/'>
                                            {isMobile ? (
                                                <span>
                                                    <LogoImg height={38} />

                                                    Physibuzz
                                                </span>
                                            ) :
                                                (
                                                    <LogoImg height={38} />
                                                )}
                                        </Link>
                                    </div>
                                    {!isMobile && (
                                        <>
                                            <div className="header-leftside__menu-item"><Link href='/employer/jobs' >Jobs</Link></div>
                                            <div className="header-leftside__menu-item"><Link href='/employer/candidate' >Candidate</Link></div>
                                        </>
                                    )}

                                </div>
                                <div className="header-rightside">
                                    {isMobile ? (
                                        <div className="burger">
                                            <button type='button' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                                <BurgerIcon width={40} />
                                            </button>
                                        </div>
                                    )
                                        :
                                        (
                                            <>
                                                <div className="header-rightside__buttons">
                                                    <div className="postJob"><Link href='/employer/postJob'>Post Job</Link></div>
                                                    <div className="postCourse"><Link href='/employer/postCourse'>Post Course</Link></div>

                                                </div>
                                                <div className="header-rightside__user user-dropdown" tabIndex={0} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 100)} >
                                                    <div className="user-dropbtn">{userFromRedux.data.name}</div>
                                                    <div className="user-dropdown-content" style={{
                                                        display: isUserMenuOpen ? 'block' : 'none',
                                                    }} >
                                                        <div className='user-dropdown-content_settings'><button type='button' onClick={() => router.push('/settings')}>Settings</button></div>
                                                        <div className='user-dropdown-content_logout'><button type='button' onClick={() => router.push('/logout')}>Log Out</button></div>
                                                    </div>
                                                </div>
                                            </>

                                        )}

                                </div>
                            </nav>
                        </header>
                        <MobileMenu isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} variant={LOGGEDIN_EMPLOYER} />

                    </>

                )

            default:
                const page = router.pathname
                return (
                    <>
                        <header data-variant='default'>
                            <nav className="header">
                                <div className="header__logo">
                                    <Link href='/'>
                                        <span>
                                            <LogoImg height={38} />

                                            Physibuzz
                                        </span>
                                    </Link>
                                </div>
                                {isMobile ?
                                    (
                                        <div className='header__menu'>
                                            <div className="burger">
                                                <button type='button' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                                    <BurgerIcon width={40} />
                                                </button>
                                            </div>
                                        </div>
                                    )

                                    : (
                                        <div className="header__menu">
                                            <div className="header__menu-item"><Link href='/whyPhysibuzz' >Why Physibuzz?</Link></div>
                                            <div className="header__menu-item"><Link href='/' >Post Jobs</Link></div>
                                            <div className="header__menu-item"><Link href='/' >Post Course</Link></div>
                                            <div className="header__menu-item"><Link href='/' >Contact</Link></div>
                                            <div className="header__menu-item header__menu-item_btn"><Link href={page == '/logIn' ? '/signUp' : '/logIn'} >{page == '/logIn' ? 'Sign Up' : 'Log In'}</Link></div>
                                        </div >
                                    )
                                }


                            </nav >
                        </header >
                        <MobileMenu isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} variant='default' />
                    </>

                )
        }

}