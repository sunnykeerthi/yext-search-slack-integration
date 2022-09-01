const { constructVideo, constructCTAs } = require("./util");

module.exports.ce_video = (data) => {
  let blockBuilder = {};
  let blocks = [];
  blocks.push(constructVideo(data));
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };
  if (constructCTAs(data)) {
    blocks.push(divider);
    blocks.push(constructCTAs(data));
  }

  blockBuilder.blocks = blocks;
  return blockBuilder;
};
