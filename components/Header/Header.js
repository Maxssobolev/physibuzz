import Link from 'next/link'
import { DEFAULT_HEADER } from './HeadersVariants'

export default function Header({ variant }) {

    switch (variant) {
        default:
            return (
                <header>
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