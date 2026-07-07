import conference from "../assets/event/conference.png";
import training from "../assets/event/training.png";
import partnership from "../assets/news/partnership.jpg";
import safety from "../assets/news/safety.jpg";

export const featuredNews = {
  id: 1,
  title: "WEMPA Hosts the Largest Maritime Conference in Western Kenya",
  category: "Conference",
  author: "WEMPA Secretariat",
  date: "15 July 2026",
  image: conference,
  description:
    "Hundreds of maritime professionals gathered in Kisumu to discuss innovation, blue economy opportunities, maritime safety, and regional collaboration.",
};
export const latestNews = [
  {
    id: 2,
    title: "New Maritime Safety Training Announced",
    category: "Training",
    author: "Training Department",
    date: "12 July 2026",
    image: training,
    excerpt:
      "WEMPA launches a new practical safety programme aimed at improving safety standards across Lake Victoria.",
  },

  {
    id: 3,
    title: "WEMPA Signs Partnership with KMFRI",
    category: "Partnership",
    author: "Secretariat",
    date: "8 July 2026",
    image: partnership,
    excerpt:
      "The partnership will strengthen research collaboration and promote innovation within Kenya's blue economy.",
  },

  {
    id: 4,
    title: "Lake Victoria Safety Awareness Campaign",
    category: "Safety",
    author: "Communications",
    date: "2 July 2026",
    image: safety,
    excerpt:
      "A region-wide awareness campaign targeting fishermen, boat operators and lakeside communities.",
  },
];

export const newsCategories = [
  {
    id: 1,
    name: "Announcements",
    count: 12,
    color: "#003B73",
  },
  {
    id: 2,
    name: "Training",
    count: 18,
    color: "#0077B6",
  },
  {
    id: 3,
    name: "Partnerships",
    count: 7,
    color: "#16A34A",
  },
  {
    id: 4,
    name: "Safety",
    count: 9,
    color: "#F59E0B",
  },
  {
    id: 5,
    name: "Blue Economy",
    count: 15,
    color: "#0EA5E9",
  },
  {
    id: 6,
    name: "Industry News",
    count: 22,
    color: "#7C3AED",
  },
];
