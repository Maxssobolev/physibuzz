import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'
export default function Footer({ variant }) {

    switch (variant) {
        default:
            return (
                <footer className='footer' role="contentinfo">
                    <Row>
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

                        <Col >
                            <Row className=' footer__col-head'>
                                <span>Follow Us</span>
                            </Row>

                            <Row>
                                {/* SOCIAL LINKS */}
                            </Row>

                        </Col>

                        <Col>
                            <Row className='footer__col-logo'>
                                <Link href="/">
                                    <span>
                                        <img src="" alt="" />
                                        Physibuzz
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
