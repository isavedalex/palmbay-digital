// Usage: node scripts/gbp/find-category.mjs "design agency" "web hosting"
import { gbp, V1 } from "./auth.mjs";
for (const q of process.argv.slice(2)) {
  const { categories = [] } = await gbp(`${V1}/categories?regionCode=GB&languageCode=en&view=BASIC&pageSize=20&filter=${encodeURIComponent(`displayName="${q}"`)}`);
  console.log(q, "→", categories.map(c => `${c.name} (${c.displayName})`).join(" | ") || "none");
}
