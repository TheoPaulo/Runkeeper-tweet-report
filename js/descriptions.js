function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	}).filter(function(element) {
		return element.written;
	} );
}


function addEventHandlerForSearch() {
	let input_letter = document.querySelector('input').value;
	let tweets_with_letter = [];

	let result_table = document.getElementById('tweetTable');

	// search for the inputted text in the array of tweets
	if (input_letter != '')
	{
		tweets_with_letter = tweet_array.filter(element =>
		{
			if (element.writtenText.includes(input_letter)){return element;}
		});
	}
	else
	{
		tweets_with_letter = []
	}

	result_table.innerHTML = ' ';
	var table_index = 1;

	tweets_with_letter.forEach(element =>
		{
			result_table.innerHTML += element.getHTMLTableRow(table_index++);
		}
	)

	document.getElementById('searchText').innerText = input_letter;
	document.getElementById('searchCount').innerText = tweets_with_letter.length;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('searchText').innerText = '';
	document.getElementById('searchCount').innerText = '0';
	//addEventHandlerForSearch();
	document.getElementById('textFilter').addEventListener('keyup', function(){addEventHandlerForSearch()})
	loadSavedRunkeeperTweets().then(parseTweets);
});