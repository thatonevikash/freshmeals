// -------------------------------------------------------------

export type SellerLevel = "" | "Beginner" | "Intermediate" | "Elite";

export interface ISellerInformation {
  seller_information: {
    seller_name: string;
    seller_id: string;
    seller_avatar_url: string;
    seller_level: SellerLevel;
  };
}
