// Sets the social-profile attributes on the listing (v1 attributes endpoint).
import { gbp, config, V1 } from "./auth.mjs";
const attrs = [
  { name: "attributes/url_facebook", uriValues: [{ uri: "https://www.facebook.com/profile.php?id=61584315687257" }] },
  { name: "attributes/url_instagram", uriValues: [{ uri: "https://www.instagram.com/palmbay.digital/" }] },
];
const data = await gbp(`${V1}/${config.locationName}/attributes?attributeMask=attributes/url_facebook,attributes/url_instagram`, {
  method: "PATCH", body: JSON.stringify({ attributes: attrs }),
});
console.log(JSON.stringify(data.attributes?.filter(a => a.name.startsWith("attributes/url_")), null, 1));
