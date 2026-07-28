/*

Family Wealth AI OS

V5.4.1

Investment Center Agent

交易记录 + 库存管理 + 卖出收益版

*/

const investmentAgent = {

    name:

    "Investment Center Agent V5.4.1",

    investments:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        return "Investment Agent Ready";

    },

    // ======================

    // 读取

    // ======================

    load(){

        let data =

        localStorage.getItem(

            "wealth_investments"

        );

        if(data){

            this.investments =

            JSON.parse(data);

        }

    },

    // ======================

    // 保存

    // ======================

    save(){

        localStorage.setItem(

            "wealth_investments",

            JSON.stringify(

                this.investments

            )

        );

    },

    // ======================

    // 剩余数量

    // ======================

    remainingQuantity(item){

        return (

            Number(item.buyQuantity || 0)

            -

            Number(item.sellQuantity || 0)

        );

    },

    // ======================

    // 买入金额

    // ======================

    buyAmount(item){

        if(

            item.buyPrice > 0

            &&

            item.buyQuantity > 0

        ){

            return (

                item.buyPrice

                *

                item.buyQuantity

            );

        }

        return Number(

            item.buyAmount || 0

        );

    },

    // ======================

    // 卖出金额

    // ======================

    sellAmount(item){

        return (

            Number(item.sellPrice || 0)

            *

            Number(item.sellQuantity || 0)

        );

    },

    // ======================

    // 当前市值

    // ======================

    marketValue(item){

        let quantity =

        this.remainingQuantity(item);

        return (

            quantity

            *

            Number(item.currentPrice || 0)

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(data){

        let item={

            id:

            Date.now(),

            name:

            data.name || "",

            ticker:

            data.ticker || "",

            type:

            data.type || "其他",

            market:

            data.market || "",

            currency:

            data.currency || "",

            buyDate:

            data.buyDate || "",

            buyPrice:

            Number(data.buyPrice || 0),

            buyQuantity:

            Number(data.buyQuantity || 0),

            sellDate:

            data.sellDate || "",

            sellPrice:

            Number(data.sellPrice || 0),

            sellQuantity:

            Number(data.sellQuantity || 0),

            currentPrice:

            Number(data.currentPrice || 0),

            note:

            data.note || ""

        };

        item.buyAmount =

        this.buyAmount(item);

        item.sellAmount =

        this.sellAmount(item);

        item.currentValue =

        this.marketValue(item);

        this.investments.push(item);

        this.save();

        return item;

    },
        // ======================

    // 单项分析

    // ======================

    analyzeItem(item){

        let quantity =

        this.remainingQuantity(item);

        let value =

        this.marketValue(item);

        let cost =

        Number(item.buyPrice || 0)

        *

        quantity;

        return {

            // 修复删除关键字段

            id:

            item.id,

            name:

            item.name,

            ticker:

            item.ticker,

            type:

            item.type,

            // 当前库存

            quantity:

            quantity,

            // 成本

            cost:

            cost,

            // 当前价值

            value:

            value,

            // 兼容显示字段

            marketValue:

            value,

            // 盈亏

            profit:

            value - cost,

            unrealizedProfit:

            value - cost,

            // 卖出信息

            sellQuantity:

            Number(item.sellQuantity || 0),

            sellPrice:

            Number(item.sellPrice || 0),

            sellAmount:

            this.sellAmount(item)

        };

    },

    // ======================

    // 查看全部

    // ======================

    view(){

        return this.investments;

    },

    // ======================

    // 库存接口

    // ======================

    inventory(){

        return this.investments.map(

            item=>this.analyzeItem(item)

        );

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item =

        this.investments.find(

            x=>x.id===id

        );

        if(!item){

            return "未找到投资";

        }

        Object.assign(

            item,

            newData

        );

        item.buyAmount =

        this.buyAmount(item);

        item.sellAmount =

        this.sellAmount(item);

        item.currentValue =

        this.marketValue(item);

        this.save();

        return item;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        this.investments =

        this.investments.filter(

            item=>

            item.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 投资总览

    // ======================

    summary(){

        let totalCost=0;

        let totalValue=0;

        this.investments.forEach(item=>{

            totalCost +=

            this.buyAmount(item);

            totalValue +=

            this.marketValue(item);

        });

        let profit =

        totalValue - totalCost;

        let rate=0;

        if(totalCost>0){

            rate =

            (

                profit

                /

                totalCost

                *

                100

            ).toFixed(2);

        }

        return {

            count:

            this.investments.length,

            totalCost,

            totalValue,

            profit,

            returnRate:

            rate

        };

    },

    // ======================

    // Dashboard接口

    // ======================

    dashboardSummary(){

        return this.summary();

    },
        // ======================

    // 风险分析

    // ======================

    riskSummary(){

        let data = {};

        this.investments.forEach(item=>{

            let type =

            item.type || "其他";

            if(!data[type]){

                data[type]=0;

            }

            data[type] +=

            this.marketValue(item);

        });

        let total =

        Object.values(data)

        .reduce(

            (a,b)=>a+b,

            0

        );

        let maxCategory="无";

        let maxValue=0;

        Object.keys(data)

        .forEach(k=>{

            if(data[k]>maxValue){

                maxValue=data[k];

                maxCategory=k;

            }

        });

        let ratio =

        total>0

        ?

        (

            maxValue

            /

            total

            *

            100

        ).toFixed(2)

        :

        0;

        return {

            level:

            ratio>70

            ?

            "高"

            :

            "中",

            maxCategory,

            maxRatio:

            ratio,

            advice:

            [

            ratio>70

            ?

            "投资集中度较高，需要关注风险"

            :

            "投资配置较为均衡"

            ]

        };

    },

    // ======================

    // 投资表现

    // ======================

    performanceSummary(){

        let profitCount=0;

        let lossCount=0;

        let totalRate=0;

        let count=0;

        this.investments.forEach(item=>{

            let cost =

            this.buyAmount(item);

            let value =

            this.marketValue(item);

            if(cost>0){

                let rate =

                (

                    (value-cost)

                    /

                    cost

                    *

                    100

                );

                totalRate += rate;

                count++;

                if(rate>0){

                    profitCount++;

                }

                else if(rate<0){

                    lossCount++;

                }

            }

        });

        return {

            profitCount,

            lossCount,

            averageReturnRate:

            count>0

            ?

            (

                totalRate

                /

                count

            ).toFixed(2)

            :

            0

        };

    },

    // ======================

    // 综合分析

    // ======================

    analyze(){

        return {

            summary:

            this.summary(),

            inventory:

            this.inventory(),

            risk:

            this.riskSummary(),

            performance:

            this.performanceSummary()

        };

    }

};

export default investmentAgent;
