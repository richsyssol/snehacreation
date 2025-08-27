import { Hand } from "lucide-react";
import {
  handbag1,
  handbag2,
  handcraft1,
  hero1,
  hero2,
  hero5,
  jwellery1,
  jwellery2,
  purse1,
  purse2,
  purse3,
  traditional1,
  wallart1,
  wallart2,
} from "../../assets";

// ProductImages.js
export const galleryItems = [
  {
    id: 1,
    name: {
      en: "Traditional Handbags",
      mr: "पारंपारिक हँडबॅग",
    },
    category: "handbags",
    image: purse1,
  },
  // {
  //   id: 2,
  //   name: {
  //     en: "Embroidered Purses",
  //     mr: "कशिदाकामाचे पर्स",
  //   },
  //   category: "purses",
  //   image: purse2,
  // },
  {
    id: 3,
    name: {
      en: "Embroidered Purses",
      mr: "कशिदाकामाचे पर्स",
    },
    category: "purses",
    image: handbag1,
  },
  // {
  //   id: 4,
  //   name: {
  //     en: "Embroidered Purses",
  //     mr: "कशिदाकामाचे पर्स",
  //   },
  //   category: "purses",
  //   image: handbag2,
  // },
  {
    id: 5,
    name: {
      en: "Cultural Wall Art",
      mr: "सांस्कृतिक भिंत कला",
    },
    category: "wall-art",
    image: wallart2,
  },
  // {
  //   id: 6,
  //   name: {
  //     en: "Handcrafted Jewelry",
  //     mr: "हस्तनिर्मित दागिने",
  //   },
  //   category: "jewelry",
  //   image: "",
  // },
  {
    id: 7,
    name: {
      en: "Home Decor Pieces",
      mr: "घर सजवण्याचे सामान",
    },
    category: "home-decor",
    image: wallart2,
  },
  {
    id: 8,
    name: {
      en: "Custom Handbag",
      mr: "सानुकूल हँडबॅग",
    },
    category: "handbags",
    image: purse3,
  },
  {
    id: 9,
    name: {
      en: "Elegant Wallet",
      mr: "मोहक पाकीट",
    },
    category: "purses",
    image: handbag2,
  },
  {
    id: 10,
    name: {
      en: "Traditional Necklace",
      mr: "पारंपारिक हार",
    },
    category: "jewelry",
    image: jwellery1,
  },
  {
    id: 11,
    name: {
      en: "Decorative Wall Hanging",
      mr: "सजावटी भिंत टांगणे",
    },
    category: "wall-art",
    image: wallart1,
  },
  {
    id: 12,
    name: {
      en: "Traditional Wear Accessories",
      mr: "पारंपरिक पोशाख सहाय्यक सामग्री",
    },
    category: "traditional-accessories",
    image: traditional1,
  },
  {
    id: 13,
    name: {
      en: "Handcrafted Purse",
      mr: "हस्तनिर्मित पर्स",
    },
    category: "purses",
    image: purse2,
  },
  {
    id: 14,
    name: {
      en: "Small Lamp",
      mr: "छोटा दिवा",
    },
    category: "home-decor",
    image: wallart1,
  },
  {
    id: 15,
    name: {
      en: "Handcrafted Products",
      mr: "हस्तनिर्मित उत्पादने",
    },
    category: "handcrafted",
    image: handcraft1,
  },
  {
    id: 16,
    name: {
      en: "Festival Decorations",
      mr: "सण उत्सव सजावट",
    },
    category: "festival",
    image: hero1,
  },
  {
    id: 17,
    name: {
      en: "Festival Decorations",
      mr: "सण उत्सव सजावट",
    },
    category: "festival",
    image: hero2,
  },
  {
    id: 18,
    name: {
      en: "Traditional Jewelry Set",
      mr: "पारंपरिक दागिने संच",
    },
    category: "jewelry",
    image: jwellery2,
  },
  {
    id: 19,
    name: {
      en: "Ganesh Festival Special",
      mr: "गणेशोत्सव विशेष",
    },
    category: "festival",
    image: hero5,
  },
];

export const categories = [
  {
    id: "all",
    name: {
      en: "All Products",
      mr: "सर्व उत्पादने",
    },
  },
  {
    id: "handbags",
    name: {
      en: "Handbags",
      mr: "हँडबॅग",
    },
  },
  {
    id: "purses",
    name: {
      en: "Purses & Wallets",
      mr: "पर्स आणि पाकीट",
    },
  },
  {
    id: "wall-art",
    name: {
      en: "Wall Art",
      mr: "भिंत कला",
    },
  },
  {
    id: "jewelry",
    name: {
      en: "Jewelry",
      mr: "दागिने",
    },
  },
  {
    id: "home-decor",
    name: {
      en: "Home Decor",
      mr: "घर सजवणे",
    },
  },
  {
    id: "traditional-accessories",
    name: {
      en: "Traditional Wear Accessories",
      mr: "पारंपरिक पोशाख सहाय्यक सामग्री",
    },
  },
  {
    id: "handcrafted",
    name: {
      en: "Handcrafted Products",
      mr: "हस्तनिर्मित उत्पादने",
    },
  },
  {
    id: "festival",
    name: {
      en: "Festival Collection",
      mr: "सण उत्सव संग्रह",
    },
  },
];

// Add text content for the gallery page
export const galleryText = {
  title: {
    en: "Our Gallery",
    mr: "आमची गॅलरी",
  },
  description: {
    en: "Explore our handcrafted collection of traditional and contemporary pieces, each telling a unique story of artistry and cultural heritage.",
    mr: "पारंपारिक आणि समकालीन तुकड्यांचे आमचे हस्तनिर्मित संग्रह एक्सप्लोर करा, प्रत्येक कलात्मकता आणि सांस्कृतिक वारशाची एक अनोखी कथा सांगत आहे.",
  },
};

// If you want to also export a default object
const ProductImages = {
  galleryItems,
  categories,
  galleryText,
};

export default ProductImages;
