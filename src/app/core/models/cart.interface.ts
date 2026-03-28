export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // This holds the category ID
}

export interface IProductDetails {
  _id: string;
  id: string;
  title: string;
  slug: string;
  imageCover: string;
  quantity: number;
  price: number;
  ratingsAverage: number;
  brand: IBrand;
  category: ICategory;
  subcategory: ISubcategory[];
}

export interface ICartItem {
  _id: string;
  count: number;
  price: number;
  product: IProductDetails;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: ICartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
