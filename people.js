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
  /** Body || Description || RTD || c_body in current sandbox */
  constructBody(data).forEach((item) => blocks.push(item));
  /** Add an Image */
  blocks.push(addImage(data));
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };
  /** Add a divider for CTAs */
  blocks.push(divider);
  /** Add  CTAs */
  blocks.push(constructCTAs(data));
  /** pudh the entire data to blockBilder array */
  blockBuilder.blocks = blocks;
  /** return the block for slack rendering */
  return blockBuilder;
};
