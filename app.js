alert("V3.1运行");
// Family Wealth AI Agent V3.1

// Application Controller

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

        institution:

        document.getElementById("assetInstitution").value,

        amount:

        Number(

            document.getElementById("assetAmount").value

        )

    };

    if(

        !asset.name ||

        !asset.amount

    ){

        alert("请输入资产名称和金额");

        return;

    }

    addAsset(asset);

    document.querySelectorAll(

        ".asset-form input"

    )

    .forEach(

        input=>{

            input.value="";

        }

    );

    document.getElementById(

        "assetCategory"

    ).value="";

}

function updateDashboard(){

    let total =

    calculateTotalAssets();

    let box =

    document.getElementById(

        "totalAssets"

    );

    if(box){

        box.innerHTML =

        "¥" +

        total.toLocaleString();

    }

}

window.onload=function(){

    updateAssetDisplay();

    updateDashboard();

};
