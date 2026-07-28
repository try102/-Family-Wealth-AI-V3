/*

Family Wealth AI OS

V5.4

Wealth Engine

家庭财富统一总账引擎

*/

const wealthEngine={

    name:"Wealth Engine V5.4",

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent

    ){

        let assets =

        assetsAgent.summary();

        let investment =

        investmentAgent.summary();

        let income =

        incomeAgent.summary();

        let normalAssets =

        Number(

            assets.totalValue || 0

        );

        let investmentAssets =

        Number(

            investment.totalValue || 0

        );

        let totalAssets =

        normalAssets

        +

        investmentAssets;

        return{

            totalAssets,

            netWorth:

            totalAssets,

            normalAssets,

            investmentAssets,

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

            incomeCount:

            income.count || 0

        };

    },

    // ======================

    // 资产配置

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        assetsAgent.view()

        .forEach(item=>{

            let category=

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category]+=

            Number(

                item.value || 0

            );

        });

        investmentAgent.view()

        .forEach(item=>{

            let category=

            item.type || "投资";

            if(!result[category]){

                result[category]=0;

            }

            result[category]+=

            Number(

                investmentAgent.currentValue(item)

                ||

                0

            );

        });

        return result;

    },

    // ======================

    // 所有人配置

    // ======================

    ownerAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        assetsAgent.view()

        .forEach(item=>{

            let owner=

            item.owner || "未分类";

            if(!result[owner]){

                result[owner]=0;

            }

            result[owner]+=

            Number(

                item.value || 0

            );

        });

        investmentAgent.view()

        .forEach(item=>{

            let owner=

            item.owner || "未分类";

            if(!result[owner]){

                result[owner]=0;

            }

            result[owner]+=

            Number(

                investmentAgent.currentValue(item)

                ||

                0

            );

        });

        return result;

    },

    // ======================

    // 国家地区配置

    // ======================

    countryAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        assetsAgent.view()

        .forEach(item=>{

            let country=

            item.country || "其他";

            if(!result[country]){

                result[country]=0;

            }

            result[country]+=

            Number(

                item.value || 0

            );

        });

        investmentAgent.view()

        .forEach(item=>{

            let country=

            item.market || "其他";

            if(!result[country]){

                result[country]=0;

            }

            result[country]+=

            Number(

                investmentAgent.currentValue(item)

                ||

                0

            );

        });

        return result;

    },

    // ======================

    // 完整报告

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent

    ){

        return{

            summary:

            this.summary(

                assetsAgent,

                investmentAgent,

                incomeAgent

            ),

            allocation:

            this.assetAllocation(

                assetsAgent,

                investmentAgent

            ),

            ownerAllocation:

            this.ownerAllocation(

                assetsAgent,

                investmentAgent

            ),

            countryAllocation:

            this.countryAllocation(

                assetsAgent,

                investmentAgent

            )

        };

    }

};

export default wealthEngine;
