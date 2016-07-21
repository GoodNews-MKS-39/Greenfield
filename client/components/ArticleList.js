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
      if(source.id !== 'buzzfeed' && source.id !== 'redditrall') {
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
      <div className="pure-g">
        <div className="article_header">
          <h1>Good News or Bad News</h1>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles}/>
        </div>
        {this.state.articles
          .map((article) => {
            return (
              <div key={this.state.articles.indexOf(article)} className="photo-box u-1 u-med-1-3 u-lrg-1-4">
                <div>
                  <img className="article" src={article.urlToImage} />
                  <aside className="photo-box-caption">
                    <img className="source-image" src={Logo.findSourceLogo(article.source)} />
                    <p onClick={this.textToSpeech.bind(null, article.description)}> { article.title } - <a href={article.url} target="_blank">Full article</a></p>
                  </aside>

                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

<aside class="photo-box-caption">
                <span>by <a href="http://www.dillonmcintosh.tumblr.com/">Dillon McIntosh</a></span>
            </aside>
