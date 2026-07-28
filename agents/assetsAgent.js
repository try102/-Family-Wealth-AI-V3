/*

Family Wealth AI OS

V5.4.1

Assets Agent

资产管理 + 价值计算兼容版

*/

const assetsAgent = {

    name:

    "Assets Agent V5.4.1",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem("assets")

        ){

            localStorage.setItem(

                "assets",

                JSON.stringify([])

            );

        }

        return "Assets Agent Ready";

    },

    // ======================

    // 读取

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem("assets")

            ||

            "[]"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        localStorage.setItem(

            "assets",

            JSON.stringify(data)

        );

    },

    // ======================

    // 价值计算

    // ======================

    calculateValue(asset){

        let value =

        Number(

            asset.value

            ||

            asset.currentValue

            ||

            0

        );

 if(value!==0){

    return value;

}

        let price =

        Number(

            asset.price || 0

        );

        let quantity =

        Number(

            asset.quantity || 0

        );

        if(

            price>0

            &&

            quantity>0

        ){

            return price * quantity;

        }

        return 0;

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let assets =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            asset.category || "其他",

            type:

            asset.type || "",

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            value:

            this.calculateValue(asset),

            price:

            Number(asset.price || 0),

            quantity:

            Number(asset.quantity || 0),

            note:

            asset.note || ""

        };

        assets.push(item);

        this.save(assets);

        return item;

    },
        // ======================

    // 查看资产

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 编辑资产

    // ======================

    edit(id,newData){

        let assets =

        this.getData();

        let index =

        assets.findIndex(

            item => item.id === id

        );

        if(index !== -1){

            assets[index] = {

                ...assets[index],

                ...newData

            };

            assets[index].value =

            this.calculateValue(

                assets[index]

            );

        }

        this.save(assets);

        return assets;

    },

    // ======================

    // 删除资产

    // ======================

    delete(id){

        let assets =

        this.getData();

        assets =

        assets.filter(

            item => item.id !== id

        );

        this.save(assets);

        return "删除成功";

    },

    // ======================

    // 资产汇总

    // ======================

    summary(){

        let assets =

        this.getData();

        let totalValue = 0;

        assets.forEach(item=>{

            totalValue +=

            this.calculateValue(item);

        });

        return {

            count:

            assets.length,

            totalValue:

            totalValue

        };

    },

    // ======================

    // 资产配置

    // ======================

    allocationSummary(){

        let assets =

        this.getData();

        let categories={};

        assets.forEach(item=>{

            let category =

            item.category || "其他";

            if(!categories[category]){

                categories[category]=0;

            }

            categories[category]+=

            this.calculateValue(item);

        });

        let total =

        this.summary().totalValue;

        let result={};

        Object.keys(categories)

        .forEach(category=>{

            result[category]={

                value:

                categories[category],

                percentage:

                total>0

                ?

                (

                    categories[category]

                    /

                    total

                    *

                    100

                ).toFixed(2)

                :

                0

            };

        });

        return result;

    }

};

export default assetsAgent;
