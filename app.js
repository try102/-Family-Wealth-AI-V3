import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

import cfoAgent from "./agents/cfoAgent.js";

/*

Family Wealth AI OS

V4.0 Alpha Build 009.2-B

AI CFO Integration

*/

// ======================

// 系统启动

// ======================

window.onload=function(){

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    taxAgent.init();

    retirementAgent.init();

    cfoAgent.init();

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateDashboard();

};

// ======================

// 资产中心

// ======================

function addNewAsset(){

    let asset={

        name:getValue("assetName"),

        category:getValue("assetCategory"),

        type:getValue("assetType"),

        owner:getValue("assetOwner"),

        country:getValue("assetCountry"),

        currency:getValue("assetCurrency"),

        institution:getValue("assetInstitution"),

        account:getValue("assetAccount"),

        cost:Number(

            getValue("assetCost")

        ),

        value:Number(

            getValue("assetValue")

        ),

        note:getValue("assetNote")

    };

    if(!asset.name){

        alert("请输入资产名称");

        return;

    }

    assetsAgent.add(asset);

    clearAssetInput();

    updateAssetDisplay();

    updateDashboard();

}

function updateAssetDisplay(){

    let list=document.getElementById(

        "assetList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    let assets = assetsAgent.view();

    assets.forEach(function(item){

        let div=document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

类别：

${item.category}

<br>

类型：

${item.type}

<br>

成本：

¥${Number(item.cost).toLocaleString()}

<br>

当前价值：

¥${Number(item.value).toLocaleString()}

<br><br>

<button onclick="editAsset(${item.id})">

编辑

</button>

<button onclick="deleteAsset(${item.id})">

删除

</button>

`;

        list.appendChild(div);

    });

}

function editAsset(id){

    let item = assetsAgent.view().find(

        a=>a.id===id

    );

    if(!item){

        return;

    }

    let value=prompt(

        "修改当前价值",

        item.value

    );

    if(value!==null){

        assetsAgent.edit(

            id,

            {

                value:Number(value)

            }

        );

        updateAssetDisplay();

        updateDashboard();

    }

}

function deleteAsset(id){

    if(confirm("确定删除该资产？")){

        assetsAgent.delete(id);

        updateAssetDisplay();

        updateDashboard();

    }

}
// ======================

// 收入中心

// ======================

function addIncome(){

    let income={

        name:getValue("incomeName"),

        category:getValue("incomeCategory"),

        source:getValue("incomeSource"),

        amount:Number(

            getValue("incomeAmount")

        ),

        period:getValue("incomePeriod")

    };

    if(!income.name){

        alert("请输入收入名称");

        return;

    }

    incomeAgent.add(income);

    clearIncomeInput();

    updateIncomeDisplay();

    updateDashboard();

}

function updateIncomeDisplay(){

    let list=document.getElementById(

        "incomeList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    let incomes=incomeAgent.view();

    incomes.forEach(function(item){

        let div=document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

类别：

${item.category}

<br>

来源：

${item.source}

<br>

金额：

¥${Number(item.amount).toLocaleString()}

<br>

周期：

${item.period}

<br><br>

<button onclick="editIncome(${item.id})">

编辑

</button>

<button onclick="deleteIncome(${item.id})">

删除

</button>

`;

        list.appendChild(div);

    });

}

function editIncome(id){

    let item=incomeAgent.view().find(

        i=>i.id===id

    );

    if(!item){

        return;

    }

    let amount=prompt(

        "修改收入金额",

        item.amount

    );

    if(amount!==null){

        incomeAgent.edit(

            id,

            {

                amount:Number(amount)

            }

        );

        updateIncomeDisplay();

        updateDashboard();

    }

}

function deleteIncome(id){

    if(confirm("确定删除该收入记录？")){

        incomeAgent.delete(id);

        updateIncomeDisplay();

        updateDashboard();

    }

}

// ======================

// 投资中心

// ======================

function addInvestment(){

    let investment={

        name:getValue("investmentName"),

        ticker:getValue("investmentTicker"),

        type:getValue("investmentType"),

        market:getValue("investmentMarket"),

        buyDate:getValue("investmentBuyDate"),

        buyPrice:Number(

            getValue("investmentBuyPrice")

        ),

        quantity:Number(

            getValue("investmentQuantity")

        ),

        buyAmount:Number(

            getValue("investmentBuyAmount")

        ),

        sellDate:getValue("investmentSellDate"),

        sellPrice:Number(

            getValue("investmentSellPrice")

        ),

        currentValue:Number(

            getValue("investmentCurrentValue")

        ),

        note:getValue("investmentNote")

    };

    if(!investment.name){

        alert("请输入投资名称");

        return;

    }

    investmentAgent.add(investment);

    clearInvestmentInput();

   updateInvestmentDisplay();

updateInvestmentDashboard();

updateDashboard();

}

function updateInvestmentDisplay(){

    let list=document.getElementById(

        "investmentList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    let investments=

    investmentAgent.view();

    investments.forEach(function(item){

        let profit=

        Number(item.currentValue || 0)

        -

        Number(item.buyAmount || 0);

        let rate=0;

        if(item.buyAmount>0){

            rate=(

                profit /

                item.buyAmount *

                100

            ).toFixed(2);

        }

        let div=document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

代码：

${item.ticker}

<br>

类型：

${item.type}

<br>

买入金额：

¥${Number(item.buyAmount).toLocaleString()}

<br>

当前价值：

¥${Number(item.currentValue).toLocaleString()}

<br>

收益：

¥${profit.toLocaleString()}

<br>

收益率：

${rate}%

<br>

买入日期：

${item.buyDate}

<br>

卖出日期：

${item.sellDate || ""}

<br><br>

<button onclick="editInvestment(${item.id})">

编辑

</button>

<button onclick="deleteInvestment(${item.id})">

删除

</button>

`;

        list.appendChild(div);

    });

}
// ======================

// 投资编辑

// ======================

function editInvestment(id){

    let item=investmentAgent.view().find(

        i=>i.id===id

    );

    if(!item){

        return;

    }

    let value=prompt(

        "修改当前价值",

        item.currentValue

    );

    if(value!==null){

        investmentAgent.edit(

            id,

            {

                currentValue:Number(value)

            }

        );

        updateInvestmentDisplay();

        updateDashboard();

    }

}

function deleteInvestment(id){

    if(confirm("确定删除该投资记录？")){

        investmentAgent.delete(id);

        updateInvestmentDisplay();

        updateDashboard();

    }

}

// ======================

// AI CFO 财富报告

// ======================

function generateCFOReport(){

    let report = cfoAgent.report(

        assetsAgent,

        incomeAgent,

        investmentAgent

    );

    let box=document.getElementById(

        "cfoReport"

    );

    if(!box){

        return;

    }

    let allocationText="";

    if(report.allocation){

        allocationText = `

<h4>

资产配置分析：

</h4>

<ul>

${Object.keys(report.allocation)

.map(category=>`

<li>

${category}：

¥${Number(

report.allocation[category].value

).toLocaleString()}

&nbsp;

(

${report.allocation[category].percentage}%

)

</li>

`)

.join("")}

</ul>

<h4>

配置建议：

</h4>

<ul>

${report.allocationAdvice

.map(item=>`

<li>

${item}

</li>

`)

.join("")}

</ul>

`;

    }

    box.innerHTML=`

<hr>

<h3>

${report.title}

</h3>

<p>

当前总资产：

¥${Number(

report.totalAssets

).toLocaleString()}

</p>

<p>

年度收入：

¥${Number(

report.totalIncome

).toLocaleString()}

</p>

<p>

投资收益：

¥${Number(

report.investmentProfit

).toLocaleString()}

</p>

<p>

资产数量：

${report.assetCount}

</p>

<p>

投资数量：

${report.investmentCount}

</p>

<p>

财富健康评分：

${report.wealthScore}/100

</p>

<h4>

评分明细：

</h4>

<ul>

<li>

资产基础：

${report.scoreDetail.asset}/25

</li>

<li>

现金流：

${report.scoreDetail.income}/25

</li>

<li>

投资健康：

${report.scoreDetail.investment}/25

</li>

<li>

规划准备：

${report.scoreDetail.planning}/25

</li>

</ul>

${allocationText}

<h4>

AI建议：

</h4>

<ul>

${report.advice

.map(item=>`

<li>

${item}

</li>

`)

.join("")}

</ul>

`;

}
// ======================

// Dashboard

// ======================
// ======================

// Investment Dashboard

// ======================

function updateInvestmentDashboard(){

    let box=document.getElementById(

        "investmentDashboard"

    );

    if(!box){

        return;

    }

    let data =

    investmentAgent.dashboardSummary();

    let risk =

    investmentAgent.riskSummary();

    let performance =

    investmentAgent.performanceSummary();

    box.innerHTML=`

<hr>

<h3>

📈 投资总览

</h3>

<p>

投资总成本：

¥${Number(

data.totalCost

).toLocaleString()}

</p>

<p>

当前投资价值：

¥${Number(

data.totalValue

).toLocaleString()}

</p>

<p>

累计收益：

¥${Number(

data.profit

).toLocaleString()}

</p>

<p>

收益率：

${data.returnRate}%

</p>

<p>

投资数量：

${data.investmentCount}

</p>

<p>

盈利项目：

${data.profitCount}

</p>

<p>

亏损项目：

${data.lossCount}

</p>

<h3>

⚠ 投资风险分析

</h3>

<p>

风险等级：

${risk.level}

</p>

<p>

最大类别：

${risk.maxCategory}

</p>

<p>

集中度：

${risk.maxRatio}%

</p>

<ul>

${risk.advice.map(item=>`

<li>

${item}

</li>

`).join("")}

</ul>

<h3>

📊 投资表现

</h3>

<p>

盈利项目：

${performance.profitCount}

</p>

<p>

亏损项目：

${performance.lossCount}

</p>

<p>

平均收益率：

${performance.averageReturnRate}%

</p>

`;

}
function updateDashboard(){

    let assetSummary =

    assetsAgent.summary();

    let incomeSummary =

    incomeAgent.summary();

    let investmentSummary =

    investmentAgent.summary();

    let totalAssets =

    assetSummary.totalValue || 0;

    let totalIncome =

    incomeSummary.totalIncome || 0;

    let investmentProfit =

    investmentSummary.profit || 0;

    let totalBox=document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML=

        "¥"+

        Number(totalAssets).toLocaleString();

    }

    let netBox=document.getElementById(

        "netWorth"

    );

    if(netBox){

        netBox.innerHTML=

        "¥"+

        Number(totalAssets).toLocaleString();

    }

    let incomeBox=document.getElementById(

        "totalIncome"

    );

    if(incomeBox){

        incomeBox.innerHTML=

        "¥"+

        Number(totalIncome).toLocaleString();

    }

    let returnBox=document.getElementById(

        "investmentReturn"

    );

    if(returnBox){

        returnBox.innerHTML=

        "¥"+

        Number(investmentProfit).toLocaleString();

    }

}

// ======================

// 工具函数

// ======================

function getValue(id){

    let e=document.getElementById(id);

    if(e){

        return e.value;

    }

    return "";

}

function clearAssetInput(){

    let ids=[

        "assetName",

        "assetCategory",

        "assetType",

        "assetOwner",

        "assetCountry",

        "assetCurrency",

        "assetInstitution",

        "assetAccount",

        "assetCost",

        "assetValue",

        "assetNote"

    ];

    ids.forEach(id=>{

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

function clearIncomeInput(){

    let ids=[

        "incomeName",

        "incomeCategory",

        "incomeSource",

        "incomeAmount",

        "incomePeriod"

    ];

    ids.forEach(id=>{

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

function clearInvestmentInput(){

    let ids=[

        "investmentName",

        "investmentTicker",

        "investmentType",

        "investmentMarket",

        "investmentBuyDate",

        "investmentBuyPrice",

        "investmentQuantity",

        "investmentBuyAmount",

        "investmentSellDate",

        "investmentSellPrice",

        "investmentCurrentValue",

        "investmentNote"

    ];

    ids.forEach(id=>{

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

// ======================

// 暴露给HTML

// ======================

window.addNewAsset =

addNewAsset;

window.editAsset =

editAsset;

window.deleteAsset =

deleteAsset;

window.addIncome =

addIncome;

window.editIncome =

editIncome;

window.deleteIncome =

deleteIncome;

window.addInvestment =

addInvestment;

window.editInvestment =

editInvestment;

window.deleteInvestment =

deleteInvestment;

window.generateCFOReport =

generateCFOReport;
window.updateInvestmentDashboard =

updateInvestmentDashboard;
