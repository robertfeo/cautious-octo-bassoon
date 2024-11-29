import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'placehold.co', 'images.unsplash.com', '*'],
},
};

export default withPayload(nextConfig);
