/*

Family Wealth AI OS

V5.3

Investment Center Agent

交易记录 + 库存管理版

*/

const investmentAgent = {

    name:"Investment Center Agent V5.3",

    investments:[],

    // 初始化

    init(){

        this.load();

    },

    // 读取

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

    // 保存

    save(){

        localStorage.setItem(

            "wealth_investments",

            JSON.stringify(

                this.investments

            )

        );

    },

    // ======================

    // 计算剩余数量

    // ======================

    calculateRemainingQuantity(item){

        let buy =

        Number(

            item.buyQuantity || 0

        );

        let sell =

        Number(

            item.sellQuantity || 0

        );

        return buy - sell;

    },

    // ======================

    // 买入成本

    // ======================

    calculateBuyAmount(item){

        let price =

        Number(

            item.buyPrice || 0

        );

        let quantity =

        Number(

            item.buyQuantity || 0

        );

        if(price>0 && quantity>0){

            return price * quantity;

        }

        return Number(

            item.buyAmount || 0

        );

    },

    // ======================

    // 当前价值

    // ======================

    calculateCurrentValue(item){

        let quantity =

        this.calculateRemainingQuantity(

            item

        );

        let price =

        Number(

            item.currentPrice || 0

        );

        if(quantity>0 && price>0){

            return quantity * price;

        }

        return Number(

            item.currentValue || 0

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

            investment.currency || "",

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

            buyAmount:0,

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

            // 当前库存

            currentPrice:

            Number(

                investment.currentPrice || 0

            ),

            currentValue:0,

            note:

            investment.note || ""

        };

        item.buyAmount =

        this.calculateBuyAmount(item);

        item.currentValue =

        this.calculateCurrentValue(item);

        this.investments.push(item);

        this.save();

        return item;

    },

    // 查看

    view(){

        return this.investments;

    },

    // 编辑

    edit(id,newData){

        let item =

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

        item.buyAmount =

        this.calculateBuyAmount(item);

        item.currentValue =

        this.calculateCurrentValue(item);

        this.save();

        return item;

    },

    // 删除

    delete(id){

        this.investments =

        this.investments.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 库存

    // ======================

    inventory(){

        return this.investments.map(item=>{

            let remain =

            this.calculateRemainingQuantity(

                item

            );

            let cost =

            Number(

                item.buyPrice || 0

            )

            *

            remain;

            let value =

            Number(

                item.currentPrice || 0

            )

            *

            remain;

            return {

                name:item.name,

                ticker:item.ticker,

                type:item.type,

                quantity:remain,

                cost,

                value,

                unrealizedProfit:

                value-cost

            };

        });

    },

    // ======================

    // 总览

    // ======================

    summary(){

        let totalCost=0;

        let totalValue=0;

        this.investments.forEach(item=>{

            totalCost +=

            Number(

                item.buyAmount || 0

            );

            totalValue +=

            Number(

                item.currentValue || 0

            );

        });

        let profit =

        totalValue-totalCost;

        let rate=0;

        if(totalCost>0){

            rate=

            (

                profit /

                totalCost *

                100

            ).toFixed(2);

        }

        return {

            count:

            this.investments.length,

            totalCost,

            totalValue,

            profit,

            returnRate:rate

        };

    },

    // ======================

    // Dashboard

    // ======================

    dashboardSummary(){

        return this.summary();

    },

    // ======================

    // 风险

    // ======================

    riskSummary(){

        return {

            level:

            "高",

            maxCategory:

            "其他",

            maxRatio:

            "100",

            advice:

            [

            "投资集中度需要关注"

            ]

        };

    },

    // ======================

    // 表现

    // ======================

    performanceSummary(){

        return {

            profitCount:0,

            lossCount:0,

            averageReturnRate:0

        };

    },

    analyze(){

        return {

            summary:

            this.summary(),

            inventory:

            this.inventory()

        };

    }

};

export default investmentAgent;
