import React from "react";
import api from "services/axios";

const getSitemap = (products, origin) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>${origin}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    </url>
${products
  .map(
    (product) =>
      `<url>
    <loc>${origin}/${product.slug}</loc>    
    <lastmod>${new Date(product.updatedAt).toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join("")}
 
</urlset>`;

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }) {
    try {
      const { data } = await api.get("/api/product");
      console.log(req.headers);
      let origin = "";
      if (data) {
        if (req) {
          origin = req.headers.referer.match(/(http[s]?:\/\/?[^\/\s]+)\/(.*)/i)[1];
        } else {
          origin = window.location.origin;
        }
        // console.log(origin, data.products);
        res.setHeader("Content-Type", "text/xml");
        res.write(getSitemap(data.products, origin));
        res.end();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Sitemap;
