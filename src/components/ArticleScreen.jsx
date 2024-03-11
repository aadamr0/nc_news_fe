import React, { useState, useEffect } from 'react';
import '../css/ArticleScreen.css'
import { fetchArticleById, fetchCommentsByArticleId } from '../utils';
import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';

const ArticleScreen = () => {
    const {article_id} = useParams()
    const [currentArticle, setCurrentArticle] = useState({})
    const [currentComments, setCurrentComments] = useState([])

    useEffect(() => {
        fetchArticleById(article_id).then((res) => {
            setCurrentArticle(res)
        })
        fetchCommentsByArticleId(article_id).then((res) => {
            setCurrentComments(res)
        })
    }, [])

    return (
        <div id='article-screen-content-div'>
            <div id='article-display-div'>
                <h1>{currentArticle.title}</h1>
                <h2>By {currentArticle.author}, posted {currentArticle.created_at}</h2>
                <p>{currentArticle.body}</p>
            </div>
            <div id='comments-div'>
                {currentComments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })}
            </div>
        </div>
    );
};

export default ArticleScreen;