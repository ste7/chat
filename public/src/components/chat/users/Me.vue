<template>
    <div class="me-container">


        <div class="me-right">
            <img class="me-img" src="./../../../assets/profile.png"/>
            <p class="me-name">{{ me.name }}</p>

            <a href="#" @click.prevent="openMyProfile" class="me-link">
                <span class="me-link-span"></span>
            </a>
        </div>

        <a href="#" class="me-signout" @click="signOut" title="Sign Out">&#10006</a>
    </div>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    import bus from './../../../bus'

    export default {
        name: 'Me',

        methods: {
            ...mapActions({
                signOut: 'signOut'
            }),

            openMyProfile() {
                bus.$emit('open-profile', true);
            }
        },

        computed: {
            ...mapGetters({
                me: 'getMe'
            })
        }
    }
</script>


<style>
    .me-container {
        height: 30px;
        width: 900px;
        border-radius: 7px 7px 0 0;
        background-color: #EDF0EF;
    }

    .me-right {
        width: 110px;
        height: 30px;
        background-color: rgba(212,212,217,0.42);
        float: right;
        position: relative;
    }
    .me-img {
        width: 20px;
        margin: 5px 5px 0 0;
        float: right;
    }
    .me-name {
        float: right;
        font-size: 12px;
        margin: 5px 5px 0 0;
        color: #6a6a6c;
    }

    .me-link, .me-link-span {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .me-signout {
        float: left;
        margin-left: 7px;
        margin-top: 3px;
        color: rgba(196,85,64,0.89);
        text-decoration: none;
    }
    .me-signout:hover {
        text-decoration: none;
        color: rgba(206,89,68,0.53);
    }
</style>
