import React from 'react';
import '../css/CommentCard.css'

const CommentCard = (props) => {
    const {comment} = props
    return (
        <div className='comment-card-div'>
            {comment.author}:
            <br></br>
            {comment.body}
        </div>
    );
};

export default CommentCard;