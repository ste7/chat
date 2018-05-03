<template>
    <div class="send-container">

        <form method="post">
            <textarea class="send-form" placeholder="Write new message" required
                      v-model="message"
                      @keydown.enter.prevent.stop="send">
            </textarea>
        </form>

    </div>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'
    import { nameOfFriend } from '../../../helper/chat'
    import bus from '../../../bus'
    import * as pusher from '../../../pusher/pusher'


    export default {
        name: 'Send',

        data() {
            return {
                message: null
            }
        },

        methods: {
            ...mapActions({
                sendMessage: 'sendMessage'
            }),
            send() {
                if (this.message.length > 0) {
                    this.sendMessage({
                        conversation_id: this.chat._id,
                        sender: this.me,
                        message: this.message
                    });
                    this.message = null;
                }
            }
        },

        computed: {
            ...mapGetters({
                chat: 'getChat',
                me: 'getMe'
            })
        }
    }
</script>


<style>
    .send-container {
        display: inline-block;
        float: left;
        width: 549px;
    }

    .send-form {
        max-width: 100%;
        min-width: 100%;
        height: 50px;
        resize: none;
        color: #6e6e6e;
        opacity: 0.8;
        font-size: 14px;
        border: none;
        padding: 12px 8px 8px 30px;
    }
    .send-form:focus {
        outline: none;
    }
</style>
