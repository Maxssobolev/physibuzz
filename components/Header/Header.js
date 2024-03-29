import Link from 'next/link'
import { LOGGEDIN_EMPLOYEE, LOGGEDIN_EMPLOYER } from './HeadersVariants'
import LogoImg from '../../assets/img/logo.svg'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWindowDimensions } from '../Hooks/useWindowDimensions'
import BurgerIcon from '../../assets/img/burger.svg'
import MobileMenu from '../MobileMenu/MobileMenu'
import HeaderPlaceholder from './HeaderPlaceholder'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../redux/types'
import { cookies } from '../../pages/_app'
import useStorage from '../Hooks/useStorage'


export default function Header() {
    const dispatch = useDispatch()
    const { getItem, removeItem } = useStorage()


    const type = getItem('userType', 'local')
    const userName = getItem('userName', 'local')

    const router = useRouter()

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    //mobile definition
    const isMobile = useWindowDimensions().width <= 425

    //logout func
    const clearAllBeforeLogout = () => {

        removeItem('userToken', 'local')
        removeItem('userName', 'local')
        removeItem('userType', 'local')
        cookies.remove('userToken')
        cookies.remove('userName')
        cookies.remove('userType')
        dispatch({ type: LOGOUT })
    }

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [type])

    if (mounted)
        switch (type) {
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
                                                <div className="user-dropbtn">{userName}</div>
                                                <div className="user-dropdown-content" style={{
                                                    display: isUserMenuOpen ? 'block' : 'none',
                                                }} >
                                                    <div className='user-dropdown-content_settings'><button type='button' onClick={() => router.push('/settings')}>Settings</button></div>
                                                    <div className='user-dropdown-content_logout'><button type='button' onClick={() => {

                                                        clearAllBeforeLogout()
                                                        router.push('/logIn')

                                                    }}>Log Out</button></div>
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
                                                    <div className="user-dropbtn">{userName}</div>
                                                    <div className="user-dropdown-content" style={{
                                                        display: isUserMenuOpen ? 'block' : 'none',
                                                    }} >
                                                        <div className='user-dropdown-content_settings'><button type='button' onClick={() => router.push('/settings')}>Settings</button></div>
                                                        <div className='user-dropdown-content_logout'><button type='button' onClick={() => {

                                                            clearAllBeforeLogout()
                                                            router.push('/logIn')

                                                        }}>Log Out</button></div>
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
    else
        return <HeaderPlaceholder />
}