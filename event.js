const { constructHeader, constructBody, constructCTAs } = require("./util");

module.exports.event = (data) => {
  let blockBuilder = {};
  let blocks = [];
  /**Header or title */
  let header = constructHeader(data);
  blocks.push(header);
  /** Body || Description || RTD || c_body in current sb */
  let bdy = constructBody(data);
  bdy.forEach((item) => blocks.push(item));
  // blocks.push(bdy);
  /** Add a divider for CTAs */
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };
  let dateArray = getDayFromDate(data.time);
  /**Date and time */
  let startEndBlock = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Start:*\n ${dateArray[0]}`,
      },

      {
        type: "mrkdwn",
        text: `*End:*\n ${dateArray[1]}`,
      },
      {
        type: "mrkdwn",
        text: `*Venue:*\n ${data.venueName}`,
      },
      {
        type: "mrkdwn",
        text: `*Address:*\n ${data.address.line1}, \n ${data.address.city}, ${data.address.region}, ${data.address.postalCode}`,
      },
    ],
  };
  /** Add CTAs */
  blocks.push(startEndBlock);
  if (constructCTAs(data)) {
    blocks.push(divider);
    blocks.push(constructCTAs(data));
  }

  blockBuilder.blocks = blocks;
  console.log(JSON.stringify(blockBuilder));
  return blockBuilder;
};

const getDayFromDate = (date) => {
  let startDate = new Date(date.start);
  let endDate = new Date(date.end);
  let dataArray = [];

  dataArray.push(
    `${startDate.toLocaleDateString("en-us", {
      weekday: "short",
    })}, ${startDate.toLocaleDateString("en-us", {
      month: "long",
    })} ${startDate.getDate()}, ${startDate.getFullYear()}, ${startDate.toLocaleString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`
  );
  dataArray.push(
    `${endDate.toLocaleDateString("en-us", {
      weekday: "short",
    })}, ${endDate.toLocaleDateString("en-us", {
      month: "long",
    })} ${endDate.getDate()}, ${endDate.getFullYear()}, ${endDate.toLocaleString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`
  );
  return dataArray;
};
