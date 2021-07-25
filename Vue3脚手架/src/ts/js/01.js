// 类型注解
(function () {
    // function showMsg(str: string) {
    //     return '窗前明月光'+str
    // }
    // let msg = 'hahah'
    // console.log(showMsg(msg));
    var Person = /** @class */ (function () {
        function Person(firstName, lastName) {
            // 更新属性数据
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + '-' + lastName;
        }
        return Person;
    }());
    function showFullName(person) {
        return person.firstName + '--' + person.lastName;
    }
    var person = new Person('张泽雨', '马思纯');
    console.log(showFullName(person));
})();
