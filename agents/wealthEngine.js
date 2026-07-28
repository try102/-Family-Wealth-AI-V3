/*

Family Wealth AI OS

V5.0

Wealth Engine V2.0

家庭财富统一总账引擎

*/

const wealthEngine = {

    name:"Wealth Engine V2.0",

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent

    ){

        let assetData =

        assetsAgent.summary();

        let investmentData =

        investmentAgent.summary();

        let incomeData =

        incomeAgent.summary();

        let normalAssets =

        Number(

            assetData.totalValue || 0

        );

        let investmentAssets =

        Number(

            investmentData.totalValue || 0

        );

        let totalAssets =

        normalAssets +

        investmentAssets;

        return {

            // 总资产

            totalAssets,

            // 净资产（暂未加入负债）

            netWorth:

            totalAssets,

            // 普通资产

            normalAssets,

            // 投资资产

            investmentAssets,

            // 年度收入

            income:

            Number(

                incomeData.totalIncome || 0

            ),

            // 投资收益

            investmentProfit:

            Number(

                investmentData.profit || 0

            )

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

            let category =

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

            let category =

            item.type || "投资";

            if(!result[category]){

                result[category]=0;

            }

            result[category]+=

            Number(

                item.currentValue || 0

            );

        });

        return result;

    },

    // ======================

    // 所有人资产

    // ======================

    ownerAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        assetsAgent.view()

        .forEach(item=>{

            let owner =

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

            let owner =

            item.owner || "未分类";

            if(!result[owner]){

                result[owner]=0;

            }

            result[owner]+=

            Number(

                item.currentValue || 0

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

            let country =

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

            let country =

            item.market || "其他";

            if(!result[country]){

                result[country]=0;

            }

            result[country]+=

            Number(

                item.currentValue || 0

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

        return {

            summary:

            this.summary(

                assetsAgent,

                investmentAgent,

                incomeAgent

            ),

            assetAllocation:

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
