
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
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className='daily_articles'>
        <div className="article_header"> 
          <h1> {"Good News"}</h1>
          <UserControls _fetchByDate={this._fetchByDate.bind(this)} />
        </div> 
        { this.state.articles
          .filter(article => article[this.props.mood] > 0.6)
          .map((article) => {
          let img = article.multimedia.length > 0 ? (<img src={ "https://static01.nyt.com/" + article.multimedia[1].url } />) : (<img src={ "./img/jad.jpg" } />);
          return (
            <div key={article._id} className="col-sm-6 col-md-4">
              <div className='single_article'>
                {img}
                <h3> { article.headline.main } - { article.pub_date.slice(0,10) }</h3>
                <div className="article_p">
                  <p> { article.paragraph } <a href={article.url} target="_blank">(Read more)</a> </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  _fetchByDate(startDate, endDate) {
    if (startDate && endDate) {
      fetchDatedArticles(startDate, endDate)
      .then((articleData) =>{
        this.setState({articles: articleData});
      });
    }
  }

}