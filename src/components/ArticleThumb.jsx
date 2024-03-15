import React from 'react';
import '../css/ArticleThumb.css'
import { Link } from 'react-router-dom';

const ArticleThumb = (props) => {
    const {article} = props
    return (
        <div className='article-thumb-div'>
            <p>Title: <Link to={`/articles/${article.article_id}`}>{article.title}</Link></p>
            <p className='date'>
                Date posted: {new Date(article.created_at).getDate()}/{new Date(article.created_at).getMonth()}/{new Date(article.created_at).getFullYear()}
            </p>
            <p>Topic: {article.topic}</p>
            <p className='comment-count'>Comments: {article.comment_count}</p>
            <p className='votes'>Votes: {article.votes}</p>
        </div>
    );
};

export default ArticleThumb;