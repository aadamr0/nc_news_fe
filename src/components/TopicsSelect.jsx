import React, { useEffect, useState } from 'react';
import { getTopics } from '../utils';

const TopicsSelect = (props) => {
    const {setCurrentTopic} = props
    const [currentTopics, setCurrentTopics] = useState([])

    useEffect(() => {
        getTopics()
        .then((res) => {
            setCurrentTopics(res)
        })
    })
    // get list of topics
    // set current topic based on select
    function handleSelectOnChange(e) {
        setCurrentTopic(e.target.value)
    }
    return (
        <div>
            <select onChange={handleSelectOnChange}>
                <option default key={'All articles'} value={'All articles'}>All articles</option>
                {currentTopics.map((topic) => {
                    return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
            </select>
        </div>
    );
};

export default TopicsSelect;