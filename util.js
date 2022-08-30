module.exports.constructHeader = (data) => {
  return {
    type: "header",
    text: {
      type: "plain_text",
      text: data.name || data.title,
    },
  };
};
module.exports.constructBody = (data) => {
  let bodyArray = [];
  (data.description || data.richTextDescription || data.body || data.c_body)
    .match(/[^\s].{1,2999}((?=\s|$)|(?<=[.,]))/g)
    .forEach((item) => {
      bodyArray.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: item,
        },
      });
    });
  return bodyArray;
};
module.exports.constructCTAs = (data) => {
  let cta;
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
          url: data.c_primaryCTA.link
            ? data.c_primaryCTA.link.replace(/^.*(www\.)/, "https://www.")
            : "https://yext.com",
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
        url: data.c_secondaryCTA.link
          ? data.c_secondaryCTA.link.replace(/^.*(www\.)/, "https://www.")
          : "https://yext.com",
        action_id: "button-action-cta2",
      });
      if (data.c_tertiaryCTA) {
        cta.elements.push({
          type: "button",
          text: {
            type: "plain_text",
            text: data.c_tertiaryCTA.label,
          },
          value: data.c_tertiaryCTA.label,
          url: data.c_tertiaryCTA.link
            ? data.c_tertiaryCTA.link.replace(/^.*(www\.)/, "https://www.")
            : "https://yext.com",
          action_id: "button-action-cta3",
        });
      }
    } else {
      if (data.type === "event")
        cta.elements.push({
          type: "button",
          text: {
            type: "plain_text",
            text: `Get directions`,
          },
          value: `Get directions`,
          url: `https://www.google.com/maps/place/${data.geocodedCoordinate.dude},${data.geocodedCoordinate.longitude}`,
          action_id: "button-action-cta_dir",
        });
    }
  }
  return cta;
};

module.exports.constructVideo = (data) => {
  return {
    type: "video",
    title: {
      type: "plain_text",
      text: data.name || data.title,
      emoji: true,
    },
    title_url: data.landingPageUrl,
    description: {
      type: "plain_text",
      text: data.description,
      emoji: true,
    },
    video_url: data.c_videoEmbedUrl,
    alt_text: data.name || data.title,
    thumbnail_url: data.c_thumbnail,
    author_name: data.c_author,
    provider_name: "YouTube",
    provider_icon_url:
      "https://a.slack-edge.com/80588/img/unfurl_icons/youtube.png",
  };
};

module.exports.constructMap = (data) => {
  return {
    type: "image",
    title: {
      type: "plain_text",
      text: data.name || data.title,
      emoji: true,
    },
    image_url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${data.geocodedCoordinate.longitude}%2C${data.geocodedCoordinate.latitude}%5D%7D)/${data.geocodedCoordinate.longitude},${data.geocodedCoordinate.latitude},17,0/400x300?access_token=pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ`,
    alt_text: "marg",
  };
};

module.exports.constructLocCtas = (data) => {
  return {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: `Get directions`,
        },
        value: `Get directions`,
        url: `https://www.google.com/maps/place/${data.geocodedCoordinate.dude},${data.geocodedCoordinate.longitude}`,
        action_id: "button-action-cta_loc_dir",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: `Call`,
        },
        value: `Call`,
        url: `https://www.google.com/maps/place/${data.geocodedCoordinate.dude},${data.geocodedCoordinate.longitude}`,
        action_id: "button-action-cta_call",
      },
    ],
  };
};
