import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import { fetchArticles } from '../utils';
import ArticleThumb from './ArticleThumb';

const ContentBox = () => {

    const [contentArr, setContentArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticles().then((res) => {
            setContentArr(res)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <p id='is-loading'>Loading...</p>

    return (
        <div id='content-box-div'>
            {
                contentArr.map((article) => {
                    return <div key={article.article_id}>
                        <ArticleThumb article={article}/>
                    </div>
                })
            }
        </div>
    );
};

export default ContentBox;