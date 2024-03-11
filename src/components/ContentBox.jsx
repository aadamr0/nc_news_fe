import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import { fetchArticles } from '../utils';
import ArticleThumb from './ArticleThumb';

const ContentBox = () => {

    const [contentArr, setContentArr] = useState([])

    useEffect(() => {
        fetchArticles().then((res) => {
            setContentArr(res)
        })
    }, [])

    return (
        <div id='content-box-div'>
            {contentArr.map((article) => {
                return <div key={article.article_id}>
                    <ArticleThumb article={article}/>
                </div>
            })}
        </div>
    );
};

export default ContentBox;