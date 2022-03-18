import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取关注的用户文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        // headers: {
        //     Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxteGxteEAxNjMuY29tIiwidXNlcm5hbWUiOiJsbXgiLCJwYXNzd29yZCI6IiQyYSQxMCRuRnZGenl2aWhBdTg5dDNtLk1mYjhPaXlWY2FvL29rRGpzT2FLVWIzZkMwYUR6eG10VmRReSIsImJpbyI6bnVsbCwiaW1hZ2UiOiJodHRwczovL2FwaS5yZWFsd29ybGQuaW8vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGVnIiwiaWF0IjoxNjQ2MjYwNTY5LCJleHAiOjE2NTE0NDQ1Njl9.CmLpHe5b4AgfjwI8J-nKnD6CKBfPcqiuv3Y7R7egmQ4`
        // },
        params
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}

// 删除点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}

// 创建文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 更新文章
export const updateArticle = (slug, article) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data: {
            article
        }
    })
}

// 删除文章
export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 创建文章评论
export const addComments = (slug, comment) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data: {
            comment
        }
    })
}

// 删除文章评论
export const deleteComments = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`
    })
}

// 关注文章作者
export const followUser = (username) => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

// 取消关注文章作者
export const unFollowUser = (username) => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}