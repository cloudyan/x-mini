//定义boolean
const isDone:boolean = false;
//定义number
const isNum:number = 1;
//定义string
const isString:string = 'lai'
//定义Array
const list:number[] = [1, 2, 3]; //写法1
const list:Array<number> = [1, 2, 3]; //写法2
//定义Enum(枚举)
enum Color{Red, Blue, Black}
var c:Color = Color.Blue;
console.log(c) //
console.log(Color[c]) //
console.log(Color['Blue']) //
//定义Any对象——可以随意改变数据类型
const anyList:any[] = [1, true, 'Blue']
//void不返回值
function warnUser():void {
    console.log('this is a warn message');
}
//类型断言——表示程序员自己知道自己在做什么，假设你进行了必要的检查
let strLength = (<string>someVal).length //<>表示类型断言
let strLength = (someVal as string).length //用as也可以在JSX中只能使用as
