# Legacy
This is a repo for MKS-39 students' Legacy Project.

Please see our CONTRIBUTIONS.md if you would like to contribute.

STACK:
————--------------------------------
React -- Node -- Express -- MongoDB

For front-end design : React-Bookstrap

TEAM MEMBERS
- Jordan Campbell
- David Lewallen
- Travers Pinkerton
- Caleb Anderson
- Carlo DiLorenzo

# Project Summary
The goal of this project is to create a news website that only displays positive and negative articles. Using the [News api](https://newsapi.org) we can gather stories from 26 different news sources. A brief summary of each article among with an image is displayed. [IBM's Watson](http://www.ibm.com/watson/developercloud/text-to-speech.html) has an api that reads a synopsis of the article when the reader clicks on there logo image. We use [sentiment](https://www.npmjs.com/package/sentiment) to analyze the tone of the articles. Sentiment gives the article a score, these scores are used to filter each article to good news and bad news.

News api - https://newsapi.org
Watson api - http://www.ibm.com/watson/developercloud/text-to-speech.html
sentiment - https://www.npmjs.com/package/sentiment

# Backlog
- Backdating
- Add news sources
- Search by keyword
- Add authentication
- Filter for other 4 emotions (display angry articles)

# Details
### Components:
1. /client/components/App.js: Highest level component, controls mood state which triggers articles to be rendered in ArticleList.js.
2. /client/components/ArticleList.js: Component that houses all articles to be displayed. Displays when state 'mood' != null.
3. /client/components/Splash.js: Landing page. Displays when state 'mood' = null.
4. /client/components/UserControls.js: Component for user interation. Client can select dates to be queried.

### apiModels:
1. /server/apiModels/lib/news.js: Model dedicated to connecting with NYT.
2. /server/apiModels/lib/watson.js: Model dedicated to communicating with Watson api.
3. /server/apiModels/lib/articles.js: Model dedicated to communicating with MongoDB.
4. /server/apiModels/articles.js: Houses methods to manipulate database.

### Crontab:
- Three script files in /server/crontab directory. Should be set to run at least once a day, currently being executed manually.
1. /server/crontab/fetchDailyArticles.js: Grabs all articles for current day when run.
2. /server/crontab/fetchWeeklyArtiles.js: Grabs all articles for current week when run (high potential to surpass api call limit).
3. /server/crontab/fetchTones.js: Looks for articles in database that hasn't been run through Watson and makes that api call.
