const axios = require("axios");

exports.onPreInit = () =>
  console.log("\nLoading gatsby-source-google-reviews-multiLang\n");

const NODE_TYPE = "GoogleReview";

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { placeId, apiKey, language }
) => {
  const { createNode } = actions;

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "You must supply a valid API Key from Google. Visit https://console.cloud.google.com/ for more information."
    );
  }

  if (!placeId || typeof placeId !== "string") {
    throw new Error(
      "You must supply a valid place id from Google. You can find your place id at https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder."
    );
  }
  const params = {
    key: apiKey,
    place_id: placeId,
    language: language
  };

  const response = await axios
    .get("https://maps.googleapis.com/maps/api/place/details/json", {
      params,
    })
    .catch((error) => {
      throw new Error(`Error fetching results from ScaleSerp API: ${error}`);
    });

  if (response?.data?.error_message) {
    console.error(
      `Error fetching google reviews: ` + response.data.error_message
    );
  }

  if (!response?.data?.result) {
    console.error(
      "There was an error fecthing google reviews: no reviews will populate",
      response.data
    );
  }

  const reviews = response?.data?.result?.reviews || [];

  reviews.forEach((review, i) => {
    createNode({
      ...review,
      sourceImage: review.profile_photo_url,
      sourceLink: review.author_url,
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
      sourceImage: String
      sourceLink: String
      id: ID
      position: Int
      author_name: String
      author_url: String
      language: String
      rating: Int
      profile_photo_url: String
      time: Int
      relative_time_description: String
      text: String
    }
  `;

  createTypes(typeDefs);
};
