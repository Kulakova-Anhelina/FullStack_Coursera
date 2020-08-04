import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


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
function RenderComments({dish })  {
    if (dish!= null) {
        const comments = dish.comments.map((comment) => {
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
                {comments}
            </div>
        );
    } else {
        return <div></div>;
    }
}
const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
              <RenderDish dish={props.dish}/>
              <RenderComments dish={props.dish}/>
            </div>
        </div>
    );
}

export default DishDetail;