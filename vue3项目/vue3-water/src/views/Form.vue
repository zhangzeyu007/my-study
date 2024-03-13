<template>
  <div>
    <Form>
      <FormItem label="用户名">
        <Input />
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import Form from '@/components/Form.vue'
import FormItem from '@/components/FormItem.vue'
import Input from '@/components/Input.vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
