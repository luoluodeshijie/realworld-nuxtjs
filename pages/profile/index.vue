<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img"/>
                        <h4>{{ profile.username }}</h4>
                        <p>{{ profile.bio }}</p>
                        <button
                            class="btn btn-sm action-btn"
                            :class="{
                                'btn-outline-secondary': !isFollowing,
                                'btn-secondary': isFollowing
                            }"
                            @click="onFollowUser(profile)"
                            :disabled="profile.isFollowDisabled"
                            v-show="user.username !== profile.username"
                        >
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            {{ isFollowing ? 'Unfollow ' + profile.username : 'Follow ' + profile.username }}
                        </button>
                        <nuxt-link class="btn btn-sm btn-outline-secondary action-btn"
                            v-show="user.username === profile.username"
                            :to="{
                                name: 'settings'
                            }">
                            <i class="ion-gear-a"></i> Edit Profile Settings
                        </nuxt-link>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{
                                        active: tab === 'my_articles'
                                    }"
                                    exact
                                    :to="{
                                        name: 'profile',
                                        query: {
                                            tab: 'my_articles'
                                        }
                                    }">
                                    My Articles
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{
                                        active: tab === 'favorited_articles'
                                    }"
                                    exact
                                    :to="{
                                        name: 'profile',
                                        query: {
                                            tab: 'favorited_articles'
                                        }
                                    }">
                                    Favorited Articles
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <ArticleList :articles="articles" />

                </div>

            </div>
        </div>

    </div>
</template>
<script>
import { getProfile } from '@/api/profile'
import { getUser } from '@/api/user'
import { getArticles, followUser, unFollowUser, } from "@/api/article"
import ArticleList from '../home/components/article-list.vue'

export default {
    // 在路由匹配组件渲染之前回先执行中间件处理
    middleware: 'authenticated',
    inject: ['reload'], // 注入 reload 方法
    name: 'UserProfile',
    data () {
        return {
            profile: {},
            user: {},
            articles: [],
            articlesCount: 0,
            tab: ''
        }
    },
    components: {
        ArticleList
    },
    computed: {
        isFollowing () {
            return this.profile.following === true
        }
    },
    watch: {
        "$route.path" () {
            if (this.$route.params.username !== this.profile.username) {
                this.reload()
            }
        },
        "$route.query.tab" () {
            var tab = this.$route.query.tab
            if (tab === 'my_articles') {
                this.onGetAuthorArticles(this.profile.username)
            } else {
                this.onGetFavoritedArticles(this.profile.username)
            }
            this.tab = tab
        }
    },
    async mounted () {
        const [ profileRes, userRes ] = await Promise.all([
            getProfile(this.$route.params.username),
            getUser()
        ])

        const { profile } = profileRes.data
        const { user } = userRes.data

        profile.isFollowDisabled = false

        var tab = this.$route.query.tab || "my_articles"
        if (tab === 'my_articles') {
            this.onGetAuthorArticles(profile.username)
        } else {
            this.onGetFavoritedArticles(profile.username)
        }
        
        this.profile = profile
        this.user = user
        this.tab = tab
    },
    watchQuery: ['tab'],
    methods: {
        async onFollowUser (profile) {
            this.profile.isFollowDisabled = true
            if (this.isFollowing) {
                // 取消关注
                await unFollowUser(profile.username)
                profile.following = false
            } else {
                // 添加关注
                await followUser(profile.username)
                profile.following = true
            }
            this.profile.isFollowDisabled = false

        },
        async onGetAuthorArticles (author) {
            const { data } = await getArticles({
                author,
                limit: 5,
                offset: 0
            })
            const { articles } = data
            const { articlesCount } = data

            // 添加点赞按钮禁用标识
            articles.forEach(article => article.favoriteDisabled = false);

            this.articles = articles
            this.articlesCount = articlesCount
        },
        async onGetFavoritedArticles (favorited) {
            const { data } = await getArticles({
                favorited,
                limit: 5,
                offset: 0
            })
            const { articles } = data
            const { articlesCount } = data

            // 添加点赞按钮禁用标识
            articles.forEach(article => article.favoriteDisabled = false);

            this.articles = articles
            this.articlesCount = articlesCount
        }
    },
    head () {
        return {
            title: `@${this.user.username} — RealWorld`,
            meta: [
                { hid: 'description', name: 'description', content: ''}
            ]
        }
    }
}
</script>