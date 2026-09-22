import { groq } from "next-sanity";
import { seoProjection } from "@palmbay/sanity-seo/next";

export const HOME_QUERY = groq`
  *[_type == "home"][0]{
    _id,
    heading,
    subheading,
    body,
    ctaLabel,
    ctaUrl,
    ${seoProjection}
  }
`;
