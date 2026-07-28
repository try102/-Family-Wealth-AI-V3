/*

Family Wealth AI OS

V5.3.1

Investment Center Agent

交易记录 + 库存管理 + 稳定版

*/

const investmentAgent = {

    name:"Investment Center Agent V5.3.1",

    investments:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

    },

    // ======================

    // 读取

    // ======================

    load(){

        let data=

        localStorage.getItem(

            "wealth_investments"

        );

        if(data){

            this.investments=

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

    calculateRemainingQuantity(item){

        let buy=

        Number(item.buyQuantity||0);

        let sell=

        Number(item.sellQuantity||0);

        return Math.max(

            0,

            buy-sell

        );

    },

    // ======================

    // 买入成本

    // ======================

    calculateBuyAmount(item){

        let price=

        Number(item.buyPrice||0);

        let quantity=

        Number(item.buyQuantity||0);

        if(

            price>0 &&

            quantity>0

        ){

            return price*quantity;

        }

        return Number(

            item.buyAmount||0

        );

    },

    // ======================

    // 当前价值

    // ======================

    calculateCurrentValue(item){

        let remain=

        this.calculateRemainingQuantity(item);

        let price=

        Number(item.currentPrice||0);

        if(

            remain>0 &&

            price>0

        ){

            return remain*price;

        }

        return Number(

            item.currentValue||0

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(investment){

        let item={

            id:Date.now(),

            name:

            investment.name||"",

            ticker:

            investment.ticker||"",

            type:

            investment.type||"其他",

            market:

            investment.market||"",

            currency:

            investment.currency||"",

            owner:

            investment.owner||"",

            buyDate:

            investment.buyDate||"",

            buyPrice:

            Number(

                investment.buyPrice||0

            ),

            buyQuantity:

            Number(

                investment.buyQuantity||0

            ),

            buyAmount:0,

            sellDate:

            investment.sellDate||"",

            sellPrice:

            Number(

                investment.sellPrice||0

            ),

            sellQuantity:

            Number(

                investment.sellQuantity||0

            ),

            currentPrice:

            Number(

                investment.currentPrice||0

            ),

            currentValue:0,

            note:

            investment.note||""

        };

        item.buyAmount=

        this.calculateBuyAmount(item);

        item.currentValue=

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

        item.buyAmount=

        this.calculateBuyAmount(item);

        item.currentValue=

        this.calculateCurrentValue(item);

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

    // 投资库存

    // ======================

    inventory(){

        return this.investments.map(item=>{

            let remain=

            this.calculateRemainingQuantity(

                item

            );

            let cost=

            Number(

                item.buyPrice||0

            )*remain;

            let value=

            this.calculateCurrentValue(

                item

            );

            return{

                id:item.id,

                name:item.name,

                ticker:item.ticker,

                type:item.type,

                quantity:remain,

                buyPrice:Number(

                    item.buyPrice||0

                ),

                currentPrice:Number(

                    item.currentPrice||0

                ),

                cost,

                value,

                unrealizedProfit:

                value-cost

            };

        });

    },

    // ======================

    // 投资汇总

    // ======================

    summary(){

        let totalCost=0;

        let totalValue=0;

        let investmentCount=

        this.investments.length;

        this.investments.forEach(item=>{

            totalCost+=

            Number(

                item.buyAmount||0

            );

            totalValue+=

            this.calculateCurrentValue(

                item

            );

        });

        let profit=

        totalValue-totalCost;

        let returnRate=0;

        if(totalCost>0){

            returnRate=(

                profit/

                totalCost*

                100

            ).toFixed(2);

        }

        return{

            investmentCount,

            count:investmentCount,

            totalCost,

            totalValue,

            profit,

            returnRate

        };

    },

    // ======================

    // Dashboard

    // ======================

    dashboardSummary(){

        return this.summary();

    },
        // ======================

    // 风险分析

    // ======================

    riskSummary(){

        let allocation={};

        let totalValue=0;

        this.investments.forEach(item=>{

            let type=item.type||"其他";

            let value=

            this.calculateCurrentValue(item);

            totalValue+=value;

            if(!allocation[type]){

                allocation[type]=0;

            }

            allocation[type]+=value;

        });

        if(totalValue===0){

            return{

                level:"无",

                maxCategory:"无",

                maxRatio:"0.00",

                advice:[

                    "暂无投资数据"

                ]

            };

        }

        let maxCategory="";

        let maxValue=0;

        Object.keys(allocation)

        .forEach(key=>{

            if(allocation[key]>maxValue){

                maxValue=

                allocation[key];

                maxCategory=key;

            }

        });

        let ratio=

        (

            maxValue/

            totalValue*

            100

        ).toFixed(2);

        let level="低";

        let advice=[];

        if(ratio>=80){

            level="高";

            advice.push(

                "单一类别占比超过80%，建议尽快分散投资。"

            );

        }

        else if(ratio>=60){

            level="中";

            advice.push(

                "投资较集中，可适当增加其它资产类别。"

            );

        }

        else{

            level="低";

            advice.push(

                "投资组合较均衡。"

            );

        }

        return{

            level,

            maxCategory,

            maxRatio:ratio,

            advice

        };

    },
