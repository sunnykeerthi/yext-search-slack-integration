const { constructHeader, constructBody, constructCTAs } = require("./util");

module.exports.ce_document = (data) => {
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
  /** Add CTAs */

  if (constructCTAs(data)) {
    blocks.push(divider);
    blocks.push(constructCTAs(data));
  }
  blockBuilder.blocks = blocks;
  console.log(JSON.stringify(blockBuilder));
  return blockBuilder;
};
