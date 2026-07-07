import PageBanner from "../../components/ui/PageBanner";

import FeaturedNews from "../../components/news/FeaturedNews";
import LatestNewsGrid from "../../components/news/LatestNewsGrid";
import NewsCategories from "../../components/news/NewsCategories";
import NewsletterCTA from "../../components/news/NewsletterCTA";

import banner from "../../assets/banners/news-banner.jpg";

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