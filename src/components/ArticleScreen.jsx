import React, { useState, useEffect } from 'react';
import '../css/ArticleScreen.css'
import { fetchArticleById } from '../utils';
import { useParams } from 'react-router-dom';

const ArticleScreen = () => {
    const {article_id} = useParams()
    const [currentArticle, setCurrentArticle] = useState({})

    useEffect(() => {
        fetchArticleById(article_id).then((res) => {
            setCurrentArticle(res)
        })
    }, [])

    return (
        <div id='article-screen-content-div'>
            <h1>{currentArticle.title}</h1>
            <h2>By {currentArticle.author}, posted {currentArticle.created_at}</h2>
            <p>{currentArticle.body}</p>
        </div>
    );
};

export default ArticleScreen;