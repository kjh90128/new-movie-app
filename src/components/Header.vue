<template>
    <header>
        <Logo />
        <div class="nav nav-pills">
            <div class="nav-item" v-for="nav in navigations" :key="nav.name">
                <RouterLink :to="nav.href" class="nav-link" active-class="active" :class="{active: isMatch(nav.path)}">
                    {{nav.name}}
                </RouterLink>
            </div>
        </div>
        <div class="user" @click="goAbout">
            <img :src="image" :alt="name">
        </div>
    </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'

export default {
    components:{
        Logo
    },
    data(){
        return{
            navigations:[
                {
                    name:'Search',
                    href:'/'
                },
                {
                    name:'Member',
                    href:'/Movie/:id',
                    path:/^\/movie/
                },
                {
                    name:'About',
                    href:'/About'
                },
            ]
        }
    },
    methods: {
        isMatch(path){
            if(!path){
                return false
            }
            return path.test(this.$route.fullPath)
        },
        goAbout(){
            this.$router.push('/about')
        }
    },
    computed: {
        ...mapState(
            'about',
            [
            'image',
            'name'
            ]
        )
    }
}
</script>

<style scoped lang="scss">
header{
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo{
        margin-right: 40px;
    }
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 6px;
        box-sizing: border-box;
        background-color: $gray-200;
        position: absolute;
        cursor: pointer;
        top:0;
        bottom: 0;
        right: 40px;
        margin: auto;
        transition: .4s;
        &:hover{
            background-color: darken($gray-200, 10%);
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    @include media-breakpoint-down(sm){
        .nav{
            display: none;
        }
    }
}
</style>