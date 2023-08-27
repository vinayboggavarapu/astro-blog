export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export function slugify(text) {
  return text
    .toString() // Convert to a string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize('NFD') will also cover accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accented characters for max portability
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

console.log(slugify("Hello World!")); // Outputs: hello-world

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
