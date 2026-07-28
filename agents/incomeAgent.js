/*

Family Wealth AI OS

V5.4

Income Agent

收入管理统一接口版

*/

const incomeAgent = {

    name:"Income Agent V5.4",

    storageKey:"wealth_incomes",

    incomes:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        return "Income Agent Ready";

    },

    // ======================

    // 读取

    // ======================

    load(){

        let data=

        localStorage.getItem(

            this.storageKey

        );

        if(data){

            this.incomes=

            JSON.parse(data);

        }

        else{

            this.incomes=[];

            this.save();

        }

    },

    // ======================

    // 保存

    // ======================

    save(){

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(

                this.incomes

            )

        );

    },

    // ======================

    // 添加收入

    // ======================

    add(income){

        let item={

            id:

            Date.now(),

            name:

            income.name || "",

            category:

            income.category || "",

            source:

            income.source || "",

            amount:

            Number(

                income.amount || 0

            ),

            period:

            income.period || "",

            owner:

            income.owner || "",

            note:

            income.note || ""

        };

        this.incomes.push(item);

        this.save();

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.incomes;

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item=

        this.incomes.find(

            i=>i.id===id

        );

        if(!item){

            return "未找到收入记录";

        }

        Object.assign(

            item,

            newData

        );

        if(newData.amount!==undefined){

            item.amount=

            Number(

                newData.amount

            );

        }

        this.save();

        return item;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        this.incomes=

        this.incomes.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 收入统计

    // ======================

    summary(){

        let totalIncome=0;

        this.incomes.forEach(item=>{

            totalIncome +=

            Number(

                item.amount || 0

            );

        });

        return{

            count:

            this.incomes.length,

            totalIncome

        };

    },

    // ======================

    // AI接口

    // ======================

    analyze(){

        return{

            summary:

            this.summary(),

            message:

            "收入分析完成"

        };

    }

};

export default incomeAgent;
