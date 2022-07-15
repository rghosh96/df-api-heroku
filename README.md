# df-api-heroku
dialogflow API built with node js + express, deployed on heroku. 

there is currently just one endpoint that's really implemented, which is `query-intent`. 

## `query-intent`
**purpose:** to chat with the dialogflow agent by sending your chat message and then receive a reply back

**request body:** should include 2 things: 
1. the `text` (string) query to be sent
2. some arbitrary `userId` (string)

example:
```
{
	"text": "Click here to begin! name=rashi age=25 location=gainesville",
	"userId": "rg-100196"
}
```

**response**: consists of up to 2 parts:
* the `agentText` (string), or what the agent says in response to your message
* `payload` (object); can be null if you do not send any type of payload from dialogflow. only 3 types of payloads are currently accounted for: `chips`, `button`, `description`

example:
```
{
    "agentText": "Hi Rashi, nice to meet you! As you may know, we're going to talk about clinical trials today. But before we dive in, how familiar are we with clinical trials?",
    "payload": {
        "chips": [
            "I've never heard of clinical trials before.",
            "I'm kind of familiar; I've heard the term before.",
            "I'm very familiar with clinical trials."
        ],
        "description": {
		    "title": "Clinical Trials - Interventions",
		    "text": [
		        "Medical products, such as drugs or devices",
		        "Procedures; or changes to participants' behavior, such as diet"
		    ]
		},
		"button": {
		    "link": "https://clinicaltrials.gov/ct2/about-studies/learn",
		    "text": "More information"
		}
    }
}
```
