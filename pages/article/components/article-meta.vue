<template>
    <div class="article-meta">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }">
            <img :src="article.author.image"/>
        </nuxt-link>
        <div class="info">
            <nuxt-link class="author" :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }">{{ article.author.username}}
            </nuxt-link>
            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>

        <template v-if="user && user.username === article.author.username">
            <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name: 'editor',
                    params: {
                        slug: article.slug
                    }
                }">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>

            <button
                class="btn btn-outline-danger btn-sm"
                :disabled="isDeleteArticleDisabled"
                @click="onDeleteArticle(article)">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>

        <template v-else>
            <button
                class="btn btn-sm"
                :class="{
                    'btn-outline-secondary': !isFollowing,
                    'btn-secondary': isFollowing
                }"
                @click="onFollowUser(article)"
                :disabled="isFollowDisabled"
            >
                <i class="ion-plus-round"></i>
                &nbsp;
                {{ isFollowing ? 'Unfollow ' + article.author.username : 'Follow ' + article.author.username }}
            </button>
            &nbsp;&nbsp;
            <button
                class="btn btn-sm btn-outline-primary"
                :class="{
                    active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="isFavoriteDisabled"
            >
                <i class="ion-heart"></i>
                &nbsp;
                Favorite Post <span class="counter">{{ article.favoritesCount }}</span>
            </button>
        </template>
    </div>
</template>

<script>
import { followUser, unFollowUser, addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
    name: 'ArticleMeta',
    data () {
        return {
            isFollowDisabled: false,
            isFavoriteDisabled: false,
            isDeleteArticleDisabled: false
        }
    },
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(['user']),
        isFollowing () {
            return this.article.author.following === true
        }
    },
    mounted () {
        // console.log(this.article)
        // console.log(this.user)
    },
    methods: {
        async onFollowUser (article) {
            this.isFollowDisabled = true
            if (this.isFollowing) {
                // 取消关注
                await unFollowUser(article.author.username)
                article.author.following = false
            } else {
                // 添加关注
                await followUser(article.author.username)
                article.author.following = true
            }
            this.isFollowDisabled = false

        },
        async onFavorite (article) {
            this.isFavoriteDisabled = true
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
            this.isFavoriteDisabled = false
        },
        async onDeleteArticle (article) {
            this.isDeleteArticleDisabled = true
            await deleteArticle(article.slug)
            this.isDeleteArticleDisabled = false

            this.$router.push('/')
        }
    }

}
</script>

<style>

</style>