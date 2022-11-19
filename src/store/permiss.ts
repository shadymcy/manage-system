import { defineStore } from "pinia"
// https://zhuanlan.zhihu.com/p/533233367
interface ObjectList{
    [key:string] : string[]
}
// 我们需要使用pinia提供的defineStore()方法来创建一个store，该store用来存放我们需要全局使用的数据。
export const usePermissStore = defineStore('permiss',{
    state:()=>{
        const k = localStorage.getItem('ms_keys')
        return{
            key : k ? JSON.parse(k) : <string[]>[],
            defaultList: <ObjectList>{
                admin: ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
				user: ['4', '5',]
            }
        }
    },
    actions:{
        handleSet(keys: string[]){
            this.key = keys
        }
    }
})
