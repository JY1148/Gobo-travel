import { Middleware } from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
console.log("state 当前", store.getState());//打印当前state状态
console.log("fire action", action);//打印当前action
next(action)//action的分发
console.log("state更新", store.getState());//打印更新后state状态
}