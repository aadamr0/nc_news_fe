import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import ArticleThumb from './ArticleThumb';

const ContentBox = (props) => {
    const {currentArticles} = props
    const {topic} = props
    if (topic === 'All articles' || !topic) {
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
    const filteredArticles = currentArticles.filter((article) => article.topic === topic)
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