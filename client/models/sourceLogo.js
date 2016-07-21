var logos = {
  arstechnica: "http://i.newsapi.org/arstechnica-s.png",
  bbcnews: "http://i.newsapi.org/bbcnews-s.png",
  bbcsport: "http://i.newsapi.org/bbcsport-s.png",
  bloomberg: "http://i.newsapi.org/bloomberg-s.png",
  buzzfeed: "http://i.newsapi.org/buzzfeed-s.png",
  cnbc: "http://i.newsapi.org/cnbc-s.png",
  cnn: "http://i.newsapi.org/cnn-s.png",
  engadget: "http://i.newsapi.org/engadget-s.png",
  entertainmentweekly: "http://i.newsapi.org/entertainmentweekly-s.png",
  espn: "http://i.newsapi.org/espn-s.png",
  googlenews: "http://i.newsapi.org/googlenews-s.png",
  hackernews: "http://i.newsapi.org/hackernews-s.png",
  independent: "http://i.newsapi.org/independent-s.png",
  mashable: "http://i.newsapi.org/mashable-s.png",
  recode: "http://i.newsapi.org/recode-s.png",
  redditrall: "http://i.newsapi.org/redditrall-s.png",
  reuters: "http://i.newsapi.org/reuters-s.png",
  techcrunch: "http://i.newsapi.org/techcrunch-s.png",
  theguardianuk: "http://i.newsapi.org/theguardianuk-s.png",
  thehuffingtonpost: "http://i.newsapi.org/thehuffingtonpost-s.png",
  thenewyorktimes: "http://i.newsapi.org/thenewyorktimes-s.png",
  thenextweb: "http://i.newsapi.org/thenextweb-s.png",
  theverge: "http://i.newsapi.org/theverge-s.png",
  thewallstreetjournal: "http://i.newsapi.org/thewallstreetjournal-s.png",
  thewashingtonpost: "http://i.newsapi.org/thewashingtonpost-s.png",
}

export function findSourceLogo(source) {
  for(var k in logos) {
    if(k === source) {
      return logos[k]
    }
  }
}