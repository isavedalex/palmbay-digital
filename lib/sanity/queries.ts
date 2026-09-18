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
      openGraph {
        title,
        description,
        "image": select(imageType == "url" => imageUrl, image.asset->url)
      },
      twitter {
        card,
        title,
        description,
        "image": select(imageType == "url" => imageUrl, image.asset->url)
      },
      robots { index, follow }
    }
  }
`;
