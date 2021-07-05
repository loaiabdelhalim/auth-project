import React from "react";
import {gql, useMutation} from '@apollo/client';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch} from 'react-redux'
import {setToken} from '../../actions/index'

export default function Login(props) {
    const dispatch = useDispatch();
    const LOGIN = gql`
          mutation Login($login: String!, $password: String!) {
            login(login:$login,password:$password)
          }
        `;
    const [login, {}] = useMutation(LOGIN);
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleLogin = () => login({
        variables: {
            login: userName,
            password: password
        }
    })
        .then(({data}) => {
            console.log(data)
            if (data.login) {
                localStorage.setItem('token', data.login)
                dispatch(setToken(data.login));
                window.location.href = ''
            }
        })
        .catch((e) => {
            console.log(e)
        })


    return (
        <>
            <Container>
                <h6>Login: </h6>
                <Form>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control onChange={e => setUsername(e.target.value)} type="text"
                                      placeholder="Enter username"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)} type="password"
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button onClick={handleLogin} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )


}
