<template>
    <div class="messages-container" id="messages-container">

        <div class="messages-wrap" ref="message">
            <div v-if="conversation !== null">
                <message v-for="c in conversation.messages"
                         v-bind:key="c._id"
                         v-bind:body="c.body"
                         v-bind:name="c.sender.name"
                         v-bind:date="createdAt(c.createdAt)"
                         v-bind:sender="c.sender.id">
                </message>
            </div>
        </div>

    </div>
</template>


<script>
    import Message from '@/components/chat/messages/Message'

    import { mapMutations, mapGetters } from 'vuex'
    import { formateTime } from '../../../moment'


    export default {
        name: 'Messages',

        components: {
            Message
        },

        computed: {
            ...mapGetters({
                conversation: 'getChat'
            })
        },

        updated() {
            if (this.conversation !== null) {
                this.$refs.message.scrollTop = this.$refs.message.scrollHeight;
            }
        },

        methods: {
            ...mapMutations({
                addMessage: 'addMessage'
            }),
            createdAt(date) {
                return formateTime(date);
            }
        }
    }
</script>


<style>
    #messages-container {
        width: 550px;
        height: 390px;
        float: left;
        position: relative;
        display: inline-block;
    }

    #messages-container::after {
        content: "";
        background-image: url("./../../../assets/cover.jpg");
        opacity: 0.11;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    .messages-wrap {
        height: 100%;
        overflow-y: scroll;
    }
</style>
