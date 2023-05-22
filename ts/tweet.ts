class Tweet {
    private text:string;
    time:Date;

    constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        let lower = this.text.toLowerCase();
        if (lower.startsWith('just completed') || lower.startsWith('just posted')){return 'completed_event';}
        else if (lower.startsWith('watch')){return 'live_event';}
        else if (lower.startsWith('achieved') || lower.includes('set a goal')){return 'achievement';}
        else{return 'miscellaneous';}
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.includes('-'))
        {
            return true
        }
        return false
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        let written_text = this.text.substring(this.text.indexOf(' - '), this.text.indexOf('https') );
        return written_text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        let distance_test = new RegExp('([0-9]+\.?[0-9]*) (mi |km )');
        let index_before_distance_activity = new RegExp('(?<=(mi|km)) ');
        let time_test = new RegExp('in ([0-9]+:?[0-9]*)');
        let index_before_time_activity = new RegExp('(?<=( (a|an))) ');

        if (distance_test.test(this.text)) {
            return this.text.substring(this.text.search(index_before_distance_activity), this.text.search('-')).trim().toLowerCase();
        }
        else if (time_test.test(this.text)) {
            return this.text.substring(this.text.search(index_before_time_activity), this.text.search(time_test)).trim().toLowerCase();
        }
        else {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        let distance_test = new RegExp('([0-9]+\.?[0-9]*) (mi |km )');
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        let link_array = this.text.match(regex);
        let base_link = "";

        if (link_array != null)
        {
            link_array.forEach(element=> 
            {
                base_link += element.toString();
            });
        }

        let hyperlink = '<a href="' + base_link + '">'  + base_link + '</a>';
    
        hyperlink;
        
        let formatted_tweet = this.text.replace(base_link, hyperlink);;

        //table row
        return `<tr><td> ${rowNumber} </td><td> ${this.activityType} </td><td> ${formatted_tweet} </td></tr>`;

    }
}