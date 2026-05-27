// Directory data file: sets defaults and computed permalink for all posts.
// Replicates Jekyll's /:category/:year/:month/:day/:title/ permalink structure.
module.exports = {
  layout: "post",
  eleventyComputed: {
    permalink: (data) => {
      if (data.tumblr_permalink) return `/${data.tumblr_permalink}/`;
      const date = new Date(data.page.date);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const category = data.category || "blog";
      return `/${category}/${year}/${month}/${day}/${data.page.fileSlug}/`;
    }
  }
};
