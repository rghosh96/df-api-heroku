// connect df w server
const dialogflow = require('dialogflow');

require('dotenv').config()

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const sessionId = "test-session"
const languageCode = "en"

const projectId = CREDENTIALS.project_id;

const credentials = {
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
}

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

const intentQuery = async(userText, userId) => {
    // connect w df api
    console.log(userId)
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId)
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: languageCode
            }
        }
    }

    try {
        console.log("IN TRY BLOCK")
        const response = await sessionClient.detectIntent(request)
        return response[0].queryResult
    } catch(error) {
        return error
    }
}

module.exports = {
    intentQuery
}