<template>
    <div class="conversation-container" v-bind:class="{ active: activeChat(this.$vnode.key) }">

        <img class="conversation-img" src="./../../../assets/profile.png"/>

        <p class="conversation-user">{{ name }} <span class="conversation-date">{{ date }}</span></p>

        <p class="conversation-message">{{ message }}</p>

        <!--<p class="conversation-unseen-messages">{{ unseenMessages }}</p>-->

        <a href="#" class="conversation-link" @click="chat">
            <span class="conversation-link-span"></span>
        </a>
    </div>
</template>


<script>
    import bus from '../../../bus'

    export default {
        name: 'Conversation',

        props: ['name', 'message', 'date', 'chat', 'date'],

        data() {
            return {
                current: null
            }
        },

        methods: {
            activeChat(id) {
                if (id === this.current) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        created() {
            bus.$on('open-chat', (data) => {
                this.current = data;
            });
        }
    }
</script>


<style>
    .active {
        background-color: #D3ECF2!important;
    }
    .conversation-container {
        background-color: #f4f7fc;
        border-bottom: 1px solid #E9EFEF;
        height: 80px;
        padding: 15px 15px 0 10px;
        position: relative;
    }
    .conversation-container:hover {
        background-color: #DBF0F5;
    }

    .conversation-img {
        width: 50px;
        float: left;
        margin-right: 20px;
    }

    .conversation-user {
        font-size: 16px;
        margin-bottom: 0;
        color: #525254;
    }

    .conversation-message {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #7c7c7e;
    }

    .conversation-link, .conversation-link-span {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .conversation-date {
        font-size: 12px;
        float: right;
        color: #818184;
    }

    .conversation-unseen-messages {
        position: absolute;
        right: 20px;
        bottom: 0;
        background-color: #72a6f9;
        border-radius: 5px;
        font-size: 14px;
        padding: 0 8px;
        color: white;
    }
</style>
