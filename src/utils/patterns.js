// @flow
export const categoryMatch =
        (category :string) : Function =>
            (article: Object) : boolean =>
              article.categories &&
              article.categories.indexOf(category) > -1;
