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
    }, [])
    
    function handleSelectOnChange(e) {
        if (e.target.value !== 'All articles') {
            setCurrentTopic(e.target.value)
            navigator(`/${e.target.value}`)
        } else {
            setCurrentTopic(undefined)
            navigator(`/`)
        }
    }
 
    return (
        <div>
            <label className='form-input' htmlFor='topic-select'>Filter by topic: </label>
            <select className='form-input' id='topic-select' value={currentTopic} onChange={handleSelectOnChange}>
                <option key={'All articles'} value={'All articles'}>All articles</option>
                {currentTopics.map((topic) => {
                    return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
            </select>
        </div>
    );
};

export default TopicsSelect;