import React, { useState, useEffect, useContext } from 'react';
import '../css/ArticleScreen.css'
import { fetchArticleById, fetchCommentsByArticleId, patchArticleById, postCommentByArticleId } from '../utils';
import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import { UserContext } from '../contexts/UserContext';

const ArticleScreen = () => {
    const {article_id} = useParams()
    const [currentArticle, setCurrentArticle] = useState({})
    const [currentComments, setCurrentComments] = useState([])
    const [voteErr, setVoteErr] = useState(null)
    const [postCommentErr, setPostCommentErr] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [commentToPost, setCommentToPost] = useState('')
    const currentUser = useContext(UserContext)

    useEffect(() => {
        const fetchArticlesPromise = fetchArticleById(article_id)
        const fetchCommentsPromise = fetchCommentsByArticleId(article_id)
        Promise.all([fetchArticlesPromise, fetchCommentsPromise])
        .then((res) => {
            setCurrentArticle(res[0])
            setCurrentComments(res[1])
            setIsLoading(false)
        })
    }, [])

    function onButtonClick(e) {
    if (e.target.value === 'upvote') {
        setVoteErr(null)
        setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
        patchArticleById(article_id, currentArticle.votes + 1)
        .catch(() => {
            setCurrentArticle({...currentArticle, votes: currentArticle.votes-1})
            setVoteErr('Something\'s wrong, please try again...')
        })
    } else {
        setCurrentArticle({...currentArticle, votes: currentArticle.votes-1})
        patchArticleById(article_id, currentArticle.votes - 1)
        .catch(() => {
            setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
            setVoteErr('Something\'s wrong, please try again...')
        })
        }   
    }   

    function handleCommentSubmit(e){
        e.preventDefault()
        setPostCommentErr(null)
        setCommentToPost('')
        postCommentByArticleId(article_id, {username: currentUser.username, body: commentToPost})
        .then((res) => setCurrentComments([res, ...currentComments]))
        .catch(() => {
            setCurrentComments((currComs) =>{
                currComs.shift()
                return currComs
            })
            setPostCommentErr('Something\'s wrong, try again')
        })
    }

    if (isLoading) return <p id='is-loading'>Loading...</p>

    return (
        <div id='article-screen-content-div'>
            <div id='article-display-div'>
                <h1>{currentArticle.title}</h1>
                <h2>By {currentArticle.author}, posted {currentArticle.created_at}</h2>
                <p>{currentArticle.body}</p>
                <br></br>
                <p>{currentArticle.votes} votes</p>
                <button value='upvote' onClick={onButtonClick}>Upvote</button>
                <button value='downvote' onClick={onButtonClick}>Downvote</button>
                <form onSubmit={handleCommentSubmit}>
                    <input onChange={(e) => {setCommentToPost(e.target.value)}} value={commentToPost} placeholder='post comment...'></input>
                </form>
                {voteErr ? <p>{voteErr}</p> : ''}
                {postCommentErr ? <p>{postCommentErr}</p> : ''}
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