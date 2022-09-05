const {
  constructHeader,
  constructCTAs,
  addImage,
  constructBody,
} = require("./util");
module.exports.people = (data) => {
  let blockBuilder = {};
  let blocks = [];
  /**Header or title */
  blocks.push(constructHeader(data));
  /** Body || Description || RTD || c_body in current sb */
  //   blocks.push(constructBody(data));
  constructBody(data).forEach((item) => blocks.push(item));

  blocks.push(addImage(data));
  /** Add a divider for CTAs */
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };

  blocks.push(divider);
  blocks.push(constructCTAs(data));
  blockBuilder.blocks = blocks;
  return blockBuilder;
};
