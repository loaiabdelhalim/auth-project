import React, {useEffect} from "react";
import {gql, useMutation} from '@apollo/client';
import ReactHtmlParser from "react-html-parser";
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useSelector} from 'react-redux'
import {appState} from "../../reducers";

export default function Items() {
    const verifyMutation = gql`
          mutation VerifyToken($token: String!) {
            verifyToken(token: $token)
          }
        `;
    const recordsMutation = gql`
          mutation GetAllRecords($token: String!) {
            getAllRecords(token: $token)
          }
        `;
    const addRecordMutation = gql`
          mutation AddRecords($title: String!, $creator: String!) {
            addRecord(title: $title, creator: $creator)
          }
        `;
    const [getAllRecords, {}] = useMutation(recordsMutation);
    const [addRecord, {}] = useMutation(addRecordMutation)
    const [verifyToken, {}] = useMutation(verifyMutation)

    const [currentRecords, setRecords] = React.useState([]);

    const [tableContent, setTableContent] = React.useState('');
    const [newRecordName, setNewRecord] = React.useState('');

    const token = useSelector<appState, appState["token"]>(
        (state) => state.token
    );

    const fetchRecords = async () => getAllRecords({
        variables: {
            token: ''
        }
    })
        .then(({data}) => {
            let records = JSON.parse(data.getAllRecords);
            setRecords(records)
        })
        .catch((e) => {
            console.log(e)
        })

    const addRecordProcess = () => {
        verifyToken({
            variables: {
                token: localStorage.getItem('token')
            }
        }).then(async ({data}) => {
            await addSingleRecord()
        })
            .catch((e) => {
                console.log(e)
                return false;
            })
    }

    const addSingleRecord = () => addRecord({
        variables: {
            title: newRecordName,
            creator: "loai"
        }
    })
        .then(async ({data}) => {
            console.log(data)
            await fetchRecords()
        })
        .catch((e) => {
            console.log(e)
        })

    useEffect(() => {
        setTableContent('');
        let newTableContent = '';
        currentRecords.forEach((record) => {
            // @ts-ignore
            newTableContent += '<tr><td>' + record.title + '</td><td>' + record.createdAt + '</td><td>' + record.creator + '</td></tr>'
        })
        setTableContent(newTableContent)
    }, [currentRecords])

    useEffect(() => {
        if (token) {
            fetchRecords();
        }
    }, [])

    return (
        <Container>
            <Table striped bordered hover size="sm" className="items-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Created at</th>
                    <th>Creator</th>
                </tr>
                </thead>
                <tbody className="records-table">
                {ReactHtmlParser(tableContent)}
                </tbody>
            </Table>

            <Form.Group>
                <Form.Label>Add new record</Form.Label>
                <Form.Control onChange={e => setNewRecord(e.target.value)} type="text" placeholder="New record"/>
            </Form.Group>
            <Button onClick={addRecordProcess} variant="primary" type="button">
                Submit
            </Button>
        </Container>
    )
}
