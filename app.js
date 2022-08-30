const { App } = require("@slack/bolt");
require("dotenv").config();
const getResults = require("./searchOperations");
// Initializes your app with your bot token and signing secret with bolt mode

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN,
});

// Listens to incoming messages that contain "hello"
app.message(/^(.*)$/, async ({ message, say }) => {
  let res = await getResults.getSearchResult(message);
  await say(res);
});
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
