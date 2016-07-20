// this houses all the articles after a mood exists
import React from 'react';
import { fetchAllArticles, fetchAllSources, fetchVoice } from '../models/articles.js';
import UserControls from './UserControls.js';
import Watson from 'watson-developer-cloud'
import Sentiment from 'sentiment';
import * as Logo from '../models/sourceLogo.js'

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  componentWillMount() {
    this.getSources()
  }
  getArticles(source) {
    fetchAllArticles(source.id).then((x)=> {
      x.articles = x.articles.map((article) => {
        article.source = x.source;
        var result = Sentiment(article.title);
        article.sentimentScore = result.score;
        article.sentimentComparative = result.comparative;
        return article;
      })
      this.setState({ articles: this.state.articles.concat(x.articles) })
      return x
    })
    .then((articles) => {
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
  // Check to see if article.source is in sources state. 
  //   if true: return sourceImg url
  //   if false: do nothing
  render() {
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className='daily_articles'>
        <div className="article_header">
          <h1>Good News or Bad News</h1>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles}/>
        </div>
        {this.state.articles
          .map((article) => {
            return (
              <div key={this.state.articles.indexOf(article)} className="col-sm-6 col-md-4">
                <div className='single_article'>
                  <img src={article.urlToImage} />
                  <h3> { article.title } - { article.publishedAt }</h3>
                  <div className="article_p">
                    <img className="source-logo" src={Logo.findSourceLogo(article.source)} />
                    <p> {article.description} <a href={article.url} target="_blank">(Read more)</a></p>
                  <div onClick={this.textToSpeech.bind(null, article.description)} className="article_p">

                    <p> { article.description }<div className="text">Text to Speech</div> <a href={article.url} target="_blank">(Read more)</a></p>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
