/*

Family Wealth AI OS

V5.4

Investment Agent

投资交易 + 库存统一接口版

*/

const investmentAgent={

    name:"Investment Agent V5.4",

    storageKey:"wealth_investments",

    investments:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        return "Investment Agent Ready";

    },

    // ======================

    // 读取数据

    // ======================

    load(){

        let data=

        localStorage.getItem(

            this.storageKey

        );

        if(data){

            this.investments=

            JSON.parse(data);

        }

        else{

            this.investments=[];

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

                this.investments

            )

        );

    },

    // ======================

    // 买入金额

    // ======================

    buyAmount(item){

        return (

            Number(item.buyPrice||0)

            *

            Number(item.buyQuantity||0)

        );

    },

    // ======================

    // 卖出金额

    // ======================

    sellAmount(item){

        return (

            Number(item.sellPrice||0)

            *

            Number(item.sellQuantity||0)

        );

    },

    // ======================

    // 当前持仓数量

    // ======================

    remainingQuantity(item){

        return (

            Number(item.buyQuantity||0)

            -

            Number(item.sellQuantity||0)

        );

    },
        // ======================

    // 当前市值

    // ======================

    currentValue(item){

        return (

            this.remainingQuantity(item)

            *

            Number(

                item.currentPrice || 0

            )

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(investment){

        let item={

            id:

            Date.now(),

            name:

            investment.name || "",

            ticker:

            investment.ticker || "",

            type:

            investment.type || "其他",

            market:

            investment.market || "",

            currency:

            investment.currency || "CNY",

            owner:

            investment.owner || "",

            // 买入

            buyDate:

            investment.buyDate || "",

            buyPrice:

            Number(

                investment.buyPrice || 0

            ),

            buyQuantity:

            Number(

                investment.buyQuantity || 0

            ),

            // 卖出

            sellDate:

            investment.sellDate || "",

            sellPrice:

            Number(

                investment.sellPrice || 0

            ),

            sellQuantity:

            Number(

                investment.sellQuantity || 0

            ),

            // 当前价格

            currentPrice:

            Number(

                investment.currentPrice || 0

            ),

            note:

            investment.note || ""

        };

        this.investments.push(item);

        this.save();

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.investments;

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item=

        this.investments.find(

            i=>i.id===id

        );

        if(!item){

            return "未找到投资记录";

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

        this.investments=

        this.investments.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 单项投资分析

    // ======================

    analyzeItem(item){

        let buy=

        this.buyAmount(item);

        let sell=

        this.sellAmount(item);

        let remain=

        this.remainingQuantity(item);

        let marketValue=

        this.currentValue(item);

        // 已实现收益

        let realized=0;

        if(

            item.buyQuantity>0 &&

            item.sellQuantity>0

        ){

            let avgCost=

            buy /

            item.buyQuantity;

            realized=

            (

                Number(item.sellPrice||0)

                -

                avgCost

            )

            *

            item.sellQuantity;

        }

        // 未实现收益

        let unrealized=

        marketValue

        -

        (

            remain

            *

            (

                buy /

                (

                    item.buyQuantity || 1

                )

            )

        );

        return{

            name:item.name,

            ticker:item.ticker,

            buyAmount:buy,

            sellAmount:sell,

            remainingQuantity:remain,

            marketValue,

            realizedProfit:

            realized,

            unrealizedProfit:

            unrealized,

            totalProfit:

            realized+

            unrealized

        };

    },
        // ======================

    // 投资汇总

    // ======================

    summary(){

        let totalCost=0;

        let totalValue=0;

        let totalProfit=0;

        this.investments.forEach(item=>{

            let data=

            this.analyzeItem(item);

            totalCost +=

            data.buyAmount;

            totalValue +=

            data.marketValue;

            totalProfit +=

            data.totalProfit;

        });

        let returnRate=0;

        if(totalCost>0){

            returnRate=

            (

                totalProfit

                /

                totalCost

                *

                100

            ).toFixed(2);

        }

        return{

            count:

            this.investments.length,

            totalCost,

            totalValue,

            profit:

            totalProfit,

            returnRate

        };

    },

    // ======================

    // 投资库存

    // ======================

    inventory(){

        return this.investments.map(item=>{

            return this.analyzeItem(item);

        });

    },

    // ======================

    // Dashboard接口

    // ======================

    dashboardSummary(){

        return this.summary();

    },

    // ======================

    // 投资表现

    // ======================

    performanceSummary(){

        let profitCount=0;

        let lossCount=0;

        let totalRate=0;

        this.investments.forEach(item=>{

            let data=

            this.analyzeItem(item);

            if(data.totalProfit>=0){

                profitCount++;

            }

            else{

                lossCount++;

            }

            let cost=

            data.buyAmount;

            if(cost>0){

                totalRate +=

                data.totalProfit

                /

                cost

                *

                100;

            }

        });

        let average=0;

        if(this.investments.length>0){

            average=

            (

                totalRate

                /

                this.investments.length

            ).toFixed(2);

        }

        return{

            profitCount,

            lossCount,

            averageReturnRate:

            average

        };

    },

    // ======================

    // 风险分析接口

    // ======================

    riskSummary(){

        let category={};

        this.investments.forEach(item=>{

            let type=

            item.type || "其他";

            if(!category[type]){

                category[type]=0;

            }

            category[type]+=

            this.currentValue(item);

        });

        let maxCategory="其他";

        let maxValue=0;

        Object.keys(category)

        .forEach(key=>{

            if(category[key]>maxValue){

                maxValue=

                category[key];

                maxCategory=

                key;

            }

        });

        let total=

        this.summary().totalValue;

        let ratio=0;

        if(total>0){

            ratio=

            (

                maxValue

                /

                total

                *

                100

            ).toFixed(2);

        }

        let advice=[];

        if(Number(ratio)>60){

            advice.push(

                "单一类别集中度较高，需要关注风险"

            );

        }

        else{

            advice.push(

                "投资类别分布较合理"

            );

        }

        return{

            level:

            Number(ratio)>60

            ?

            "高"

            :

            "正常",

            maxCategory,

            maxRatio:

            ratio,

            advice

        };

    },

    // ======================

    // AI分析入口

    // ======================

    analyze(){

        return{

            summary:

            this.summary(),

            inventory:

            this.inventory(),

            risk:

            this.riskSummary()

        };

    }

};

export default investmentAgent;
