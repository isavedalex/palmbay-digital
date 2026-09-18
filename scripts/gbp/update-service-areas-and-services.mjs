// One-shot, idempotent: service areas (place IDs harvested from sibling listings)
// and the services list. Titles ≤58 chars, descriptions ≤300 (Google limits).
import { gbp, config, V1 } from "./auth.mjs";
const places = {
  "Margate, UK": "ChIJcZ09X1NS2UcRZTfD25gNKME",
  "Broadstairs, UK": "ChIJD2vu3hRT2UcRU6Lr5y1oDz4",
  "Ramsgate, UK": "ChIJdWtcJdNM2UcRVZhZ-v0BlFc",
  "Thanet District, UK": "ChIJh9GgOaRS2UcRwEztoi2uDgQ",
  "Herne Bay, UK": "ChIJoQk2xtk02UcRkf2DpCVUqG0",
  "Whitstable, UK": "ChIJfak1RbMy2UcRXDijFnj4Id4",
  "Sandwich, UK": "ChIJdfoM-iKs3kcRnUwtRYCzWSE",
  "Deal CT14, UK": "ChIJB1zNy9Ct3kcREIMjTzuXKUA",
  "Kent, UK": "ChIJl4Kx4hWo2EcRWRUgdmTnUZI",
  "South East, UK": "ChIJ17zNL3Q5dEgRHp0A3s84zfo",
  "London, UK": "ChIJdd4hrwug2EcRmSrV3Vo6llI",
  "United Kingdom": "ChIJqZHHQhE7WgIReiWIMkOg-MQ",
};
const cat = "categories/gcid:website_designer";
const svc = (displayName, description) => ({ freeFormServiceItem: { category: cat, label: { displayName, description, languageCode: "en" } } });
const services = [
  svc("Small business website design", "Bespoke websites for small businesses in Margate, Thanet and across Kent. Designed around your customers, fast on mobile and built to be found on Google."),
  svc("Web design", "Web design for trades, hospitality and independent professionals. Fast, good-looking sites that earn their keep, designed and built in Margate."),
  svc("Website hosting & updates", "We host, secure and keep your site running, connect your domain and make changes when you need them. A simple editor lets you update words and pictures yourself."),
  svc("Local SEO for small businesses", "The technical groundwork search engines expect, plus on-page keywords and content, so local customers across Kent find you when they search."),
  svc("Google Business Profile setup", "We set up or tidy your Google listing: categories, services, service areas, photos and posts, so you show up on Google Maps and in local search."),
];
for (const s of services) {
  const { displayName: t, description: d } = s.freeFormServiceItem.label;
  if (t.length > 58 || d.length > 300) throw new Error(`limit: ${t} (${t.length}/${d.length})`);
}
const body = {
  serviceArea: { businessType: "CUSTOMER_LOCATION_ONLY", regionCode: "GB", places: { placeInfos: Object.entries(places).map(([placeName, placeId]) => ({ placeName, placeId })) } },
  serviceItems: services,
};
const data = await gbp(`${V1}/${config.locationName}?updateMask=serviceArea,serviceItems`, { method: "PATCH", body: JSON.stringify(body) });
console.log("areas:", data.serviceArea.places.placeInfos.map(p => p.placeName).join("; "));
console.log("services:", data.serviceItems.map(s => s.freeFormServiceItem?.label.displayName || s.structuredServiceItem?.serviceTypeId).join(" | "));
