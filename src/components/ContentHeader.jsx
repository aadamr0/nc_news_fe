import React from 'react';
import '../css/ContentHeader.css'

const ContentHeader = (props) => {
    const {currentTopic} = props
    return (
        <div id='topics-line-div'>
            {currentTopic ? <p className='topic-p'>Viewing articles of topic '{currentTopic}'</p> : <p className='topic-p'>Viewing all articles</p>}
        </div>
    );
};

export default ContentHeader;