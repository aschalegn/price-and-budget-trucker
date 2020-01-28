export const BudgetReducer = (state, action) => {
    switch (action.type) {
        case "GET_INCOME":
            return { ...state, income: action.payload }
        case "ADD_INCOME":
            return {
                ...state, income: [
                    ...state.income,
                    action.payload
                ]
            }
        case "DELETE_INCOME":
            return {
                ...state,
                income: state.income.filter(item => item._id !== action.payload)
            }
        case "GET_OUTCOME":
            return { ...state, outcome: action.payload }
        case "ADD_OUTCOME":
            return {
                ...state, outcome: [
                    ...state.outcome,
                    action.payload
                ]
            }

        case "DELETE_OUTCOME":
            return {
                ...state,
                outcome: state.outcome.filter(item => item._id !== action.payload)
            }

        case "UPDATE_BUDGET":
            return "Updated"
        default:
            return "state";
    }
}
