import React from "react";
import {gql, useMutation} from '@apollo/client';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useDispatch} from 'react-redux'
import {setToken} from '../../actions/index'

export default function Register(props) {
    const dispatch = useDispatch();
    const REGISTER = gql`
          mutation Register($login: String!, $password: String!, $email: String!) {
            register(login:$login,password:$password, email: $email)
          }
        `;
    const [register, {}] = useMutation(REGISTER);
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleRegister = () => register({
        variables: {
            login: userName,
            password: password,
            email: email
        }
    })
        .then(({data}) => {
            console.log(data)
            dispatch(setToken(data.login));
            localStorage.setItem('token', data.login)
            window.location.href = ''
        })
        .catch((e) => {
            console.log(e)
        })

    return (
        <Container>
            <h6>Register: </h6>
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter username"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
                </Form.Group>
                <Button onClick={handleRegister} variant="primary" type="button">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
