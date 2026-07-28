/*

Family Wealth AI OS

V5.1

Assets Agent

资产管理 + 自动价值计算

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

    // 价值计算核心

    // ======================

    calculateValue(asset){

        let price =

        Number(asset.price || 0);

        let quantity =

        Number(asset.quantity || 0);

        // 优先价格×数量

        if(

            price > 0 &&

            quantity > 0

        ){

            return price * quantity;

        }

        // 否则使用直接输入价值

        return Number(

            asset.value ||

            0

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let assets=this.getData();

        let newAsset={

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            asset.category || "",

            type:

            asset.type || "",

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            // 新增字段

            price:

            Number(asset.price || 0),

            quantity:

            Number(asset.quantity || 0),

            // 自动计算

            value:

            this.calculateValue(asset),

            note:

            asset.note || ""

        };

        assets.push(newAsset);

        this.save(assets);

        return newAsset;

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

        let index =

        assets.findIndex(

            item=>item.id===id

        );

        if(index!==-1){

            let updated={

                ...assets[index],

                ...newData

            };

            updated.value =

            this.calculateValue(updated);

            assets[index]=updated;

        }

        this.save(assets);

    },

    // ======================

    // 删除资产

    // ======================

    delete(id){

        let assets=this.getData();

        assets =

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

            this.calculateValue(item);

        });

        return {

            count:

            assets.length,

            totalValue:

            totalValue

        };

    },

    // ======================

    // 资产配置分析

    // ======================

    allocationSummary(){

        let assets=this.getData();

        let result={};

        let total =

        this.summary().totalValue;

        assets.forEach(item=>{

            let category =

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category]

            +=

            this.calculateValue(item);

        });

        let allocation={};

        Object.keys(result)

        .forEach(category=>{

            allocation[category]={

                value:

                result[category],

                percentage:

                total>0

                ?

                (

                    result[category]

                    /

                    total

                    *

                    100

                ).toFixed(2)

                :

                0

            };

        });

        return allocation;

    }

};

export default assetsAgent;
