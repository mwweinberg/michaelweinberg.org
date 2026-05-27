# Licensing Clarification

This blog used the HPSTR Jekyll theme for a number of years.  In May of 2026 it transitioned to 11ty.  In doing so, it rewrite the theme to work with 11ty (witih additional modifications made on an ongoing basis).  The original HPSTR Jekyll Theme, parts of which remain in this codebase, is licensed under the MIT license.  Any edits that I have made to those files are also licensed under an MIT license. 

The content of this blog (posts, media, pdfs, etc.) are all licensed under their respective licenses. To the extent that I have a copyright in the content it is generally licensed under a CC BY-SA 4.0, although the specific licensing on any individual thing carries.  

# 11ty Version Notes

Future dated (as defined by the date in the post front matter) posts are filtered out by `.filter(item => item.date <= new Date())` in `eleventy.config.mjs`.