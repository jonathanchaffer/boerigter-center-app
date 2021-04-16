/**
 * An object containing database collections to be used throughout the app,
 * to reduce the use of hardcoded strings.
 */
export const dbCollections = {
  // Automatically switches between the production and development version of the alumniStories
  // collection, depending on whether Node is in production of development mode.
  alumniStories: process.env.NODE_ENV === "production" ? "alumniStories" : "alumniStories-dev",
  users: "users",
};
