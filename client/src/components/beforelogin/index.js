import React from 'react'
import HeaderBeforeLogin from './HeaderBeforeLogin'
import Chart from './Chart'
import { Container, Row, Col } from 'react-bootstrap'

export default function HomeBeforLogin() {
    return (
        <section>
            <HeaderBeforeLogin />
            <Chart />
            <Container>
                <h2 className="text-center" mt={2}>You Controll Your Economic Futute</h2>
                <Row>
                    <Col>
                        <img alt="no content" width="300" height="200" src="https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649__340.jpg" />
                    </Col>
                    <Col className="align-center">
                        <p>
                            We at <i>W</i>ise<i>E</i>conomy believe that <br />
                            you are the responsible for your economic destination<br />
                            <b>No Mather what is your purpose it is Reachable</b>
                        </p>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <img alt="no content" width="300" height="200" src="https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649__340.jpg" />
                    </Col>
                    <Col><h3>Track Price</h3>
                        <p>
                            <b><i>W</i>ise<i>E</i>conomy</b> offers you to buy what you need<br />
                            in the price you want. <br />
                            we track the product price and update you when it get to the desired price.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <img alt="no content" width="300" height="200" src="https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649__340.jpg" />
                    </Col>
                    <Col>
                        <h4>Mannage Your Badget</h4>
                        <p>
                            Track after you Incomes and Expenses and see how you doing compare to your country <br />
                        </p>
                    </Col>
                </Row>
                <div className="worldMapd3">
                    here goes the world map
                </div>
            </Container>

        </section>
    )
}
