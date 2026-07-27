/*

Family Wealth AI OS

V4.0 Build 008.3-E

Tax Agent

*/

const taxAgent = {

    name:"Tax Center Agent",

    taxes:[],

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

            "wealth_taxes"

        );

        if(data){

            this.taxes = JSON.parse(data);

        }

    },

    // ======================

    // 保存数据

    // ======================

    save(){

        localStorage.setItem(

            "wealth_taxes",

            JSON.stringify(this.taxes)

        );

    },

    // ======================

    // 添加税务记录

    // ======================

    add(tax){

        let newTax={

            id:Date.now(),

            year:

            tax.year || "",

            country:

            tax.country || "",

            category:

            tax.category || "",

            income:

            Number(

                tax.income || 0

            ),

            taxAmount:

            Number(

                tax.taxAmount || 0

            ),

            deduction:

            Number(

                tax.deduction || 0

            ),

            note:

            tax.note || ""

        };

        this.taxes.push(newTax);

        this.save();

        return newTax;

    },

    // ======================

    // 查看税务记录

    // ======================

    view(){

        return this.taxes;

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item=this.taxes.find(

            t=>t.id===id

        );

        if(!item){

            return "未找到税务记录";

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

        this.taxes =

        this.taxes.filter(

            t=>t.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 税务统计

    // ======================

    summary(){

        let totalIncome = 0;

        let totalTax = 0;

        let totalDeduction = 0;

        this.taxes.forEach(item=>{

            totalIncome += Number(

                item.income || 0

            );

            totalTax += Number(

                item.taxAmount || 0

            );

            totalDeduction += Number(

                item.deduction || 0

            );

        });

        return {

            count:this.taxes.length,

            totalIncome:totalIncome,

            totalTax:totalTax,

            totalDeduction:totalDeduction

        };

    },

    // ======================

    // AI分析接口

    // ======================

    analyze(){

        let data=this.summary();

        return {

            message:

            "税务分析完成",

            data:data

        };

    }

};

export default taxAgent;
