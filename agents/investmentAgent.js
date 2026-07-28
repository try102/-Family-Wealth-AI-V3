/*

Family Wealth AI OS

V5.2.1

Investment Center Agent

投资中心

交易记录 + 持仓库存管理版

*/

const investmentAgent = {

    name:"Investment Center Agent V5.2.1",

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

    // 买入金额计算

    // ======================

    calculateBuyAmount(item){

        let price =

        Number(item.buyPrice || 0);

        let quantity =

        Number(item.buyQuantity || 0);

        if(price>0 && quantity>0){

            return price * quantity;

        }

        return Number(

            item.buyAmount || 0

        );

    },

    // ======================

    // 当前库存价值计算

    // ======================

    calculateCurrentValue(item){

        let price =

        Number(item.currentPrice || 0);

        let quantity =

        Number(item.currentQuantity || 0);

        if(price>0 && quantity>0){

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

            // 买入交易

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

            buyAmount:

            0,

            // 当前库存

            currentQuantity:

            Number(

                investment.currentQuantity ||

                investment.buyQuantity ||

                0

            ),

            currentPrice:

            Number(

                investment.currentPrice || 0

            ),

            currentValue:

            0,

            // 卖出记录

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

    // 查看库存

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

    // 投资总览

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

    // 投资库存

    // ======================

    inventory(){

        return this.investments.map(item=>{

            return {

                name:item.name,

                ticker:item.ticker,

                type:item.type,

                quantity:

                Number(

                    item.currentQuantity || 0

                ),

                price:

                Number(

                    item.currentPrice || 0

                ),

                value:

                Number(

                    item.currentValue || 0

                )

            };

        });

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

            item.currentValue -

            item.buyAmount;

            if(profit>0){

                profitCount++;

            }

            else if(profit<0){

                lossCount++;

            }

        });

        return {

            ...data,

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

        let types={};

        this.investments.forEach(item=>{

            let type =

            item.type || "其他";

            if(!types[type]){

                types[type]=0;

            }

            types[type]+=

            Number(

                item.currentValue || 0

            );

        });

        let total =

        this.summary().totalValue;

        let maxType="";

        let maxRatio=0;

        Object.keys(types)

        .forEach(type=>{

            let ratio =

            types[type] /

            total *

            100;

            if(ratio>maxRatio){

                maxRatio=ratio;

                maxType=type;

            }

        });

        return {

            level:

            maxRatio>60

            ?"高"

            :"低",

            maxCategory:

            maxType,

            maxRatio:

            maxRatio.toFixed(2),

            advice:

            [

            maxRatio>60

            ?

            "单一类别集中度较高，需要关注风险"

            :

            "投资配置较分散"

            ]

        };

    },

    // ======================

    // 表现分析

    // ======================

    performanceSummary(){

        let profitCount=0;

        let lossCount=0;

        this.investments.forEach(item=>{

            let profit =

            item.currentValue -

            item.buyAmount;

            if(profit>0)

            profitCount++;

            if(profit<0)

            lossCount++;

        });

        return {

            profitCount,

            lossCount

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

            this.inventory(),

            risk:

            this.riskSummary()

        };

    }

};

export default investmentAgent;
