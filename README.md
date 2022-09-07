# Slack - Search Integration

This use case can be(one of the) best solution(s) for workspace. Most of the orgs have slack as a collaboration tool, and, the user can get the answers by asking the question in slack instead of navigating to a website.

We at Demmo engineering team created a slack app(bot) that answers users queries by using the [search-core](https://www.npmjs.com/package/@yext/search-core) sdk.

Before we proceed, Clone or download the repo to your local.

Here is my [sandbox](https://sandbox.yext.com/s/3175991/entities2)

## Configuration

### Slack

- Navigate to [Slack API page](https://api.slack.com/), click on create an app and select From scratch.
- Give an app name (this can be changed later) and select a workspace to deploy it to and click create app.
- In basic info, under App Credentials, copy Signing Secret and save it in your local (We'll use this later).
- Under Display Information, we can update the app details.
- Under App-Level Tokens, Click _Generate Token and Scopes_, give it a name and click add scope and select `connections:write` and click generate. Copy the App token generated and save it in your local (We'll use this later). **Note This will be visible only once.**
- Under features navbar in left, click OAuth and Permissions and add the scopes as shown below. More about [OAuth scopes](https://api.slack.com/scopes).
- Scroll up and click Install to workspace. This will create OAuth tokens for your workspace.
  Copy User OAuth Token and Bot User OAuth Token and save it in your local (We'll use this later).

### Yext

- If you don't have an Yext account, please request by [clicking here](https://www.yext.com/free-trial).
- With the KG populated and search configured. Navigate to the created search experience under all search experiences in the left pane, or, do a quick search of _yourExperienceName_ by CMD+k(mac) or CTRL+k(windows).
- From experience details page copy _Experience Key_ and _API Key_ and save it in your local (We'll use this later).

### Test your app

You can test the bot that you created in 2 ways

#### Local server

- Open the cloned repo in your Favourite code editor
- Do an `npm install`
- Create a file `.env` and add the following to it. This is **CASE SENSITIVE**

```SLACK_SIGNING_SECRET = Signing Secret
SLACK_BOT_TOKEN = Bot User OAuth Token (`xoxb-XXXXX`)
SLACK_APP_TOKEN = App token (`xapp-XXXX`)
EXP_KEY = Yext Experience Key
API_KEY = Yext API Key
```

run the app by running the command `node app.js` in terminal

Note: to test using local, we need to enable socket mode in slack app.
In your slack app page, Click _Socket Mode_ from left nav pane and toggle to enable **Enable Socket Mode**

---

#### Heroku Deployment

With these things setup, the final step is to deploy this. (I use heroku for deployment).
Navigate to [heroku page](https://www.heroku.com/) (sign up) and sign in.

- Create a new app by clicking New in top right of the page.
- Give it a name and select the region(optional) and create
- You can deploy the code cloned in your locally either by pushing the code to github and linking it in this page or directly to heroku using the heroku CLI. more info (here)[https://devcenter.heroku.com/categories/deployment]
- Once deployed navigate to settings tab and click _Reveal Config Vars_. This is where we will be using the data stored in local. Add the following in key - value format and save it, please be aware that this **is CASE SENSITIVE**

| Key                  | Value                               |
| -------------------- | ----------------------------------- |
| SLACK_SIGNING_SECRET | Signing Secret                      |
| SLACK_BOT_TOKEN      | Bot User OAuth Token (`xoxb-XXXXX`) |
| SLACK_APP_TOKEN      | App token (`xapp-XXXX`)             |
| EXP_KEY              | Yext Experience Key                 |
| API_KEY              | Yext API Key                        |

once done, copy the URL and save it seperately (should be of format `https://XXXXXXX.herokuapp.com/`).

### Binding Slack and heroku

On your slack app page

- Navigate to _Interactivity & Shortcuts_, make sure that Interactivity is on and paste the url copied in previous step as **Request URL**.
- Navigate to _Event Subscriptions_, make sure that Interactivity is on and paste the url copied in previous step as **Request URL**.

Note: If you don't see an option ti enter Requrset URL, socket mode may be enabled. To disable it, In your slack app page, Click _Socket Mode_ from left nav pane and toggle to disable **Enable Socket Mode** and retry the above 2 steps.

### Other settings

Following the above guide, you can add the app to a channel and communicate with it. But if the communication needs to be 1:1 navigate to _App Home_ tab and check **Direct messages your app sends will show in this tab.** checkbox.
