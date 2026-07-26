/*

Family Wealth AI OS

V4.0 Alpha Build 002

Application Core

+

Assets Management

*/

let assets = [];

// =========================

// 系统启动

// =========================

window.onload = function(){

    loadAssets();

    updateAssetDisplay();

    updateDashboard();

};

// =========================

// 资产读取保存

// =========================

function loadAssets(){

    let data = localStorage.getItem(

        "wealth_assets"

    );

    if(data){

        assets = JSON.parse(data);

    }

}

function saveAssets(){

    localStorage.setItem(

        "wealth_assets",

        JSON.stringify(assets)

    );

}

// =========================

// 添加资产

// =========================

function addNewAsset(){

    let asset = {

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

// =========================

// 清空输入

// =========================

function clearAssetInput(){

    let ids=[

        "assetName",

        "assetCategory",

        "assetType",

        "assetCountry",

        "assetCurrency",

        "assetInstitution",

        "assetAccount",

        "assetValue"

    ];

    ids.forEach(function(id){

        let e=document.getElementById(id);

        if(e){

            e.value="";

        }

    });

}

// =========================

// 显示资产列表

// =========================

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

        div.className="asset-item";

        div.innerHTML=`

        <hr>

        <b>${item.name}</b>

        <br>

        类型：

        ${item.type || ""}

        <br>

        国家：

        ${item.country || ""}

        <br>

        金额：

        ¥${Number(item.value)

        .toLocaleString()}

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

// =========================

// 编辑资产

// =========================

function editAsset(index){

    let item=assets[index];

    let newValue=

    prompt(

        "修改资产金额",

        item.value

    );

    if(newValue!==null){

        item.value=Number(newValue);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}

// =========================

// 删除资产

// =========================

function deleteAsset(index){

    let ok=confirm(

        "确定删除这个资产吗？"

    );

    if(ok){

        assets.splice(index,1);

        saveAssets();

        updateAssetDisplay();

        updateDashboard();

    }

}

// =========================

// Dashboard

// =========================

function updateDashboard(){

    let total=0;

    assets.forEach(function(item){

        total += Number(

            item.value || 0

        );

    });

    let a=document.getElementById(

        "totalAssets"

    );

    if(a){

        a.innerHTML=

        "¥"+total.toLocaleString();

    }

    let n=document.getElementById(

        "netWorth"

    );

    if(n){

        n.innerHTML=

        "¥"+total.toLocaleString();

    }

}
