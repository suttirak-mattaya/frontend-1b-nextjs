/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/frontend-1b-nextjs/' : '',
}
