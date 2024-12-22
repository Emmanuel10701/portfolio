/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Add file-loader for handling .pdf files
      config.module.rules.push({
        test: /\.pdf$/,
        use: 'file-loader',
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  