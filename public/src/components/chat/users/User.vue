<template>
    <div class="user-container">

        <img class="user-img" src="./../../../assets/profile.png"/>
        <p class="user-name">{{ name }}</p>


        <a href="#" class="user-link" @click.prevent="chat">
            <span class="user-link-span"></span>
        </a>

    </div>
</template>


<script>
    export default {
        name: 'User',

        props: ['name', 'chat']
    }
</script>


<style>
    .active {
        background-color: #D3ECF2!important;
    }

    .user-container {
        background-color: #f4f7fc;
        border-bottom: 1px solid #E9EFEF;
        height: 80px;
        padding: 15px 15px 0 10px;
        position: relative;
    }
    .user-container:hover {
        background-color: #ebeef4;
    }

    .user-img {
        width: 50px;
        float: left;
        margin-right: 20px;
    }

    .user-name {
        font-weight: 14px;
        margin-bottom: 0;
    }

    .user-link, .user-link-span {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        line-height: 100px;
        display: block;
    }
</style>
