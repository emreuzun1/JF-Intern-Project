const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

export function getUser() {
    type: GET_USER
};

export function setUser(user) {
    type: SET_USER,
        user
};

const initialState = {
    user: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const { user } = action;
            return { ...state, user };
    }
}

