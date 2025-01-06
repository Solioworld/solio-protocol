//  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
export type ERC721_Metadata = {
  name: string;
  image: string; // images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive
  description: string;
};

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md
export type ERC115_Metadata = ERC721_Metadata & {
  decimals?: number; // 18
  properties?: object;
  localization?: object & { uri: string; default: string; locales: string };
};

// https://docs.opensea.io/docs/metadata-standards
export type OpenSea_Attributes = {
  display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
  trait_type?: string;
  value: number | string;
};

// https://docs.opensea.io/docs/metadata-standards
export type OpenSea_Metadata = ERC721_Metadata & {
  external_url?: string;
  image_data?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  attributes?: OpenSea_Attributes[];
};

export type Curve_Metadata = OpenSea_Metadata & {
  website_url?: string;
  twitter_url?: string;
  discord_url?: string;
  telegram_url?: string;
};
