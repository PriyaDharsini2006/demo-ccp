/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
}

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
