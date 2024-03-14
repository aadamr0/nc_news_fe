import React, { useEffect, useState } from 'react';
import { getTopics } from '../utils';
import { useNavigate } from 'react-router-dom';

const TopicsSelect = (props) => {
    const {currentTopic, setCurrentTopic} = props
    const [currentTopics, setCurrentTopics] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        getTopics()
        .then((res) => {
            setCurrentTopics(res)
        })
    })
    
    function handleSelectOnChange(e) {
        setCurrentTopic(e.target.value)
        if (e.target.value === 'All articles') navigator(`/`)
        else navigator(`/${e.target.value}`)
    }
 
    return (
        <div>
            <select value={currentTopic} onChange={handleSelectOnChange}>
                <option key={'All articles'} value={'All articles'}>All articles</option>
                {currentTopics.map((topic) => {
                    return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
            </select>
        </div>
    );
};

export default TopicsSelect;