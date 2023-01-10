/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.demainlaville.com', 'hips.hearstapps.com', 'palmaryfood.com', 'm.media-amazon.com', 'i.la-croix.com', 'cdn-wordpress-info.futurelearn.com', 'miro.medium.com', 'www.zadnit.net', 'www.notebookcheck.biz', 'ca-times.brightspotcdn.com', 'img.etimg.com', 'static01.nyt.com', 'ibsasport.org', 'media-cldnry.s-nbcnews.com', 'media.sudouest.fr', 'cdn.mos.cms.futurecdn.net', 'www.titanhq.fr', 'images.ctfassets.net', 'f.site-cdn.net', 'cdn.shopify.com', 'www.mayoclinichealthsystem.org']
  }
}

module.exports = nextConfig
