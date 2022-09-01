const { constructHeader, constructMap, constructLocCtas } = require("./util");
module.exports.location = (data) => {
  let blockBuilder = {};
  let blocks = [];
  /**Header or title */
  blocks.push(constructHeader(data));
  /** Body || Description || RTD || c_body in current sb */
  blocks.push(constructMap(data));
  /** Add a divider for CTAs */
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };

  blocks.push(divider);
  blocks.push(constructLocCtas(data));
  blockBuilder.blocks = blocks;

  return blockBuilder;
};
