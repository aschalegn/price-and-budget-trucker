export const TrackReducer = (state, action) => {
    switch (action.type) {
        case "GET_TRACKER":
            state = action.payload;
            return state;
        case "ADD_TRACKER":
            state = { ...state, state: action.payload };
            return state;
        case "DELETE_TRACKER":
            state = state.filter(tracker => {
                return tracker.id !== action.payload;
            });
            return state;
        case "UPDATE_TRACKER":
            state = action.payload;
            return state;
        default:
            return state;
    }
}