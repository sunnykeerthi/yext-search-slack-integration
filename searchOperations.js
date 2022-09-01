const { provideCore } = require("@yext/answers-core");
const { other_entities } = require("./other_entities");
const { event } = require("./event");
const { ce_video } = require("./ce_videos");
const { location } = require("./location");
require("dotenv").config();
const core = provideCore({
  apiKey: process.env.API_KEY,
  experienceKey: process.env.EXP_KEY,
  locale: "en",
  experienceVersion: "STAGING",
  endpoints: {
    universalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    status: "https://answersstatus.pagescdn.com",
    universalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  },
});

module.exports.getSearchResult = async (queryString) => {
  const result = await core.universalSearch({
    query: queryString.text,
  });
  var answerJson = result.verticalResults[0].results[0].rawData;
  const entity_type = answerJson.type;
  console.log(entity_type);
  if (entity_type === "event") return event(answerJson);
  else if (entity_type === "ce_videos") return ce_video(answerJson);
  else if (entity_type === "location") return location(answerJson);
  else return other_entities(answerJson);
};
