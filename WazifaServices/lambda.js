let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {

    let receiver = event['params']['querystring']['receiver'];
    let sender = event['params']['querystring']['sender'];
    let message = event['params']['querystring']['message'];
    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': sender
            }
        },
        PhoneNumber: receiver
    }).promise()
        .then(data => {
            // your code goes here
        })
        .catch(err => {
            // error handling goes here
        });
 

    console.log("Sending message", message, "to receiver", receiver);

    callback(null, 'Successfully executed');
}