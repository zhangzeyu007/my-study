// 类型注解
(() => {
    // function showMsg(str: string) {
    //     return '窗前明月光'+str
    // }
    // let msg = 'hahah'
    // console.log(showMsg(msg));

    // interface Iperson{
    //     firstName: string // 姓氏
    //     lastName: string
    // }

    // function showName(person:Iperson) {
    //     return person.firstName+ '--'+ person.lastName;
    // }

    // const person = {
    //     firstName: 'dong',
    //     lastName:'fdd'
    // }
    // console.log(showName(person));
    interface Iperson {
        firstName: string // 姓氏
        lastName: string
    }
    class Person {
        // 定义公共字段属性
        firstName: string
        lastName: string
        fullName: string
        constructor(firstName: string, lastName: string) {
            // 更新属性数据
            this.firstName = firstName
            this.lastName = lastName
            this.fullName = firstName + '-' + lastName
        }
    }
    function showFullName(person: Iperson) {
        return person.firstName + '--' + person.lastName;
    }

    let person = new Person('张泽雨', '马思纯')
    console.log(showFullName(person));
    
})()