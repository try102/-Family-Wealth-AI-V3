/*

Family Wealth AI OS

V4.0 Build 008.1

Investment Agent

*/

const investmentAgent = {

    name:"Investment Agent",

    investments:[],

    // 初始化

    init(){

        this.load();

    },

    // 读取数据

    load(){

        let data = localStorage.getItem(

            "wealth_investments"

        );

        if(data){

            this.investments = JSON.parse(data);

        }

    },

    // 保存数据

    save(){

        localStorage.setItem(

            "wealth_investments",

            JSON.stringify(this.investments)

        );

    },

    // 添加投资

    add(investment){

        let newInvestment={

            id:Date.now(),

            name:

            investment.name || "",

            ticker:

            investment.ticker || "",

            type:

            investment.type || "",

            market:

            investment.market || "",

            currency:

            investment.currency || "USD",

            buyDate:

            investment.buyDate || "",

            buyPrice:

            Number(investment.buyPrice || 0),

            quantity:

            Number(investment.quantity || 0),

            buyAmount:

            Number(investment.buyAmount || 0),

            sellDate:

            investment.sellDate || "",

            sellPrice:

            Number(investment.sellPrice || 0),

            sellAmount:

            Number(investment.sellAmount || 0),

            currentPrice:

            Number(investment.currentPrice || 0),

            currentValue:

            Number(investment.currentValue || 0),

            note:

            investment.note || "",

            createDate:

            investment.createDate ||

            new Date().toISOString()

        };

        this.investments.push(newInvestment);

        this.save();

        return newInvestment;

    },

    // 查看投资

    view(){

        return this.investments;

    },

    // 编辑投资

    edit(id,newData){

        let item=this.investments.find(

            i=>i.id===id

        );

        if(!item){

            return "未找到投资记录";

        }

        Object.assign(

            item,

            newData

        );

        this.save();

        return item;

    },

    // 删除投资

    delete(id){

        this.investments=this.investments.filter(

            i=>i.id!==id

        );

        this.save();

        return "删除成功";

    },

    // 投资统计

    summary(){

        let totalCost=0;

        let totalValue=0;

        this.investments.forEach(item=>{

            totalCost += Number(

                item.buyAmount || 0

            );

            totalValue += Number(

                item.currentValue || 0

            );

        });

        return {

            count:this.investments.length,

            totalCost:totalCost,

            totalValue:totalValue,

            profit:

            totalValue-totalCost

        };

    },

    // 收益分析

    analyze(){

        let data=this.summary();

        let rate=0;

        if(data.totalCost>0){

            rate=

            (

                data.profit /

                data.totalCost *

                100

            ).toFixed(2);

        }

        return {

            message:

            "投资分析完成",

            data:data,

            returnRate:rate+"%"

        };

    }

};

export default investmentAgent;
