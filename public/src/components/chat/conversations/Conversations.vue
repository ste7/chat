<template>
    <div class="conversations-container">

        <div class="conversations-wrap" v-if="conversations !== null">
            <conversation v-for="conversation in conversations"
                          v-bind:key="conversation._id"
                          v-bind:name="friend(conversation._id)"
                          v-bind:message="conversation.messages[conversation.messages.length - 1].body"
                          v-bind:chat="chat.bind(this, conversation._id)"
                          v-bind:date="updatedAt(conversation.updatedAt)">
            </conversation>
        </div>

    </div>
</template>


<script>
    import Conversation from '@/components/chat/conversations/Conversation'

    import { namesOfFriends } from '../../../helper/chat'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import { formateTime } from '../../../moment'
    import bus from '../../../bus'

    export default {
        name: 'Conversations',

        components: {
            Conversation
        },

        data() {
            return {
                chat_id: null
            }
        },

        mounted() {
            this.getConversations(this.me.id).then(() => {
                (this.conversations.length > 0) ? this.chat(this.conversations[0]._id) : false;
            });
        },

        methods: {
            ...mapActions({
                getChat: 'getChat',
                getConversations: 'getConversations'
            }),
            chat(id){
                this.getChat(id);
                bus.$emit('open-chat', id);
                this.chat_id = id;
            },
            updatedAt(date) {
                return formateTime(date);
            },
            friend(conversation_id) {
                return namesOfFriends(conversation_id);
            }
        },

        computed: {
            ...mapGetters({
                conversations: 'getConversations',
                me: 'getMe'
            })
        }
    }
</script>


<style>
    .conversations-container {
        width: 350px;
        display: inline-block;
        float: left;
    }

    .conversations-wrap {
        width: 350px;
        height: 440px;
        overflow: hidden;
        overflow-y: scroll;
    }
</style>
