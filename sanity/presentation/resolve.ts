import {
  defineLocations,
  defineDocuments,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    home: defineLocations({
      locations: [{ title: "Home", href: "/" }],
      message: "This document controls the home page.",
    }),
  },
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "home"` },
  ]),
};
