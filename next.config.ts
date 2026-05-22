import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://ak-d.tripcdn.com/images/**?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F",
      ),
    ],
  },
  allowedDevOrigins: ["192.168.8.113"],
  cacheComponents: true,
};

module.exports = nextConfig;
