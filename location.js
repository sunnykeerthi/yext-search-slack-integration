const { constructHeader, constructMap, constructLocCtas } = require("./util");
module.exports.location = (data) => {
  let blockBuilder = {};
  let blocks = [];
  /**Header or title */
  let header = constructHeader(data);
  blocks.push(header);
  /** Body || Description || RTD || c_body in current sb */
  let mapBody = constructMap(data);
  blocks.push(mapBody);
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
  console.log(blocks);

  return blockBuilder;
};
