import Link from 'next/link'
import { useSelector } from 'react-redux'
import { LOGGEDIN_HEADER } from './HeadersVariants'
import LogoImg from '../../assets/img/logo.svg'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Header({ variant }) {
    const router = useRouter()

    switch (variant) {
        case LOGGEDIN_HEADER:
            const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
            const user = useSelector(state => state.user)
            return (
                <header data-variant='loggedIn'>
                    <nav className="header">
                        <div className="header-leftside">
                            <div className="header-leftside__logo">
                                <Link href='/'>
                                    <LogoImg height={38} />
                                </Link>
                            </div>
                            <div className="header-leftside__menu-item"><Link href='/' >Jobs</Link></div>
                            <div className="header-leftside__menu-item"><Link href='/' >Favorites</Link></div>
                            <div className="header-leftside__menu-item"><Link href='/' >Applied</Link></div>

                        </div>
                        <div className="header-rightside">
                            <div className="header-rightside__user user-dropdown" tabIndex={0} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 100)} >
                                <div className="user-dropbtn">{user.name}</div>
                                <div className="user-dropdown-content" style={{
                                    display: isUserMenuOpen ? 'block' : 'none',
                                }} >
                                    <div className='user-dropdown-content_settings'><button type='button' onClick={() => router.push('/settings')}>Settings</button></div>
                                    <div className='user-dropdown-content_logout'><button type='button' onClick={() => router.push('/logout')}>Log Out</button></div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

            )
        default:
            const page = router.pathname
            return (
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
                        <div className="header__menu">
                            <div className="header__menu-item"><Link href='/' >Why Physibuzz?</Link></div>
                            <div className="header__menu-item"><Link href='/' >Post Jobs</Link></div>
                            <div className="header__menu-item"><Link href='/' >Post Course</Link></div>
                            <div className="header__menu-item"><Link href='/' >Contact</Link></div>
                            <div className="header__menu-item header__menu-item_btn"><Link href={page == '/logIn' ? '/signUp' : '/logIn'} >{page == '/logIn' ? 'Sign Up' : 'Log In'}</Link></div>
                        </div>
                    </nav>
                </header>

            )
    }

}