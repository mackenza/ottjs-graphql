#Intro to GraphQL for Ottawa JS Meetup
This is a quick intro to [GraphQL](http://graphql.org) that I gave to the [Ottawa Javascript Meetup](http://ottawajs.org/)
user group on Feb 10, 2016.

###What's Here?
The repo consists of a number of parts I used to demo GraphQL
* The reference implementation of GraphQL from Facebook in Javascript
* The GraphQL Express server with GraphiQL web playground, also from Facebook
* Slightly adapted (more to come) GitHub API from the GraphQLHub project
* A slide deck introducing GraphQL using the Shower presentation library
* A very simple HTML demo of using GraphQL to specify exactly what data you want for your view
* A cryptic outline of the live coding demo (mainly intended as a reminder for me but may be useful)
* The end of demo full query I was building in the demo. Can be pasted into GraphiQL to see end result

###Getting Started
1. Clone this repo
1. `npm install`
1. `npm start` to run the Express server
1. Go to [http://localhost:3000](http://localhost:3000) for GraphiQL and exploring the GitHub API schema
1. Go to [http://localhost:3000/slides](http://localhost:3000/slides) for the Slides (using Shower)
1. Go to [http://localhost:3000/demo.html](http://localhost:3000/demo.html) for the simple Repo browser demo app

###What is not here?
* I didn't include any code that showed Relay. I felt like grasping the concepts of GraphQL was enough
to get started with. Perhaps I will do another session on Relay in the future.
* The GitHub API schema I used has no Mutations. I plan to flesh out the schema and add mutations in the
future but for now, they are not part of the demo.