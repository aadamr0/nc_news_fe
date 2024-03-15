import React, { useEffect, useState } from 'react';
import '../css/ContentBox.css'
import ArticleThumb from './ArticleThumb';

const ContentBox = (props) => {
    const {currentArticles, topic, searchParams} = props
    const sortBy = searchParams.get('sortBy')
    const ascDesc = searchParams.get('ascDesc')
    switch (sortBy) {
        case 'date':
            if (ascDesc==='desc'){
                currentArticles.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                })
            } else {
                currentArticles.sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                })
            }
            break;
        case 'comment_count':
            if (ascDesc==='desc'){
                currentArticles.sort((a, b) => {
                    return b.comment_count - a.comment_count
                })
            } else {
                currentArticles.sort((a, b) => {
                    return a.comment_count - b.comment_count
                })
            }
        case 'votes':
            if (ascDesc==='desc'){
                currentArticles.sort((a, b) => {
                    return b.votes - a.votes
                })
            } else {
                currentArticles.sort((a, b) => {
                    return a.votes - b.votes
                })
            }
        default:
            break;
    }

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