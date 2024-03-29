import React, { useEffect, useState } from 'react';
import '../css/SortBy.css'

const SortBy = (props) => {
    const [sortBy, setSortBy] = useState('date')
    const [ascDesc, setAscDesc] = useState('desc')
    const {searchParams, setSearchParams} = props
    const ascDescParam = searchParams.get('ascDesc')
    const sortByParam = searchParams.get('sortBy')

    useEffect(() => {
        if (ascDescParam) setAscDesc(ascDescParam)
        if (sortByParam) setSortBy(sortByParam)
    }, [])

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

    function resetParams(e) {
        e.preventDefault()
        setAscDesc('desc')
        setSortBy('date')
    }

    return (
        <div>
            <form  onSubmit={handleOnFormSubmit}>
                <select className='form-input' value={sortBy} onChange={handleSelectOnChange}>
                    <option value="date">date</option>
                    <option value="comment_count">comments</option>
                    <option value="votes">votes</option>
                </select>
                <button id='asc-desc' className='form-input' onClick={handleAscDescButtonClick} value={ascDesc}>{ascDesc}</button>
                <button className='form-input' onClick={resetParams}>reset</button>
                <button id='submit-button' className='form-input' type='submit'>submit</button>
            </form>
        </div>
    );
};

export default SortBy;