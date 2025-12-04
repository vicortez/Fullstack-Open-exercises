const sampleBlogData = {
  title: 'sample title',
  author: 'sample author',
  url: 'https://example.com',
}

const getSampleBLogData = (count = 1) => {
  const blogsData = []
  const baseData = {
    title: 'sample title',
    author: 'sample author',
    url: 'https://example.com',
  }
  for (let i = 0; i < count; i++) {
    blogsData.push({
      title: `${baseData.title}${i}`,
      author: `${baseData.author}${i}`,
      url: `${baseData.url}${i}`,
    })
  }
  return blogsData
}

module.exports = {
  sampleBlogData,
  getSampleBLogData,
}
