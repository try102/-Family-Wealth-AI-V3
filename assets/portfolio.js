// Family Wealth AI Agent V3.5

// Portfolio Analysis Module

// 获取资产分类统计

function getPortfolioSummary(){

    let summary = {};

    assets.forEach(item=>{

        let category =

        item.category || "其他";

        if(!summary[category]){

            summary[category]=0;

        }

        summary[category]

        += Number(item.amount || 0);

    });

    return summary;

}

// 显示资产配置

function updatePortfolioDisplay(){

    let box =

    document.getElementById(

        "portfolio"

    );

    if(!box){

        return;

    }

    let summary =

    getPortfolioSummary();

    box.innerHTML =

    "<h3>资产配置</h3>";

    Object.keys(summary)

    .forEach(category=>{

        let percent =

        (

            summary[category]

            /

            calculateTotalAssets()

            *

            100

        ).toFixed(1);

        box.innerHTML += `

        ${category}：

        ¥${summary[category].toLocaleString()}

        (${percent}%)

        <br>

        `;

    });

}
