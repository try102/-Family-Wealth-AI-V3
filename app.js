alert("app.js加载成功");

/*

Family Wealth AI OS

V4.0 Alpha Build 001

*/
/*

Family Wealth AI OS

V4.0 Alpha Build 001

Assets Test Version

*/

let assets = [];

// 页面启动

window.onload = function(){

    loadAssets();

    updateAssetDisplay();

    updateDashboard();

};

// 添加资产

function addNewAsset(){

    alert("添加资产按钮运行了");

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

    updateAssetDisplay();

    updateDashboard();

}

// 保存

function saveAssets(){

    localStorage.setItem(

        "wealth_assets",

        JSON.stringify(assets)

    );

}

// 读取

function loadAssets(){

    let data =

    localStorage.getItem(

        "wealth_assets"

    );

    if(data){

        assets = JSON.parse(data);

    }

}

// 显示资产

function updateAssetDisplay(){

    let list =

    document.getElementById("assetList");

    if(!list){

        return;

    }

    list.innerHTML="";

    assets.forEach(function(item){

        let div = document.createElement("div");

        div.innerHTML =

        `

        <hr>

        <b>${item.name}</b>

        <br>

        类型：${item.type}

        <br>

        金额：¥${item.value.toLocaleString()}

        `;

        list.appendChild(div);

    });

}

// 更新Dashboard

function updateDashboard(){

    let total = 0;

    assets.forEach(function(item){

        total += Number(item.value || 0);

    });

    let box =

    document.getElementById(

        "totalAssets"

    );

    if(box){

        box.innerHTML =

        "¥" + total.toLocaleString();

    }

    let net =

    document.getElementById(

        "netWorth"

    );

    if(net){

        net.innerHTML =

        "¥" + total.toLocaleString();

    }

}
