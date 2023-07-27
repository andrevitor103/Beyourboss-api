
class BudgetValidation {
    validation() {
        return {
            'servico': 'required',
            'user': 'required',
            'valor': 'required|numeric',
            'data_inicial': 'required',
            'data_final': 'required'
        };
    }
}

module.exports = new BudgetValidation;