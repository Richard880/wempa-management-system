import conference from "../assets/events/conference.jpg";
import workshop from "../assets/events/workshop.jpg";
import career from "../assets/events/career-fair.jpg";
import cleanup from "../assets/events/cleanup.jpg";

export const featuredEvent = {
  id: 1,
  title: "Western Kenya Maritime Conference 2026",
  date: "2026-08-15T09:00:00",
  location: "Kisumu, Kenya",
  category: "Conference",
  price: "KES 2,000",
  seats: 180,
  image: conference,
  description:
    "Join maritime professionals, researchers and policy makers for WEMPA's flagship annual conference.",
};

export const upcomingEvents = [
  {
    id: 2,
    title: "Lake Victoria Safety Workshop",
    date: "10 September 2026",
    location: "Kisumu",
    category: "Workshop",
    price: "Free",
    seats: 60,
    image: workshop,
  },

  {
    id: 3,
    title: "Youth Maritime Career Fair",
    date: "6 October 2026",
    location: "Kisumu",
    category: "Career Fair",
    price: "Free",
    seats: 250,
    image: career,
  },

  {
    id: 4,
    title: "Marine Environmental Cleanup",
    date: "20 November 2026",
    location: "Homa Bay",
    category: "Community",
    price: "Free",
    seats: 500,
    image: cleanup,
  },
];

import symposium from "../assets/events/symposium.jpg";
import expo from "../assets/events/expo.jpg";
import training from "../assets/events/training.jpg";

export const pastEvents = [
  {
    id: 1,
    title: "Lake Victoria Maritime Symposium",
    date: "March 2026",
    location: "Kisumu",
    attendees: 320,
    image: symposium,
  },
  {
    id: 2,
    title: "Blue Economy Expo",
    date: "December 2025",
    location: "Kisumu",
    attendees: 540,
    image: expo,
  },
  {
    id: 3,
    title: "Maritime Safety Training",
    date: "August 2025",
    location: "Homa Bay",
    attendees: 180,
    image: training,
  },
];
