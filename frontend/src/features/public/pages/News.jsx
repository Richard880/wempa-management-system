import PageBanner from "../../../components/common/PageBanner";

import FeaturedNews from "../../news/components/FeaturedNews";
import LatestNewsGrid from "../../news/components/LatestNewsGrid";
import NewsCategories from "../../news/components/NewsCategories";
import NewsletterCTA from "../../news/components/NewsletterCTA";

import banner from "../../../assets/banners/event-banner.jpeg";

function News() {
  return (
    <>
      <PageBanner
        title="News & Publications"
        subtitle="Stay updated with the latest news, announcements, partnerships and maritime developments from WEMPA."
        background={banner}
      />

      <FeaturedNews />

      <LatestNewsGrid />

      <NewsCategories /> 

      <NewsletterCTA />
    </>
  );
}

export default News;
