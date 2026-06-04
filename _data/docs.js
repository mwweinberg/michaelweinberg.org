// Scans docs/ at build time and returns a list of filenames.
// Used by sitemap.liquid to include PDF URLs without manual maintenance.
const fs = require("fs");
const path = require("path");

module.exports = function() {
  const dir = path.join(__dirname, "../docs");
  return fs.readdirSync(dir)
    .filter(f => !f.startsWith("."))
    .sort();
};
