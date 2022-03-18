<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="onSubmit(article)">
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" v-model="article.body" rows="8"
                                        placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="tag" @change="addTag()" class="form-control" placeholder="Enter tags">
                                <div v-for="tag in article.tagList" :key="tag" class="tag-list">{{ tag }}</div>
                            </fieldset>
                            <button type="submit" class="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
    
</style>
<script>
import { getArticle, createArticle, updateArticle } from '@/api/article'

export default {
    // 在路由匹配组件渲染之前回先执行中间件处理
    middleware: 'authenticated',
    name: 'EditorIndex',
    data () {
        return {
            tag: '',
            article: {},
            isCreate: true,
            errors: {} // 错误信息
        }
    },
    async asyncData({ params }) {
        if (params && params.slug) {
            const { data } = await getArticle(params.slug)
            const { article } = data

            return {
                article,
                isCreate: false
            }
        } else {
            return {
                isCreate: true
            }
        }
    },
    methods: {
        addTag () {
            this.article.tagList = []
            this.article.tagList.push(...this.tag.split(','))
        },
        async onSubmit (article) {
            try {
                const { data } = this.isCreate
                    ? await createArticle({ article: this.article })
                    : await updateArticle(article.slug, article)

                this.article = data.article

                this.$router.push({ name: 'article', params: {
                    slug: this.article.slug
                } })
            } catch (err) {
                this.errors = err.response.data.errors
            }
        }
    },
    head () {
        return {
            title: `Edit — RealWorld`,
            meta: [
                { hid: 'description', name: 'description', content: this.isCreate ? '' : this.article.description}
            ]
        }
    }
}
</script>