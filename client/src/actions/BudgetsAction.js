export const BudgetReducer = (state, action) => {
    switch (action.type) {
        case "GET_INCOME":
            return {
                ...state, incomes: action.payload
            }
        case "ADD_INCOME":
            return {
                ...state, incomes: [
                    ...state.incomes,
                    action.payload
                ]
            }
        case "DELETE_INCOME":
            return {
                ...state,
                incomes: state.incomes.filter(item => item._id !== action.payload)
            }
        case "GET_OUTCOME":
            return {
                ...state, outcomes: action.payload
            }
        case "ADD_OUTCOME":
            return {
                ...state, outcomes: [
                    ...state.outcomes,
                    action.payload
                ]
            }

        case "DELETE_OUTCOME":
            return {
                ...state,
                outcomes: state.outcomes.filter(item => item._id !== action.payload)
            }
        // case "GET_TRACKER":
        //     return { ...state, outcome: action.payload.tracker }
        // case "ADD_TRACKER":
        //     return { ...state, outcome: action.payload.tracker }
        // case "DELETE_TRACKER":
        //     return { ...state, outcome: action.payload.tracker }
        // case "UPDATE_TRACKER":
        //     return { ...state, outcome: action.payload.tracker }
        default:
            return "state";
    }
}
