import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetPassword, resetState } from '../../actions/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import { FaCheckSquare, FaExclamationTriangle } from 'react-icons/fa';

const ResetPassword = ({ auth: { passwordChanged, message, error }, resetPassword, resetState, history }) => {
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localMessage, setLocalMessage] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    useEffect(() => {
        if (message && (localMessage !== message)) {
            setLocalMessage(message);
        }
    }, [passwordChanged, message, localMessage]);

    const handleSubmit = event => {
        event.preventDefault();

        if (!validate()) {
            event.stopPropagation();
            return;
        }
        resetPassword(id, token, password);
    }

    const validate = () => {
        if (password !== confirmPassword) {
            setIsPasswordInvalid(true);
            setLocalMessage(`Passwords don't match.`);
            return false;
        }
        return true;
    }

    const handleLinkClick = () => {
        resetState();
        history.push('/forgot-password');
    }

    return (
        <Container>
            <div className="d-flex solid-bottom-border-secondary mb-5">
                <h1>Reset password</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                {
                    localMessage && (
                        <Alert variant={ passwordChanged && !isPasswordInvalid ? 'success' : 'danger' } className="mx-3">
                            { passwordChanged && !isPasswordInvalid ? <FaCheckSquare /> : <FaExclamationTriangle /> }
                            <span className="font-80 ms-3">{localMessage}</span>
                        </Alert>
                    )
                }
                <Form.Group controlId="password" className="m-3">
                    <Form.Label className="font-75">New password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        minLength={7}
                        className="text-center"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={isPasswordInvalid}
                    />
                </Form.Group>
                <Form.Group controlId="confirmpassword" className="m-3">
                    <Form.Label className="font-75">Confirm password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        minLength={7}
                        className="text-center"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        isInvalid={isPasswordInvalid}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" size="lg" className="mt-4">
                    Reset password
                </Button>
                {
                    error && (
                        <Row>
                            <span className="font-65 text-secondary clickable mt-4" onClick={handleLinkClick}>
                                Request a new link here
                            </span>
                        </Row>
                    )
                }
            </Form>
        </Container>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resetPassword, resetState })(withRouter(ResetPassword));