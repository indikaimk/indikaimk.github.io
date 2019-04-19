---
layout: post
title:  "Twitter Analytics with R"
date:   2017-06-18 20:00:00 +0530
categories: R
---

Twitter is an interesting place for a Data Scientist not just because of the Tweets you can get related to that subject. Twitter exposes its Tweets data via an API which can be used to download a set of Tweets for offline analysis. <!--more-->

While you certailny would be able to develop an R program from scratch for working with the Twitter API, it would be much easier to work with an R package that is already developed for Twitter. Today we are going to work with one such package [rtweet] [rtweet].

# Prerequisites
You need to have R and R Studio installed. If do not have that I suggest you go through my previous post [Getting Started with R] [start-r]

# Setup Twitter Account
I assume you already have a Twitter account. If not [creating one] [twitter-signup] is quite easy. Twitter API adopts the industry standard [OAuth] [oauth] for authentication and authorization. Therefore you simply cannot use the username/password of your twitter account to authenticate via the API. 
Follow these steps to create your API key. Also note that Twitter tends alter these interfaces from time to time. However the basic methodology would be similar.

1. Visit [Twitter Apps][twitter-apps]
2. Click on "Create New App" button,
3. Fill in the Name, Description and Website fields and click "Create your Twitter application" button. (Since a web site address is not required for our API queries you can use a dummy URL for the Website field"
4. Your application would be created and you would be redirected to the newly created application page.
5. Click on "Keys and Access Tokens" tab. You will see two values "Consumer Key" and "Consumer Secret". These are the two parameters that will be used to authenticate API requests.

# Installing Required R Packages
Before continuing any further we have to install the package [rtweet] [rtweet]. We also need the package [ROAuth] [roauth] which implements the OAuth protocol. We can install both packages by running the below commands at the RStudio console.

    install.packages("rtweet")
    install.packages("ROAuth")

# Writing the R code
In order to keep things organized we will create a new R project for doing Twitter analytics. You can create a new project by clicking "New Project" item in "File" menu and providing a directory where the code of the project will reside. Once it is created create one R script by clicking the "R Script" in the sub menu of the "New" Icon.

## Creating the Authentication Token
Below code will create an authentication token for authenticating via Twitter API. Make sure you provide proper values for appname, key and secret variables. Also do not forget the double quotes since they are string values.

    auth.twitter <- function()
    {
      appname <- "<your app name>"
      key <- "<your key>"
      secret <- "<your secret>"
      twitter.token <- create_token(app = appname, consumer_key = key, consumer_secret = secret)  
      return(twitter.token)
    }

## Searching Twitter
Now we are going to do the actual search. Insert the following code in the same file above for doing the search function. Note how we are calling the auth.twitter function defined previousely. It is called directly at the argument definition of the search.twitter function. Here we are using the search_tweets function defined in the package "rtweet".

    search.tweets <- function(tag, n = 100, twitter.token = auth.twitter())
    {
      tweets <- search_tweets(tag, n = 1000, token = twitter.token)
      return(tweets[order(as.integer(tweets$created_at)),])
    }

## Running the search
Now it is time we search some keywords in Twitter using our own function. Run below function in the R console. Note that we do not have to explicitly specify valuse for n and twitter.token arguments.
    
    search.tweets("rails")

This will print in to the colsole the list, of tweets returned. Instead you can store the returned tweets in a variable by running the function as below.

    rails_tweets <- search.tweets("rails")


[rtweet]: https://cran.r-project.org/web/packages/rtweet/
[start-r]: {{site.baseurl}}{% post_url 2017-04-17-getting-started-with-r%}
[twitter-signup]: https://twitter.com/signup
[oauth]: https://oauth.net/
[twitter-apps]: https://apps.twitter.com/
[roauth]: https://cran.r-project.org/web/packages/ROAuth/index.html
