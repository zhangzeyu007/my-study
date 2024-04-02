/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 19:04:40
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 19:24:27
 * @FilePath: \vue3ts\src\hooks\core\useTimeout.ts
 */
import { isFunction } from '@/utils/is';
import { tryOnUnmounted } from '@vueuse/core'
import { ref, watch } from 'vue'


export function useTimeoutFn(handle: any, wait: number, native: boolean = false) {
	if (!isFunction(handle)) {
		throw new Error('handle must be a function')
	}
	const { readyRef, stop, start } = useTimeoutRef(wait)
	if (native) {
		handle()
	} else {
		watch(readyRef, (maturity) => {
			maturity && handle()
		}, { immediate: false })
	}

	return { readyRef, stop, start };
}

export function useTimeoutRef(wait) {
	const readyRef = ref(false)
	let timer: any

	function stop(): void {
		readyRef.value = false
		timer && window.clearTimeout(timer)
	}

	function start(): void {
		stop()
		timer = setTimeout(() => {
			readyRef.value = true
		}, wait)
	}
	start()

	tryOnUnmounted(stop)
	return { readyRef, stop, start }
}