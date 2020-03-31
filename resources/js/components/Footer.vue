<template>
    <div class="mt-4" id="">
        <!-- <b-col cols="12" id="footer"> -->
            Footer
        <!-- </b-col> -->
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
#footer {
    // background-color: $primary;
    position: fixed;
    bottom: 0;
    //   width:100%;
    height: 200px;
    border: 2px solid $primary;
}
</style>
