export interface IProduct extends Document {
    name: string;
    brand: string;
    category_id: string;
    sku: string;
    rating: number;
    description: string;
    price: number;
    discount: number;
    color: string;
    size:String;
    qtn:string;
    product_image: string;
    
  }