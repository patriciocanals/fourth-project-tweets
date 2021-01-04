//Variable
const form = document.querySelector('#tweetForm');
const tweetsList =  document.querySelector('#tweets-list');
let tweets = [];
//EventListeners
eventListeners();

function eventListeners(){
    form.addEventListener('submit',addTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        createHTML();
    } )
}
//Functions
function addTweet(e){
    e.preventDefault();
    
    //TextArea
    const tweet =  document.querySelector('#tweet').value;

    //Validate
    if(tweet === ''){
        emptyError('Cannot be empty');
        return;
    }

    //Add tweets to array
    const tweetObj = {
        id: Date.now(),
        text: tweet
    };

    tweets = [...tweets,tweetObj];
    
    //Creating HTML
    createHTML();
    form.reset();
}

function emptyError(msg){
    const errorMsg = document.createElement('p');
    errorMsg.textContent = msg;
    errorMsg.classList.add('error');

    const content = document.querySelector('#content');
    content.appendChild(errorMsg);
    setTimeout( ()=> {
        errorMsg.remove();
    }, 2000)
}

function createHTML(){
    cleanHTML();
    if(tweets.length > 0){
        tweets.forEach( tweet => {
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('delete-tweet');
            btnDelete.innerText = 'X';
            btnDelete.onclick = ()=>{
                deleteTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.text;
            li.appendChild(btnDelete);

            tweetsList.appendChild(li);
        });
    }
    storageSync();
}
//Tweets to LS
function storageSync(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function deleteTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    createHTML();
}

function cleanHTML(){
    while(tweetsList.firstChild){
        tweetsList.removeChild(tweetsList.firstChild);
    }
}