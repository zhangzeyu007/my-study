<template>
    <div class="home">
        <date-picker v-model="now"  />
    </div>
</template>

<script>
import DatePicker from '../components/DatePicker.vue'
export default {
    name: 'Home',
    components: {
        DatePicker
    },
    data() {
        return {
            now: new Date()
        }
    }
}
</script>
