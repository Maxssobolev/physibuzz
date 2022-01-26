import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { LOGGEDIN_EMPLOYEE, LOGGEDIN_EMPLOYER } from '../Header/HeadersVariants';
import { useState } from 'react';

export default function MobileMenu({ isMenuOpen, variant }) {
  const user = useSelector(state => state.user)
  const router = useRouter()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  switch (variant) {
    case LOGGEDIN_EMPLOYEE:
      return (
        <div className={`mobile-menu ${isMenuOpen ? 'opened' : ''}`}>
          <div className='mobile-menu__wrapper'>
            <div className="header-leftside__menu-item"><Link href='/' >Jobs</Link></div>
            <div className="header-leftside__menu-item"><Link href='/' >Favorites</Link></div>
            <div className="header-leftside__menu-item"><Link href='/' >Applied</Link></div>
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
        </div>
      )
    case LOGGEDIN_EMPLOYER:
      return (
        <div className={`mobile-menu ${isMenuOpen ? 'opened' : ''}`}>
          <div className='mobile-menu__wrapper'>
            <div className="header-leftside__menu-item"><Link href='/employer/jobs' >Jobs</Link></div>
            <div className="header-leftside__menu-item"><Link href='/employer/candidate' >Candidate</Link></div>
            <div className="header-rightside__buttons">
              <div className="postJob"><Link href='/employer/postJob'>Post Job</Link></div>
              <div className="postCourse"><Link href='/employer/postCourse'>Post Course</Link></div>
            </div>
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
        </div>
      )
    default:
      const page = router.pathname
      return (
        <div className={`mobile-menu ${isMenuOpen ? 'opened' : ''}`}>
          <div className='mobile-menu__wrapper'>
            <div className="header__menu-item"><Link href='/' >Why Physibuzz?</Link></div>
            <div className="header__menu-item"><Link href='/' >Post Jobs</Link></div>
            <div className="header__menu-item"><Link href='/' >Post Course</Link></div>
            <div className="header__menu-item"><Link href='/' >Contact</Link></div>
            <div className="header__menu-item header__menu-item_btn"><Link href={page == '/logIn' ? '/signUp' : '/logIn'} >{page == '/logIn' ? 'Sign Up' : 'Log In'}</Link></div>
          </div>
        </div>
      )
  }

}