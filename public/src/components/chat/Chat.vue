<template>
    <div class="chat-container">

        <me></me>


        <div class="left">
            <div class="chat-switch-conversations" @click="switchConversations" v-bind:style="conversationsActive">
                <i class="far fa-comments fa-2x"></i>
                <!--<i class="new-message-icon fas fa-comment-alt"></i>-->
            </div>

            <div class="chat-switch-users" @click="switchUsers" v-bind:style="usersActive">
                <i class="fas fa-users fa-2x"></i>
            </div>

            <div id="ii" class="chat-switch-profile" @click="switchProfile" v-bind:style="profileActive">
                <i class="fas fa-ellipsis-v fa-2x"></i>
                <i class="request-icon fas fa-bell" id="request-icon"></i>
            </div>

            <users v-if="showUsers"></users>
            <conversations v-if="showConversations"></conversations>
            <profile v-if="showProfile"></profile>

        </div>


        <div class="right">
            <user-info></user-info>
            <messages></messages>
            <send></send>
        </div>
    </div>
</template>


<script>
    import Me from '@/components/chat/users/Me'
    import Users from '@/components/chat/users/Users'
    import Send from '@/components/chat/messages/Send'
    import UserInfo from '@/components/chat/users/UserInfo'
    import Profile from '@/components/chat/users/Profile'
    import Messages from '@/components/chat/messages/Messages'
    import Conversations from '@/components/chat/conversations/Conversations'

    import { mapActions, mapGetters } from 'vuex'
    import pusher from './../../pusher/pusher'
    import bus from './../../bus'

    export default {
        name: 'Chat',

        components: {
            Conversations,
            UserInfo,
            Messages,
            Profile,
            Users,
            Send,
            Me
        },

        data() {
            return {
                showConversations: true,
                showUsers: false,
                showProfile: false
            }
        },

        methods: {
            ...mapActions({
                getConversations: 'getConversations',
                getUnseenRequest: 'unseenRequest',
                getUsers: 'getUsers',
                markRequestAsSeen: 'markRequestAsSeen'
            }),

            switchConversations() {
                if (this.showConversations === false) {
                    this.showUsers = false;
                    this.showConversations = true;
                    this.showProfile = false;
                }
            },
            switchUsers() {
                if (this.showUsers === false) {
                    this.showConversations = false;
                    this.showUsers = true;
                    this.showProfile = false;
                }
            },
            switchProfile() {
                if (this.showProfile === false) {
                    this.showConversations = false;
                    this.showUsers = false;
                    this.showProfile = true;
                    this.markRequestAsSeen(this.me.id);
                    window.document.getElementById("request-icon").style.display = "none";
                }
            }
        },

        computed: {
            ...mapGetters({
                me: 'getMe'
            }),
            conversationsActive () {
                if (this.showConversations === true) {
                    return {
                        backgroundColor: '#EFF2F2',
                        opacity: '0.9'
                    }
                }
            },
            usersActive () {
                if (this.showUsers === true) {
                    return {
                        backgroundColor: '#EFF2F2',
                        opacity: '0.9'
                    }
                }
            },

            profileActive () {
                if (this.showProfile === true) {
                    return {
                        backgroundColor: '#EFF2F2',
                        opacity: '0.9'
                    }
                }
            },
        },

        mounted() {
        },

        created() {
            this.getUnseenRequest(this.me.id).then((r) => {
                if (r.data.length > 0) {
                    window.document.getElementById("request-icon").style.display = "block";
                    window.document.getElementsByClassName("chat-switch-profile")[0].style.setProperty("opacity", "1", "important");
                }
            });

            pusher.subscribe(`friendship-${this.me.id}`);

            var th = this;

            pusher.bind('request', function(data) {
                th.getUnseenRequest(data.friend_id).then((r) => {
                    if (r.data.length > 0) {
                        window.document.getElementById("request-icon").style.display = "block";
                        window.document.getElementsByClassName("chat-switch-profile")[0].style.setProperty("opacity", "1", "important");
                    }
                });
            });

            pusher.bind('accepted-request', function(data) {
                th.getConversations(th.me.id);
            });
            this.getConversations(this.me.id);
        }
    }
</script>


<style>
    .chat-switch-conversations, .chat-switch-users, .chat-switch-profile {
        /*width: 175;*/
        height: 60px;
        float: left;
        text-decoration: none;
        text-align: center;
        opacity: 0.3;
        color: #706EE9;
        /*color: #a09fa3;*/
        cursor: pointer;
        position: relative;
    }
    .chat-switch-conversations, .chat-switch-users {
        width: 150px;
    }
    .chat-switch-profile {
        width: 50px;
    }
    .chat-switch-conversations {
        /*background-color: rgba(214,214,219,0.69);*/
    }
    .chat-switch-users {
        /*background-color: rgba(162,69,53,0.3);*/
    }

    .fa-comments, .fa-users, .fa-ellipsis-v {
        margin-top: 12px!important;
    }

    /*.request-icon {*/
        /*position: absolute;*/
        /*color: white;*/
        /*opacity: 1.2;*/
        /*background-color: black;*/
        /*left: 50%;*/
        /*margin: 5px;*/
        /*font-size: 22px;*/
        /*border-radius: 5px 25px 20px 15px;*/
        /*border: 2px solid black;*/
    /*}*/


    .chat-container {
        width: 900px;
        height: 530px;
        border-radius: 7px;
        -webkit-box-shadow: 0px 0px 19px -2px rgba(122,113,122,1);
        -moz-box-shadow: 0px 0px 19px -2px rgba(122,113,122,1);
        box-shadow: 0px 0px 19px -2px rgba(122,113,122,1);
        margin : 90px auto 0 auto;
    }

    .left {
        width: 350px;
        float: left;
        background-color: #FBFCFB;
        border-right: 1px solid #EBEEED;
        box-sizing: content-box;
    }
    .right {
        width: 500px;
        float: left;
    }

    .request-icon {
        position: absolute;
        color: #e25036;
        top: -20px;
        left: 18px;
        font-size: 16px;
        display: none;
    }

    .new-message-icon {
        position: absolute;
        color: #296ddb;
        top: -20px;
        left: 66px;
        font-size: 16px;
    }
</style>
