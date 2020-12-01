const messengerServices = require("./messenger.services");

const VERIFY_TOKEN = "test";

var Mess = require("./messenger.model");
/*
 * Webhook Verification GET
 */
function handleVerifyServer(req, res) {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
}

/*
 * Webhook POST handler
 */
function handleWebhookEvent(req, res) {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      // console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;

      // Bad flow to do it , it use for the idea but but use in production . Please !!!
      Mess.findOne({ userId: sender_psid }, function (err, mess) {
        // neu truoc do da login
        if (mess) {
          if (webhook_event.message) {
            if (mess.loop == 0) {
              if (mess.admin == 1) messengerServices.handleMessage(sender_psid, webhook_event.message);
              else if (webhook_event.message.text == "login") messengerServices.handleLogin(sender_psid);
            } else if (webhook_event.message.text == "exit")
              messengerServices.handleUserMessage(sender_psid, webhook_event.message.text);
            else messengerServices.handleLoopMessage(sender_psid, webhook_event.message);
          } else if (webhook_event.postback) {
            messengerServices.handlePostback(sender_psid, webhook_event.postback);
          }
        } else {
          if (webhook_event.message) {
            // Neu truoc do chua dang nhap lan nao
            if (webhook_event.message.text == "login") {
              var mess = new Mess({
                userId: sender_psid,
                loop: 0,
              });
              mess.save(function (err) {
                if (err) return console.log(err);
              });
              messengerServices.handleLogin(sender_psid);
            } else {
              messengerServices.handleUserMessage(sender_psid, webhook_event.message.text);
            }
          } else if (webhook_event.postback) {
            messengerServices.handleUserMessage(sender_psid, webhook_event.postback.payload);
          }
        }
      });
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  handleVerifyServer: handleVerifyServer,
  handleWebhookEvent: handleWebhookEvent,
};
