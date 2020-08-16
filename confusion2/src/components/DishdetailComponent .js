import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const ModalExample = () => {

    const [username, setUsername] = useState('')
    const [modal, setModal] = useState(false);
    const [unmountOnClose] = useState(true);

    const toggle = () => setModal(!modal);

    const handleSubmit = (values) => {
        setModal(false);
        alert("Done");


    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);


    return (
        <div>
            <Form>
                <Button color="warning" onClick={toggle}>Send Feedback</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Col md={12}>
                            <Label htmlFor="firstname" >Raiting </Label>
                            </Col>
                            <Col md={10}>
                            <Input type="number" id="quantity" name="quantity" min="1" max="5"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Label htmlFor="firstname" >Your name</Label>
                            </Col>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={10}>
                                <Label htmlFor="username">Comment</Label>
                                <Input type="textarea" placeholder="" rows={5} />
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg
                        width="100%"
                        object
                        src={dish.image}
                        alt={dish.name}
                    />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return <div></div>;
    }
}
function RenderComments({ comments }) {
    if (comments != null) {
        const com = comments.map((comment) => {
            return (
                <div>
                    <ul className="list-unstyled">
                        <li key={comment.id}>
                            <li>{comment.comment}</li>
                            <li>
                                -- {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </li>{' '}
                        </li>
                    </ul>
                </div>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {com}
            </div>
        );
    } else {
        return <div></div>;
    }
}
const DishDetail = (props) => {


    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => setModal(!modal);
    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-12 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-6 col-md-12 m-1">
                    <RenderComments comments={props.comments} />
                </div>
                <div className="col-12 col-md-12 m-1">
                    <ModalExample />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;