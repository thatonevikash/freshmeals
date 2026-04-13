// -------------------------------------------------------------

export const SELLER_POPULATE_OPTIONS = {
  path: "seller_information.seller",
  model: "user",
};

// -------------------------------------------------------------

export const PLATE_POPULATE_OPTIONS = [
  {
    path: "seller_information.seller",
    model: "user",
  },
  {
    path: "plate_items",
    model: "meal",
  },
];

// -------------------------------------------------------------

export const ORDER_POPULATE_OPTIONS = [
  {
    path: "customer",
    model: "user",
  },
  {
    path: "order_items.meal",
    model: "meal",
    populate: {
      path: "seller_information.seller",
      model: "user",
    },
  },
  {
    path: "order_items.plate",
    model: "plate",
    populate: [
      {
        path: "plate_items",
        mode: "meal",
      },
      {
        path: "seller_information.seller",
        model: "user",
      },
    ],
  },
];
