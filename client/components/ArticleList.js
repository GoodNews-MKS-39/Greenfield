// this houses all the articles after a mood exists
import React from 'react';
import { fetchComments, postComment } from '../dbModels/comments.js'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { fetchAllArticles, fetchAllSources, fetchVoice } from '../models/articles.js';
import UserControls from './UserControls.js';
import Watson from 'watson-developer-cloud'
import Sentiment from 'sentiment';
import * as Logo from '../models/sourceLogo.js'
import RC from 'rc-progress';

var ProgressBar = RC.Line
var waitingForSpeech = false;
var audio = new Audio('textToSpeech.wav');

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      progressPercent: 0,
      mood: 'good'
    };
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  componentWillMount() {
    this.getSources()
  }
  getArticles(sources) {
    var i = 0;
    var articles = [];
    // Start recursion
    getFetchCall.call(this);

    function getFetchCall() {
      // fetch articles on the current source
      fetchAllArticles(sources[i].id)
      .then((result) => {
        // Get result back from fetch call and map through articles
        result.articles = result.articles
        .map((article) => {
          // Add source to each article object
          article.source = sources[i].id;
          // Get and set Sentiment scores for current article
          var result = Sentiment(article.title);
          article.sentimentScore = result.score;
          article.sentimentComparative = result.comparative;
          // return current article for map function
          return article;
        })
        // Concat the modified articles onto the articles array
        articles = articles.concat(result.articles);
        // Check to see if there are any more sources to fetch
        if(i < sources.length - 1){
          this.setState({ progressPercent: (i / sources.length) * 100 })
          i++;
          // Start recursion again
          getFetchCall.call(this, sources[i])
        } else {
          // No more sources, remove duplicates and set the articles state
          articles = this.removeDuplicates(articles);
          articles = this.sortGood(articles)
          this.setState({ articles: articles })
        }
      })
    }
  }
  sortGood(articles) {
    return articles.sort((a, b) => {
      if(a.sentimentScore > b.sentimentScore) return -1;
      else if(b.sentimentScore > a.sentimentScore) return 1;
      else return 0;
    })
  }
  reverseMood() {
    this.setState({articles: this.state.articles.reverse()})
  }
  removeDuplicates(array) {
    var uniqueArticles = [];
    // Holds titles of articles that have already been pushed into the uniqueArticles array
    var uniqueTitles = [];
    // searches for unique article titles and adds them to the uniqueArticles array which will be returned
    array.forEach(article => {
      if(uniqueTitles.indexOf(article.title) === -1){
        uniqueTitles.push(article.title);
        uniqueArticles.push(article);
      }
    })
    return uniqueArticles;
  }
  getSources() {
    fetchAllSources()
    .then(source => {
      let sources = [];
      source.forEach(source => {
        let sourcesToFilter = ['buzzfeed', 'redditrall', 'bbcsport', 'googlenews', 'hackernews', 'wiredde', 'theguardianuk']
        if(sourcesToFilter.indexOf(source.id) === -1) {
          sources.push(source);
        }
      })
      this.getArticles(sources)
    })
  }
  openComments(title) {
    console.log('opening comments')
    this.setState({articleTitle: title})
    fetchComments(title)
    .then(comments => {
      this.setState({comments: comments})
      this.setState({showComments: true});
      console.log('showing comments modal', this.state.showComments)
    })
  }
  updateComments(){
    let title = this.state.articleTitle;
    fetchComments(title)
    .then(comments => {
      this.setState({comments: comments})
    })
  }
  closeComments() {
    this.setState({showComments: false})
  }
  textToSpeech(words) {
    if(!waitingForSpeech){
      document.body.style.cursor = 'wait';
      waitingForSpeech = true;
      fetchVoice(words).then(something => {
        audio.load();
        document.body.style.cursor = 'default';
        waitingForSpeech = false;
        audio.play();
      })
    }
  }
  changeMood(mood) {
    if(mood !== this.state.mood){
      this.setState({mood: mood})
      this.reverseMood();
    }
  }
  redirectToArticle(articleURL) {
    window.location.href = articleURL;
  }

  renderArticles(articles) {
    // Returning article elements to be displayed
    return articles.map((article) => {
      return (
        <div key={this.state.articles.indexOf(article)} className="photo-box u-1 u-med-1-3 u-lrg-1-4">
          <div>
            <img className="article" src={article.urlToImage} />
            <aside className="photo-box-caption">
            <img onClick={this.textToSpeech.bind(null, article.description)}
                   onTouchStart={this.textToSpeech.bind(null, article.description)}
                   className="source-image" src={Logo.findSourceLogo(article.source)} 
                   onMouseOver={e => e.target.src="/img/sound-recording.png"} 
                   onMouseLeave={e => e.target.src=Logo.findSourceLogo(article.source)} />
              <p>{ article.title } - </p>
              <button type="button" className="button-xsmall pure-button" onClick={(e) =>{
                e.preventDefault()
                this.redirectToArticle(article.url)}} target="_blank">Full article</button>
              <button type="button" className="button-xsmall pure-button" onClick={(e) => {
                e.preventDefault()
                this.openComments(article.title)}}>Comments!</button>
            </aside>
          </div>
        </div>
      )
    })
  }

  render() {
    // show all articles for the given time period (eg. today) filtered for the mood variable in the app component
    return (
      <div className="pure-g">
        <div className="splash-container">
          <h1 className="splash-head">Have You Heard The News</h1>
          <p  className="splash-subhead">Click source logo to hear the article</p>
          <UserControls getArticles={this.getArticles.bind(this)} articles={this.state.articles} changeMood={this.changeMood.bind(this)}/>
          {!this.state.articles ?
            <div className="progress">
              <span>Loading articles...</span>
              <ProgressBar percent={this.state.progressPercent} strokeWidth="2" strokeColor="#ffffff" />
            </div>
            :
            null}
        </div> 
        {this.state.showComments ? 
          <Comments onClose={this.closeComments.bind(this)} updateComments={this.updateComments.bind(this)} title={this.state.articleTitle} comments={this.state.comments}/>
          :
          null}
        {this.state.articles ? <div className="content-wrapper" >
        {this.renderArticles(this.state.articles)}
        </div> : ''}
      </div>
    )
  }
}

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
     msg: '',
     username: ''
    }
  }
  submitComment(){
    let title = this.props.title;
    let username = this.state.username;
    let msg = this.state.msg;

    if (username && msg) {
      postComment(title, username, msg)
      .then(resp => {
        console.log('yay we added a comment... resp: ', resp)
        this.setState({
          username: '',
          msg: ''
        })
        this.props.updateComments()
      })  
    }
  }

  componentDidMount(){
    console.log('live comments woo woo!!!')
    setInterval(this.props.updateComments, 500);
  }

  render() {

    return (
      <ModalContainer onClose={this.props.onClose}>
        <ModalDialog onClose={this.props.onClose} className='comments'>
          <h2>{this.props.title}</h2>
          <h3>Comments:</h3>
          <div className='comment-msgs'>
          { this.props.comments
            .map(comment => {
              return (
                <div className='single_comment'>
                <p><div className='comment-username'>{comment.username}: </div>{comment.msg}</p>
                </div>
                )
            })
          }
          </div>
          <form name="newComment" onSubmit={e => {
            e.preventDefault();
            this.submitComment();
          }}>
          <div> <input className='new-comment' type='text' placeholder='name' name="username" onChange={e => this.setState({username: e.target.value})} value={this.state.username}/> </div>
          <div> <textarea className='new-comment' form='newComment' placeholder='Enter your comment here' name="msg" onChange={e => this.setState({msg: e.target.value})} value={this.state.msg}/> </div>
            <button type='submit'>Submit</button>
          </form>
        </ModalDialog>
      </ModalContainer>
      )
  }
}
