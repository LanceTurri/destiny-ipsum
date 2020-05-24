<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
@import '@/styles/_reset.scss';

html,
body {
    height: 100%;
}

#app {
    color: #333333;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    height: 100%;
}
</style>
