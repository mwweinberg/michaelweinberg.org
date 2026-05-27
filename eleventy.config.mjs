export default function(eleventyConfig) {

  // Layout aliases so existing frontmatter (layout: post) keeps working
  eleventyConfig.addLayoutAlias("post", "post.html");
  eleventyConfig.addLayoutAlias("page", "page.html");
  eleventyConfig.addLayoutAlias("post-index", "post-index.html");

  // Static assets — copied as-is, no template processing
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("fl_map");
  eleventyConfig.addPassthroughCopy("cma_pd");
  eleventyConfig.addPassthroughCopy("oshwa_certification_map");
  eleventyConfig.addPassthroughCopy("smk_style");
  eleventyConfig.addPassthroughCopy("other_pages");
  eleventyConfig.addPassthroughCopy("wod.html");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Don't process these as templates (passthrough handles wod.html; others are not content)
  eleventyConfig.ignores.add("_reference");
  eleventyConfig.ignores.add("theme-setup");
  eleventyConfig.ignores.add("Gruntfile.js");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("wod.html");
  eleventyConfig.ignores.add("notes.txt");

  // Posts collection sorted newest-first — explicit .md filter excludes tumblr .html imports
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/**/*.md")
      .filter(item => item.inputPath.endsWith(".md"))
      .filter(item => item.date <= new Date())
      .sort((a, b) => b.date - a.date);
  });

  // --- Filters ---

  // RFC 822 date for RSS feeds (e.g. Mon, 26 May 2026 00:00:00 +0000)
  const RFC822_DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const RFC822_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  eleventyConfig.addFilter("dateToRfc822", (date) => {
    const d = new Date(date);
    return `${RFC822_DAYS[d.getUTCDay()]}, ${String(d.getUTCDate()).padStart(2,"0")} ${RFC822_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} 00:00:00 +0000`;
  });

  // Jekyll-compatible date filters
  eleventyConfig.addFilter("date_to_xmlschema", (date) => new Date(date).toISOString());
  eleventyConfig.addFilter("date_to_string", (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
  );

  // Jekyll filter that liquidjs doesn't have natively
  eleventyConfig.addFilter("number_of_words", (content) =>
    content ? content.trim().split(/\s+/).length : 0
  );

  // Returns sorted array of all unique tag strings from the posts collection
  eleventyConfig.addFilter("getAllTags", (posts) => {
    const tags = new Set();
    posts.forEach(post => {
      const t = post.data.tags;
      if (t) (Array.isArray(t) ? t : [t]).forEach(tag => tags.add(tag));
    });
    return [...tags].sort();
  });

  // Returns posts that include the given tag
  eleventyConfig.addFilter("getPostsByTag", (posts, tag) =>
    posts.filter(post => {
      const t = post.data.tags;
      if (!t) return false;
      return (Array.isArray(t) ? t : [t]).includes(tag);
    })
  );

  // Returns first paragraph of rendered HTML (for post excerpts on home page)
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const cut = content.indexOf("<!--more-->");
    if (cut !== -1) return content.substring(0, cut);
    const para = content.match(/<p>[\s\S]*?<\/p>/);
    return para ? para[0] : content.substring(0, 250) + "…";
  });

  eleventyConfig.addFilter("strip_slash", (str) => (str ? str.replace(/\/$/, "") : str));

  // Override liquidjs built-in date filter to format dates in UTC, matching Jekyll's behavior
  // with frontmatter dates that are YYYY-MM-DD (parsed as UTC midnight)
  const UTC_MONTHS = ["January","February","March","April","May","June",
                      "July","August","September","October","November","December"];
  eleventyConfig.addLiquidFilter("date", function(date, format) {
    if (!date) return date;
    const d = new Date(date);
    return (format || "")
      .replace(/%B/g, UTC_MONTHS[d.getUTCMonth()])
      .replace(/%d/g, String(d.getUTCDate()).padStart(2, "0"))
      .replace(/%m/g, String(d.getUTCMonth() + 1).padStart(2, "0"))
      .replace(/%Y/g, d.getUTCFullYear())
      .replace(/%e/g, String(d.getUTCDate()).padStart(2, " "));
  });

  eleventyConfig.addFilter("absolutifyUrls", (content, base) => {
    if (!content) return content;
    return content
      .replace(/href="\/(?!\/)/g, `href="${base}/`)
      .replace(/src="\/(?!\/)/g, `src="${base}/`);
  });

  eleventyConfig.addFilter("xml_escape", (str) =>
    str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;").replace(/'/g, "&apos;") : ""
  );

  return {
    templateFormats: ["md", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
}
