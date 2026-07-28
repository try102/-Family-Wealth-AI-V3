/*

Family Wealth AI OS

V5.2

AI CFO Agent

Wealth Engine V5.2 Integration

财富智能分析中心

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent = {

    name:"AI CFO Agent V5.2",

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

        let wealthReport =

        wealthEngine.report(

            assetsAgent,

            investmentAgent,

            incomeAgent

        );

        let wealth =

        wealthReport.summary;

        let assets =

        assetsAgent.summary();

        let income =

        incomeAgent.summary();

        let investment =

        investmentAgent.summary();

        let assetScore =

        this.assetScore(

            wealth,

            assets

        );

        let incomeScore =

        this.incomeScore(

            income

        );

        let investmentScore =

        this.investmentScore(

            investment

        );

        // 未来连接退休Agent

        let planningScore = 20;

        let totalScore =

        assetScore +

        incomeScore +

        investmentScore +

        planningScore;

        return {

            title:

            "AI CFO 财富报告",

            // 财富总览

            totalAssets:

            Number(

                wealth.totalAssets || 0

            ),

            netWorth:

            Number(

                wealth.netWorth || 0

            ),

            totalIncome:

            Number(

                wealth.income || 0

            ),

            investmentProfit:

            Number(

                wealth.investmentProfit || 0

            ),

            assetCount:

            wealth.assetCount || 0,

            investmentCount:

            wealth.investmentCount || 0,

            // 财富评分

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

            // 资产配置

            allocation:

            wealthReport.allocation,

            allocationAdvice:

            this.allocationAdvice(

                wealthReport.allocation

            ),

            // 投资库存

            investmentInventory:

            wealthReport.investmentInventory,

            // 所有人资产

            ownerAllocation:

            wealthReport.ownerAllocation,

            // 国家配置

            countryAllocation:

            wealthReport.countryAllocation,

            // AI建议

            advice:

            this.generateAdvice(

                wealth,

                income,

                investment

            )

        };

    },

    // ======================

    // 资产评分

    // ======================

    assetScore(

        wealth,

        assets

    ){

        let score=0;

        if(

            wealth.totalAssets>0

        ){

            score+=10;

        }

        if(

            wealth.totalAssets>10000

        ){

            score+=10;

        }

        if(

            assets.count>=3

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

    incomeScore(income){

        let score=0;

        if(

            income.count>0

        ){

            score+=10;

        }

        if(

            income.totalIncome>50000

        ){

            score+=10;

        }

        if(

            income.count>=2

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

    investmentScore(investment){

        let score=0;

        if(

            investment.count>0

        ){

            score+=10;

        }

        if(

            investment.profit>=0

        ){

            score+=10;

        }

        if(

            investment.count>=3

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

            total +=

            Number(

                allocation[key] || 0

            );

        });

        Object.keys(allocation)

        .forEach(category=>{

            let value =

            Number(

                allocation[category] || 0

            );

            if(total>0){

                let ratio =

                value /

                total *

                100;

                if(ratio>60){

                    advice.push(

                        category +

                        "占比较高，需要关注集中风险"

                    );

                }

            }

        });

        if(

            advice.length===0

        ){

            advice.push(

                "当前资产配置较均衡，可继续优化"

            );

        }

        return advice;

    },

    // ======================

    // 综合建议

    // ======================

    generateAdvice(

        wealth,

        income,

        investment

    ){

        let advice=[];

        if(

            wealth.totalAssets===0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

        }

        if(

            income.count===0

        ){

            advice.push(

                "建议录入收入来源"

            );

        }

        if(

            investment.count>0 &&

            investment.profit<0

        ){

            advice.push(

                "投资组合存在亏损，需要关注风险"

            );

        }

        if(

            investment.count>0 &&

            investment.count<3

        ){

            advice.push(

                "投资集中度较高，可考虑增加资产分散"

            );

        }

        if(

            advice.length===0

        ){

            advice.push(

                "当前财富结构运行正常，可进一步优化资产配置"

            );

        }

        return advice;

    },

    // ======================

    // 报告入口

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
