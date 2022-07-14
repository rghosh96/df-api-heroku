const chatbot = require('../chatbot/chatbot')

module.exports = app => {
    app.post('/query-intent', async(req, res) => {
        // console.log(req)
        const { text, userId } = req.body;
        const resultQuery = await chatbot.intentQuery(text, userId) // function in chatbot.js
        console.log("RETURNED ITEM")
        // console.log(resultQuery)

        let agentText
        let payload = {}

        // get agent text
        agentText = resultQuery.fulfillmentMessages[0].text.text[0]
        console.log("agentText:", agentText)

        // check if any payload
        if (resultQuery.fulfillmentMessages.length > 1) {
            let df_payload = resultQuery.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values
            console.log("payload: ")
            console.log(df_payload)
            for (let i = 0; i < df_payload.length; i++) {
                console.log("PAYLOAD", df_payload[i])
                let type = df_payload[i].structValue.fields.type.stringValue
                console.log("TYPE", type)

                switch(type) {
                    case "chips":
                        let choiceText = []
                        let options = df_payload[i].structValue.fields.options.listValue.values
                        for (let i = 0; i < options.length; i++) {
                            choiceText.push(options[i].structValue.fields.text.stringValue)
                        }
                        payload["chips"] = choiceText
                        break;
                    case "button":
                        let buttonDetails = {
                            link: df_payload[i].structValue.fields.link.stringValue,
                            text: df_payload[i].structValue.fields.text.stringValue
                        }
                        payload["button"] = buttonDetails
                        break;
                    case "description":
                        let text = df_payload[i].structValue.fields.text.listValue.values
                        let textValues = []
                        for (let i = 0; i < text.length; i++) {
                            textValues.push(text[i].stringValue)
                        }
                        let descriptionDetails = {
                            title: df_payload[i].structValue.fields.title.stringValue,
                            text: textValues
                        }
                        payload["description"] = descriptionDetails
                        break;
                    default:
                        // code block
                    }
            }
        } else {
            payload = null
        }

        let frontendData = {
            agentText: agentText,
            payload: payload
        }

        res.send(frontendData)
    })

    app.get('/get-intent', (req, res) => {
        console.log(req)
        res.send("in get-intent!")
    })
}