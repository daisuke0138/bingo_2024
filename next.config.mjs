// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;

const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    disableStaticImages: false,
    domains: ['ivbqhghkzeniyukguqnp.supabase.co'],
  },
  reactStrictMode: true,
};

export default nextConfig;

// const config = {
//   // 設定内容
//   reactStrictMode: true,
// };

// export default config;