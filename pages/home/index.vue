<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">测试2</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        
        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li v-if="user" class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{
                                        active: tab === 'your_feed'
                                    }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: 'your_feed'
                                        }
                                    }"
                                >Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{
                                        active: tab === 'global_feed'
                                    }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: 'global_feed'
                                        }
                                    }"
                                >Global Feed</nuxt-link>
                            </li>
                            <li v-if="tag" class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{
                                        active: tab === 'tag'
                                    }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: 'tag',
                                            tag: tag
                                        }
                                    }"
                                >#{{ tag }}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <ArticleList :articles="articles" />

                    <!-- 分页列表 -->
                    <nav>
                        <ul class="pagination">
                            <li
                                class="page-item"
                                :class="{
                                    active: item === page
                                }"
                                v-for="item in totalPage"
                                :key="item"
                                >
                                <nuxt-link
                                    :to="{
                                        name: 'home',
                                        query: {
                                            page: item,
                                            tag: $route.query.tag,
                                            tab: tab
                                        }
                                    }"
                                    class="page-link"
                                    >
                                    {{ item }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                    <!-- /分页列表 -->

                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link
                                v-for="tag in tags"
                                :key="tag"
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'tag',
                                        tag: tag
                                    }
                                }"
                                class="tag-pill tag-default"
                            >{{ tag }}</nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
    
</style>
<script>
import {
    getArticles,
    getFeedArticles,
    addFavorite,
    deleteFavorite
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import ArticleList from './components/article-list.vue'

export default {
    name: 'HomeIndex',
    async asyncData ({ query, store }) {
        const page = Number.parseInt(query.page || 1)
        const limit = 5
        const { tag } = query
        const tab = query.tab || 'global_feed'
        const loadArticles = store.state.user && tab === 'your_feed' 
            ? getFeedArticles
            : getArticles

        const [ articleRes, tagRes ] = await Promise.all([
            loadArticles({
                limit,
                offset: (page - 1) * limit,
                tag
            }),
            getTags()
        ])

        const { articles, articlesCount } = articleRes.data
        const { tags } = tagRes.data

        // 添加点赞按钮禁用标识
        articles.forEach(article => article.favoriteDisabled = false);

        return {
            articles,
            articlesCount,
            tags,
            limit,
            page,
            tag,
            tab
        }
    },
    components: {
        ArticleList
    },
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async onFavorite (article) {
            article.favoriteDisabled = true
            if (article.favorited) {
                // 取消点赞
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        }
    },
    head () {
        return {
            title: `Home — RealWorld`,
            meta: [
                { hid: 'description', name: 'description', content: this.articles.description}
            ]
        }
    }
}  
</script>