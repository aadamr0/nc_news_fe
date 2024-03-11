import React from 'react';
import '../css/ArticleThumb.css'

const ArticleThumb = (props) => {
    const {article} = props
    return (
        <div className='article-thumb-div'>
            <p>{article.title}</p>
            <p>{article.topic}</p>
        </div>
    );
};

export default ArticleThumb;