// Family Wealth AI Agent V3

// Asset Database

let assets = JSON.parse(

    localStorage.getItem("assets")

) || [];

// 保存数据

function saveAssets(){

    localStorage.setItem(

        "assets",

        JSON.stringify(assets)

    );

}

// 添加资产

function addAsset(asset){

    assets.push(asset);

    saveAssets();

    updateAssetDisplay();

}

// 删除资产

function deleteAsset(index){

    assets.splice(index,1);

    saveAssets();

    updateAssetDisplay();

}

// 计算总资产

function calculateTotalAssets(){

    return assets.reduce(

        (total,item)=>

        total + Number(item.amount || 0),

        0

    );

}

// 显示资产

function updateAssetDisplay(){

    let list =

    document.getElementById(

        "assetList"

    );

    if(!list) return;

    list.innerHTML="";

    assets.forEach(

        (item,index)=>{

        let div =

        document.createElement(

            "div"

        );

        div.className =

        "asset-card";

        div.innerHTML = `

        <b>${item.name}</b>

        <br>

        分类：

        ${item.category}

        <br>

        类型：

        ${item.type}

        <br>

        国家：

        ${item.country}

        <br>

        金额：

        ¥${Number(item.amount).toLocaleString()}

        <br><br>

        <button onclick="deleteAsset(${index})">

        删除

        </button>

        `;

        list.appendChild(div);

        }

    );

    updateDashboard();

}
