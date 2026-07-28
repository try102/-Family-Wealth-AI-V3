/*

Family Wealth AI OS

V5.2

Assets Agent

资产管理 + 价格×数量自动计算

兼容旧数据版

*/

const assetsAgent = {

    name:"Assets Agent V5.2",

    // ======================

    // 初始化

    // ======================

    init(){

        // 兼容旧版本 assets

        let oldData =

        localStorage.getItem("assets");

        let newData =

        localStorage.getItem("wealth_assets");

        if(!newData){

            if(oldData){

                localStorage.setItem(

                    "wealth_assets",

                    oldData

                );

            }

            else{

                localStorage.setItem(

                    "wealth_assets",

                    JSON.stringify([])

                );

            }

        }

        return "Assets Agent V5.2 Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem(

                "wealth_assets"

            )

            ||

            "[]"

        );

    },

    // ======================

    // 保存数据

    // ======================

    save(data){

        localStorage.setItem(

            "wealth_assets",

            JSON.stringify(data)

        );

    },

    // ======================

    // 核心计算

    // 价格 × 数量

    // 否则使用价值

    // ======================

    calculateValue(asset){

        let price =

        Number(asset.price || 0);

        let quantity =

        Number(asset.quantity || 0);

        if(

            price > 0 &&

            quantity > 0

        ){

            return price * quantity;

        }

        return Number(

            asset.value || 0

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let assets =

        this.getData();

        let newAsset={

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            asset.category || "其他",

            type:

            asset.type || "",

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "CNY",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            // 价格

            price:

            Number(

                asset.price || 0

            ),

            // 数量

            quantity:

            Number(

                asset.quantity || 0

            ),

            // 当前价值

            value:

            0,

            note:

            asset.note || ""

        };

        newAsset.value =

        this.calculateValue(

            newAsset

        );

        assets.push(

            newAsset

        );

        this.save(

            assets

        );

        return newAsset;

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

        let assets =

        this.getData();

        let index =

        assets.findIndex(

            item =>

            item.id === id

        );

        if(index !== -1){

            let updated={

                ...assets[index],

                ...newData

            };

            updated.value =

            this.calculateValue(

                updated

            );

            assets[index]=updated;

        }

        this.save(

            assets

        );

        return "修改成功";

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        let assets =

        this.getData();

        assets =

        assets.filter(

            item =>

            item.id !== id

        );

        this.save(

            assets

        );

        return "删除成功";

    },

    // ======================

    // 总资产统计

    // ======================

    summary(){

        let assets =

        this.getData();

        let totalValue=0;

        assets.forEach(item=>{

            totalValue +=

            this.calculateValue(

                item

            );

        });

        return {

            count:

            assets.length,

            totalValue

        };

    },

    // ======================

    // 分类分析

    // ======================

    allocationSummary(){

        let assets =

        this.getData();

        let result={};

        let total =

        this.summary()

        .totalValue;

        assets.forEach(item=>{

            let category =

            item.category ||

            "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category] +=

            this.calculateValue(

                item

            );

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
