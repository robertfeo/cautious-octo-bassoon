import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.imgur.com',
      'placehold.co',
      'images.unsplash.com',
      'upload.wikimedia.org',
      'images.ctfassets.net',
      '4kwallpapers.com',
      'picsum.photos'
    ],
  },
};

export default withPayload(nextConfig);
