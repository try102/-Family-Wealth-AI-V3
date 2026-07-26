// Family Wealth AI Agent V3.5

// Application Controller

// 添加新资产

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

        amount:

        Number(

            document.getElementById(

                "assetAmount"

            ).value

        )

    };

    if(

        !asset.name ||

        !asset.amount

    ){

        alert(

            "请输入资产名称和金额"

        );

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

    let category =

    document.getElementById(

        "assetCategory"

    );

    if(category){

        category.value="";

    }

}

// 更新财富总览

function updateDashboard(){

    let total =

    calculateTotalAssets();

    let totalBox =

    document.getElementById(

        "totalAssets"

    );

    if(totalBox){

        totalBox.innerHTML =

        "¥" +

        total.toLocaleString(

            "zh-CN"

        );

    }

    updatePortfolioDisplay();

}

// 页面启动

window.onload=function(){

    updateAssetDisplay();

    updateDashboard();

};
