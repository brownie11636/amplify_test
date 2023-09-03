const path = require("path");

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
//   trailingSlash: true,
//   distDir: "build",
//   optimizeFonts: false,
//   images: {
//     unoptimized: true,
//   },
// };
const DotenvWebpackPlugin = require("dotenv-webpack");

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_EXPORT,
} = require("next/constants");

/** @type {import('next').NextConfig} */

module.exports = (phase) => {
  const defaultConfig = {
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    trailingSlash: true,
    // distDir: "build",
    optimizeFonts: false,
    images: {
      unoptimized: true,
    },
    // webpack: (config) => {
    //   config.plugins.push(new DotenvWebpackPlugin({ silent: true }));
    //   return config;
    // },
  };
  // when npm run dev
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        NEXT_PUBLIC_API_URL: "https://localhost:3333",
        NEXT_PUBLIC_API_URL_WWW: "https://localhost:3333",
        // NEXTAUTH_URL:"http://localhost:3000/"
      },
      reactStrictMode: false,
      ...defaultConfig,
    };
  }
  // when npm run build
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        // NEXT_PUBLIC_API_URL: "https://localhost:3333",
        // NEXT_PUBLIC_API_URL_WWW: "https://localhost:3333",
        NEXT_PUBLIC_API_URL: "https://api.portal301.com", // ex) https://example.com
        NEXT_PUBLIC_API_URL_WWW: "https://api.portal301.com", // ex) https://www.example.com
      },
      reactStrictMode: false,
      ...defaultConfig,
    };
  }
  // when npm run export
  if (phase === PHASE_EXPORT) {
    return {
      env: {
        NEXT_PUBLIC_API_URL: "", // ex) https://example.com
        NEXT_PUBLIC_API_URL_WWW: "", // ex) https://www.example.com
      },
      reactStrictMode: false,
      ...defaultConfig,
    };
  }

  return { ...defaultConfig };
};
