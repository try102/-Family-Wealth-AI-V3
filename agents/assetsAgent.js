/*

Family Wealth AI OS

V4.0 Build 008.1

Assets Agent

*/

const assetsAgent = {

    name:"Assets Agent",

    assets:[],

    // 初始化

    init(){

        this.load();

    },

    // 读取数据

    load(){

        let data = localStorage.getItem(

            "wealth_assets"

        );

        if(data){

            this.assets = JSON.parse(data);

        }

    },

    // 保存数据

    save(){

        localStorage.setItem(

            "wealth_assets",

            JSON.stringify(this.assets)

        );

    },

    // 添加资产

    add(asset){

        let newAsset={

            id:Date.now(),

            name:asset.name || "",

            category:asset.category || "",

            type:asset.type || "",

            owner:asset.owner || "",

            country:asset.country || "",

            currency:asset.currency || "",

            institution:asset.institution || "",

            account:asset.account || "",

            cost:Number(asset.cost || 0),

            value:Number(asset.value || 0),

            note:asset.note || "",

            createDate:

            asset.createDate ||

            new Date().toISOString()

        };

        this.assets.push(newAsset);

        this.save();

        return newAsset;

    },

    // 查看全部

    view(){

        return this.assets;

    },

    // 编辑

    edit(id,newData){

        let item=this.assets.find(

            a=>a.id===id

        );

        if(!item){

            return "未找到资产";

        }

        Object.assign(

            item,

            newData

        );

        this.save();

        return item;

    },

    // 删除

    delete(id){

        this.assets = this.assets.filter(

            a=>a.id!==id

        );

        this.save();

        return "删除成功";

    },

    // 统计

    summary(){

        let total=0;

        this.assets.forEach(item=>{

            total += Number(

                item.value || 0

            );

        });

        return {

            count:this.assets.length,

            totalAssets:total

        };

    },

    // AI分析接口

    analyze(){

        let result=this.summary();

        return {

            message:

            "资产分析完成",

            data:result

        };

    }

};

export default assetsAgent;
