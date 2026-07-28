/*

Family Wealth AI OS

V5.2

Wealth Engine V5.2

家庭财富统一总账引擎

*/

const wealthEngine = {

    name:"Wealth Engine V5.2",

    // ======================

    // 分类标准化

    // ======================

    normalizeCategory(category){

        if(!category){

            return "其他";

        }

        let c =

        category.toLowerCase();

        if(

            c.includes("stock") ||

            c.includes("股票")

        ){

            return "股票";

        }

        if(

            c.includes("fund") ||

            c.includes("基金") ||

            c.includes("etf")

        ){

            return "基金";

        }

        if(

            c.includes("bond") ||

            c.includes("债券")

        ){

            return "债券";

        }

        if(

            c.includes("cash") ||

            c.includes("现金")

        ){

            return "现金";

        }

        if(

            c.includes("real") ||

            c.includes("房")

        ){

            return "房地产";

        }

        return category;

    },

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

            totalAssets,

            netWorth:

            totalAssets,

            normalAssets,

            investmentAssets,

            income:

            Number(

                incomeData.totalIncome || 0

            ),

            investmentProfit:

            Number(

                investmentData.profit || 0

            ),

            assetCount:

            assetData.count || 0,

            investmentCount:

            investmentData.count || 0

        };

    },

    // ======================

    // 投资库存

    // ======================

    investmentInventory(

        investmentAgent

    ){

        return investmentAgent.view()

        .map(item=>{

            return {

                name:item.name,

                ticker:item.ticker || "",

                type:

                this.normalizeCategory(

                    item.type

                ),

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

            this.normalizeCategory(

                item.category

            );

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

            this.normalizeCategory(

                item.type

            );

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

            allocation:

            this.assetAllocation(

                assetsAgent,

                investmentAgent

            ),

            investmentInventory:

            this.investmentInventory(

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
