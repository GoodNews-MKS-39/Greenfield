# Greenfield
This is a repo for MKS-39 students' Greenfield project.

Please see our CONTRIBUTIONS.md if you would like to contribute.

STACK:
————--------------------------------
React -- Node -- Express -- MongoDB

For front-end design : React-Bookstrap

TEAM DEVELOPMENT ROLES
- Full Stack: Ricardo
- API's: Tim 
- Front End / React: Kyhan
- Front End / React: Tony
- CSS: Ashley

# Project Summary
The goal of this project is to create a news website that only displays positive articles. Using the New York Times api we can gather stories dating back to 1851. The data returned from these calls is stored with MongoDB and includes a brief summary of each article among other information. IBM's Watson has an api that analyzes a snippet of text and returns scores from 0-1 based on the existence of 5 emotions: anger, fear, joy, sadness, and disgust. We use these scores as a filter by passing each article summary into Watson and rendering only the ones with a 'joy' score above a certain number (0.3).

NYT - https://developer.nytimes.com/
Watson - http://www.ibm.com/watson/developercloud/tone-analyzer.html

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

