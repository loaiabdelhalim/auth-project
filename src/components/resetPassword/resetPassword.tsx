import React from "react";
import {gql, useMutation} from '@apollo/client';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ResetPassword() {
    const RESETPASSWORD = gql`
          mutation ResetPassword($email: String!) {
            resetPassword(email:$email)
          }
        `;
    const [resetPassword, {}] = useMutation(RESETPASSWORD);
    const [email, setEmail] = React.useState('');

    const handleReset = () => resetPassword({
        variables: {
            email: email,
        }
    })
        .then(({data}) => {
            console.log(data)
        })
        .catch((e) => {
            console.log(e)
        })

    return (
        <>
            <Container>
                <h6>Reset Password: </h6>
                <Form>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={handleReset} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}
