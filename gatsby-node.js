const axios = require("axios");

exports.onPreInit = () =>
  console.log("Loading gatsby-source-google-reviews-MultiLang");

const NODE_TYPE = "GoogleReview";

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { placeId, apiKey, language, langs = [], isEnabled, ...rest }
) => {
  const { createNode } = actions;

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "You must supply a valid API Key from Scale Serp. Visit https://scaleserp.com/ for more information."
    );
  }

  if (!placeId || typeof placeId !== "string") {
    throw new Error(
      "You must supply a valid place id from Google. You can find your place id at https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder."
    );
  }

  const params = {
    api_key: apiKey,
    search_type: "place_reviews",
    place_id: placeId,
    language: language
  };

  const response = await axios
    .get("https://api.scaleserp.com/search", {
      params,
    })
    .catch((error) => {
      throw new Error(`Error fetching results from ScaleSerp API: ${error}`);
    });

  if (!response || !response.data)
    throw new Error(`Error fetching results from ScaleSerp API:`);

  const reviews = response.data.place_reviews_results || [];
  reviews.forEach((review, i) => {
    createNode({
      ...review,
      sourceImage: review.source_image,
      sourceLink: review.source_link,
      id: createNodeId(`${NODE_TYPE}-${i}`),
      test: true,
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(review),
        contentDigest: createContentDigest(review),
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type GoogleReview implements Node @dontInfer {
      rating: Int
      position: Int
      body: String
      date: String
      sourceLink: String
      sourceImage: String
      position: Int
      source: String
      position: Int
    }
  `;

  createTypes(typeDefs);
};
