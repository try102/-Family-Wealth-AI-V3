/*

Family Wealth AI OS

V4.0 Alpha Build 004

Assets + Income Core

*/

let assets = [];

let incomes = [];

// ======================

// 系统启动

// ======================

window.onload = function(){

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

    localStorage.getItem(

        "wealth_assets"

    );

    if(assetData){

        assets = JSON.parse(assetData);

    }

    let incomeData =

    localStorage.getItem(

        "wealth_incomes"

    );

    if(incomeData){

        incomes = JSON.parse(incomeData);

    }

}

// ======================

// 数据保存

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

// 显示资产

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

    let value=

    prompt(

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

`;

        list.appendChild(div);

    });

}

// ======================

// Dashboard

// ======================

function updateDashboard(){

    let totalAssets=0;

    assets.forEach(function(item){

        totalAssets +=

        Number(item.value || 0);

    });

    let totalIncome=0;

    incomes.forEach(function(item){

        totalIncome +=

        Number(item.amount || 0);

    });

    let a=document.getElementById(

        "totalAssets"

    );

    if(a){

        a.innerHTML=

        "¥"+

        totalAssets.toLocaleString();

    }

    let n=document.getElementById(

        "netWorth"

    );

    if(n){

        n.innerHTML=

        "¥"+

        totalAssets.toLocaleString();

    }

    let i=document.getElementById(

        "totalIncome"

    );

    if(i){

        i.innerHTML=

        "¥"+

        totalIncome.toLocaleString();

    }

}

// ======================

// 工具

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
