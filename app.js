/*

Family Wealth AI OS

V4.0 Alpha Build 001

Application Core

+

Assets Center Controller

*/

// ===============================

// 系统核心状态

// ===============================

const WealthOS = {

    version:"4.0 Alpha Build 001",

    data:{

        netWorth:0,

        totalAssets:0,

        annualIncome:0,

        investmentReturn:0

    }

};

// ===============================

// 金额格式化

// ===============================

function formatMoney(value){

    return "¥" +

    Number(value || 0)

    .toLocaleString("zh-CN");

}

// ===============================

// 资产模块数据

// ===============================

let assets = [];

// 加载资产

function loadAssets(){

    let saved =

    localStorage.getItem(

        "wealth_assets"

    );

    if(saved){

        assets = JSON.parse(saved);

    }

}

// 保存资产

function saveAssets(){

    localStorage.setItem(

        "wealth_assets",

        JSON.stringify(assets)

    );

}

// 添加资产

function addAsset(asset){

    assets.push(asset);

    saveAssets();

}

// 计算总资产

function calculateTotalAssets(){

    let total = 0;

    assets.forEach(function(item){

        total += Number(

            item.value || 0

        );

    });

    return total;

}

// ===============================

// 添加新资产

// ===============================

function addNewAsset(){

    let asset = {

        name:

        document.getElementById(

            "assetName"

        ).value,

        category:

        document.getElementById(

            "assetCategory"

        ).value,

        type:

        document.getElementById(

            "assetType"

        ).value,

        country:

        document.getElementById(

            "assetCountry"

        ).value,

        currency:

        document.getElementById(

            "assetCurrency"

        ).value,

        institution:

        document.getElementById(

            "assetInstitution"

        ).value,

        account:

        document.getElementById(

            "assetAccount"

        ).value,

        value:

        Number(

            document.getElementById(

                "assetValue"

            ).value

        )

    };

    if(!asset.name){

        alert(

            "请输入资产名称"

        );

        return;

    }

    addAsset(asset);

    updateAssetDisplay();

    updateDashboard();

}

// ===============================

// 显示资产列表

// ===============================

function updateAssetDisplay(){

    let list =

    document.getElementById(

        "assetList"

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    assets.forEach(function(item,index){

        let div =

        document.createElement(

            "div"

        );

        div.className="asset-item";

        div.innerHTML = `

        <b>${item.name}</b>

        <br>

        类别：

        ${item.category || ""}

        <br>

        类型：

        ${item.type || ""}

        <br>

        国家：

        ${item.country || ""}

        <br>

        币种：

        ${item.currency || ""}

        <br>

        机构：

        ${item.institution || ""}

        <br>

        金额：

        ¥${Number(

            item.value || 0

        ).toLocaleString()}

        `;

        list.appendChild(div);

    });

}

// ===============================

// Dashboard更新

// ===============================

function updateDashboard(){

    let total =

    calculateTotalAssets();

    WealthOS.data.totalAssets = total;

    WealthOS.data.netWorth = total;

    let totalBox =

    document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML =

        formatMoney(total);

    }

    let netBox =

    document.getElementById(

        "netWorth"

    );

    if(netBox){

        netBox.innerHTML =

        formatMoney(total);

    }

}

// ===============================

// AI CFO 初始化

// ===============================

function initializeAIAdvisor(){

    let box =

    document.getElementById(

        "aiAdvice"

    );

    if(box){

        box.innerHTML =

        "AI CFO 已启动，等待财富数据输入。";

    }

}

// ===============================

// 系统启动

// ===============================

function startWealthOS(){

    console.log(

        "Family Wealth AI OS Started"

    );

    console.log(

        WealthOS.version

    );

    loadAssets();

    updateAssetDisplay();

    updateDashboard();

    initializeAIAdvisor();

}

// 页面加载

window.onload=function(){

    startWealthOS();

};
