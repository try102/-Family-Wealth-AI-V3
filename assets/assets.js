// Family Wealth AI Agent V3.5

// Asset Data Engine

let assets = JSON.parse(

    localStorage.getItem("familyWealthAssets")

) || [];

// 保存数据

function saveAssets(){

    localStorage.setItem(

        "familyWealthAssets",

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

// 编辑资产

function editAsset(index){

    let item = assets[index];

    let newAmount = prompt(

        "修改金额",

        item.amount

    );

    if(newAmount !== null){

        item.amount =

        Number(newAmount);

        saveAssets();

        updateAssetDisplay();

    }

}

// 计算总资产

function calculateTotalAssets(){

    return assets.reduce(

        (sum,item)=>

        sum + Number(item.amount || 0),

        0

    );

}

// 计算类别比例

function calculateCategoryRate(category){

    let total =

    calculateTotalAssets();

    if(total === 0){

        return 0;

    }

    let amount =

    assets

    .filter(

        item =>

        item.category === category

    )

    .reduce(

        (sum,item)=>

        sum + Number(item.amount || 0),

        0

    );

    return (

        amount / total * 100

    ).toFixed(1);

}

// 显示资产列表

function updateAssetDisplay(){

    let list =

    document.getElementById(

        "assetList"

    );

    if(!list){

        return;

    }

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

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "未分类"}

        <br>

        类型：

        ${item.type || ""}

        <br>

        国家：

        ${item.country || ""}

        <br>

        机构：

        ${item.institution || ""}

        <br>

        币种：

        ${item.currency || "CNY"}

        <br>

        金额：

        ¥${Number(item.amount).toLocaleString()}

        <br>

        占比：

        ${

        calculateCategoryRate(item.category)

        }%

        <br><br>

        <button onclick="

        editAsset(${index})

        ">

        编辑

        </button>

        <button onclick="

        deleteAsset(${index})

        ">

        删除

        </button>

        `;

        list.appendChild(div);

        }

    );

    updateDashboard();

}
