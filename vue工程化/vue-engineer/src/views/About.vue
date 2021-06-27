
<template>
    <!-- module css 的使用方法 -->
    <div class="about">
        <h1>module css 的使用方法</h1>
        <h1 :class="$style.red">This is an about page</h1>
        <p :class="{ [$style.red]: isRed }">This is an about page</p>
        <p :class="[$style.red, $style.blod]">This is an about page</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isRed: true
        }
    }
}
</script>

<style lang="scss" module>
.red {
    color: red;
}
.blod {
    font-weight: 800;
}
</style>