import { FETCH_SCHOOLS, SCHOOLS_FETCHED, ADD_SCHOOL, SCHOOL_ADDED, EDIT_SCHOOL, EDIT_COMPLETE, GIVE_DONATION, DONATION_SUCCESS, LOGGING_IN, LOGGED_IN, FETCHING_USER, FETCHED_USER, FETCHING_GEO, FETCHED_GEO } from "../actions";

const initialState = {
    fetchSchools: false,
    schoolsFetched: false,
    schoolsFetchFail: false,
    schoolAdding: false,
    schoolAdded: false,
    addDonation: false,
    donationAdded: false,
    error: null,
    loggingIn: false,
    loggedIn: false,    
    fetchingUser: false,
    fetchedUser: false,
    userInfo: [],
    schools:[]
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SCHOOLS:
            return {
                ...state,
                error: '',
                isFetching: true
            }
        case SCHOOLS_FETCHED:
            return {
                ...state,
                isFetching: false,
                schools: action.payload,
                error: ''
            }
        case ADD_SCHOOL: 
            return {
                ...state,
                schoolAdding: true,
                error:''
            }
        case SCHOOL_ADDED:
            return {
                ...state,
                schoolAdding: false,
                schoolAdded:true,
                error: ''
            }
        case EDIT_SCHOOL:
            return {
                ...state,
                isEditing: true,
                error: ''
            }
        case EDIT_COMPLETE:
            return {
                ...state,
                isEditing: false,
                error: '',
                schools: action.payload
            }
        case GIVE_DONATION:
            return {
                ...state,
                isDonating: true,
                error: ''
            }
        case DONATION_SUCCESS:
            return {
                ...state,
                isDonating: false,
                error: '',
                donated: action.payload
            }
        case LOGGING_IN:
            return{
                ...state,
                loggingIn: true,
                error:'',                
            }
        case LOGGED_IN:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                loggedInId: action.payload.id
            }
        case FETCHING_USER:
            return {
                ...state,
                fetchingUser: true
            }
        case FETCHED_USER:
            return {
                ...state,
                fetchingUser: false,
                fetchedUser: true,
                userInfo: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;