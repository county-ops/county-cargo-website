
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.countycargo.com',
          },
        ],
        destination: 'https://countycargo.com/:path*',
        permanent: true,
      },
      {
        source: '/blog/uk-to-nigeria-shipping-rates',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/uk-to-nigeria-shipping-rates',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/blog/uk-to-nigeria-shipping-rate',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/blog/uk-to-nigeria-cargo-rates',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/blog/shipping-rates-uk-to-nigeria',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/uk-to-nigeria-rates',
        destination: '/blog/cargo-shipping-cost-to-nigeria',
        permanent: true,
      },
      {
        source: '/shipping-north-west-england-leeds-to-nigeria',
        destination: '/blog/shipping-north-west-england-leeds-to-nigeria',
        permanent: true,
      },
      {
        source: '/cargo-lagos-to-london',
        destination: '/blog/cargo-lagos-to-london',
        permanent: true,
      },
      {
        source: '/cargo-abuja-to-london',
        destination: '/blog/cargo-abuja-to-london',
        permanent: true,
      },
      {
        source: '/shipping-lagos-to-uk',
        destination: '/blog/shipping-lagos-to-uk',
        permanent: true,
      },
      {
        source: '/cargo-abuja-to-uk',
        destination: '/blog/cargo-abuja-to-uk',
        permanent: true,
      },
      {
        source: '/cargo-kano-to-uk',
        destination: '/blog/cargo-kano-to-uk',
        permanent: true,
      },
      {
        source: '/cargo-kaduna-to-uk',
        destination: '/blog/cargo-kaduna-to-uk',
        permanent: true,
      },
      {
        source: '/nigeria-to-uk-shipping',
        destination: '/shipping-from-nigeria-to-uk',
        permanent: true,
      },
      { source: '/cargo-port-harcourt-to-uk', destination: '/blog/cargo-port-harcourt-to-uk', permanent: true },
      { source: '/cargo-benin-city-to-uk', destination: '/blog/cargo-benin-city-to-uk', permanent: true },
      { source: '/cargo-onitsha-to-uk', destination: '/blog/cargo-onitsha-to-uk', permanent: true },
      { source: '/cargo-enugu-to-uk', destination: '/blog/cargo-enugu-to-uk', permanent: true },
      { source: '/cargo-ibadan-to-uk', destination: '/blog/cargo-ibadan-to-uk', permanent: true },
      { source: '/cargo-aba-to-uk', destination: '/blog/cargo-aba-to-uk', permanent: true },
      { source: '/cargo-warri-to-uk', destination: '/blog/cargo-warri-to-uk', permanent: true },
      { source: '/cargo-calabar-to-uk', destination: '/blog/cargo-calabar-to-uk', permanent: true },
      { source: '/cargo-lagos-to-houston', destination: '/blog/cargo-lagos-to-houston', permanent: true },
      { source: '/cargo-lagos-to-maryland', destination: '/blog/cargo-lagos-to-maryland', permanent: true },
      { source: '/cargo-lagos-to-new-york', destination: '/blog/cargo-lagos-to-new-york', permanent: true },
      { source: '/cargo-abuja-to-usa', destination: '/blog/cargo-abuja-to-usa', permanent: true },
      { source: '/cargo-port-harcourt-to-usa', destination: '/blog/cargo-port-harcourt-to-usa', permanent: true },
      { source: '/cargo-benin-city-to-usa', destination: '/blog/cargo-benin-city-to-usa', permanent: true },
      { source: '/cargo-lagos-to-toronto', destination: '/blog/cargo-lagos-to-toronto', permanent: true },
      { source: '/cargo-abuja-to-canada', destination: '/blog/cargo-abuja-to-canada', permanent: true },
      { source: '/cargo-port-harcourt-to-canada', destination: '/blog/cargo-port-harcourt-to-canada', permanent: true },
      { source: '/express-cargo-from-nigeria', destination: '/blog/express-cargo-from-nigeria', permanent: true },
      { source: '/county-cargo-vs-cargonaija', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/county-cargo-vs-cargo-naija', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/cargonaija-alternative', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/compare/cargonaija', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/compare/county-cargo-vs-cargonaija', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/cargonaija-vs-county-cargo', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/county-cargo-vs-gig-logistics', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/gig-vs-county-cargo', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/county-cargo-vs-gig', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/gig-logistics-alternative', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/gigl-alternative', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/compare/gig-logistics', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/gig-logistics-vs-county-cargo', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/county-cargo-vs-fez-delivery', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/fez-vs-county-cargo', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/county-cargo-vs-fez', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/fez-delivery-alternative', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/compare/fez-delivery', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/fez-delivery-vs-county-cargo', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/ship-from-uk-to-nigeria', destination: '/shipping-from-uk-to-nigeria', permanent: true },
      { source: '/ship-from-nigeria-to-uk', destination: '/shipping-from-nigeria-to-uk', permanent: true },
      { source: '/shipping-barrels-from-chicago-to-nigeria', destination: '/shipping-barrels-from-the-usa-to-nigeria', permanent: true },
      { source: '/shipping-barrels-from-us-to-nigeria', destination: '/shipping-barrels-from-the-usa-to-nigeria', permanent: true },
      { source: '/blog/shipping-barrels-from-chicago-to-nigeria', destination: '/shipping-barrels-from-the-usa-to-nigeria', permanent: true },
      { source: '/blog/shipping-barrels-from-us-to-nigeria', destination: '/shipping-barrels-from-the-usa-to-nigeria', permanent: true },
      { source: '/blog/shipping-barrels-from-the-usa-to-nigeria', destination: '/shipping-barrels-from-the-usa-to-nigeria', permanent: true },
      { source: '/blog/shipping-barrels-from-uk-to-nigeria', destination: '/shipping-barrels-from-uk-to-nigeria', permanent: true },
      { source: '/london-drop-off', destination: '/shipping-from-london-to-nigeria', permanent: true },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'embla-carousel-react',
      'react-hook-form',
      '@hookform/resolvers',
    ],
  },
  async headers() {
    return [
      {
        // Immutable caching for static Next.js assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Caching for public static media and fonts
        source: '/:all*(png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
