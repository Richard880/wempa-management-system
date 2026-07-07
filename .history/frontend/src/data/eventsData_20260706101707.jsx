import conference from "../assets/events/conference.jpg";
import workshop from "../assets/events/workshop.png";
import career from "../assets/events/career-fair.jpg";
import cleanup from "../assets/events/cleanup.jpg";

export const featuredEvent = {
  id: 1,
  title: "Western Kenya Maritime Conference 2026",
  date: "15 August 2026",
  location: "Kisumu, Kenya",
  image: conference,
  description:
    "Join maritime professionals, researchers, policy makers and industry leaders for WEMPA's flagship annual conference.",
};

export const upcomingEvents = [
  {
    id: 2,
    title: "Lake Victoria Safety Workshop",
    date: "10 September 2026",
    location: "Kisumu",
    image: workshop,
  },
  {
    id: 3,
    title: "Youth Maritime Career Fair",
    date: "6 October 2026",
    location: "Kisumu",
    image: career,
  },
  {
    id: 4,
    title: "Marine Environmental Cleanup",
    date: "20 November 2026",
    location: "Homa Bay",
    image: cleanup,
  },
];
