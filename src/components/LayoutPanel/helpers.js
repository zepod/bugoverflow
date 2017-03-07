export const getRandomOf = (articles : Array<Object>, amount: number) : Array<Object> => {
  if (articles.length < amount) return articles;
  const result = articles.reduce((total, article) => {
    const should = Math.round(Math.random() * 1);
    if (should) {
      return [article, ...total]
    } else {
      return total;
    }
  });
  result.length = 4;
  return result;
}
