<template>
    <div>
        <form v-if="user" @submit.prevent="onSubmit" class="card comment-form">
            <div class="card-block">
                <textarea name="body" v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3" required></textarea>
            </div>
            <div class="card-footer">
                <img :src="user.image" class="comment-author-img"/>
                <button class="btn btn-sm btn-primary" :disabled="submitDisabled">
                    Post Comment
                </button>
            </div>
        </form>

        <p v-else style="display: inherit;">
            <nuxt-link to="/login">Sign in</nuxt-link> or <nuxt-link to="/register">sign up</nuxt-link> to add comments on this article.
        </p>

        <div
            class="card"
            v-for="comment in comments"
            :key="comment.id"
        >
            <div class="card-block">
                <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
                <nuxt-link class="comment-author" :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }">
                    <img :src="comment.author.image" class="comment-author-img"/>
                </nuxt-link>
                &nbsp;
                <nuxt-link class="comment-author" :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }    
                }">{{ comment.author.username }}</nuxt-link>
                <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
                <span v-if="user && user.username === article.author.username" class="mod-options">
                    <!-- <i class="ion-edit"></i> -->
                    <i class="ion-trash-a" @click="onDeleteComment(comment)"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getComments, addComments, deleteComments } from '@/api/article'
import { mapState } from 'vuex'

export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            comment: {
                body: ''
            },
            submitDisabled: false,
            comments: [] // 评论列表
        }
    },
    async mounted () {
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments.reverse()
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async onSubmit () {
            if (!this.comment.body.trim()) return alert('请输入内容')

            this.submitDisabled = true
            await addComments(this.article.slug, this.comment)
            // this.comments.unshift({
            //     body: this.comment.body,
            //     author: {
            //         username: this.user.username,
            //         image: this.user.image
            //     }
            // })
            const { data } = await getComments(this.article.slug)
            this.comments = data.comments.reverse()
            this.comment.body = ""
            this.submitDisabled = false
        },
        async onDeleteComment (comment) {
            await deleteComments(this.article.slug, comment.id)
            const { data } = await getComments(this.article.slug)
            this.comments = data.comments.reverse()
        }
    }
}
</script>

<style>

</style>