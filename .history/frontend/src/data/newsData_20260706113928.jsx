import conference from "../assets/news/conference.jpg";
import training from "../assets/news/training.jpg";
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