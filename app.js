import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

import cfoAgent from "./agents/cfoAgent.js";

import wealthEngine from "./agents/wealthEngine.js";

/*

Family Wealth AI OS

V5.0 Alpha Build

AI CFO + Wealth Engine Integration

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

    updateInvestmentDashboard();

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

    assetsAgent.view()

    .forEach(item=>{

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

    let item=

    assetsAgent.view()

    .find(a=>a.id===id);

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

} ＇
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

    incomeAgent.view()

    .forEach(item=>{

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

    let item=

    incomeAgent.view()

    .find(i=>i.id===id);

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

    // 自动计算买入金额

    if(

        investment.buyAmount===0 &&

        investment.buyPrice>0 &&

        investment.quantity>0

    ){

        investment.buyAmount =

        investment.buyPrice *

        investment.quantity;

    }

    // 自动计算当前价值

    if(

        investment.currentValue===0 &&

        investment.sellPrice>0 &&

        investment.quantity>0

    ){

        investment.currentValue =

        investment.sellPrice *

        investment.quantity;

    }

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

    investmentAgent.view()

    .forEach(item=>{

        let profit =

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

// 投资编辑删除

// ======================

function editInvestment(id){

    let item=

    investmentAgent.view()

    .find(i=>i.id===id);

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

        updateInvestmentDashboard();

        updateDashboard();

    }

}

function deleteInvestment(id){

    if(confirm("确定删除该投资记录？")){

        investmentAgent.delete(id);

        updateInvestmentDisplay();

        updateInvestmentDashboard();

        updateDashboard();

    }

}

// ======================

// 投资 Dashboard

// ======================

function updateInvestmentDashboard(){

    let box=document.getElementById(

        "investmentDashboard"

    );

    if(!box){

        return;

    }

    // 兼容旧版本 Investment Agent

    if(

        !investmentAgent.dashboardSummary

    ){

        box.innerHTML=

        "<p>投资分析模块升级中...</p>";

        return;

    }

    let data =

    investmentAgent.dashboardSummary();

    let risk =

    investmentAgent.riskSummary ?

    investmentAgent.riskSummary()

    :

    {

        level:"暂无",

        maxCategory:"暂无",

        maxRatio:0,

        advice:[]

    };

    let performance =

    investmentAgent.performanceSummary ?

    investmentAgent.performanceSummary()

    :

    {

        profitCount:0,

        lossCount:0,

        averageReturnRate:0

    };

    box.innerHTML=`

<hr>

<h3>

📈 投资总览

</h3>

<p>

投资总成本：

¥${Number(

data.totalCost || 0

).toLocaleString()}

</p>

<p>

当前投资价值：

¥${Number(

data.totalValue || 0

).toLocaleString()}

</p>

<p>

累计收益：

¥${Number(

data.profit || 0

).toLocaleString()}

</p>

<p>

收益率：

${data.returnRate || 0}%

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

${(risk.advice || [])

.map(item=>`

<li>${item}</li>

`)

.join("")}

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

// ======================

// AI CFO 财富报告

// ======================

function generateCFOReport(){

    let report =

    cfoAgent.report(

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

        allocationText=`

<h4>

资产配置分析：

</h4>

<ul>

${Object.keys(report.allocation)

.map(category=>{

let item=

report.allocation[category];

let value =

typeof item==="object"

?

item.value

:

item;

let percentage=

typeof item==="object"

?

item.percentage

:

"";

return `

<li>

${category}：

¥${Number(value).toLocaleString()}

${percentage ? "("+percentage+"%)":""}

</li>

`;

})

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

¥${Number(report.totalAssets || 0).toLocaleString()}

</p>

<p>

净资产：

¥${Number(report.netWorth || 0).toLocaleString()}

</p>

<p>

年度收入：

¥${Number(report.totalIncome || 0).toLocaleString()}

</p>

<p>

投资收益：

¥${Number(report.investmentProfit || 0).toLocaleString()}

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

// 财富驾驶舱

// ======================

function updateDashboard(){

    let wealth;

    try{

        wealth =

        wealthEngine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent

        );

    }

    catch(e){

        console.log(

            "Wealth Engine 未连接",

            e

        );

        return;

    }

    let totalAssets=

    wealth.totalAssets || 0;

    let netWorth=

    wealth.netWorth ||

    totalAssets;

    let income=

    wealth.income || 0;

    let profit=

    wealth.investmentProfit || 0;

    let totalBox=document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML=

        "¥"+

        Number(totalAssets)

        .toLocaleString();

    }

    let netBox=document.getElementById(

        "netWorth"

    );

    if(netBox){

        netBox.innerHTML=

        "¥"+

        Number(netWorth)

        .toLocaleString();

    }

    let incomeBox=document.getElementById(

        "totalIncome"

    );

    if(incomeBox){

        incomeBox.innerHTML=

        "¥"+

        Number(income)

        .toLocaleString();

    }

    let returnBox=document.getElementById(

        "investmentReturn"

    );

    if(returnBox){

        returnBox.innerHTML=

        "¥"+

        Number(profit)

        .toLocaleString();

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

// 暴露给 HTML

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
