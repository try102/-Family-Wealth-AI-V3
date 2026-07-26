/*

Family Wealth AI OS

V4.0 Alpha Build 001

Application Core

*/

// 系统状态

const WealthOS = {

    version:"4.0 Alpha Build 001",

    modules:{

        dashboard:true,

        family:true,

        assets:true,

        income:true,

        investment:true,

        tax:false,

        retirement:false,

        advisor:false

    },

    data:{

        netWorth:0,

        totalAssets:0,

        annualIncome:0,

        investmentReturn:0

    }

};

// 格式化金额

function formatMoney(value){

    return "¥" +

    Number(value).toLocaleString("zh-CN");

}

// 更新 Dashboard

function updateDashboard(){

    document.getElementById(

        "netWorth"

    ).innerHTML =

    formatMoney(

        WealthOS.data.netWorth

    );

    document.getElementById(

        "totalAssets"

    ).innerHTML =

    formatMoney(

        WealthOS.data.totalAssets

    );

    document.getElementById(

        "annualIncome"

    ).innerHTML =

    formatMoney(

        WealthOS.data.annualIncome

    );

    document.getElementById(

        "investmentReturn"

    ).innerHTML =

    formatMoney(

        WealthOS.data.investmentReturn

    );

}

// AI CFO 初始化

function initializeAIAdvisor(){

    let box = document.getElementById(

        "aiAdvice"

    );

    if(box){

        box.innerHTML =

        "AI CFO 已启动，等待财富数据输入。";

    }

}

// 系统启动

function startWealthOS(){

    console.log(

        "Family Wealth AI OS Started"

    );

    console.log(

        WealthOS.version

    );

    updateDashboard();

    initializeAIAdvisor();

}

// 页面加载

window.onload=function(){

    startWealthOS();

};
// 添加新资产

function addNewAsset(){

    let asset={

        name:

        document.getElementById("assetName").value,

        category:

        document.getElementById("assetCategory").value,

        type:

        document.getElementById("assetType").value,

        country:

        document.getElementById("assetCountry").value,

        currency:

        document.getElementById("assetCurrency").value,

        institution:

        document.getElementById("assetInstitution").value,

        account:

        document.getElementById("assetAccount").value,

        value:

        Number(

        document.getElementById("assetValue").value

        )

    };

    addAsset(asset);

    updateAssetDisplay();

    updateDashboard();

}

// 显示资产

function updateAssetDisplay(){

    let list=document.getElementById(

        "assetList"

    );

    if(!list)return;

    list.innerHTML="";

    getAssets().forEach(function(item){

        let div=document.createElement("div");

        div.className="asset-item";

        div.innerHTML=`

        <b>${item.name}</b>

        <br>

        类型：

        ${item.type}

        <br>

        国家：

        ${item.country}

        <br>

        金额：

        ¥${Number(item.value).toLocaleString()}

        `;

        list.appendChild(div);

    });

}
