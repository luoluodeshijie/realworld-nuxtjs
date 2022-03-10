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

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
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
