import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

/*

Family Wealth AI OS

V4.0 Alpha Build 008.2

Agent Architecture

*/

let assets = [];

let incomes = [];

// ======================

// 系统启动

// ======================

window.onload = function(){

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    taxAgent.init();

    retirementAgent.init();

    loadData();

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateDashboard();

};

// ======================

// 数据读取

// ======================

function loadData(){

    let assetData =

    localStorage.getItem("wealth_assets");

    if(assetData){

        assets = JSON.parse(assetData);

    }

    let incomeData =

    localStorage.getItem("wealth_incomes");

    if(incomeData){

        incomes = JSON.parse(incomeData);

    }

}

// ======================

// 保存

// ======================

function saveAssets(){

    localStorage.setItem(

        "wealth_assets",

        JSON.stringify(assets)

    );

}

function saveIncome(){

    localStorage.setItem(

        "wealth_incomes",

        JSON.stringify(incomes)

    );

}

// ======================

// 资产添加

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

    assets.push(asset);

    saveAssets();

    clearAssetInput();

    updateAssetDisplay();

    updateDashboard();

}

// ======================

// 资产显示

// ======================

function updateAssetDisplay(){

    let list=document.getElementById(

        "assetList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    assets.forEach(function(item,index){

        let div=document.createElement("div");

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

<button onclick="editAsset(${index})">

编辑

</button>

<button onclick="deleteAsset(${index})">

删除

</button>

`;

        list.appendChild(div);

    });

}

// ======================

// 编辑资产

// ======================

function editAsset(index){

    let value=prompt(

        "修改当前价值",

        assets[index].value

    );

    if(value!==null){

        assets[index].value=Number(value);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}
// ======================

// 删除资产

// ======================

function deleteAsset(index){

    if(confirm("确定删除该资产？")){

        assets.splice(index,1);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}

// ======================

// 收入添加

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

    incomes.push(income);

    saveIncome();

    clearIncomeInput();

    updateIncomeDisplay();

    updateDashboard();

}

// ======================

// 收入显示

// ======================

function updateIncomeDisplay(){

    let list=document.getElementById(

        "incomeList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    incomes.forEach(function(item,index){

        let div=document.createElement("div");

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

<button onclick="editIncome(${index})">

编辑

</button>

<button onclick="deleteIncome(${index})">

删除

</button>

`;

        list.appendChild(div);

    });

}

// ======================

// 编辑收入

// ======================

function editIncome(index){

    let amount=prompt(

        "修改收入金额",

        incomes[index].amount

    );

    if(amount!==null){

        incomes[index].amount=

        Number(amount);

        saveIncome();

        updateIncomeDisplay();

        updateDashboard();

    }

}

// ======================

// 删除收入

// ======================

function deleteIncome(index){

    if(confirm("确定删除该收入记录？")){

        incomes.splice(index,1);

        saveIncome();

        updateIncomeDisplay();

        updateDashboard();

    }

}

// ======================

// 投资添加

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

    updateInvestmentDisplay();

    updateDashboard();

}

// ======================

// 投资显示

// ======================

function updateInvestmentDisplay(){

    let list=document.getElementById(

        "investmentList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    let investments =

    investmentAgent.view();

    investments.forEach(function(item){

        let div=document.createElement("div");

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

买入日期：

${item.buyDate}

<br>

卖出日期：

${item.sellDate}

<br>

`;

        list.appendChild(div);

    });

}
// ======================

// Dashboard

// ======================

function updateDashboard(){

    let totalAssets = 0;

    assets.forEach(function(item){

        totalAssets += Number(

            item.value || 0

        );

    });

    let totalIncome = 0;

    incomes.forEach(function(item){

        totalIncome += Number(

            item.amount || 0

        );

    });

    let investmentReturn = 0;

    let investmentData =

    investmentAgent.summary();

    if(investmentData){

        investmentReturn =

        investmentData.profit || 0;

    }

    let totalBox=document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML =

        "¥" +

        totalAssets.toLocaleString();

    }

    let netBox=document.getElementById(

        "netWorth"

    );

    if(netBox){

        netBox.innerHTML =

        "¥" +

        totalAssets.toLocaleString();

    }

    let incomeBox=document.getElementById(

        "totalIncome"

    );

    if(incomeBox){

        incomeBox.innerHTML =

        "¥" +

        totalIncome.toLocaleString();

    }

    let returnBox=document.getElementById(

        "investmentReturn"

    );

    if(returnBox){

        returnBox.innerHTML =

        "¥" +

        investmentReturn.toLocaleString();

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

// ======================

// 清空资产输入

// ======================

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

    ids.forEach(function(id){

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

// ======================

// 清空收入输入

// ======================

function clearIncomeInput(){

    let ids=[

        "incomeName",

        "incomeCategory",

        "incomeSource",

        "incomeAmount",

        "incomePeriod"

    ];

    ids.forEach(function(id){

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

// ======================

// module模式下暴露按钮函数

// ======================

window.addNewAsset = addNewAsset;

window.editAsset = editAsset;

window.deleteAsset = deleteAsset;

window.addIncome = addIncome;

window.editIncome = editIncome;

window.deleteIncome = deleteIncome;

window.addInvestment = addInvestment;

window.updateInvestmentDisplay = updateInvestmentDisplay;
