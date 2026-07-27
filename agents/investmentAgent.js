/*

Family Wealth AI OS

V4.0 Alpha Build 005

Investment Center Agent

*/

const investmentAgent = {

    key: "wealth_investments",

    investments: [],

    // ======================

    // 初始化读取

    // ======================

    load(){

        let data = localStorage.getItem(this.key);

        if(data){

            this.investments = JSON.parse(data);

        }

    },

    // ======================

    // 保存数据

    // ======================

    save(){

        localStorage.setItem(

            this.key,

            JSON.stringify(this.investments)

        );

    },

    // ======================

    // 添加投资

    // ======================

    addInvestment(data){

        let investment = {

            id: Date.now(),

            name: data.name || "",

            type: data.type || "",

            ticker: data.ticker || "",

            market: data.market || "",

            owner: data.owner || "",

            // 买入信息

            buyDate: data.buyDate || "",

            buyPrice: Number(data.buyPrice || 0),

            buyQuantity: Number(data.buyQuantity || 0),

            buyAmount: Number(data.buyAmount || 0),

            // 卖出信息

            sellDate: data.sellDate || "",

            sellPrice: Number(data.sellPrice || 0),

            sellQuantity: Number(data.sellQuantity || 0),

            sellAmount: Number(data.sellAmount || 0),

            // 当前价值

            currentValue: Number(data.currentValue || 0),

            note: data.note || ""

        };

        this.investments.push(investment);

        this.save();

        return "投资记录添加成功";

    },

    // ======================

    // 查看投资

    // ======================

    viewInvestments(){

        return this.investments;

    },

    // ======================

    // 编辑投资

    // ======================

    editInvestment(id, updateData){

        let item = this.investments.find(

            investment => investment.id === id

        );

        if(!item){

            return "未找到投资记录";

        }

        Object.assign(item, updateData);

        this.save();

        return "投资记录更新成功";

    },

    // ======================

    // 删除投资

    // ======================

    deleteInvestment(id){

        this.investments = this.investments.filter(

            investment => investment.id !== id

        );

        this.save();

        return "投资记录删除成功";

    },

    // ======================

    // 投资汇总

    // ======================

    summary(){

        let totalCost = 0;

        let totalValue = 0;

        this.investments.forEach(item=>{

            totalCost += Number(item.buyAmount || 0);

            totalValue += Number(item.currentValue || 0);

        });

        return {

            totalCost,

            totalValue,

            profit: totalValue - totalCost,

            count: this.investments.length

        };

    }

};

// 初始化

investmentAgent.load();
