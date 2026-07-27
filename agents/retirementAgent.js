/*

Family Wealth AI OS

V4.0 Build 008.3-F

Retirement Agent

*/

const retirementAgent = {

    name:"Retirement Planning Agent",

    plans:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

    },

    // ======================

    // 读取数据

    // ======================

    load(){

        let data = localStorage.getItem(

            "wealth_retirement"

        );

        if(data){

            this.plans = JSON.parse(data);

        }

    },

    // ======================

    // 保存数据

    // ======================

    save(){

        localStorage.setItem(

            "wealth_retirement",

            JSON.stringify(this.plans)

        );

    },

    // ======================

    // 添加退休规划

    // ======================

    add(plan){

        let newPlan={

            id:Date.now(),

            name:

            plan.name || "",

            retirementAge:

            Number(

                plan.retirementAge || 0

            ),

            currentAge:

            Number(

                plan.currentAge || 0

            ),

            currentAssets:

            Number(

                plan.currentAssets || 0

            ),

            annualExpense:

            Number(

                plan.annualExpense || 0

            ),

            annualIncome:

            Number(

                plan.annualIncome || 0

            ),

            medicalExpense:

            Number(

                plan.medicalExpense || 0

            ),

            expectedReturn:

            Number(

                plan.expectedReturn || 0

            ),

            note:

            plan.note || ""

        };

        this.plans.push(newPlan);

        this.save();

        return newPlan;

    },

    // ======================

    // 查看退休规划

    // ======================

    view(){

        return this.plans;

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item=this.plans.find(

            p=>p.id===id

        );

        if(!item){

            return "未找到退休规划";

        }

        Object.assign(

            item,

            newData

        );

        this.save();

        return item;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        this.plans =

        this.plans.filter(

            p=>p.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 退休统计

    // ======================

    summary(){

        let totalAssets = 0;

        let totalExpense = 0;

        let totalIncome = 0;

        this.plans.forEach(item=>{

            totalAssets += Number(

                item.currentAssets || 0

            );

            totalExpense += Number(

                item.annualExpense || 0

            );

            totalIncome += Number(

                item.annualIncome || 0

            );

        });

        return {

            count:this.plans.length,

            totalAssets:totalAssets,

            annualExpense:totalExpense,

            annualIncome:totalIncome

        };

    },

    // ======================

    // AI分析接口

    // ======================

    analyze(){

        let data=this.summary();

        return {

            message:

            "退休规划分析完成",

            data:data

        };

    }

};

export default retirementAgent;
