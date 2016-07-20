// this houses all the articles after a mood exists
import React from 'react';
import { fetchAllArticles, fetchAllSources, fetchVoice } from '../models/articles.js';
import UserControls from './UserControls.js';
import Watson from 'watson-developer-cloud'


export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      sources: []
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
    fetchAllSources().then(source => {
      this.setState({ sources: source })
      source.forEach(source => this.getArticles(source.id))
      console.log("sources: ", this.state.sources)
    })
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
  grabSourceImage(article) {
    this.state.sources.forEach((source) => {
      if (article.source === source.name) {
        return source.urlsToLogo.small;
      }
  }

  render() {
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className='daily_articles'>
        <div className="article_header"> 
          <h1>Good News</h1>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles}/>
        </div> 
        {this.state.articles
          .map((article) => {
            return (
              <div className="col-sm-6 col-md-4">
                <div className='single_article'>
                  <img src={article.urlToImage} />
                  <h3> { article.title } - { article.publishedAt }</h3>
                  <div className="article_p">
                    <img src={this.grabSourceImage(article)}>
                    <p> { article.description } <a href={article.url} target="_blank">(Read more)</a></p>
                  </div>
                  <button onClick={this.textToSpeech.bind(null, article.description)}> Hear </button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}