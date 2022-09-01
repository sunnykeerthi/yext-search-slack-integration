const { constructHeader, constructBody, constructCTAs } = require("./util");
module.exports.other_entities = (data) => {
  let blockBuilder = {};
  let blocks = [];
  /**Header or title */
  blocks.push(constructHeader(data));
  /** Body || Description || RTD || c_body in current sb */
  constructBody(data).forEach((item) => blocks.push(item));
  // blocks.push(bdy);
  /** Add a divider for CTAs */
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };
  /** Add CTAs */
  if (constructCTAs(data)) {
    blocks.push(divider);
    blocks.push(constructCTAs(data));
  }
  blockBuilder.blocks = blocks;
  return blockBuilder;
};
