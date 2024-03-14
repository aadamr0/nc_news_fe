import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import ArticleThumb from './ArticleThumb';

const ContentBox = (props) => {
    const {currentArticles} = props
    const {currentTopic} = props
    const filteredArticles = currentArticles.filter((article) => article.topic === currentTopic)

    if (currentTopic === 'All articles') {
        return (
            <div id='content-box-div'>
                {
                    currentArticles.map((article) => {
                        return <div key={article.article_id}>
                            <ArticleThumb article={article}/>
                        </div>
                    })
                }
            </div>
        );
    }
    else {
        return (
            <div id='content-box-div'>
                {
                    filteredArticles.map((article) => {
                        return <div key={article.article_id}>
                            <ArticleThumb article={article}/>
                        </div>
                    })
                }
            </div>
        );
    }
};

export default ContentBox;