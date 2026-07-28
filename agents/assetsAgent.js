/*

Family Wealth AI OS

V5.4

Assets Agent

资产管理统一接口版

*/

const assetsAgent = {

    name:"Assets Agent V5.4",

    storageKey:"assets",

    assets:[],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        return "Assets Agent Ready";

    },

    // ======================

    // 读取数据

    // ======================

    load(){

        let data =

        localStorage.getItem(

            this.storageKey

        );

        if(data){

            this.assets =

            JSON.parse(data);

        }

        else{

            this.assets=[];

            this.save();

        }

    },

    // ======================

    // 保存

    // ======================

    save(){

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(

                this.assets

            )

        );

    },

    // ======================

    // 自动计算价值

    // ======================

    calculateValue(item){

        let price=

        Number(

            item.price || 0

        );

        let quantity=

        Number(

            item.quantity || 0

        );

        if(

            price>0 &&

            quantity>0

        ){

            return price*quantity;

        }

        return Number(

            item.value || 0

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

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

            asset.currency || "CNY",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            price:

            Number(

                asset.price || 0

            ),

            quantity:

            Number(

                asset.quantity || 0

            ),

            value:0,

            note:

            asset.note || ""

        };

        item.value=

        this.calculateValue(item);

        this.assets.push(item);

        this.save();

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.assets;

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let item=

        this.assets.find(

            a=>a.id===id

        );

        if(!item){

            return "未找到资产";

        }

        Object.assign(

            item,

            newData

        );

        item.value=

        this.calculateValue(item);

        this.save();

        return item;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        this.assets=

        this.assets.filter(

            a=>a.id!==id

        );

        this.save();

        return "删除成功";

    },

    // ======================

    // 总资产统计

    // ======================

    summary(){

        let totalValue=0;

        this.assets.forEach(item=>{

            totalValue +=

            this.calculateValue(item);

        });

        return{

            count:

            this.assets.length,

            totalValue

        };

    },

    // ======================

    // 分类统计

    // ======================

    allocation(){

        let result={};

        this.assets.forEach(item=>{

            let category=

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category]+=

            this.calculateValue(item);

        });

        return result;

    }

};

export default assetsAgent;
