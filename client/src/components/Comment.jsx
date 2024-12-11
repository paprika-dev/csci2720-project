import Form from 'react-bootstrap/Form';
import sendSVG from '../assets/send.svg'
import commentSVG from '../assets/comment.svg'
import writeCommentSVG from '../assets/write-comment.svg'

const comments = [
    {"user": "Tom", "comment": "I love this place"}, 
    {"user": "Jerry", "comment": "Amazing performance"}, 
    {"user": "Kate", "comment": "Much better than I expected"}
]

export const Comment = () => {
    return(
        <div className="d-flex flex-column" style={{"min-width": "25vw"}}>
        <p>Comments</p>
        <p><img src={sendSVG} /><img src={commentSVG} /><img src={writeCommentSVG} /></p>
        {comments.map(comment => {
            return(
                <div key={comment.user}>
                    <p>{comment.user}</p>
                    <p>{comment.comment}</p>
                </div>
                
            )
        })}
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form>
        </div>
    )
}