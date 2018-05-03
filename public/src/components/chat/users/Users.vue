<template>
    <div class="users-container">

        <div class="users-search-wrap">
            <textarea class="search-form" placeholder="Find friends" required
                      v-model="query"
                      v-on:keyup="autoComplete">
            </textarea>
        </div>


        <div class="users-wrap" v-if="users !== null">
            <user v-for="user in users"
                  v-bind:key="user._id"
                  v-bind:name="user.name"
                  v-bind:chat="chat.bind(this, user)">
            </user>
        </div>

    </div>
</template>



<script>
    import user from '@/components/chat/users/User'

    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'Users',

        data() {
            return {
                query: null
            }
        },

        components: { user },

        methods: {
            ...mapActions({
                getUsers: 'getUsers',
                getUser: 'getUser',
                getChat: 'getChat',
                getRequests: 'getRequests',
                searchUsers: 'searchUsers'
            }),
            ...mapMutations({
                clearChat: 'clearChat'
            }),

            ...mapMutations({
                storeUser: 'storeUser'
            }),

            chat(user){
                this.getUser({ user_one: this.me.id, user_two: user._id });
                this.findChat(user);
            },

            autoComplete() {
                this.searchUsers({
                    me: this.me.id,
                    query: this.query
                });
            },

            findChat(user) {
                let fndOne = this.conversations.find(c => c.friends.user_one.id === user._id);
                let fndTwo = this.conversations.find(c => c.friends.user_two.id === user._id);

                if (fndOne !== undefined) {
                    this.getChat(fndOne._id)
                } else if (fndTwo !== undefined) {
                    this.getChat(fndTwo._id);
                } else {
                    this.clearChat();
                }
            }
        },


        created() {
            this.chat(this.users[0]);
        },


        created () {
            this.getUsers(this.me.id);
        },


        computed: {
            ...mapGetters({
                me: 'getMe',
                users: 'getUsers',
                conversations: 'getConversations'
            })
        }
    }
</script>



<style>
    .users-container {
        width: 350px;
        display: inline-block;
        float: left;
    }

    .users-wrap {
        width: 350px;
        height: 390px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .users-search-wrap {
        height: 50px;
        width: 100%;
    }

    .search-form {
        max-width: 100%;
        min-width: 100%;
        height: 100%;
        resize: none;
        color: #6e6e6e;
        opacity: 0.8;
        font-size: 14px;
        border: none;
        padding: 12px 8px 8px 30px;
    }
    .search-form:focus {
        outline: none;
    }
</style>
