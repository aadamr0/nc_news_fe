import React, { useEffect, useState } from 'react';
import ContentBox from './ContentBox';
import ContentHeader from './ContentHeader';
import '../css/HomeScreen.css'
import TopicsSelect from './TopicsSelect';
import { fetchArticles, getTopics } from '../utils';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SortBy from './SortBy';

const HomeScreen = () => {
    const {topic} = useParams()
    const [currentTopic, setCurrentTopic] = useState(undefined)
    const [currentArticles, setCurrentArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [err, setErr] = useState(null)
    const navigator = useNavigate()

    useEffect(() => {
        setErr(null)
        fetchArticles().then((res) => {
            setCurrentArticles(res)
            setIsLoading(false)
        }).catch((err) => {setErr(err)})

        if (!topic) {
            setCurrentTopic(undefined)
        } else {
            setCurrentTopic(topic)
        }
        getTopics().then((topics) => {
            const invalidTopic = topics.every((topicObj) => topicObj.slug !== topic && topic !== undefined)
            console.log(topic, currentTopic, invalidTopic);
            if (invalidTopic) {
                setErr('invalid topic') 
            }
        })
    }, [])

    function handleErrButton(e) {
        e.preventDefault()
        setErr(null)
        setCurrentTopic(undefined)
        navigator('/')
    }

    if (err) {

        return <div className='err-div'>
            <p>Poor request, try different topic</p>
            <button onClick={handleErrButton}>back to homepage</button>
        </div>
    }


    if (isLoading) return <p id='is-loading'>Loading...</p>

    return (
        <div id='homescreen-div' className='grid-container'>
            <div className='grid-item content-header'>
                <ContentHeader />
            </div>
            <div className='grid-item content-box'>
                <ContentBox topic={currentTopic} currentArticles={currentArticles} searchParams={searchParams}/>
            </div>
            <div className='grid-item topics-select'>
                <TopicsSelect currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}/>
            </div>
            <div className='grid-item sort-by-div'>
                <SortBy setSearchParams={setSearchParams} searchParams={searchParams}/>
            </div>
        </div>
    );
};

export default HomeScreen;