/*

 

Family Wealth AI OS

V5.5

Liability Agent

家庭负债管理模块

资产负债表扩展版

*/

const liabilityAgent = {

    name:

    "Liability Agent V5.5",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem("liabilities")

        ){

            localStorage.setItem(

                "liabilities",

                JSON.stringify([])

            );

        }

        return "Liability Agent Ready";

    },

    // ======================

    // 读取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem("liabilities")

            ||

            "[]"

        );

    },

    // ======================

    // 保存数据

    // ======================

    save(data){

        localStorage.setItem(

            "liabilities",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加负债

    // ======================

    add(liability){

        let liabilities =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            liability.name || "",

            category:

            liability.category || "其他",

            type:

            liability.type || "",

            owner:

            liability.owner || "",

            institution:

            liability.institution || "",

            currency:

            liability.currency || "CNY",

            principal:

            Number(

                liability.principal || 0

            ),

            interestRate:

            Number(

                liability.interestRate || 0

            ),

            monthlyPayment:

            Number(

                liability.monthlyPayment || 0

            ),

            startDate:

            liability.startDate || "",

            dueDate:

            liability.dueDate || "",

            note:

            liability.note || ""

        };

        liabilities.push(item);

        this.save(liabilities);

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let liabilities =

        this.getData();

        let index =

        liabilities.findIndex(

            item => item.id === id

        );

        if(index !== -1){

            liabilities[index]={

                ...liabilities[index],

                ...newData

            };

        }

        this.save(liabilities);

        return liabilities;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        let liabilities =

        this.getData();

        liabilities =

        liabilities.filter(

            item => item.id !== id

        );

        this.save(liabilities);

        return "删除成功";

    },

    // ======================

    // 负债汇总

    // ======================

    summary(){

        let liabilities =

        this.getData();

        let totalLiability = 0;

        liabilities.forEach(item=>{

            totalLiability +=

            Number(

                item.principal || 0

            );

        });

        return{

            count:

            liabilities.length,

            totalLiability:

            totalLiability

        };

    },

    // ======================

    // 负债率

    // ======================

    debtRatio(totalAssets){

        let liability =

        this.summary()

        .totalLiability;

        if(

            !totalAssets

        ){

            return 0;

        }

        return Number(

            (

                liability

                /

                totalAssets

                *

                100

            ).toFixed(2)

        );

    }

};

export default liabilityAgent;
