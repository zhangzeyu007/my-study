/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-20 11:12:32
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-29 17:52:39
 */

// Object.defineProperty
function defineReactive(obj, key, val) {
  // todo 如果val是对象, 需要递归处理
  observe(val);
  //todo 管家创建
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      //todo 依赖收集 添加订阅者
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        //todo 如果newval是一个对象, 也要做响应式处理
        observe(newVal);
        val = newVal;
        //todo  通知更新
        dep.notify();
      }
    }
  });
}

// 遍历指定数据对象每个key, 拦截他们
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // todo 每遇到一个对象, 就创建一个Observer实例
  // todo 创建一个Observer实例去做拦截操作
  new Observer(obj);
}
// proxy代理函数:让用户可以直接访问data中的key
function proxy(vm, key) {
  Object.keys(vm[key]).forEach(k => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      }
    });
  });
}
// 根据传入的vlaue类型做不同的操作
class Observer {
  constructor(value) {
    this.value = value;
    // todo 判断一下vlaue类型
    //todo 遍历对象
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

//todo 实现kVue构造函数
// todo 1.将data 做响应式处理
class KVue {
  constructor(options) {
    // 0.保存 options
    this.$options = options;
    this.$data = options.data;

    //todo 1.将data做响应式处理
    observe(this.$data);

    //todo 2.为$data做代理
    proxy(this, "$data");

    // 3.编译模板
    new Compile("#app", this);
  }
}
// 模板编译器
class Compile {
  // el-宿主元素, vm-Kvue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    // 解析模板
    if (this.$el) {
      // 编译
      this.compile(this.$el);
    }
  }
  compile(el) {
    // el 是宿主元素
    // 遍历它,判断当前遍历元素的类型
    // console.log(el.childNodes);
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 文本,{{xxx}}
        // console.log("编译文本", node.textContent, RegExp.$1);
        this.compileText(node);
      }

      // 递归
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  // 判断差值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  // 编译文本
  compileText(node) {
    // console.log(this.$vm[RegExp.$1]);
    node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }
  // 编译元素 :分析指令 @事件
  compileElement(node) {
    //todo 获取属性并遍历之
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // 指令： k-xxx ='yyy'
      const attrName = attr.name; // k-xxx
      const exp = attr.value;
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2); // xxx
        // 指令实际操作方法
        this[dir] && this[dir](node, exp);
      }
      // 处理事件
      if (this.isEvent(attrName)) {
        const dir = attrName.substring(1);
        // exp onClick
        // 事件监听
        this.eventHandler(node, exp, dir);
      }
    });
  }
  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }
  // 执行text 指令对应的更新函数
  text(node, exp) {
    this.update(node, exp, "text");
  }
  html(node, exp) {
    this.update(node, exp, "html");
  }
  // k-text对应操作函数更新
  textUpdater(node, val) {
    node.textContent = val;
  }
  // k-html对应操作函数更新
  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
  isEvent(dir) {
    return dir.indexOf("@") == 0;
  }
  eventHandler(node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }
  // k-model
  model(node, exp) {
    //todo: update 方法只完成赋值和更新
    this.update(node, exp, "model");
    //todo 事件监听
    node.addEventListener("input", e => {
      // 新的赋值给数据即可
      this.$vm[exp] = e.target.value;
    });
  }
  modelUpdater(node, value) {
    // 表单元素赋值
    node.value = value;
  }
  // 提取update  , 初始化和更新函数创建
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    // 初始化
    fn && fn(node, this.$vm[exp]);

    // 更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val);
    });
  }
}

// Watcher: 小秘书,跟视图中依赖 1:1
class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updaterFn;
    //todo 依赖收集触发
    Dep.target = this;
    this.vm[this.key]; // 触发上面的get
    Dep.target = null; // 全局变量设置为null
  }
  update() {
    // vm实例 与 值
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}
// 管家: 和某个key , 一一对应, 管理多个秘书, 数据更新时通知他们做更新工作
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(watcher) {
    this.deps.push(watcher);
  }
  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}
