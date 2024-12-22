import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: [
      "i.imgur.com",
      "placehold.co",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "images.ctfassets.net",
      "4kwallpapers.com",
      "picsum.photos",
      "www.orientsoftware.com",
      "plus.unsplash.com",
      "static.vecteezy.com",
      "i.postimg.cc",
      "www.centrovacanzesanmarino.com",
    ],
  }
};

export default withPayload(nextConfig);
