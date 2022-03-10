<template>
    <div>
        <!-- 顶部导航栏 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
                <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
                    </li>
                    <template v-if="user">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/editor"><i class="ion-compose"></i>&nbsp;New Article</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/settings"><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/profile/1">
                                <img class="user-pic" :src="user.image">{{ user.username }}
                            </nuxt-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
        <!-- /顶部导航栏 -->

        <!-- 子路由 -->
        <nuxt />
        <!-- /子路由 -->

        <!-- 底部 -->
        <footer>
            <div class="container">
                <!-- <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
                An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                </span> -->
                
                <div class="attribution">
                    <div style="width:500px;margin:0 auto; padding:20px 0;">
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011402012297" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                            <img src="/beian.png" style="float:left;"/>
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">京公网安备 11011402012297号</p>
                        </a>

                        <a target="_blank" href="https://beian.miit.gov.cn/" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 25px; color:#939393;">京ICP备2022001760号-1</p>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        <!-- /底部 -->

    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: "LayoutIndex",
    computed: {
        ...mapState(['user'])
    }
}
</script>
<style>
    
</style>