function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

    tweet_array.sort((a, b) => a.time - b.time);

    var tweet_num = tweet_array.length;

    document.getElementById('firstDate').innerText = tweet_array[0].time.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    document.getElementById('lastDate').innerText = tweet_array[tweet_num-1].time.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

    var completed_num = 0;
    var live_num = 0;
    var achievement_num = 0;
    var miscellaneous = 0;

    tweet_array.forEach(element => 
        {
            if (element.source==="completed_event"){completed_num++;}
            else if (element.source==="live_event"){live_num++;}
            else if (element.source==="achievement"){achievement_num++; }
            else if(element.source==="miscellaneous"){miscellaneous++;}
        });

    document.getElementsByClassName('liveEvents')[0].innerText = live_num;
    document.getElementsByClassName('liveEventsPct')[0].innerText = math.format((live_num/tweet_num)*100, {notation: 'fixed', precision: 2}) + '%';

    document.getElementsByClassName('completedEvents')[0].innerText = completed_num;
    document.getElementsByClassName('completedEvents')[1].innerText = completed_num;
    document.getElementsByClassName('completedEventsPct')[0].innerText = math.format((completed_num/tweet_num)*100, {notation: 'fixed', precision: 2}) + '%';

    document.getElementsByClassName('achievements')[0].innerText = achievement_num;
    document.getElementsByClassName('achievementsPct')[0].innerText = math.format((achievement_num/tweet_num)*100, {notation: 'fixed', precision: 2}) + '%';

    document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous;
    document.getElementsByClassName('miscellaneousPct')[0].innerText = math.format((miscellaneous/tweet_num)*100, {notation: 'fixed', precision: 2}) + '%';
    
    var written_tweets_num = 0;
    tweet_array.forEach(element =>
        {
            if (element.written != ''){written_tweets_num++;}
        });

    document.getElementsByClassName('written')[0].innerText = written_tweets_num;
    document.getElementsByClassName('writtenPct')[0].innerText = math.format((written_tweets_num/completed_num)*100, {notation: 'fixed', precision: 2}) + '%';
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});