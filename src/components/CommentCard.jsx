import React from 'react';
import '../css/CommentCard.css'

const CommentCard = (props) => {
    const {comment} = props

    return (
        <div className='comment-card-div'>
            <p className='author' >{comment.author}</p>
            <p>{comment.body}</p>
        </div>
    );
};

export default CommentCard;