/*

Family Wealth AI OS

V5.2

AI CFO + Investment Inventory Integration

*/

import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

import cfoAgent from "./agents/cfoAgent.js";

import wealthEngine from "./agents/wealthEngine.js";

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

// 通用读取

// ======================

function getValue(id){

    let e=document.getElementById(id);

    return e ? e.value : "";

}

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

¥${Number(

item.value||0

).toLocaleString()}

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

    .find(

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

¥${Number(

item.amount||0

).toLocaleString()}

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

    let item =

    incomeAgent.view()

    .find(

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

// 投资中心 V5.2

// ======================

function addInvestment(){

    let investment={

        name:getValue("investmentName"),

        ticker:getValue("investmentTicker"),

        type:getValue("investmentType"),

        market:getValue("investmentMarket"),

        currency:getValue("investmentCurrency"),

        buyDate:getValue("investmentBuyDate"),

        buyPrice:Number(

            getValue("investmentBuyPrice")

        ),

        buyQuantity:Number(

            getValue("investmentBuyQuantity")

        ),

        buyAmount:Number(

            getValue("investmentBuyAmount")

        ),

        currentPrice:Number(

            getValue("investmentCurrentPrice")

        ),

        currentQuantity:Number(

            getValue("investmentCurrentQuantity")

        ),

        currentValue:Number(

            getValue("investmentCurrentValue")

        ),

        sellDate:getValue("investmentSellDate"),

        sellPrice:Number(

            getValue("investmentSellPrice")

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

    investmentAgent.view()

    .forEach(item=>{

        let profit =

        Number(

            item.currentValue||0

        )

        -

        Number(

            item.buyAmount||0

        );

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

买入数量：

${item.buyQuantity}

<br>

买入成本：

¥${Number(

item.buyAmount||0

).toLocaleString()}

<br>

当前持仓数量：

${item.currentQuantity}

<br>

当前价格：

¥${Number(

item.currentPrice||0

).toLocaleString()}

<br>

当前市值：

¥${Number(

item.currentValue||0

).toLocaleString()}

<br>

收益：

¥${profit.toLocaleString()}

<br>

收益率：

${rate}%

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

function editInvestment(id){

    let item=

    investmentAgent.view()

    .find(

        i=>i.id===id

    );

    if(!item){

        return;

    }

    let value=prompt(

        "修改当前市值",

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

    let data =

    investmentAgent.dashboardSummary();

    let risk =

    investmentAgent.riskSummary();

    let performance =

    investmentAgent.performanceSummary();

    box.innerHTML=`

<hr>

<h3>📈 投资总览</h3>

<p>

投资总成本：

¥${Number(

data.totalCost||0

).toLocaleString()}

</p>

<p>

当前投资价值：

¥${Number(

data.totalValue||0

).toLocaleString()}

</p>

<p>

累计收益：

¥${Number(

data.profit||0

).toLocaleString()}

</p>

<p>

收益率：

${data.returnRate||0}%

</p>

<h3>📦 投资库存</h3>

<p>

持仓品种：

${data.investmentCount}

</p>

<h3>⚠ 风险分析</h3>

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

${risk.advice.map(

item=>

`<li>${item}</li>`

).join("")}

</ul>

<h3>📊 投资表现</h3>

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

// AI CFO

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

    box.innerHTML=`

<hr>

<h3>${report.title}</h3>

<p>

当前总资产：

¥${Number(

report.totalAssets||0

).toLocaleString()}

</p>

<p>

净资产：

¥${Number(

report.netWorth||0

).toLocaleString()}

</p>

<p>

年度收入：

¥${Number(

report.totalIncome||0

).toLocaleString()}

</p>

<p>

投资收益：

¥${Number(

report.investmentProfit||0

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

AI建议：

</h4>

<ul>

${report.advice.map(

item=>

`<li>${item}</li>`

).join("")}

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

            "Wealth Engine error",

            e

        );

        return;

    }

    let total=

    document.getElementById(

        "totalAssets"

    );

    if(total){

        total.innerHTML=

        "¥"+Number(

            wealth.totalAssets||0

        ).toLocaleString();

    }

    let net=

    document.getElementById(

        "netWorth"

    );

    if(net){

        net.innerHTML=

        "¥"+Number(

            wealth.netWorth||0

        ).toLocaleString();

    }

    let income=

    document.getElementById(

        "totalIncome"

    );

    if(income){

        income.innerHTML=

        "¥"+Number(

            wealth.income||0

        ).toLocaleString();

    }

    let profit=

    document.getElementById(

        "investmentReturn"

    );

    if(profit){

        profit.innerHTML=

        "¥"+Number(

            wealth.investmentProfit||0

        ).toLocaleString();

    }

}

// ======================

// 清空输入

// ======================

function clearAssetInput(){

[

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

].forEach(id=>{

let e=document.getElementById(id);

if(e)e.value="";

});

}

function clearIncomeInput(){

[

"incomeName",

"incomeCategory",

"incomeSource",

"incomeAmount",

"incomePeriod"

].forEach(id=>{

let e=document.getElementById(id);

if(e)e.value="";

});

}

function clearInvestmentInput(){

[

"investmentName",

"investmentTicker",

"investmentType",

"investmentMarket",

"investmentCurrency",

"investmentBuyDate",

"investmentBuyPrice",

"investmentBuyQuantity",

"investmentBuyAmount",

"investmentCurrentPrice",

"investmentCurrentQuantity",

"investmentCurrentValue",

"investmentSellDate",

"investmentSellPrice",

"investmentNote"

].forEach(id=>{

let e=document.getElementById(id);

if(e)e.value="";

});

}

// ======================

// 暴露给 HTML

// ======================

window.addNewAsset=

addNewAsset;

window.editAsset=

editAsset;

window.deleteAsset=

deleteAsset;

window.addIncome=

addIncome;

window.editIncome=

editIncome;

window.deleteIncome=

deleteIncome;

window.addInvestment=

addInvestment;

window.editInvestment=

editInvestment;

window.deleteInvestment=

deleteInvestment;

window.generateCFOReport=

generateCFOReport;
