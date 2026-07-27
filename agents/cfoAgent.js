/*

Family Wealth AI OS

V4.0 Alpha Build 009.3

AI CFO Agent

财富健康评分引擎

*/

const cfoAgent = {

    name:"AI CFO Agent",

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

        investmentAgent,

        taxAgent,

        retirementAgent

    ){

        let assets =

        assetsAgent.summary();

        let income =

        incomeAgent.summary();

        let investment =

        investmentAgent.summary();

        let assetScore =

        this.assetScore(

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

        let planningScore =

        20;

        let totalScore =

        assetScore +

        incomeScore +

        investmentScore +

        planningScore;

        return {

            title:

            "AI CFO 财富报告",

            totalAssets:

            Number(

                assets.totalValue || 0

            ),

            totalIncome:

            Number(

                income.totalIncome || 0

            ),

            investmentProfit:

            Number(

                investment.profit || 0

            ),

            assetCount:

            assets.count || 0,

            investmentCount:

            investment.count || 0,

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

            advice:

            this.generateAdvice(

                assets,

                income,

                investment

            )

        };

    },

    // ======================

    // 资产评分

    // ======================

    assetScore(assets){

        let score = 0;

        if(

            assets.count > 0

        ){

            score += 10;

        }

        if(

            assets.totalValue > 10000

        ){

            score += 10;

        }

        if(

            assets.count >= 3

        ){

            score += 5;

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

        let score = 0;

        if(

            income.count > 0

        ){

            score += 10;

        }

        if(

            income.totalIncome > 50000

        ){

            score += 10;

        }

        if(

            income.count >= 2

        ){

            score += 5;

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

        let score = 0;

        if(

            investment.count > 0

        ){

            score += 10;

        }

        if(

            investment.profit >= 0

        ){

            score += 10;

        }

        if(

            investment.count >= 3

        ){

            score += 5;

        }

        return Math.min(

            score,

            25

        );

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(

        assets,

        income,

        investment

    ){

        let advice=[];

        if(

            assets.count === 0

        ){

            advice.push(

            "请完善家庭资产信息"

            );

        }

        if(

            income.count === 0

        ){

            advice.push(

            "建议录入收入来源"

            );

        }

        if(

            investment.count > 0 &&

            investment.profit < 0

        ){

            advice.push(

            "投资组合存在亏损，需要关注风险"

            );

        }

        if(

            investment.count > 0 &&

            investment.count < 3

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

    // 总入口

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
