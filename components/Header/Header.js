import Link from 'next/link'
import { useSelector } from 'react-redux'
import { DEFAULT_HEADER, LOGGEDIN_HEADER } from './HeadersVariants'

export default function Header({ variant }) {

    switch (variant) {
        case LOGGEDIN_HEADER:
            const user = useSelector(state => state.user)
            return (
                <header data-variant='loggedIn'>
                    <nav className="header">
                        <div className="header-leftside">
                            <div className="header-leftside__logo">
                                <Link href='/'>
                                    <span>
                                        <img src="" alt="" />
                                    </span>
                                </Link>
                            </div>
                            <div className="header-leftside__menu-item"><Link href='/' >Jobs</Link></div>
                            <div className="header-leftside__menu-item"><Link href='/' >Favorites</Link></div>
                            <div className="header-leftside__menu-item"><Link href='/' >Applied</Link></div>

                        </div>
                        <div className="header-rightside">
                            <div className="header-rightside__user"><span>{user.name}</span></div>
                        </div>
                    </nav>
                </header>

            )
        default:
            return (
                <header data-variant='default'>
                    <nav className="header">
                        <div className="header__logo">
                            <Link href='/'>
                                <span>
                                    <img src="" alt="" />
                                    Physibuzz
                                </span>
                            </Link>
                        </div>
                        <div className="header__menu">
                            <div className="header__menu-item"><Link href='/' >Why Physibuzz?</Link></div>
                            <div className="header__menu-item"><Link href='/' >Post Jobs</Link></div>
                            <div className="header__menu-item"><Link href='/' >Post Course</Link></div>
                            <div className="header__menu-item"><Link href='/' >Contact</Link></div>
                            <div className="header__menu-item header__menu-item_btn"><Link href='/' >Sign In</Link></div>
                        </div>
                    </nav>
                </header>

            )
    }

}