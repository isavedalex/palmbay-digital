import { groq } from "next-sanity";

export const HOME_QUERY = groq`
  *[_type == "home"][0]{
    _id,
    heading,
    subheading,
    body,
    ctaLabel,
    ctaUrl,
    seo {
      title,
      description,
      canonicalUrl,
      openGraph { title, description, image },
      twitter { card, title },
      robots { index, follow }
    }
  }
`;
