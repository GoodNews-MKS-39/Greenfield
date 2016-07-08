// this houses all the articles after a mood exists
import React from 'react';
import { fetchArticles } from '../dbModels/articles.js';


export default class ArticleList extends React.Component{
  //set initial state of empty array
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    // 
  }

  componentDidMount(){
  //after call to db, populate array and modify state
    fetchArticles()
      .then((articleData) =>{
        this.setState({articles: articleData});
      });
    }

  render() {
    // show all articles for the given time period (today) filtered for the mood variable in the app component
      return (
      <div className='daily_articles'>
        <h1> {"Top news of the day"}</h1>
        //iterate through articles array to render each element to screen
        { this.state.articles.map((article, index) => {

          return <div key={index} className='single_article'>
            <h3> { article.title }</h3>
            <img src={ article.image } />
            <p> { article.paragraph } </p>

          </div>
        })}
      </div>
  )}