export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Cart {
  product_id?: number;
  quantity?: number;
  variation_id?: number;
}

export interface PriceView {
  price:string;
  sale_price?: string;
  regular_price?: string;
  onSale?: boolean;
}

export interface CartTotals {
  quantity: number;
  total?: number;
}

export interface NewOrder {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: Address;
  shipping: Address;
  line_items: any[];
  shipping_lines: [];
}

export interface Order {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string;
  date_paid_gmt: string;
  date_completed: any;
  date_completed_gmt: any;
  cart_hash: string;
  meta_data: { id: number; key: string; value: string }[];
  line_items: {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: { id: number; total: string; subtotal: string }[];
    meta_data: { id: number; key: string; value: string }[];
    sku: string;
    price: number;
  }[];
  tax_lines: {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    meta_data: any[];
  }[];
  shipping_lines: {
    id: number;
    method_title: string;
    method_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: any[];
  }[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  _links: { self: { href: string }[]; collection: { href: string }[] };
}

export interface Review {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}

export interface GeoTracker {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_capital: string;
  state_prov: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  is_eu: boolean;
  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  geoname_id: string;
  isp: string;
  connection_type: string;
  organization: string;
  currency: { code: string; name: string; symbol: string };
  time_zone: {
    name: string;
    offset: number;
    current_time: string;
    current_time_unix: number;
    is_dst: boolean;
    dst_savings: number;
  };
}

export interface OriginAddress {
  origin_address: {
    state?: string;
    city?: string;
    postal_code?: string;
    line_1?: string;
    line_2?: string;
    company_name?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
  };
}

export interface DestinationAddress {
  destination_address: {
    state: string;
    city: string;
    line_1?: string;
    line_2?: string;
    postal_code: string;
    country_alpha?: string;
    company_name?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
  };
}

export interface ShippingRates {
  origin_address: OriginAddress;
  destination_address: DestinationAddress;
  incoterms: string;
  insurance: { is_insured: boolean };
  courier_selection: { apply_shipping_rules: boolean };
  shipping_settings: { units: { weight: 'lb'; dimensions: 'in' } };
}

export interface Rates {
  courier_id: string;
  courier_name: string;
  min_delivery_time: number;
  max_delivery_time: number;
  value_for_money_rank: number;
  delivery_time_rank: number;
  shipment_charge: number;
  fuel_surcharge: number;
  remote_area_surcharge: any;
  shipment_charge_total: number;
  warehouse_handling_fee: number;
  insurance_fee: number;
  ddp_handling_fee: number;
  import_tax_charge: number;
  import_duty_charge: number;
  total_charge: number;
  is_above_threshold: boolean;
  effective_incoterms: string;
  estimated_import_tax: number;
  estimated_import_duty: number;
  courier_does_pickup: boolean;
  courier_dropoff_url: string;
  tracking_rating: number;
  payment_recipient: string;
  courier_remarks: any;
  currency: string;
  box: { name: any; length: number; width: number; height: number };
  minimum_pickup_fee: number;
  description: any;
  full_description: any;
}
