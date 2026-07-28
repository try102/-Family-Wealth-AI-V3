/*

Family Wealth AI OS

V5.1

Investment Center Agent

投资中心

统一价格×数量计算版

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

    // 自动计算金额

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

    calculateCurrentValue(item){

        let price =

        Number(

            item.currentPrice || 0

        );

        let quantity =

        Number(

            item.currentQuantity || 0

        );

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

        let newInvestment={

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

            // 买入信息

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

            buyAmount:

            0,

            // 当前信息

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

            currentValue:

            0,

            sellDate:

            investment.sellDate || "",

            sellPrice:

            Number(

                investment.sellPrice || 0

            ),

            note:

            investment.note || ""

        };

        newInvestment.buyAmount =

        this.calculateBuyAmount(

            newInvestment

        );

        newInvestment.currentValue =

        this.calculateCurrentValue(

            newInvestment

        );

        this.investments.push(

            newInvestment

        );

        this.save();

        return newInvestment;

    },
        // ======================

    // 查看投资

    // ======================

    view(){

        return this.investments;

    },

    // ======================

    // 编辑投资

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

        // 修改后重新计算

        item.buyAmount =

        this.calculateBuyAmount(

            item

        );

        item.currentValue =

        this.calculateCurrentValue(

            item

        );

        this.save();

        return item;

    },

    // ======================

    // 删除投资

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

    // 基础统计

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

        totalValue -

        totalCost;

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

    // 投资配置分析

    // ======================

    allocation(){

        let result={};

        let totalValue =

        this.summary().totalValue;

        this.investments.forEach(item=>{

            let type =

            item.type || "其他";

            if(!result[type]){

                result[type]={

                    value:0,

                    percentage:0

                };

            }

            result[type].value +=

            Number(

                item.currentValue || 0

            );

        });

        Object.keys(result)

        .forEach(type=>{

            if(totalValue>0){

                result[type].percentage =

                (

                    result[type].value /

                    totalValue *

                    100

                ).toFixed(2);

            }

        });

        return result;

    },

    // ======================

    // 投资 Dashboard

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

            if(profit>0){

                profitCount++;

            }

            else if(profit<0){

                lossCount++;

            }

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

        let maxType="";

        let maxRatio=0;

        Object.keys(allocation)

        .forEach(type=>{

            let ratio =

            Number(

                allocation[type].percentage

            );

            if(ratio>maxRatio){

                maxRatio=ratio;

                maxType=type;

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

            maxCategory:maxType,

            maxRatio,

            advice

        };

    },
