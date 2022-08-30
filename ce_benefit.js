module.exports.ce_benefit = (data) => {
  let blockBuilder = {};
  let blocks = [];
  let header = {
    type: "header",
    text: {
      type: "plain_text",
      text: data.name,
    },
  };
  let body = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: data.richTextDescription,
    },
  };
  let divider = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  };
  let cta = "";
  if (data.c_primaryCTA) {
    cta = {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: data.c_primaryCTA.label,
          },
          value: data.c_primaryCTA.label,
          url: data.c_primaryCTA.link.replace(/^.*(www\.)/, "https://www."),
          action_id: "button-action-cta1",
        },
      ],
    };
    if (data.c_secondaryCTA) {
      cta.elements.push({
        type: "button",
        text: {
          type: "plain_text",
          text: data.c_secondaryCTA.label,
        },
        value: data.c_secondaryCTA.label,
        url: data.c_secondaryCTA.link.replace(/^.*(www\.)/, "https://www."),
        action_id: "button-action-cta2",
      });
      if (data.c_tertiaryCTA) {
        cta.elements.push({
          type: "button",
          text: {
            type: "plain_text",
            text: data.c_tertiaryCTA.label,
          },
          value: data.c_tertiaryCTA.label.replace(/^.*(www\.)/, "https://www."),
          url: data.c_tertiaryCTA.link,
          action_id: "button-action-cta3",
        });
      }
    }
  }
  blocks.push(header);
  blocks.push(body);
  blocks.push(divider);
  blocks.push(cta);
  blockBuilder.blocks = blocks;
  return blockBuilder;
};
