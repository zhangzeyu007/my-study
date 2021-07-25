<template>

    <button @click="modalOpen = true">弹出一个窗口</button>
    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
           这是一个弹出窗口body
            <button @click="modalOpen = false">关闭</button>
        </div>
      </div>
    </teleport>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
  setup() {
    return {};
  },
};
</script>

<style  scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: wheat;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>