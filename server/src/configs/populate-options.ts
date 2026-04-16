export const POPULATE_OPTIONS = {
  // seller
  // ----------------------------------------
  seller: {
    path: "seller_information.seller",
    model: "user",
  },

  // plate
  // ----------------------------------------
  plate: [
    {
      path: "seller_information.seller",
      model: "user",
    },
    {
      path: "plate_items",
      model: "meal",
    },
  ],

  // order
  // ----------------------------------------
  order: [
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
  ],
};
