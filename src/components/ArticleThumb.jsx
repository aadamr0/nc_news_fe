import React from 'react';
import '../css/ArticleThumb.css'
import { Link } from 'react-router-dom';

const ArticleThumb = (props) => {
    const {article} = props
    return (
        <div className='article-thumb-div'>
            <p>Title: <Link to={`/articles/${article.article_id}`}>{article.title}</Link></p>
            <p>Topic: {article.topic}</p>
        </div>
    );
};

export default ArticleThumb;