// Investment Center Agent

// Family Wealth AI OS V4.0 Alpha

const investmentAgent = {

    name: "Investment Center Agent",

    description: "管理家庭投资资产，包括股票、ETF、基金、债券等",

    investments: [],

    // 添加投资

    addInvestment(investment) {

        this.investments.push({

            id: Date.now(),

            name: investment.name,

            type: investment.type,

            amount: investment.amount,

            cost: investment.cost,

            date: investment.date || new Date().toISOString()

        });

        return "投资记录添加成功";

    },

    // 查看投资

    viewInvestments() {

        return this.investments;

    },

    // 编辑投资

    editInvestment(id, updateData) {

        const item = this.investments.find(

            investment => investment.id === id

        );

        if (!item) {

            return "未找到投资记录";

        }

        Object.assign(item, updateData);

        return "投资记录更新成功";

    },

    // 删除投资

    deleteInvestment(id) {

        this.investments = this.investments.filter(

            investment => investment.id !== id

        );

        return "投资记录删除成功";

    },

    // 投资组合统计

    summary() {

        let total = 0;

        this.investments.forEach(item => {

            total += Number(item.amount || 0);

        });

        return {

            totalInvestment: total,

            count: this.investments.length

        };

    }

};

export default investmentAgent;
