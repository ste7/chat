<template>
    <div class="user-info-container">

        <div v-if="user !== null">
            <img class="user-info-img" src="https://www.shop5.ir/Template/Images/user-profile.png"/>
            <p class="user-info-name" v-if="user !== null">{{ user.user.name }}</p>


            <a v-if="! this.user.chat.length && ! this.user.requestFromMe.length && ! this.user.requestForMe.length" class="friend-btn" @click.prevent="sendRequest(user)">Send Request</a>
            <span v-else-if="this.user.requestFromMe.length" class="request-sent">Request Was Sent<i class="fas fa-check"></i></span>
            <a v-else-if="this.user.requestForMe.length" class="friend-btn" @click.prevent="acceptRequest(user)">Accept Request</a>
        </div>

    </div>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Userinfo',

        computed: {
            ...mapGetters({
                user: 'getUser',
                me: 'getMe',
                requests: 'getRequests'
            })
        },

        methods: {
            ...mapActions({
                getRequests: 'getRequests',
                request: 'sendRequest',
                accept: 'acceptRequest'
            }),

            sendRequest(user) {
                this.request({ user_one: this.me.id, user_two: user.user._id });
            },

            acceptRequest(user) {
                 this.accept({ user_one: this.me.id, user_two: user.user._id });
            }
        }
    }
</script>


<style>
    .user-info-container {
        height: 60px;
        width: 549px;
        float: left;
        /*background-color: rgba(227,227,232,0.21);*/
        background-color: #FAFAFA;
        border-bottom: 1px solid rgba(182,182,186,0.21);
        position: relative;
    }

    .user-info-img {
        width: 40px;
        margin: 4px 15px 5px 10px;
        float: left;
    }
    .user-info-name {
        margin: 6px 0 0 55px;
        display: block;
        padding: 0;
    }

    .friend-btn {
        background-color: #65c162;
        color: white!important;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 13px;
        padding: 2px 10px;
        font-weight: bold;
    }
    .friend-btn:focus {
        outline: none;
    }
    .friend-btn:hover {
        background-color: #5ca359;
    }

    .request-sent {
        font-size: 13px;
        color: #979ca3;
    }
    .request-sent > .fa-check {
        color: #65c162;
        margin-left: 10px;
    }
</style>
