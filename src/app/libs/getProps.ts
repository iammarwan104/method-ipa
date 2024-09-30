import matter from 'gray-matter';
import fs from 'node:fs'

export async function getProps() {
    //Get all posts
    const files = fs.readdirSync("posts");
    const posts = files.map((nameFile) => {
      const slug = nameFile.replace(".md", "");
      const readFile = fs.readFileSync(`posts/${nameFile}`, "utf-8");
      const { data: frontMatter } = matter(readFile);
      return {
        slug,
        frontMatter,
      };
    });
    return {
      props: {
        posts,
      },
    };
  }