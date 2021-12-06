import { useState } from 'react';

import Switch from 'react-switch';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from 'react-icons/fa';

import profileAvatar from '../../../assets/user_w.png';

const StudioProfile = () => {
    const [mondayChecked, setMondayChecked] = useState(false);
    const [tuesdayChecked, setTuesdayChecked] = useState(false);
    const [wednesdayChecked, setWednesdayChecked] = useState(false);
    const [thrusdayChecked, setThrusdayChecked] = useState(false);
    const [fridayChecked, setFridayChecked] = useState(false);
    const [saturdayChecked, setSaturdayChecked] = useState(false);
    const [sundayChecked, setSundayChecked] = useState(false);

    return (
        <Container>
            <Form>
                <div className="d-flex justify-content-between solid-bottom-border-secondary mt-5">
                    <div>
                        <h1>Studio</h1>
                    </div>
                    <div>
                        <Button variant="secondary" className="px-3 mx-2">
                            Cancel
                        </Button>
                        <Button variant="success" className="px-3 mx-2">
                            Save
                        </Button>
                    </div>
                </div>
                <Image src={profileAvatar} className="profile-picture my-4" roundedCircle />
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioName">
                            <Form.Label className="font-75">Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioEmail">
                            <Form.Label className="font-75">Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioWebsite">
                            <Form.Label className="font-75">Website</Form.Label>
                            <Form.Control type="text" placeholder="example.com" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioPhone">
                            <Form.Label className="font-75">Phone</Form.Label>
                            <Form.Control type="tel" placeholder="Phone number" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formStudioFacebook">
                            <Form.Label className="font-75">Facebook</Form.Label>
                            <Form.Control type="text" placeholder="Facebook" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStudioInstagram">
                            <Form.Label className="font-75">Instagram</Form.Label>
                            <Form.Control type="tel" placeholder="Instagram" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formStudioLocation">
                        <Form.Label className="font-75">Location</Form.Label>
                        <Form.Control type="text" placeholder="Where it is?" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formStudioAbout">
                        <Form.Label className="font-75">About</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Row>
                <div className="d-flex solid-bottom-border-secondary mt-5 mb-3">
                    <h3>Business hours</h3>
                </div>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Monday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={mondayChecked} onChange={() => setMondayChecked(!mondayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { mondayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="mondayOpen" className="m-1" />
                                <Form.Control type="time" name="mondayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Tuesday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={tuesdayChecked} onChange={() => setTuesdayChecked(!tuesdayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { tuesdayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="tuesdayOpen" className="m-1" />
                                <Form.Control type="time" name="tuesdayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Wednesday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={wednesdayChecked} onChange={() => setWednesdayChecked(!wednesdayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { wednesdayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="wednesdayOpen" className="m-1" />
                                <Form.Control type="time" name="wednesdayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Thursday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={thrusdayChecked} onChange={() => setThrusdayChecked(!thrusdayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { thrusdayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="thrusdayOpen" className="m-1" />
                                <Form.Control type="time" name="thrusdayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Friday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={fridayChecked} onChange={() => setFridayChecked(!fridayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { fridayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="fridayOpen" className="m-1" />
                                <Form.Control type="time" name="fridayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Saturday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={saturdayChecked} onChange={() => setSaturdayChecked(!saturdayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { saturdayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="saturdayOpen" className="m-1" />
                                <Form.Control type="time" name="saturdayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start font-75">Sunday</Col>
                    <Col xs lg="2" className="form-check form-switch">
                        <Switch checked={sundayChecked} onChange={() => setSundayChecked(!sundayChecked)} />
                    </Col>
                    <Col md="auto" className="d-flex justify-content-end font-75">
                        { sundayChecked ? (
                            <div className="d-flex">
                                <Form.Control type="time" name="sundayOpen" className="m-1" />
                                <Form.Control type="time" name="sundayClose" className="m-1" />
                            </div>
                        ) : <span className="ms-5 ps-5">Closed</span> }
                    </Col>
                </Row>
                <hr className="mt-3"/>

                <h3 className="d-flex">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-3 mb-5">
                    <FaTrashAlt size={19} />
                    <span className="ps-2">Delete my account</span>
                </Button>
            </Form>
        </Container>
    );
}

export default StudioProfile;