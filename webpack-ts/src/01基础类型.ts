// 基础数据类型
(() => {
    // boolean类型
    let flag:boolean = true
    console.log(flag);
    // 数字类型
    let a1: number = 10 // 十进制
    console.log(a1);

    //字符串
    let name: string = 'tom'
    console.log(name);
    //undefined 和 null
    let und: undefined = undefined
    let nll: null = null
    console.log(und);
    console.log(nll);

    // 数组类型
    // 数组定义方式1 变量:数据类型[]
    let arr1: number[] = [1, 2, 3]
    // 定义方式2 泛型写法
    let arr2: Array<number> = [5, 6, 7]
    // 元组类型: 注意数据类型的位置和数据类型的个数,在定义的时候应该是一致的
    let arr3: [string, number, boolean] = ['哈哈哈', 2, true]
    console.log(arr1);
    console.log(arr2);
    console.log(arr3);

})()