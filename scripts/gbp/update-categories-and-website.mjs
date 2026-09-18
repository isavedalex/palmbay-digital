// One-shot, idempotent: sets the category list and canonical website on the listing.
import { gbp, config, V1 } from "./auth.mjs";
const body = {
  websiteUri: "https://palmbay.digital/",
  categories: {
    primaryCategory: { name: "categories/gcid:website_designer" },
    additionalCategories: [
      { name: "categories/gcid:design_agency" },
      { name: "categories/gcid:web_hosting_service" },
      { name: "categories/gcid:graphic_designer" },
      { name: "categories/gcid:marketing_agency" },
      { name: "categories/gcid:marketing_consultant" },
      { name: "categories/gcid:internet_marketing_service" },
    ],
  },
};
const data = await gbp(`${V1}/${config.locationName}?updateMask=websiteUri,categories&validateOnly=false`, { method: "PATCH", body: JSON.stringify(body) });
console.log("website:", data.websiteUri);
console.log("primary:", data.categories?.primaryCategory?.displayName);
console.log("additional:", (data.categories?.additionalCategories || []).map(c => c.displayName).join(", "));
