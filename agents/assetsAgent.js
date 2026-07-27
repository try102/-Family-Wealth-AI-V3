/*

Family Wealth AI OS

V4.0 Alpha Build 009.5

Assets Agent

资产管理 + 资产配置分析

*/

const assetsAgent = {

    name:"Assets Agent",

    // ======================

    // 初始化

    // ======================

    init(){

        if(!localStorage.getItem("assets")){

            localStorage.setItem(

                "assets",

                JSON.stringify([])

            );

        }

        return "Assets Agent Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem("assets") || "[]"

        );

    },

    save(data){

        localStorage.setItem(

            "assets",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let assets=this.getData();

        asset.id=Date.now();

        assets.push(asset);

        this.save(assets);

    },

    // ======================

    // 查看资产

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 编辑资产

    // ======================

    edit(id,newData){

        let assets=this.getData();

        let index=

        assets.findIndex(

            item=>item.id===id

        );

        if(index!==-1){

            assets[index]={

                ...assets[index],

                ...newData

            };

        }

        this.save(assets);

    },

    // ======================

    // 删除资产

    // ======================

    delete(id){

        let assets=this.getData();

        assets=

        assets.filter(

            item=>item.id!==id

        );

        this.save(assets);

    },

    // ======================

    // 总资产统计

    // ======================

    summary(){

        let assets=this.getData();

        let totalValue=0;

        assets.forEach(item=>{
totalValue +=

Number(

item.value ||

item.currentValue ||

0

);

        });

        return {

            count:

            assets.length,

            totalValue:

            totalValue

        };

    },

    // ======================

    // 新增：资产配置分析

    // ======================

    allocationSummary(){

        let assets=this.getData();

        let result={};

        let total=

        this.summary().totalValue;

        assets.forEach(item=>{

            let category=

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }result[category] +=

Number(

item.value ||

item.currentValue ||

0

);
        });

        let allocation={};

        Object.keys(result).forEach(category=>{

            if(total>0){

                allocation[category]={

                    value:

                    result[category],

                    percentage:

                    (

                        result[category]

                        /

                        total

                        *

                        100

                    ).toFixed(2)

                };

            }

        });

        return allocation;

    }

};

export default assetsAgent;
