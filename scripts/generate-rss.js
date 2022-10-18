import fs from "fs";
import path from "path";

import { getAllPosts } from '@/lib/notion'
import { generateFeed } from '@/lib/rss'

async function generateFeedXml() {
  const posts = await getAllPosts({ includePages: false })
  const latestPosts = posts.slice(0, 9)
  const xmlFeed = await generateFeed(latestPosts)
  const staticOutputPath = path.join(process.cwd(), 'public');

  fs.writeFileSync(`${staticOutputPath}/feed.xml`, xmlFeed.rss2())
  fs.writeFileSync(`${staticOutputPath}/atom.xml`, xmlFeed.atom1())
  fs.writeFileSync(`${staticOutputPath}/feed.json`, xmlFeed.json1())
}

generateFeedXml();