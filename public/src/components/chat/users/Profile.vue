<template>
    <div class="profile-container" :class="{ profile: isActive }">
        <img class="profile-img" src="./../../../assets/profile.png"/>
        <span class="profile-name">{{ me.name }}</span>
        <span class="profile-email">{{ me.email }}</span>

        <div class="profile-requests" v-if="requests !== null">
            <ul v-for="r in requests.forMe">
                <li>
                    <span class="profile-request-name">{{ r.friends.user_one.name }}</span><a class="friend-btn" @click.prevent="acceptRequest(r.friends.user_one)">Accept Request</a>
                </li>
            </ul>
        </div>

    </div>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'
    import { formateTime } from '../../../moment'
    import bus from '../../../bus'

    export default {
        name: 'Profile',

        data() {
            return {
                isActive: true
            }
        },

        methods: {
            ...mapActions({
                getRequests: 'getRequests',
                accept: 'acceptRequest'
            }),

            acceptRequest(user) {
                this.accept({ user_one: this.me.id, user_two: user.id });
            }
        },

        computed: {
            ...mapGetters({
                requests: 'getRequests',
                me: 'getMe'
            })
        },

        mounted() {
            this.getRequests(this.me.id);
        },

        created() {
            bus.$on('open-profile', (response) => {
                this.isActive = false;
                console.log(response);
            });
        }
    }
</script>


<style>
    .profile-container {
        height: 440px;
        width: 350px;
        display: inline-block;
        float: left;
        border-top: 1px solid #EFF2F2;
    }

    .profile-img {
        width: 70px;
        margin: 20px 20px 0 10px;
        float: left;
     }

    .profile-name {
        display: block;
        margin-top: 30px;
    }

    .profile-email {
        float: left;
        font-size: 13px;
        color: #b6bdc6;
    }

    .profile-requests {
        margin-top: 55px;
        padding-top: 10px;
        border-top: 1px solid #EFF2F2;
        overflow-y: scroll;
        height: 300px;
    }

    ul, li {
        list-style: none;
    }

    .profile-requests > ul > li {
        margin-bottom: 5px;
    }

    .profile-request-img {
        width: 25px;
        margin: 5px;
    }

    .profile-request-name {
        margin-right: 10px;
    }

    /*.conversations-container {*/
        /*width: 350px;*/
        /*display: inline-block;*/
        /*float: left;*/
    /*}*/

    /*.conversations-wrap {*/
        /*width: 350px;*/
        /*height: 440px;*/
        /*overflow: hidden;*/
        /*overflow-y: scroll;*/
    /*}*/
</style>
