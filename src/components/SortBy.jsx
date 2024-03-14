import React, { useState } from 'react';
import '../css/SortBy.css'

const SortBy = (props) => {
    
    const [sortBy, setSortBy] = useState('date')
    const [ascDesc, setAscDesc] = useState('asc')
    const {setSearchParams} = props

    function handleOnFormSubmit(e) {
        e.preventDefault()
        setSearchParams({sortBy: sortBy, ascDesc: ascDesc})
    }

    function handleSelectOnChange(e) {
        setSortBy(e.target.value)
        
    }

    function handleAscDescButtonClick(e) {
        e.preventDefault()
        if (e.target.value === 'asc') e.target.value = 'desc', setAscDesc('desc')
        else e.target.value = 'asc', setAscDesc('asc')
    }

    return (
        <div>
            <form onSubmit={handleOnFormSubmit}>
                <select value={sortBy} onChange={handleSelectOnChange}>
                    <option value="date">date</option>
                    <option value="comment_count">comments</option>
                    <option value="votes">votes</option>
                </select>
                <button onClick={handleAscDescButtonClick} value={ascDesc}>{ascDesc}</button>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
};

export default SortBy;