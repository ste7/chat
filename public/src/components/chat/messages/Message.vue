<template>
    <div class="message-container">

        <div class="message-wrap" v-bind:class="isIt(sender)">
            <img class="message-img" src="./../../../assets/profile.png"/>

            <div class="message-body-wrap">
                <p class="message-body">{{ body }}</p>
                <p class="message-user">{{ name }} <span class="message-date">{{ date }}</span></p>
            </div>
        </div>

    </div>
</template>


<script>
    import { myMessage } from '../../../helper/chat'

    export default {
        name: 'Message',

        props: ['name', 'body', 'date', 'sender'],

        methods: {
            isIt(id) {
                if (! myMessage(id)) {
                    return {
                        right: true
                    };
                }
            }
        }
    }
</script>


<style>
    .message-container {
        padding: 10px;
    }

    .message-wrap {
        float: left;
        margin: 10px 0 10px 0;
    }
    .message-wrap > .message-img {
        width: 50px;
        float: left;
    }
    .message-wrap > .message-body-wrap {
        padding: 4px 8px;
        border-radius: 16px;
        background-color: white;
        margin-left: 60px;
        width: 330px;
        box-shadow: 1px 1px 2px 0px rgba(194,177,194,1);
    }

    .message-body {
        margin: 5px;
        font-size: 14px;
        color: #525253;
    }

    .message-user {
        color: #b1b1b5;
        margin: 0;
        font-size: 12px;
    }

    .message-date {
        float: right;
        font-size: 12px;
    }





    .right > .message-img {
        float: right;
    }
    .right > .message-body-wrap {
        float: right;
        margin-right: 10px;
    }
    .right > .message-body-wrap {
        background-color: #EDFFC5;
    }
</style>
