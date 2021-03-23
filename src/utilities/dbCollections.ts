export const dbCollections = {
  alumniStories: process.env.NODE_ENV === "production" ? "alumniStories" : "alumniStories-dev",
  users: "users",
};
