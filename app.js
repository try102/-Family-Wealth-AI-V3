/*

Family Wealth AI OS

V5.4

Main Application

统一接口连接层

*/

import assetsAgent 

from "./agents/assetsAgent.js";

import incomeAgent 

from "./agents/incomeAgent.js";

import investmentAgent 

from "./agents/investmentAgent.js";

import taxAgent 

from "./agents/taxAgent.js";

import retirementAgent 

from "./agents/retirementAgent.js";

import cfoAgent 

from "./agents/cfoAgent.js";

// ======================

// 系统启动

// ======================

window.onload=function(){

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    if(taxAgent.init){

        taxAgent.init();

    }

    if(retirementAgent.init){

        retirementAgent.init();

    }

    cfoAgent.init();

    refreshAll();

};

// ======================

// 通用读取

// ======================

function getValue(id){

    let el=

    document.getElementById(id);

    return el

    ?

    el.value

    :

    "";

}

// ======================

// 总刷新

// ======================

function refreshAll(){

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateInvestmentDashboard();

    updateDashboard();

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

    clearInputs([

        "assetName",

        "assetCategory",

        "assetType",

        "assetOwner",

        "assetCountry",

        "assetCurrency",

        "assetInstitution",

        "assetAccount",

        "assetValue",

        "assetNote"

    ]);

    refreshAll();

}

function updateAssetDisplay(){

    let box=

    document.getElementById(

        "assetList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    assetsAgent.view()

    .forEach(item=>{

        let div=

        document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

类别：

${item.category || "其他"}

<br>

类型：

${item.type || ""}

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

        box.appendChild(div);

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

    let value=

    prompt(

        "修改资产价值",

        item.value

    );

    if(value!==null){

        assetsAgent.edit(

            id,

            {

                value:Number(value)

            }

        );

        refreshAll();

    }

}

function deleteAsset(id){

    if(confirm("删除该资产？")){

        assetsAgent.delete(id);

        refreshAll();

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

    clearInputs([

        "incomeName",

        "incomeCategory",

        "incomeSource",

        "incomeAmount",

        "incomePeriod"

    ]);

    refreshAll();

}

function updateIncomeDisplay(){

    let box=

    document.getElementById(

        "incomeList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    incomeAgent.view()

    .forEach(item=>{

        let div=

        document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

类别：

${item.category || ""}

<br>

来源：

${item.source || ""}

<br>

金额：

¥${Number(

item.amount||0

).toLocaleString()}

<br>

周期：

${item.period || ""}

<br><br>

<button onclick="editIncome(${item.id})">

编辑

</button>

<button onclick="deleteIncome(${item.id})">

删除

</button>

`;

        box.appendChild(div);

    });

}

function editIncome(id){

    let item=

    incomeAgent.view()

    .find(

        i=>i.id===id

    );

    if(!item){

        return;

    }

    let amount=

    prompt(

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

        refreshAll();

    }

}

function deleteIncome(id){

    if(confirm("删除该收入？")){

        incomeAgent.delete(id);

        refreshAll();

    }

}
// ======================

// 投资中心

// ======================

function addInvestment(){

    let investment={

        name:

        getValue("investmentName"),

        ticker:

        getValue("investmentTicker"),

        type:

        getValue("investmentType"),

        market:

        getValue("investmentMarket"),

        currency:

        getValue("investmentCurrency"),

        buyDate:

        getValue("investmentBuyDate"),

        buyPrice:

        Number(

            getValue("investmentBuyPrice")

        ),

        buyQuantity:

        Number(

            getValue("investmentBuyQuantity")

        ),

        sellDate:

        getValue("investmentSellDate"),

        sellPrice:

        Number(

            getValue("investmentSellPrice")

        ),

        sellQuantity:

        Number(

            getValue("investmentSellQuantity")

        ),

        currentPrice:

        Number(

            getValue("investmentCurrentPrice")

        ),

        note:

        getValue("investmentNote")

    };

    if(!investment.name){

        alert(

            "请输入投资名称"

        );

        return;

    }

    investmentAgent.add(

        investment

    );

    clearInputs([

        "investmentName",

        "investmentTicker",

        "investmentType",

        "investmentMarket",

        "investmentCurrency",

        "investmentBuyDate",

        "investmentBuyPrice",

        "investmentBuyQuantity",

        "investmentSellDate",

        "investmentSellPrice",

        "investmentSellQuantity",

        "investmentCurrentPrice",

        "investmentNote"

    ]);

    refreshAll();

}

function updateInvestmentDisplay(){

    let box=

    document.getElementById(

        "investmentList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    investmentAgent.inventory()

    .forEach(item=>{

        let div=

        document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>${item.name}</h3>

代码：

${item.ticker || ""}

<br>

类型：

${item.type || ""}

<br><br>

📦 当前库存

<br>

持仓数量：

${item.remainingQuantity}

<br>

当前市值：

¥${Number(

item.marketValue||0

).toLocaleString()}

<br><br>

收益：

¥${Number(

item.totalProfit||0

).toLocaleString()}

<br>

<button onclick="deleteInvestment(${item.id})">

删除

</button>

`;

        box.appendChild(div);

    });

}

function deleteInvestment(id){

    if(confirm("删除投资记录？")){

        investmentAgent.delete(id);

        refreshAll();

    }

}

// ======================

// 投资分析

// ======================

function updateInvestmentDashboard(){

    let box=

    document.getElementById(

        "investmentDashboard"

    );

    if(!box){

        return;

    }

    let data=

    investmentAgent.summary();

    let risk=

    investmentAgent.riskSummary();

    box.innerHTML=`

<hr>

<h3>📈 投资总览</h3>

<p>

投资成本：

¥${Number(

data.totalCost||0

).toLocaleString()}

</p>

<p>

当前价值：

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

${data.returnRate}%

</p>

<h3>⚠ 风险分析</h3>

<p>

风险等级：

${risk.level}

</p>

<p>

集中度：

${risk.maxRatio}%

</p>

<ul>

${risk.advice.map(

x=>`<li>${x}</li>`

).join("")}

</ul>

`;

}

// ======================

// AI CFO

// ======================

function generateCFOReport(){

    let report=

    cfoAgent.report(

        assetsAgent,

        incomeAgent,

        investmentAgent

    );

    let box=

    document.getElementById(

        "cfoReport"

    );

    if(!box){

        return;

    }

    box.innerHTML=`

<hr>

<h3>${report.title}</h3>

<p>

总资产：

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

<h4>

AI建议：

</h4>

<ul>

${report.advice.map(

x=>`<li>${x}</li>`

).join("")}

</ul>

`;

}

// ======================

// 财富驾驶舱

// ======================

function updateDashboard(){

    let wealth=

    import("./agents/wealthEngine.js")

    .then(module=>{

        let engine=

        module.default;

        let data=

        engine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent

        );

        let ids={

            totalAssets:

            data.totalAssets,

            netWorth:

            data.netWorth,

            totalIncome:

            data.totalIncome,

            investmentReturn:

            data.investmentProfit

        };

        Object.keys(ids)

        .forEach(id=>{

            let el=

            document.getElementById(id);

            if(el){

                el.innerHTML=

                "¥"+Number(

                    ids[id]||0

                ).toLocaleString();

            }

        });

    });

}

// ======================

// 清空输入

// ======================

function clearInputs(ids){

    ids.forEach(id=>{

        let el=

        document.getElementById(id);

        if(el){

            el.value="";

        }

    });

}

// ======================

// 暴露函数

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

window.deleteInvestment=

deleteInvestment;

window.generateCFOReport=

generateCFOReport;
