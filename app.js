import assetsAgent from "./agents/assetsAgent.js";

/*
Family Wealth AI OS

V4.0 Alpha Build 006

Assets + Income + Investment Management

*/

// ======================

// 数据

// ======================

let assets = [];

let incomes = [];

let investments = [];

// ======================

// 系统启动

// ======================

window.onload = function(){

    assetsAgent.init();

    loadData();

    updateAssetDisplay();

    updateIncomeDisplay();

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

    let investmentData =

    localStorage.getItem("wealth_investments");

    if(investmentData){

        investments = JSON.parse(investmentData);

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

function saveInvestment(){

    localStorage.setItem(

        "wealth_investments",

        JSON.stringify(investments)

    );

}

// ==================================================

// Assets Center

// ==================================================

// 添加资产

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

        cost:Number(getValue("assetCost")),

        value:Number(getValue("assetValue")),

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

// 显示资产

function updateAssetDisplay(){

    let list=document.getElementById("assetList");

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

// 编辑资产

function editAsset(index){

    let value=prompt(

        "修改当前价值",

        assets[index].value

    );

    if(value!==null){

        assets[index].value=

        Number(value);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}

// 删除资产

function deleteAsset(index){

    if(confirm("确定删除该资产？")){

        assets.splice(index,1);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}

// ==================================================

// Income Center

// ==================================================

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

// 显示收入

function updateIncomeDisplay(){

    let list=document.getElementById(

        "incomeList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    incomes.forEach(function(item,index){

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
// ==================================================

// Income 编辑 / 删除

// ==================================================

function editIncome(index){

    let amount = prompt(

        "修改收入金额",

        incomes[index].amount

    );

    if(amount!==null){

        incomes[index].amount =

        Number(amount);

        saveIncome();

        updateIncomeDisplay();

        updateDashboard();

    }

}

function deleteIncome(index){

    if(confirm("确定删除该收入记录？")){

        incomes.splice(index,1);

        saveIncome();

        updateIncomeDisplay();

        updateDashboard();

    }

}

// ==================================================

// Investment Center

// ==================================================

// 添加投资

function addInvestment(){

    let investment={

        name:getValue("investmentName"),

        type:getValue("investmentType"),

        ticker:getValue("investmentTicker"),

        market:getValue("investmentMarket"),

        owner:getValue("investmentOwner"),

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

        sellDate:getValue("investmentSellDate"),

        sellPrice:Number(

            getValue("investmentSellPrice")

        ),

        sellQuantity:Number(

            getValue("investmentSellQuantity")

        ),

        sellAmount:Number(

            getValue("investmentSellAmount")

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

    investments.push(investment);

    saveInvestment();

    clearInvestmentInput();

    updateInvestmentDisplay();

    updateDashboard();

}

// 显示投资

function updateInvestmentDisplay(){

    let list=document.getElementById(

        "investmentList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    investments.forEach(function(item,index){

        let profit = 0;

        let baseCost = Number(

            item.buyAmount || 0

        );

        if(item.sellAmount > 0){

            profit =

            Number(item.sellAmount)

            - baseCost;

        }else{

            profit =

            Number(item.currentValue || 0)

            - baseCost;

        }

        let returnRate = 0;

        if(baseCost > 0){

            returnRate =

            (

                profit / baseCost * 100

            ).toFixed(2);

        }

        let div=document.createElement(

            "div"

        );

        div.innerHTML=`

<hr>

<h3>

${item.name}

</h3>

类型：

${item.type}

<br>

代码：

${item.ticker}

<br>

买入日期：

${item.buyDate}

<br>

买入成本：

¥${Number(item.buyAmount).toLocaleString()}

<br>

当前价值：

¥${Number(item.currentValue).toLocaleString()}

<br>

收益：

¥${Number(profit).toLocaleString()}

<br>

收益率：

${returnRate}%

<br>

卖出日期：

${item.sellDate}

<br>

备注：

${item.note}

<br><br>

<button onclick="editInvestment(${index})">

编辑

</button>

<button onclick="deleteInvestment(${index})">

删除

</button>

`;

        list.appendChild(div);

    });

}
// 编辑投资

function editInvestment(index){

    let value = prompt(

        "修改当前投资价值",

        investments[index].currentValue

    );

    if(value!==null){

        investments[index].currentValue=

        Number(value);

        saveInvestment();

        updateInvestmentDisplay();

        updateDashboard();

    }

}

// 删除投资

function deleteInvestment(index){

    if(confirm("确定删除该投资记录？")){

        investments.splice(index,1);

        saveInvestment();

        updateInvestmentDisplay();

        updateDashboard();

    }

}

// ==================================================

// Dashboard

// ==================================================
function updateDashboard(){

    let totalAssets=0;

    assets.forEach(function(item){

        totalAssets += Number(

            item.value || 0

        );

    });

    let totalIncome=0;

    incomes.forEach(function(item){

        totalIncome += Number(

            item.amount || 0

        );

    });

    let totalInvestmentProfit=0;

    investments.forEach(function(item){

        let cost = Number(

            item.buyAmount || 0

        );

        let value = Number(

            item.currentValue || 0

        );

        let sell = Number(

            item.sellAmount || 0

        );

        if(sell > 0){

            totalInvestmentProfit +=

            sell - cost;

        }else{

            totalInvestmentProfit +=

            value - cost;

        }

    });

    let totalBox=document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML =

        "¥"+

        totalAssets.toLocaleString();

    }

    let netBox=document.getElementById(

        "netWorth"

    );

    if(netBox){

        netBox.innerHTML =

        "¥"+

        (

            totalAssets

            +

            investments.reduce(

                function(sum,item){

                    return sum +

                    Number(item.currentValue || 0);

                },

                0

            )

        ).toLocaleString();

    }

    let incomeBox=document.getElementById(

        "totalIncome"

    );

    if(incomeBox){

        incomeBox.innerHTML =

        "¥"+

        totalIncome.toLocaleString();

    }

    let investmentBox=document.getElementById(

        "investmentReturn"

    );

    if(investmentBox){

        investmentBox.innerHTML =

        "¥"+

        totalInvestmentProfit.toLocaleString();

    }

}

// ==================================================

// 清空投资输入

// ==================================================

function clearInvestmentInput(){

    let ids=[

"investmentName",

"investmentType",

"investmentTicker",

"investmentMarket",

"investmentOwner",

"investmentBuyDate",

"investmentBuyPrice",

"investmentBuyQuantity",

"investmentBuyAmount",

"investmentSellDate",

"investmentSellPrice",

"investmentSellQuantity",

"investmentSellAmount",

"investmentCurrentValue",

"investmentNote"

];

    ids.forEach(function(id){

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

// ==================================================

// 工具函数

// ==================================================

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

    ids.forEach(function(id){

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

    ids.forEach(function(id){

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}
