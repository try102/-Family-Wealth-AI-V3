/*

Family Wealth AI OS

V5.2

Investment Center Agent

交易账本 + 投资库存仓库

*/

const investmentAgent = {

    name:"Investment Center Agent V5.2",

    transactions:[],

    inventory:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        this.rebuildInventory();

    },

    // ======================

    // 数据读取

    // ======================

    load(){

        let t =

        localStorage.getItem(

            "wealth_transactions"

        );

        if(t){

            this.transactions =

            JSON.parse(t);

        }

        // 兼容旧版本投资数据

        let old =

        localStorage.getItem(

            "wealth_investments"

        );

        if(old && this.transactions.length===0){

            let oldData =

            JSON.parse(old);

            oldData.forEach(item=>{

                this.transactions.push({

                    id:Date.now()+Math.random(),

                    name:item.name,

                    ticker:item.ticker,

                    type:item.type,

                    action:"BUY",

                    date:item.buyDate || "",

                    price:item.buyPrice || 0,

                    quantity:item.quantity || item.buyQuantity || 0

                });

            });

            this.save();

        }

    },

    // ======================

    // 保存

    // ======================

    save(){

        localStorage.setItem(

            "wealth_transactions",

            JSON.stringify(

                this.transactions

            )

        );

        localStorage.setItem(

            "wealth_inventory",

            JSON.stringify(

                this.inventory

            )

        );

    },

    // ======================

    // 添加交易

    // ======================

    addTransaction(data){

        let transaction={

            id:

            Date.now(),

            name:

            data.name || "",

            ticker:

            data.ticker || "",

            type:

            data.type || "其他",

            action:

            data.action || "BUY",

            date:

            data.date || "",

            price:

            Number(

                data.price || 0

            ),

            quantity:

            Number(

                data.quantity || 0

            ),

            currentPrice:

            Number(

                data.currentPrice || 0

            ),

            note:

            data.note || ""

        };

        this.transactions.push(

            transaction

        );

        this.rebuildInventory();

        this.save();

        return transaction;

    },

    // ======================

    // 查看交易

    // ======================

    viewTransactions(){

        return this.transactions;

    },

    // ======================

    // 删除交易

    // ======================

    deleteTransaction(id){

        this.transactions =

        this.transactions.filter(

            item=>item.id!==id

        );

        this.rebuildInventory();

        this.save();

    },

    // ======================

    // 核心：

    // 根据交易生成库存

    // ======================

    rebuildInventory(){

        let map={};

        this.transactions.forEach(t=>{

            let key =

            t.ticker ||

            t.name;

            if(!map[key]){

                map[key]={

                    name:t.name,

                    ticker:t.ticker,

                    type:t.type,

                    quantity:0,

                    cost:0,

                    averageCost:0,

                    currentPrice:

                    Number(

                        t.currentPrice || t.price || 0

                    )

                };

            }

            if(t.action==="BUY"){

                map[key].quantity +=

                Number(t.quantity);

                map[key].cost +=

                Number(t.price)

                *

                Number(t.quantity);

            }

            if(t.action==="SELL"){

                map[key].quantity -=

                Number(t.quantity);

            }

            if(t.currentPrice){

                map[key].currentPrice =

                Number(t.currentPrice);

            }

        });

        this.inventory =

        Object.values(map);

        this.inventory.forEach(item=>{

            if(item.quantity>0){

                item.averageCost =

                item.cost /

                (

                    item.quantity

                );

                item.currentValue =

                item.currentPrice *

                item.quantity;

                item.profit =

                item.currentValue -

                item.cost;

                item.returnRate =

                item.cost>0

                ?

                (

                    item.profit /

                    item.cost *

                    100

                ).toFixed(2)

                :

                0;

            }

        });

        this.inventory =

        this.inventory.filter(

            item=>

            item.quantity>0

        );

    },

    // ======================

    // 查看库存

    // ======================

    viewInventory(){

        return this.inventory;

    },

    // ======================

    // 修改当前价格

    // ======================

    updatePrice(

        ticker,

        price

    ){

        let item =

        this.inventory.find(

            i=>

            i.ticker===ticker

        );

        if(item){

            item.currentPrice =

            Number(price);

        }

        this.save();

    },

    // ======================

    // 总资产统计

    // ======================

    summary(){

        let totalCost=0;

        let totalValue=0;

        this.inventory.forEach(item=>{

            totalCost +=

            Number(item.cost || 0);

            totalValue +=

            Number(item.currentValue || 0);

        });

        return {

            count:

            this.inventory.length,

            totalCost,

            totalValue,

            profit:

            totalValue-totalCost,

            returnRate:

            totalCost>0

            ?

            (

                (

                    totalValue-totalCost

                )

                /

                totalCost

                *

                100

            ).toFixed(2)

            :

            0

        };

    },

    // ======================

    // 分类配置

    // ======================

    allocation(){

        let result={};

        this.inventory.forEach(item=>{

            let type=

            item.type || "其他";

            if(!result[type]){

                result[type]=0;

            }

            result[type]+=

            Number(

                item.currentValue || 0

            );

        });

        return result;

    },

    // ======================

    // Dashboard

    // ======================

    dashboardSummary(){

        let s=this.summary();

        return {

            investmentCount:

            s.count,

            totalCost:

            s.totalCost,

            totalValue:

            s.totalValue,

            profit:

            s.profit,

            returnRate:

            s.returnRate

        };

    },

    // ======================

    // 风险分析

    // ======================

    riskSummary(){

        let allocation =

        this.allocation();

        let max="";

        let value=0;

        Object.keys(allocation)

        .forEach(k=>{

            if(allocation[k]>value){

                value=

                allocation[k];

                max=k;

            }

        });

        let total =

        this.summary()

        .totalValue;

        let ratio=

        total>0

        ?

        (

            value/

            total*

            100

        ).toFixed(2)

        :

        0;

        return {

            level:

            ratio>60

            ?

            "高"

            :

            ratio>40

            ?

            "中"

            :

            "低",

            maxCategory:max,

            maxRatio:ratio,

            advice:

            ratio>60

            ?

            [

            "单一投资类别占比较高，需要关注集中风险"

            ]

            :

            [

            "投资配置较均衡"

            ]

        };

    },

    // ======================

    // AI接口

    // ======================

    analyze(){

        return {

            summary:

            this.summary(),

            inventory:

            this.inventory,

            allocation:

            this.allocation(),

            risk:

            this.riskSummary()

        };

    }

};

export default investmentAgent;
