<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
@import '@/styles/_reset.scss';

:root {
  --generator-bkg-color: #ffffff;
  --generator-title-color: #ffffff;
  --generator-text-color: #ffffff;
  --generator-button-color: #ffffff;
  --generator-box-shadow: 20px 20px 60px #ffffff, -20px -20px 60px #ffffff;
}

html,
body {
    height: 100%;
}

#app {
    background-color: var(--generator-bkg-color);
    color: #333333;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    height: 100%;
}
</style>
