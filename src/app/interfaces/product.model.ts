export interface ProductPagePrice {
  price: string;
  regular_price: string;
  sale_price: string;
  qty?: number;
  variation_id?: number;
  on_sale?: boolean;
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: null;
  date_on_sale_from_gmt: null;
  date_on_sale_to: null;
  date_on_sale_to_gmt: null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity?: null | number;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: null;
  sold_individually: boolean;
  weight: string;
  dimensions: { length: string; width: string; height: string };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  purchase_note: string;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  images: {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  }[];
  attributes: any[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: (
    | { id: number; key: string; value: string }
    | {
        id: number;
        key: string;
        value: {
          '32b0bf150bb6bd30c74ed5fafdacd61f': {
            expires: number;
            payload: { id: number }[];
          };
          'text-editor'?: undefined;
          column?: undefined;
          image?: undefined;
          section?: undefined;
        };
      }
    | {
        id: number;
        key: string;
        value: {
          'text-editor': {
            count: number;
            control_percent: number;
            controls: {
              content: { section_editor: { editor: number } };
              advanced: {
                section_effects: {
                  animation_duration: number;
                  _animation_delay: number;
                };
              };
            };
          };
          column: {
            count: number;
            control_percent: number;
            controls: { layout: { layout: { _inline_size: number } } };
          };
          image: {
            count: number;
            control_percent: number;
            controls: {
              content: { section_image: { image: number } };
              advanced: {
                section_effects: {
                  animation_duration: number;
                  _animation_delay: number;
                };
              };
            };
          };
          section: {
            count: number;
            control_percent: number;
            controls: {
              layout: {
                section_layout: { gap: number; content_position: number };
                section_structure: { structure: number };
              };
            };
          };
          '32b0bf150bb6bd30c74ed5fafdacd61f'?: undefined;
        };
      }
  )[];
  variation_data?: any[];
  stock_status: string;
  has_options: boolean;
  aioseo_notices: any[];
  _links: { self: { href: string }[]; collection: { href: string }[] };
}
