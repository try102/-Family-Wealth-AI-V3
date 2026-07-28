/*

Family Wealth AI OS

V5.4

AI CFO Agent

Wealth Engine Integration

财富分析中心

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent={

    name:"AI CFO Agent V5.4",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO Ready";

    },

    // ======================

    // 财富分析

    // ======================

    analyzeWealth(

        assetsAgent,

        incomeAgent,

        investmentAgent

    ){

        let wealth =

        wealthEngine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent

        );

        let allocation =

        wealthEngine.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        let assetScore =

        this.assetScore(

            wealth

        );

        let incomeScore =

        this.incomeScore(

            wealth

        );

        let investmentScore =

        this.investmentScore(

            wealth

        );

        let planningScore=20;

        let totalScore=

        assetScore

        +

        incomeScore

        +

        investmentScore

        +

        planningScore;

        return{

            title:

            "AI CFO 财富报告",

            totalAssets:

            wealth.totalAssets,

            netWorth:

            wealth.netWorth,

            totalIncome:

            wealth.totalIncome,

            investmentProfit:

            wealth.investmentProfit,

            assetCount:

            wealth.assetCount,

            investmentCount:

            wealth.investmentCount,

            wealthScore:

            totalScore,

            scoreDetail:{

                asset:

                assetScore,

                income:

                incomeScore,

                investment:

                investmentScore,

                planning:

                planningScore

            },

            allocation,

            allocationAdvice:

            this.allocationAdvice(

                allocation

            ),

            advice:

            this.generateAdvice(

                wealth

            )

        };

    },

    // ======================

    // 资产评分

    // ======================

    assetScore(wealth){

        let score=0;

        if(

            wealth.totalAssets>0

        ){

            score+=10;

        }

        if(

            wealth.totalAssets>100000

        ){

            score+=10;

        }

        if(

            wealth.assetCount>=3

        ){

            score+=5;

        }

        return Math.min(

            score,

            25

        );

    },

    // ======================

    // 收入评分

    // ======================

    incomeScore(wealth){

        let score=0;

        if(

            wealth.incomeCount>0

        ){

            score+=10;

        }

        if(

            wealth.totalIncome>50000

        ){

            score+=10;

        }

        if(

            wealth.incomeCount>=2

        ){

            score+=5;

        }

        return Math.min(

            score,

            25

        );

    },

    // ======================

    // 投资评分

    // ======================

    investmentScore(wealth){

        let score=0;

        if(

            wealth.investmentCount>0

        ){

            score+=10;

        }

        if(

            wealth.investmentProfit>=0

        ){

            score+=10;

        }

        if(

            wealth.investmentCount>=3

        ){

            score+=5;

        }

        return Math.min(

            score,

            25

        );

    },

    // ======================

    // 配置建议

    // ======================

    allocationAdvice(allocation){

        let advice=[];

        let total=0;

        Object.keys(allocation)

        .forEach(key=>{

            total+=

            Number(

                allocation[key]

            );

        });

        Object.keys(allocation)

        .forEach(key=>{

            let ratio=

            total>0

            ?

            allocation[key]

            /

            total

            *

            100

            :

            0;

            if(ratio>60){

                advice.push(

                    key+

                    "占比较高，需要关注集中风险"

                );

            }

        });

        if(advice.length===0){

            advice.push(

                "当前资产配置较均衡，可继续优化"

            );

        }

        return advice;

    },

    // ======================

    // 综合建议

    // ======================

    generateAdvice(wealth){

        let advice=[];

        if(

            wealth.totalAssets===0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

        }

        if(

            wealth.investmentProfit<0

        ){

            advice.push(

                "投资组合存在亏损，需要关注风险"

            );

        }

        if(

            wealth.investmentCount>0

            &&

            wealth.investmentCount<3

        ){

            advice.push(

                "投资集中度较高，可考虑增加资产分散"

            );

        }

        if(advice.length===0){

            advice.push(

                "当前财富结构运行正常，可进一步优化"

            );

        }

        return advice;

    },

    // ======================

    // 对外接口

    // ======================

    report(

        assetsAgent,

        incomeAgent,

        investmentAgent

    ){

        return this.analyzeWealth(

            assetsAgent,

            incomeAgent,

            investmentAgent

        );

    }

};

export default cfoAgent;
