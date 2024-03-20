/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-20 12:30:51
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-20 12:30:52
 * @FilePath: \my-study\封装添加水印方法\water.js
 */

import { debounce } from "lodash-es";
/** 默认配置 */
const defaultConfig = {
  /** 防御（默认开启，能防御水印被删除或隐藏，但可能会有性能损耗） */
  defense: true,
  /** 文本颜色 */
  color: "#c0c4cc",
  /** 文本透明度 */
  opacity: 0.5,
  /** 文本字体大小 */
  size: 16,
  /** 文本字体 */
  family: "serif",
  /** 文本倾斜角度 */
  angle: -20,
  /** 一处水印所占宽度（数值越大水印密度越低） */
  width: 300,
  /** 一处水印所占高度（数值越大水印密度越低） */
  height: 200,
};

const bodyEl = document.body;

export function useWatermark(parentEl = bodyEl) {
  /** 备份文本 */
  let backupText;
  /** 最终配置 */
  let mergeConfig;
  /** 水印元素 */
  let watermarkEl;

  /** 观察器 */
  const observer = {
    watermarkElMutationObserver: undefined,
    parentElMutationObserver: undefined,
    parentElResizeObserver: undefined,
  };

  const setWatermark = (text, config = {}) => {
    if (!parentEl) {
      console.warn("请在 DOM 挂载完成后再调用 setWatermark 方法设置水印");
      return;
    }
    // 备份文本
    backupText = text;
    // 合并配置
    mergeConfig = { ...defaultConfig, ...config };
    // 创建或更新水印元素
    watermarkEl ? updateWatermarkEl() : createWatermarkEl();
    // 监听水印元素和容器元素的变化
    addElListener(parentEl);
  };
  /** 创建水印元素 */
  const createWatermarkEl = function () {
    const isBody =
      parentEl.tagName.toLowerCase() === bodyEl.tagName.toLowerCase();
    const watermarkElPosition = isBody ? "fixed" : "fixed";
    const parentElPosition = isBody ? "" : "relative";

    watermarkEl = document.createElement("div");
    watermarkEl.style.position = watermarkElPosition;
    watermarkEl.style.pointerEvents = "none";
    watermarkEl.style.top = 0;
    watermarkEl.style.left = 0;
    watermarkEl.style.position = watermarkElPosition;
    watermarkEl.style.zIndex = "999999";
    const { clientWidth, clientHeight } = parentEl;
    console.log(clientWidth, "到达");
    // 设置水印元素的宽高
    updateWatermarkEl({ clientWidth, clientHeight });
    // 设置水印容器为相对定位
    parentEl.style.position = parentElPosition;
    console.log(watermarkEl);
    // 将水印元素添加到容器元素中
    parentEl.appendChild(watermarkEl);
  };
  // 更新水印元素
  const updateWatermarkEl = function (options) {
    if (!watermarkEl) {
      return;
    }

    backupText &&
      (watermarkEl.style.background = `url(${createBase64()}) left top repeat`);
    options.clientWidth &&
      (watermarkEl.style.width = options.clientWidth + "px");
    options.clientHeight &&
      (watermarkEl.style.height = options.clientHeight + "px");
    console.log(watermarkEl);
  };

  const createBase64 = () => {
    const { color, opacity, size, family, angle, width, height } = mergeConfig;
    const canvasEl = document.createElement("canvas");
    canvasEl.widht = width;
    canvasEl.height = height;
    const ctx = canvasEl.getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.font = `${size}px ${family}`;
      ctx.rotate(angle * (Math.PI / 180));
      ctx.fillText(backupText, 0, height / 2);
    }
    return canvasEl.toDataURL();
  };
  // 清除水印
  const clearWatermark = () => {
    if (parentEl || !watermarkEl) return;
    // 移除水印元素和容器元素的监听
    removeListener();
    try {
      parentEl.removeChild(watermarkEl);
    } catch (error) {
      console.warn("水印元素已不存在");
    } finally {
      watermarkEl = null;
    }
  };
  /** 刷新水印（防御时调用） */
  const updateWatermark = debounce(() => {
    clearWatermark();
    createWatermarkEl();
    addElListener(parentEl);
  }, 100);

  /** 监听水印元素和容器元素的变化 */
  const addElListener = (targetNode) => {
    // 判断是否开启防御
    if (mergeConfig.defense) {
      // 防止重复添加监听
      if (
        !observer.watermarkElMutationObserver &&
        !observer.parentElMutationObserver
      ) {
        // 监听  DOM 变化
        addMutationListener(targetNode);
      } else {
        removeListener("mutation");
      }
      if (!observer.parentElResizeObserver) {
        // 监听 DOM 大小变化
        addResizeListener(targetNode);
      }
    }
  };
  const removeListener = (kind) => {
    if (kind === "mutation" || kind === "all") {
      observer.watermarkElMutationObserver.disconnet();
      observer.parentElMutationObserver.disconnet();
      observer.watermarkElMutationObserver = undefined;
      observer.parentElMutationObserver = undefined;
    }
    // 移除 resize 监听
    if (kind === "resize" || kind === "all") {
      observer.parentElResizeObserver?.disconnect();
      observer.parentElResizeObserver = undefined;
    }
  };

  /** 监听 DOM 变化 */
  const addMutationListener = (targetNode) => {
    // 当观察到变动时执行回调函数
    const mutaionCallback = debounce((mutationsList) => {
      mutationsList.forEach((mutation) => {
        debounce((mutation) => {
          switch (mutation.type) {
            case "attributes":
              mutation.target === watermarkEl && updateWatermark();
              break;
            case "childList":
              mutation.removedNodes.forEach((item) => {
                item === watermarkEl && targetNode.appendChild(watermarkEl);
              });
              break;
          }
        }, 100);
      });
    }, 100);
    // 创建观察器实例并传入回调
    observer.watermarkElMutationObserver = new MutationObserver(
      mutaionCallback
    );
    observer.parentElMutationObserver = new MutationObserver(mutaionCallback);
    // 以上配置开始观察目标节点
    observer.watermarkElMutationObserver.observe(watermarkEl, {
      attributes: true,
      childList: false,
      subtree: false,
    });
    observer.parentElMutationObserver.observe(targetNode, {
      attributes: false,
      childList: true,
      subtree: false,
    });
  };

  const addResizeListener = (targetNode) => {
    // 当 targetNode 大小变化时，重新设置水印元素的宽高
    const resizeCallback = debounce(() => {
      const { clientWidth, clientHeight } = targetNode;
      updateWatermarkEl({ clientWidth, clientHeight });
    }, 500);

    // 创建观察器实例并传入回调
    observer.parentElResizeObserver = new ResizeObserver(resizeCallback);
    // 开始观察目标节点
    observer.parentElResizeObserver.observe(targetNode);
  };
  /** 在组件卸载前移除水印以及各种监听 */
  window.addEventListener("beforeunload", () => {
    clearWatermark();
  });

  return { setWatermark, clearWatermark };
}
