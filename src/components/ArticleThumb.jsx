import React from 'react';
import '../css/ArticleThumb.css'
import { Link } from 'react-router-dom';

const ArticleThumb = (props) => {
    const {article} = props
    return (
        <div className='article-thumb-div'>
            <Link to={`/articles/${article.article_id}`}><p>{article.title}</p></Link>
            <p>{article.topic}</p>
        </div>
    );
};

export default ArticleThumb;