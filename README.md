## Greddiit - A Reddit Clone
<br/>

## AIM: Build a full-stack social media platform using MERN Stack

### MERN -> MongoDB, React JS, Express JS (REST API) and Node JS.
<br/>

## Requirements: 

### The requirements followed is all based off of the assignment 1 pdf attached.

<br/>


## Tree outline:
#### The entire project is divided into the following structure. The assignment, has 2 folders, 1 for the frontend and another for the backend.


<center><img src=./frontend/images/tree.png /></center>


## To run the local files on your system:
<ol>
<li> Change your backend .env file's port option to any port that you desire you backend should run in, in my case I have taken port 5000.</li>
<li> Open 2 seperate terminals:
<ul>
<li> 1 terminal direct it to the frontend folder </li>
<li> The other terminal direct it to the backend folder. </li>
</ul>
</li>
</ol>

#### Run the below command to start the application:

``` 
    /frontend$ npm start
    /backend$ npm start
```

### Tools and dependencies used:
<ol>
<li>react-router-dom</li>
<li>bcrypt library</li>
<li>jsonwebtoken</li>
<li>mongoose</li>
<li>nodemon</li>
<li>react-redux</li>
<li>docker</li>
<li>Material UI (mui) -> formatting tool, and icons library</li>
</ol>

<br/>

# Layout of the Web-app:

## Login / Registration Page:

<ol>
<li> The login and registration page have the same URL. The forms can be toggled between by a link at the base of each of the forms </li>
<li> Registration:
<ul>
<li> The register form compulsorily requires username, firstname, email and password, every other detail is optional. email should be unique to all users. </li>
<li> The user is not registered if any of the above compulsory parameters are not specified.</li>
<li> The registered data moves to backend using API calls</li>
</ul>
 </li>
<li> Login:
<ul>
<li> The login form has 2 types of secure entry into the core of the web application - <strong>Authentication</strong> and <strong> Authorization </strong></li>
<li>Takes in input of <strong>email and password.</strong></li>
<li> The login directs user to their User profile page</li>
</ul>
</li>
</ol>
<br/>

## User Profile Page:

<ol>
<li> The user profile has options to display the <em>followers and following</em> of the users as well as an option to <em>edit </em>the USER details.</li>
<li> The followers and following options are clickable and display the followers and following in a dialog box with an option to remove and unfollow. </li>
<li> the user details are mentioned in the button named as INFO. </li>
</ol>

<br/>

## MySubgreddits Page:

 <ol>
 <li> The MySubgreddits page has all the subgreddits created by the user.</li>
 <li> The page opens up with a create subgreddit button which has 4 fields - name, description, tags and banned keywords which are all compulsory to be filled</li>
 <li> The creator of the subgreddit is the moderator and has access to new pages like,
 <ul>
 <li> <strong>Joining Requests Page</strong> -> This page has all the details about the users (other than the moderator) who wants to join the subgreddit. The moderator has 2 option - ACCEPT or REJECT the user. If accepted the user can view and post in the subgreddit freely. If rejected they won't given any access.</li>
 <li> <strong>Users page</strong> -> The users of the subgreddit are displayed as a list - unblocked then blocked. </li>
 </ul>
 </li>
 <li> Each subgreddit has 1 button (if not accepted into subgreddit) - JOIN, or (if accepted) has 2 buttons - OPEN and LEAVE. </li>
 <li> The moderator cannot leave the subgreddit created by him/her.</li>
 </ol>


<br/>

 ## All Subgreddits Page:

 <ol>
 <li> This page has the list of all the subgreddits created in the app -> First the JOINed subgreddits are displayed along with the Remaining subgreddits </li>
 <li> The page has 4 sorting button - ascending, descending (based on name), followers (desc), creationDate.</li>
 <li> This page also has a search functionality (implemented using fuzzy search), which searches through all the joined and remaining subgreddits.</li>
 </ol>

<br/>

 ## Subgreddit Page:

 <ol>
 <li>On opening any subgreddit, the name and description is mentioned on the left hand side.</li>
 <li>There is a create post button takes in 2 entries, title and description -> the post created is scanned for any banned words, in their presence the word is replaced with astericks.</li>
 <li> Each post has a upvote, downvote, save, follow and comment functionality.</li>
 <li> A user can upvote or downvote only once. A user can upvote and downvote the same post if he/she wanted to.</li>
 <li> a user can follow another only using the post follow button</li>
 </ol>

<br/>

 ## Saved Posts:
  <ol>
  <li> All the saved posts are displayed here, with all the functional options applicable.</li>
  <li> All the saved posts from all the subgreddits joined by the users is displayed here.</li>
  <li> There also is an option to remove the post (UNSAVE).</li>
  </ol>

<br/>

## Dockerisation: 

###  Each of the folders has a docker file as well as a nginx folder.

#### Run the below command in the folder conatining the files and now the web-app is dockerized.
```
$ sudo docker-compose up --build
```












