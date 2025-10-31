export type PriceModel = "Free" | "Paid" | "Both";

export interface SoftwareItem {
  id: string;
  image: string;
  title: string;
  description: string;
  type: string;
  priceModel: PriceModel;
  category: "tools" | "programs" | "apps";
  link?: string;
}

export interface SoftwareCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
  icon?: string;
}
