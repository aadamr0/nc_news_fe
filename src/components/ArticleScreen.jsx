import React, { useState, useEffect, useContext } from 'react';
import '../css/ArticleScreen.css'
import { deleteCommentById, fetchArticleById, fetchCommentsByArticleId, patchArticleById, postCommentByArticleId } from '../utils';
import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import { UserContext } from '../contexts/UserContext';

const ArticleScreen = () => {
    const {article_id} = useParams()
    const [currentArticle, setCurrentArticle] = useState({})
    const [currentComments, setCurrentComments] = useState([])
    const [messagePopup, setMessagePopup] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [commentToPost, setCommentToPost] = useState('')
    const currentUser = useContext(UserContext)
    const [deleteMsg, setDeleteMsg] = useState(null)
    const [deletingButtonId, setDeletingButtonId] = useState(null)

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
        setMessagePopup(null)
        setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
        patchArticleById(article_id, currentArticle.votes + 1)
        .catch(() => {
            setCurrentArticle({...currentArticle, votes: currentArticle.votes-1})
            setMessagePopup('Something\'s wrong, please try again...')
        })
    } else {
        setCurrentArticle({...currentArticle, votes: currentArticle.votes-1})
        patchArticleById(article_id, currentArticle.votes - 1)
        .catch(() => {
            setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
            setMessagePopup('Something\'s wrong, please try again...')
        })
        }   
    }   

    function onDeleteButtonClick(e) {
        setDeleteMsg('deleteing, please do not press Delete button again...')
        setDeletingButtonId(e.target.value)
        deleteCommentById(Number(e.target.value))
        .then(() => {
            setCurrentComments((currComments) => {
                return currComments.filter((comment) => {
                    return comment.comment_id !== Number(e.target.value)
                })
            })
            setDeleteMsg(null)
            setDeletingButtonId(null)
        })
        .catch(() => {
            setDeleteMsg('Something went wrong, try again')
        })
    }

    function handleCommentSubmit(e){
        e.preventDefault()
        setMessagePopup('posting comment, please wait...')
        setCommentToPost('')
        postCommentByArticleId(article_id, {username: currentUser.username, body: commentToPost})
        .then((res) => {
            setCurrentComments((currComments) => {
                setDeleteMsg(null)
                currComments.unshift(res)
                return currComments
            })
            setMessagePopup('comment post successful')
        })
        .catch(() => {
            setMessagePopup('Something\'s wrong, try again')
        })
    }
    

    function onCommentInputChange(e) {
        setCommentToPost(e.target.value)
        setMessagePopup(null)
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
                <br></br>
                <br></br>
                <form onSubmit={handleCommentSubmit}>
                    <textarea rows={'4'} onChange={onCommentInputChange} value={commentToPost} placeholder='Write a comment...'></textarea>
                    <br></br>
                    <button>Post</button>
                </form>
                {messagePopup ? <p id='commenting-msg'>{messagePopup}</p> : ''}
            </div>
            <div id='comments-div'>
                {currentComments.map((comment) => {
                    return <div key={comment.comment_id} className='comment-card-whole-div'>
                        <CommentCard comment={comment}/>
                        {comment.author === currentUser.username ? <button  className='delete-button' value={comment.comment_id} onClick={onDeleteButtonClick}>Delete </button> : null
                        }
                        {deleteMsg && comment.comment_id === Number(deletingButtonId) ? <p id='delete-msg'>{deleteMsg}</p> : null}
                    </div>
                })}
            </div>
        </div>
    );
};

export default ArticleScreen;