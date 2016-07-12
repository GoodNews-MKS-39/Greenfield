// this houses all the articles after a mood exists
import React from 'react';
import { fetchArticles, fetchDatedArticles } from '../dbModels/articles.js';
import UserControls from './UserControls.js';


export default class ArticleList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      //set initial state of empty array
      articles: []
    };
  }

  componentDidMount() {
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
      <UserControls _fetchByDate={this._fetchByDate.bind(this)} />
      { this.state.articles.map((article, index) => {

        return <div key={index} className='single_article'>
          <h3> { article.headline.main } - { article.pub_date.slice(0,10) }</h3>
          <img src={ "https://static01.nyt.com/" + article.multimedia[1].url } />
          <p> { article.paragraph } </p>

        </div>
      })}
    </div>
  )}

  _fetchByDate(startDate, endDate) {
    if (startDate && endDate) {
      fetchDatedArticles(startDate, endDate)
      .then((articleData) =>{
        this.setState({articles: articleData});
      });
    }
  }

}
