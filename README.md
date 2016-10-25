# Legacy
This is a repo for MKS-39 students' Legacy Project.

Please see our CONTRIBUTIONS.md if you would like to contribute.

STACK:
————--------------------------------
React -- Node -- Express -- MongoDB

For front-end design : React-Bootstrap

TEAM MEMBERS
- Jordan Campbell
- David Lewallen
- Travers Pinkerton
- Caleb Anderson
- Carlo DiLorenzo

# Project Summary
The goal of this project is to create a news website that only displays positive and negative articles. Using the [News api](https://newsapi.org) we can gather stories from 26 different news sources. A brief summary of each article among with an image is displayed. [IBM's Watson](http://www.ibm.com/watson/developercloud/text-to-speech.html) has an api that reads a synopsis of the article when the reader clicks on there logo image. We use [sentiment](https://www.npmjs.com/package/sentiment) to analyze the tone of the articles. Sentiment gives the article a score, these scores are used to filter each article to good news and bad news.

- News api - https://newsapi.org
- Watson api - http://www.ibm.com/watson/developercloud/text-to-speech.html
- sentiment - https://www.npmjs.com/package/sentiment

# Demo

[Have You Heard The News](https://haveyouheardthenews.herokuapp.com/)

# Backlog
- Add authentication
- Search by keyword and date
- Filter for other 3 emotions (display angry articles)

# Installation
- To clone master to your machine typing in terminal `git clone` and the web URL then run
- cd into the folder and type in terminal `npm install` then run
- then type `bower install csshake` then run
- after installation is completed then type in `npm start` then run
- go to localhost:4000 on web browser 

