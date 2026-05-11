import { Helmet } from "react-helmet-async";
import { brand } from "@/lib/brand";

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
};

const defaultDescription =
  "Learn AI, coding, React, full stack development, UI/UX, and production-ready project building with DevWithSunil.";

const SEO = ({
  title = "DevWithSunil - AI, Coding & Full Stack Projects",
  description = defaultDescription,
  canonical = brand.siteUrl,
  image = `${brand.siteUrl}/DevWithSunil.png`,
  type = "website",
}: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Sunil Kumar" />
    <meta
      name="keywords"
      content="DevWithSunil, React, Node.js, JavaScript, Full Stack Development, AI tools, UI UX, coding tutorials, production projects"
    />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content={brand.name} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

export default SEO;
