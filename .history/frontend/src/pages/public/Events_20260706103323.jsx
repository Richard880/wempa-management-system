import PageBanner from "../../components/ui/PageBanner";
import FeaturedEvent from "../../components/events/FeaturedEvent";
import UpcomingEvents from "../../components/events/UpcomingEvents";
import EventCalendar from "../../components/events/EventCalendar";
import PastEvents from "../../components/events/PastEvents";
import EventsCTA from "../../components/events/EventsCTA";

import banner from "../../assets/banners/ab-banner.jpg";

function Events() {
  return (
    <>
      <PageBanner
        title="Events"
        subtitle="Stay informed about conferences, workshops, seminars and networking opportunities organized by WEMPA."
        background={banner}
      />

      <FeaturedEvent />

      <UpcomingEvents />

      <EventCalendar />

      <PastEvents />

      <EventsCTA />
    </>
  );
}

export default Events;
