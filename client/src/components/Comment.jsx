import axios from '../api/axios';
import Form from 'react-bootstrap/Form';
import sendSVG from '../assets/send.svg'
import commentSVG from '../assets/comment.svg'
import writeCommentSVG from '../assets/write-comment.svg'
import avatarSVG1 from '../assets/avatar-1.svg'
import avatarSVG2 from '../assets/avatar-2.svg'
import avatarSVG3 from '../assets/avatar-3.svg'
import avatarSVG4 from '../assets/avatar-4.svg'
import avatarSVG5 from '../assets/avatar-5.svg'
import avatarSVG6 from '../assets/avatar-6.svg'
import { useState } from 'react';
import './Comment.css'

export const Comment = ({ lid, cmts }) => {

    // assign avatar icon based on username
    const avatars = [avatarSVG1, avatarSVG2, avatarSVG3, avatarSVG4, avatarSVG5, avatarSVG6]
    const useAvatar = (username) => avatars[username.charCodeAt(0) % 6]

    const [myComment, setMyComment] = useState("")
    const [comments, setComments] = useState([...cmts])
    const username = JSON.parse(localStorage.getItem('user')).username
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // add comment to database      
        await axios.post('/comments', { lid: lid, text: myComment });
        
        // reflect change in client side 
        let s = [...comments]
        s.unshift({"user": {"username": username}, "text": myComment})
        setComments(s)
        
        // clear form
        e.target.reset()
    }

    return(
        <div className="d-flex flex-column" style={{minWidth: "25vw"}}>
            <p><img src={commentSVG} />&nbsp;&nbsp;Comments</p>
            <div className='pt-1 pb-2 px-2 overflow-auto' style={{maxHeight: "30vh"}}>
                {comments.length == 0 && <p>No user comments</p>}
                {comments && comments.map((comment, i) => {
                    return(
                        <div key={i} className='d-flex flex-column user-comment px-3 py-2 mb-3'>
                            <p className='mb-1 comment-username'><img src={useAvatar(comment.user.username)} /> {comment.user.username}</p>
                            <p className='mb-0 comment-text'>{comment.text}</p>
                        </div>
                    )
                })}
            </div>
            <hr></hr>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="review-text-area">
                    <Form.Label><img src={writeCommentSVG} />&nbsp;&nbsp;Write a review</Form.Label>
                    <div className='d-flex gap-1'>
                        <Form.Control className='comment-text' as="textarea" rows={3} onChange={e=>setMyComment(e.target.value)} required/>
                        <button type="submit"><img src={sendSVG} /></button>
                    </div>
                </Form.Group>

            </Form>
        </div>
    )
}