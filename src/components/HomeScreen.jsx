import React, { useEffect, useState } from 'react';
import ContentBox from './ContentBox';
import ContentHeader from './ContentHeader';
import '../css/HomeScreen.css'
import TopicsSelect from './TopicsSelect';
import { fetchArticles } from '../utils';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
    const {topic} = useParams()
    const [currentTopic, setCurrentTopic] = useState(undefined)
    const [currentArticles, setCurrentArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticles().then((res) => {
            setCurrentArticles(res)
            setIsLoading(false)
        })
        if (!topic) {
            setCurrentTopic(undefined)
        } else {
            setCurrentTopic(topic)
        }
    }, [])

    if (isLoading) return <p id='is-loading'>Loading...</p>

    return (
        <div id='homescreen-div' className='grid-container'>
            <div className='grid-item content-header'>
                <ContentHeader />
            </div>
            <div className='grid-item content-box'>
                <ContentBox topic={currentTopic} currentArticles={currentArticles}/>
            </div>
            <div className='grid-item topics-select'>
                <TopicsSelect currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}/>
            </div>
        </div>
    );
};

export default HomeScreen;