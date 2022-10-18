import { getAllPosts } from '@/lib/notion'
import { generateRss } from '@/lib/rss'

export default function feed ({ xmlFeed }) {
  return xmlFeed
}
export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const latestPosts = posts.slice(0, 10)
  const xmlFeed = await generateRss(latestPosts)
  return {
    props: {
      xmlFeed
    }
  }
}

