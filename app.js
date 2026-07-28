/*

Family Wealth AI OS

V5.2

Investment Center Agent

交易记录 + 投资库存仓库统一版

*/

const investmentAgent = {

    name:"Investment Center Agent",

    investments:[],

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

    // 计算买入成本

    // ======================

    calculateBuyAmount(item){

        let price =

        Number(item.buyPrice || 0);

        let quantity =

        Number(item.buyQuantity || 0);

        if(

            price > 0 &&

            quantity > 0

        ){

            return price * quantity;

        }

        return Number(

            item.buyAmount || 0

        );

    },

    // ======================

    // 计算当前库存价值

    // ======================

    calculateCurrentValue(item){

        let price =

        Number(item.currentPrice || 0);

        let quantity =

        Number(item.currentQuantity || 0);

        if(

            price > 0 &&

            quantity > 0

        ){

            return price * quantity;

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

            id:Date.now(),

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

            // 买入交易

            buyDate:

            investment.buyDate || "",

            buyPrice:

            Number(

                investment.buyPrice || 0

            ),

            buyQuantity:

            Number(

                investment.buyQuantity ||

                investment.quantity ||

                0

            ),

            buyAmount:0,

            // 当前库存

            currentPrice:

            Number(

                investment.currentPrice || 0

            ),

            currentQuantity:

            Number(

                investment.currentQuantity ||

                investment.quantity ||

                0

            ),

            currentValue:0,

            // 卖出信息

            sellDate:

            investment.sellDate || "",

            sellPrice:

            Number(

                investment.sellPrice || 0

            ),

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

    // ======================

    // 删除

    // ======================

    delete(id){

        this.investments =

        this.investments.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 投资库存汇总

    // ======================

    inventorySummary(){

        let totalValue=0;

        this.investments.forEach(item=>{

            totalValue +=

            Number(

                item.currentValue || 0

            );

        });

        return {

            count:

            this.investments.length,

            totalValue:

            totalValue

        };

    },

    // ======================

    // 投资统计

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

        let returnRate=0;

        if(totalCost>0){

            returnRate =

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

            returnRate

        };

    },

    // ======================

    // 分类配置

    // ======================

    allocation(){

        let result={};

        let total =

        this.inventorySummary()

        .totalValue;

        this.investments.forEach(item=>{

            let type =

            item.type || "其他";

            if(!result[type]){

                result[type]=0;

            }

            result[type]+=

            Number(

                item.currentValue || 0

            );

        });

        let output={};

        Object.keys(result)

        .forEach(type=>{

            output[type]={

                value:

                result[type],

                percentage:

                total>0

                ?

                (

                    result[type] /

                    total *

                    100

                ).toFixed(2)

                :

                0

            };

        });

        return output;

    },

    // ======================

    // Dashboard

    // ======================

    dashboardSummary(){

        let data =

        this.summary();

        let profitCount=0;

        let lossCount=0;

        this.investments.forEach(item=>{

            let profit =

            Number(

                item.currentValue || 0

            )

            -

            Number(

                item.buyAmount || 0

            );

            if(profit>0)

                profitCount++;

            if(profit<0)

                lossCount++;

        });

        return {

            totalCost:

            data.totalCost,

            totalValue:

            data.totalValue,

            profit:

            data.profit,

            returnRate:

            data.returnRate,

            investmentCount:

            data.count,

            profitCount,

            lossCount

        };

    },

    // ======================

    // 风险分析

    // ======================

    riskSummary(){

        let allocation =

        this.allocation();

        let maxCategory="";

        let maxRatio=0;

        Object.keys(allocation)

        .forEach(type=>{

            let ratio =

            Number(

                allocation[type].percentage

            );

            if(ratio>maxRatio){

                maxRatio=ratio;

                maxCategory=type;

            }

        });

        let level="低";

        let advice=[];

        if(maxRatio>60){

            level="高";

            advice.push(

                "单一投资类别占比较高，需要关注集中风险"

            );

        }

        else if(maxRatio>40){

            level="中";

            advice.push(

                "投资组合存在一定集中度"

            );

        }

        else{

            advice.push(

                "投资配置较分散"

            );

        }

        return {

            level,

            maxCategory,

            maxRatio,

            advice

        };

    },

    // ======================

    // 表现分析

    // ======================

    performanceSummary(){

        let profitCount=0;

        let lossCount=0;

        let totalRate=0;

        let count=0;

        this.investments.forEach(item=>{

            let cost =

            Number(item.buyAmount||0);

            let value =

            Number(item.currentValue||0);

            let profit =

            value-cost;

            if(profit>0)

                profitCount++;

            if(profit<0)

                lossCount++;

            if(cost>0){

                totalRate +=

                profit/cost;

                count++;

            }

        });

        return {

            profitCount,

            lossCount,

            averageReturnRate:

            count>0

            ?

            (

                totalRate/count*100

            ).toFixed(2)

            :

            0

        };

    },

    // ======================

    // AI接口

    // ======================

    analyze(){

        return {

            message:

            "投资组合分析完成",

            summary:

            this.summary(),

            inventory:

            this.inventorySummary(),

            allocation:

            this.allocation(),

            risk:

            this.riskSummary(),

            performance:

            this.performanceSummary()

        };

    }

};

export default investmentAgent;
