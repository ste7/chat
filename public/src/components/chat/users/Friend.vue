<template>
    <div class="friend-container">

        <div v-if="friend !== null">
            <img class="friend-img" src="https://www.shop5.ir/Template/Images/user-profile.png"/>
            <p class="friend-name" v-if="friend !== null">{{ friend.name }}</p>
        </div>

    </div>
</template>


<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Friend',

        computed: {
            ...mapGetters({
                friend: 'getFriend'
            })
        }
    }
</script>


<style>
    .friend-container {
        height: 60px;
        width: 549px;
        float: left;
        /*background-color: rgba(227,227,232,0.21);*/
        background-color: #FAFAFA;
        border-bottom: 1px solid rgba(182,182,186,0.21);
    }

    .friend-img {
        width: 40px;
        margin: 4px 15px 5px 10px;
        float: left;
    }
    .friend-name {
        margin: 6px 0 0 55px;
        display: block;
        padding: 0;
    }
</style>
