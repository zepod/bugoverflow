// @flow
import type {PatternT} from 'Store/types';

export const categoryMatch =
        (category :string) : PatternT =>
            (article: Object) : boolean =>
              article.categories &&
              article.categories.indexOf(category) > -1;
