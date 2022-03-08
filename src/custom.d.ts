//*.d.ts是ts专用的的定义声明，只包含类型生命，不包含逻辑；不会被编译，也不会被webpack打包

//定义css声明：只要import以css作为后缀的文件时，都会遵循以下的约定：
declare module "*.css"{
    //到处key所在的对象。原始类名和相应值都会被转化为该对象。
    const css : {[key:string]:string}
    export default css;
}