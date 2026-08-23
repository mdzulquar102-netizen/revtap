export type Business = {
  id: string;
  name: string;
  reviewUrl: string;
  active: boolean;
};

export const businesses: Business[] = [
  {
    id: "hotel-jyoti",
    name: "Hotel Jyoti International",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJ5b56xW0f9zkRrhe3xNULlIQ",
    active: true,
  },  
  {
    id: "test-cafe",
    name: "Test Cafe",
    reviewUrl:
      "https://www.google.com",
    active: true,
  },
];
