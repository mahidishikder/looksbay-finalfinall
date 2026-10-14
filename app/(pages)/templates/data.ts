export type Template = {
  name: string;
  category: string;
  description: string;
  price: number;
  previousPrice?: number;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  tags: string[];
};

export const templates: Template[] = [
  {
    name: "Monday Studio",
    category: "Creative",
    description: "A spacious portfolio for people who make things.",
    price: 149,
    previousPrice: 199,
    image: "photo-1490481651871-ab68de25d43d",
    imageAlt: "Sculptural editorial fashion photographed in warm daylight",
    imagePosition: "center 42%",
    tags: ["Photographers", "Small business", "E-commerce"],
  },
  {
    name: "Good Measure",
    category: "Wellness",
    description: "A calmer online home for modern wellness brands.",
    price: 129,
    image: "photo-1540555700478-4be289fbecef",
    imageAlt: "Serene daylight-filled contemporary wellness studio",
    imagePosition: "center 55%",
    tags: ["Therapists", "Wellness", "Small business"],
  },
  {
    name: "House of Sunday",
    category: "Boutique",
    description: "Small shop energy, beautifully considered.",
    price: 179,
    image: "photo-1441986300917-64674bd600d8",
    imageAlt: "Beautiful independent boutique in soft natural light",
    tags: ["E-commerce", "Small business"],
  },
  {
    name: "Common Ground",
    category: "Studio",
    description: "A confident first impression for independent studios.",
    price: 129,
    image: "photo-1497366811353-6870744d04b2",
    imageAlt: "Airy modern creative workspace filled with greenery",
    tags: ["Consultants", "Coaches", "Small business", "Law firms"],
  },
  {
    name: "Soft Hours",
    category: "Wellness",
    description: "Room to breathe. Room to grow your practice.",
    price: 149,
    image: "photo-1515377905703-c4788e51af15",
    imageAlt: "A thoughtfully composed, sunlit creative studio",
    tags: ["Therapists", "Wellness", "Coaches"],
  },
  {
    name: "Little Atelier",
    category: "Creative",
    description: "Let exceptional imagery do the talking.",
    price: 179,
    image: "photo-1469334031218-e382a71b716b",
    imageAlt: "Expressive designer fashion editorial and portrait",
    tags: ["Photographers", "E-commerce", "Small business"],
  },
];
