
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
      { source: '/county-cargo-vs-cargo-naija', destination: '/county-cargo-vs-cargonaija', permanent: true },
      { source: '/cargonaija-alternative', destination: '/county-cargo-vs-cargonaija', permanent: true },
      { source: '/compare/cargonaija', destination: '/county-cargo-vs-cargonaija', permanent: true },
      { source: '/compare/county-cargo-vs-cargonaija', destination: '/county-cargo-vs-cargonaija', permanent: true },
      { source: '/gig-vs-county-cargo', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/county-cargo-vs-gig', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/gig-logistics-alternative', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/gigl-alternative', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/compare/gig-logistics', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/fez-vs-county-cargo', destination: '/county-cargo-vs-fez-delivery', permanent: true },
      { source: '/county-cargo-vs-fez', destination: '/county-cargo-vs-fez-delivery', permanent: true },
      { source: '/fez-delivery-alternative', destination: '/county-cargo-vs-fez-delivery', permanent: true },
      { source: '/compare/fez-delivery', destination: '/county-cargo-vs-fez-delivery', permanent: true },
      { source: '/cargonaija-vs-county-cargo', destination: '/county-cargo-vs-cargonaija', permanent: true },
      { source: '/gig-logistics-vs-county-cargo', destination: '/county-cargo-vs-gig-logistics', permanent: true },
      { source: '/fez-delivery-vs-county-cargo', destination: '/county-cargo-vs-fez-delivery', permanent: true },
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
  async headers() {
    return [
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
    unoptimized: true,
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
