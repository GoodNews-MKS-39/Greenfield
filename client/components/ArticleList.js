// this houses all the articles after a mood exists
import React from 'react';
import { fetchAllArticles, fetchAllSources } from '../dbModels/articles.js';
import { fetchComments, postComment } from '../dbModels/comments.js'
import UserControls from './UserControls.js';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';


export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }
  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }
  componentWillMount() {
    this.getSources()
  }
  getArticles(source) {
    fetchAllArticles(source).then((x)=> {
      this.setState({ articles: this.state.articles.concat(x.articles) })
    })
  }
  removeDuplicates(array) {
    array.filter(this.onlyUnique)
  }
  getSources() {
    fetchAllSources().then(source => source.forEach(source => this.getArticles(source)))
  }

  render() {
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className='daily_articles'>
        <div className="article_header"> 
          <h1>Good News</h1>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles}/>
        </div> 
        { this.state.articles
          .map((article) => {
            return (
              <div className="col-sm-6 col-md-4">
                <div className='single_article'>
                  <img src={article.urlToImage} />
                  <h3> { article.title } - { article.publishedAt }</h3>
                  <div className="article_p">
                    <p> { article.description } <a href={article.url} target="_blank">(Read more)</a></p>
                  </div>
                  <a href={'/comments/'+article.title}>Comments!</a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}