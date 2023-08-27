export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const formatPost = (
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) => {
  const filterPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    if (filterOutDrafts && draft) return acc;
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
    acc.push(post);
    return acc;
  }, []);

  if (sortByDate) {
    filterPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    filterPosts.sort(() => Math.random() - 0.5);
  }

  if (typeof limit === "number") {
    return filterPosts.slice(0, limit);
  }

  return filterPosts;
};
