/*
 * @Author: liruigang
 * @Date: 2019-10-18 17:03:52
 * @LastEditors: liruigang
 * @LastEditTime: 2019-10-18 21:25:49
 * @UI:
 */
import {
  TagsService,
  MusicService,
  ArticlesService
} from "@/common/api.service";
import { FETCH_ARTICLES, FETCH_TAGS, FETCH_MUSICS } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  SET_MUSICS,
  UPDATE_ARTICLE_IN_LIST
} from "./mutations.type";

const state = {
  tags: [],
  musics: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  },
  musics(state) {
    return state.musics;
  }
};

const actions = {
  [FETCH_ARTICLES]({ commit }, params) {
    commit(FETCH_START);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data.list);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_MUSICS]({ commit }) {
    return MusicService.get()
      .then(({ data }) => {
        commit(SET_MUSICS, data.list);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, list) {
    state.articles = list;
    state.articlesCount = list.length;
    state.isLoading = false;
  },
  [SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [SET_MUSICS](state, list) {
    state.musics = list;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
