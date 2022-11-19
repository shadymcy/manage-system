import { defineStore } from "pinia"

interface listItem{
    name: string,
    path: string,
    title: string

}
export const useTagsStore = defineStore('tags',{
    state: ()=>{
        return{
            list: <listItem[]>[]
        }
    },
    getters: {
        show: state => {
            return state.list.length > 0
        },
        // map()函数不会改变原始数组，它形成的是 一个新的数组
        nameList: state => {
            return state.list.map(item => item.name)
        }
    },
    actions: {
        delTagsItem(index: number){
            // splice(index,howmany) ——> 删除从index位置开始的数，howmany为删除的个数
            this.list.splice(index, 1)
        },
        setTagsItem(data: listItem){
            // 数组末端添加数组项的方法
            this.list.push(data)
        },
        clearTags(){
            this.list = []
        },
        closeTagsOther(data : listItem[]){
            this.list = data
        },
        closeCurrentTag(data: any){
            // route是路由信息对象，每一个路由都会有一个route对象，是一个局部对象，它里面主要包含当前路由的一些基本信息，比如：name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。
            // router是VueRouter的实例，这个对象中是一个全局对象，他包含了所有的路由包含了许多关键的对象和属性
            for (let i = 0, len = this.list.length; i < len; i++){
                const item = this.list[i]
                // $route.fullPath识别当前页面路由的完整地址
                if (item.path === data.$route.fullPath){
                    if (i < len - 1){
                        data.$router.push(this.list[i + 1].path)
                    }else if (i > 0){
                        data.$router.push(this.list[i - 1].path)
                    }else{
                        data.$router.push('/')
                    }
                    this.list.splice(i, 1)
                    break
                }
            }            
        }

    }

})