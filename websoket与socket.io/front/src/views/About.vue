<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 12:16:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-28 22:01:28
 * @FilePath: \front\src\views\About.vue
-->

<template>
	<div>
		<input type="text">
		<div class="box">
			文字内容	文字内容	文字内容	文字内容	文字内容		
		</div>
	</div>
</template>



<style scoped>
input[required] {
	border: 1px solid blueviolet;
}
input:not([required]) {
	border: 1px solid red;
}
.box {
	width: 200px;
	height: 200px;
	border: 1px solid red;
	white-space: pre-wrap;

	text-align-last: right;
}
</style>