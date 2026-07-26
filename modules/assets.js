/*

Family Wealth AI OS

V4.0 Alpha

Assets Center

*/

let assets = [];

// 添加资产

function addAsset(asset){

    assets.push(asset);

    saveAssets();

}

// 保存资产

function saveAssets(){

    localStorage.setItem(

        "wealth_assets",

        JSON.stringify(assets)

    );

}

// 读取资产

function loadAssets(){

    let data = localStorage.getItem(

        "wealth_assets"

    );

    if(data){

        assets = JSON.parse(data);

    }

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

// 获取资产列表

function getAssets(){

    return assets;

}
