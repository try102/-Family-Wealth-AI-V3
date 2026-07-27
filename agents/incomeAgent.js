/*

Family Wealth AI OS

V4.0 Build 008.1

Income Agent

*/

const incomeAgent = {

    name:"Income Agent",

    incomes:[],

    // 初始化

    init(){

        this.load();

    },

    // 读取数据

    load(){

        let data = localStorage.getItem(

            "wealth_incomes"

        );

        if(data){

            this.incomes = JSON.parse(data);

        }

    },

    // 保存数据

    save(){

        localStorage.setItem(

            "wealth_incomes",

            JSON.stringify(this.incomes)

        );

    },

    // 添加收入

    add(income){

        let newIncome={

            id:Date.now(),

            name:income.name || "",

            category:income.category || "",

            source:income.source || "",

            amount:Number(

                income.amount || 0

            ),

            period:income.period || "",

            currency:

            income.currency || "CNY",

            note:income.note || "",

            createDate:

            income.createDate ||

            new Date().toISOString()

        };

        this.incomes.push(newIncome);

        this.save();

        return newIncome;

    },

    // 查看

    view(){

        return this.incomes;

    },

    // 编辑

    edit(id,newData){

        let item=this.incomes.find(

            i=>i.id===id

        );

        if(!item){

            return "未找到收入记录";

        }

        Object.assign(

            item,

            newData

        );

        this.save();

        return item;

    },

    // 删除

    delete(id){

        this.incomes=this.incomes.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // 收入统计

    summary(){

        let total=0;

        this.incomes.forEach(item=>{

            total += Number(

                item.amount || 0

            );

        });

        return {

            count:this.incomes.length,

            totalIncome:total

        };

    },

    // AI分析接口

    analyze(){

        let result=this.summary();

        return {

            message:

            "收入分析完成",

            data:result

        };

    }

};

export default incomeAgent;
