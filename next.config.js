const isProd = process.env.NODE_ENV === "production";
module.exports = {
  basePath: isProd ? "/nobelium" : "",
  assetPrefix: isProd ? "/nobelium/" : "",
  webpack5: true,
  images: {
    // domains: ['gravatar.com']
    // unoptimized: true,
    loader: "akamai",
    path: "",
  },
  eslint: {
    dirs: ["components", "layouts", "lib", "pages"],
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
      config.resolve.fallback.fs = false;
    }

    if (!dev && isServer) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries["scripts/generate-rss.js"] = "./scripts/generate-rss.js";

        return entries;
      };
    }

    return config;
  },
};
