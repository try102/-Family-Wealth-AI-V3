/*

Family Wealth AI OS

V5.0

Wealth Engine V1.0

家庭财富总账引擎

*/

const wealthEngine = {

    name:"Wealth Engine",

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

        let assetValue =

        Number(

            assetData.totalValue || 0

        );

        let investmentValue =

        Number(

            investmentData.totalValue || 0

        );

        return {

            // 总资产

            totalAssets:

            assetValue

            +

            investmentValue,

            // 当前净资产

            netWorth:

            assetValue

            +

            investmentValue,

            // 非投资资产

            normalAssets:

            assetValue,

            // 投资资产

            investmentAssets:

            investmentValue,

            // 收入

            income:

            incomeData.totalIncome || 0,

            // 投资收益

            investmentProfit:

            investmentData.profit || 0

        };

    },

    // ======================

    // 资产分类汇总

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        let assets =

        assetsAgent.view();

        assets.forEach(item=>{

            let category =

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category]

            +=

            Number(

                item.value || 0

            );

        });

        let investments =

        investmentAgent.view();

        investments.forEach(item=>{

            let category =

            item.type || "投资";

            if(!result[category]){

                result[category]=0;

            }

            result[category]

            +=

            Number(

                item.currentValue || 0

            );

        });

        return result;

    },

    // ======================

    // 所有人分类

    // ======================

    ownerAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        let assets =

        assetsAgent.view();

        assets.forEach(item=>{

            let owner =

            item.owner || "未分类";

            if(!result[owner]){

                result[owner]=0;

            }

            result[owner]

            +=

            Number(

                item.value || 0

            );

        });

        let investments =

        investmentAgent.view();

        investments.forEach(item=>{

            let owner =

            item.owner || "未分类";

            if(!result[owner]){

                result[owner]=0;

            }

            result[owner]

            +=

            Number(

                item.currentValue || 0

            );

        });

        return result;

    },

    // ======================

    // 国家地区分类

    // ======================

    countryAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        let assets =

        assetsAgent.view();

        assets.forEach(item=>{

            let country =

            item.country || "其他";

            if(!result[country]){

                result[country]=0;

            }

            result[country]

            +=

            Number(

                item.value || 0

            );

        });

        let investments =

        investmentAgent.view();

        investments.forEach(item=>{

            let country =

            item.market || "其他";

            if(!result[country]){

                result[country]=0;

            }

            result[country]

            +=

            Number(

                item.currentValue || 0

            );

        });

        return result;

    },

    // ======================

    // 完整财富报告接口

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
