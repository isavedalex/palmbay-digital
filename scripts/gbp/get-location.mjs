import { gbp, config, V1 } from "./auth.mjs";
const readMask = ["name","title","phoneNumbers","categories","storefrontAddress","websiteUri","regularHours","serviceArea","openInfo","profile","serviceItems","metadata"].join(",");
console.log(JSON.stringify(await gbp(`${V1}/${config.locationName}?readMask=${readMask}`), null, 2));
