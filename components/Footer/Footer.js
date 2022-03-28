import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'
import LogoImg from '../../assets/img/logo.svg'
import { useWindowDimensions } from '../Hooks/useWindowDimensions'

import InstagramIcon from '../../assets/img/instagram.svg'
import TwitterIcon from '../../assets/img/twitter.svg'
import FacebookIcon from '../../assets/img/facebook.svg'
import LinkedInIcon from '../../assets/img/linkedIn.svg'

export default function Footer({ variant }) {
    const isMobile = useWindowDimensions().width <= 425

    switch (variant) {
        default:
            return (
                <footer className='footer' role="contentinfo">
                    <Row style={isMobile ? {
                        textAlign: 'center',
                        width: '90%',
                        margin: '0 auto'
                    } : {}}>
                        <Col>
                            <Row className=' footer__col-head'>
                                <span>Physibuzz</span>
                            </Row>
                            <Row >
                                <Link href="/">Why Physibuzz</Link>
                            </Row>
                            <Row >
                                <Link href="/">Post a Job</Link>
                            </Row>
                            <Row >
                                <Link href="/"> Post a Course</Link>
                            </Row>
                            <Row >
                                <Link href="/">Contact</Link>
                            </Row>
                        </Col>
                        <Col>
                            <Row className=' footer__col-head'>
                                <span> Legal</span>
                            </Row>
                            <Row>
                                <Link href="/">Term & Conditions</Link>
                            </Row>
                            <Row>
                                <Link href="/">Privacy Policy</Link>
                            </Row>

                        </Col>
                        {isMobile && (
                            <div style={{
                                width: '100%',
                            }}></div>
                        )}
                        <Col style={isMobile ? {
                            marginTop: '20px'
                        } : {}}>
                            <Row className='footer__col-head'>
                                <span>Follow Us</span>
                            </Row>

                            <Row className='social-links'>
                                <a href='/'><TwitterIcon height={24} /> </a>
                                <a href='/'><FacebookIcon height={24} /> </a>
                                <a href='/'><LinkedInIcon height={24} /> </a>
                                <a href='/'><InstagramIcon height={24} /> </a>
                            </Row>

                        </Col>
                        {isMobile && (
                            <div style={{
                                width: '100%',
                            }}></div>
                        )}
                        <Col>
                            <Row className='footer__col-logo'>
                                <Link href="/">
                                    <span>
                                        <LogoImg height={64} />

                                        <span className='logo-text'>Physibuzz</span>
                                    </span>
                                </Link>
                            </Row>
                            <Row>
                                <span className='copyright'>Copyright 2020 Physibuzz Jobs Limited.</span>
                            </Row>
                        </Col>
                    </Row >
                </footer >
            )
    }

}
