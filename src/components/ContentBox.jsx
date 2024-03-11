import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import { fetchArticles } from '../utils';

const ContentBox = () => {

    const [contentArr, setContentArr] = useState([])

    useEffect(() => {
        fetchArticles().then((res) => {
            console.log(res, 'res from useeffect');
            setContentArr(res)
        })
    }, [])

    return (
        <div id='content-box-div'>
            {contentArr.map((article) => {
                return <div>
                    <p>{article.title}</p>
                    <p>{article.topic}</p>
                </div>
            })}
        </div>
    );
};

export default ContentBox;