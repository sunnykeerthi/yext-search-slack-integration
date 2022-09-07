# Slack - Search Integration

This use case can be(one of the) best solution(s) for workspace. Most of the orgs have slack as a collaboration tool, and, the user can get the answers by asking the question in slack instead of navigating to a website.

We at Demmo engineering team created a slack app(bot) that answers users queries by using the [search-core](https://www.npmjs.com/package/@yext/search-core) sdk.

Before we proceed, Clone or download the repo to your local.

Here is my [sandbox](https://sandbox.yext.com/s/3175991/entities2)

## Configuration

### Slack

- Navigate to [Slack API page](https://api.slack.com/), click on create an app and select From scratch.
- Give an app name (this can be changed later) and select a workspace to deploy it to and click `create app`.
- In _basic info_, under _App Credentials_, copy _Signing Secret_ and save it in your local (We'll use this later).
<img width="400" alt="Screenshot 2022-09-07 at 4 09 34 PM" src="https://user-images.githubusercontent.com/17703864/188859934-ddb663c8-d3c3-419a-a278-0f05252fe55e.png"> 

- Under Display Information, we can update the app details.
- Under App-Level Tokens, Click _Generate Token and Scopes_, give it a name and click add scope and select `connections:write` and click generate. Copy the _App token_ generated and save it in your local (We'll use this later). **Note This will be visible only once.**
<img width="400" alt="Screenshot 2022-09-07 at 4 15 07 PM" src="https://user-images.githubusercontent.com/17703864/188859899-9b06e989-f306-4dd5-93ad-311b8163cd63.png">

- Under features navbar in left, click OAuth and Permissions and add the scopes as shown below. More about [OAuth scopes](https://api.slack.com/scopes).
- Scroll up and click Install to workspace. This will create OAuth tokens for your workspace.
  Copy _Bot User OAuth Token_ and save it in your local (We'll use this later).
<img width="400" alt="Screenshot 2022-09-07 at 4 12 35 PM" src="https://user-images.githubusercontent.com/17703864/188859921-2c129d75-0031-4862-b1ac-830c2547a687.png">


### Yext

- If you don't have an Yext account, please request by [clicking here](https://www.yext.com/free-trial).
- With the KG populated and search configured. Navigate to the created search experience under all search experiences in the left pane, or, do a quick search of _yourExperienceName_ by `CMD+k`(mac) or `CTRL+k`(windows).
- From experience details page copy _Experience Key_ and _API Key_ and save it in your local (We'll use this later).
<img width="400" alt="Screenshot 2022-09-07 at 4 19 36 PM" src="https://user-images.githubusercontent.com/17703864/188860889-6f4adfd6-e34d-4ad2-928d-9aa27214e55c.png">

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

<img width="400" alt="Screenshot 2022-09-07 at 4 22 21 PM" src="https://user-images.githubusercontent.com/17703864/188862503-b4e79bc9-6002-4bf3-846e-faf5dc601d70.png">

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

once done, click open app fron top right and copy the URL and save it seperately (should be of format `https://XXXXXXX.herokuapp.com/`).
<img width="400" alt="Screenshot 2022-09-07 at 4 31 52 PM" src="https://user-images.githubusercontent.com/17703864/188863129-f28177a1-1a17-4d62-9d04-d04a2069fb22.png">

### Binding Slack and heroku

On your slack app page

- Navigate to _Interactivity & Shortcuts_, make sure that Interactivity is on and paste the url copied in previous step as **Request URL**.
- Navigate to _Event Subscriptions_, make sure that Interactivity is on and paste the url copied in previous step as **Request URL**. 

|   |   |
| ------------ | ------------ |
| <img width="400" alt="Screenshot 2022-09-07 at 4 23 50 PM" src="https://user-images.githubusercontent.com/17703864/188862048-3359ff90-df44-426f-b22e-55ab9003c46d.png">  |  <img width="400" alt="Screenshot 2022-09-07 at 4 23 27 PM" src="https://user-images.githubusercontent.com/17703864/188862059-f5643901-2e2a-49a9-8b65-2b87e06f5340.png"> |


Note: If you don't see an option to enter Requrset URL, socket mode may be enabled. To disable it, In your slack app page, Click _Socket Mode_ from left nav pane and toggle to disable **Enable Socket Mode** and retry the above 2 steps.
<img width="400" alt="Screenshot 2022-09-07 at 4 22 54 PM" src="https://user-images.githubusercontent.com/17703864/188862318-2fde9994-09b7-4755-b20a-e1106a34a7c5.png">

### Other settings

Following the above guide, you can add the app to a channel and communicate with it. But if the communication needs to be 1:1 navigate to _App Home_ tab and check **Direct messages your app sends will show in this tab.** checkbox.

<img width="902" alt="Screenshot 2022-09-07 at 4 34 17 PM" src="https://user-images.githubusercontent.com/17703864/188863340-e001f0a8-d281-4ebd-a9ac-8f58f3b599fc.png">

