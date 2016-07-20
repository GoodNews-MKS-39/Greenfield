// this houses all the articles after a mood exists
import React from 'react';
import { fetchAllArticles, fetchAllSources, fetchVoice } from '../models/articles.js';
import UserControls from './UserControls.js';
import Watson from 'watson-developer-cloud'
import Sentiment from 'sentiment';

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      mood: 'good'
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
      x.articles = x.articles.map((article) => {
        article.source = x.source;
        var result = Sentiment(article.title);
        article.sentimentScore = result.score;
        article.sentimentComparative = result.comparative;
        return article;
      })
      this.setState({ articles: this.state.articles.concat(x.articles) })
    })
  }
  removeDuplicates(array) {
    array.filter(this.onlyUnique)
  }
  getSources() {
    fetchAllSources()
    .then(source => source.forEach(source => {
      if(source !== 'buzzfeed' && source !== 'redditrall') {
        this.getArticles(source)
      }
    }))
  }
  textToSpeech(words) {
    fetchVoice(words).then(something => {
      var audio = new Audio('textToSpeech.wav');
      audio.play();
    })
  }
  renderArticles(articles) {
    console.log("Articles front end: 48:", articles)
    // sorts articles by emotion score by what the current mood is.
    if(this.state.mood){
      var sortObject = {
        'good': [-1, 1],
        'bad': [1, -1]
      };
      articles.sort((a, b) => {
        if(a.sentimentScore > b.sentimentScore) return sortObject[this.state.mood][0];
        else if(b.sentimentScore > a.sentimentScore) return sortObject[this.state.mood][1];
        else return 0;
      })
    }

    // Returning article elements to be displayed
    return articles.map((article) => {
      return (
        <div className="col-sm-6 col-md-4">
          <div className='single_article'>
            <img src={article.urlToImage} />
            <h3> { article.title } - { article.publishedAt }</h3>
            <div className="article_p">
              <p> { article.description } <a href={article.url} target="_blank">(Read more)</a></p>
            </div>
            <button onClick={this.textToSpeech.bind(null, article.description)}> Hear </button>
          </div>
        </div>
      )
    })
  }

  render() {
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className='daily_articles'>
        <div className="article_header"> 
          <h1>Good News</h1>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles}/>
        </div> 
        {this.renderArticles(this.state.articles)}
      </div>
    )
  }
}