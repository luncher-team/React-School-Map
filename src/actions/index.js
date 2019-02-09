import Axios from "axios";

export const FETCH_SCHOOLS = 'FETCH_SCHOOLS';
export const SCHOOLS_FETCHED = 'SCHOOLS_FETCHED';
export const FETCH_FAIL = 'FETCH_FAIL';
export const ADD_SCHOOL = "ADD_SCHOOL";
export const SCHOOL_ADDED = "SCHOOL_ADDED";
export const EDIT_SCHOOL = "EDIT_SCHOOL";
export const EDIT_COMPLETE = "EDIT_COMPLETE";
export const GIVE_DONATION = "GIVE_DONATION";
export const DONATION_SUCCESS = "DONATION_SUCCESS";
export const DONATION_FAIL = "DONATION_FAIL";
export const LOGGING_IN = "LOGGING_IN";
export const LOGGED_IN = "LOGGED_IN";
export const FETCHING_USER = "FETCHING_USER";
export const FETCHED_USER = "FETCHED_USER";
export const FETCHING_GEO = "FETCHING_GEO";
export const FETCHED_GEO = "FETCHED_GEO";



const url = 'https://luncher-app-backend.herokuapp.com/'

export const fetchSchools = () => dispatch => {
    dispatch({ type: FETCH_SCHOOLS });
    Axios
        .get(`${url}schools/`)
        .then(res => dispatch({ type: SCHOOLS_FETCHED, payload: res.data }))
        .catch(err => console.log('error'))
}

export const addSchool = (school) => dispatch => {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers : {
            Authorization: token
        }
    }
    dispatch({ type: ADD_SCHOOL });
    Axios
        .post(`${url}schools/`, school, reqOptions)
        .then(res => {
            dispatch({ type: SCHOOL_ADDED, payload: res.data});
            Axios
                .get(`${url}schools/`)
                .then(res => dispatch({ type: SCHOOLS_FETCHED, payload: res.data }))
                .catch(err => console.log('error'))
        })
        .catch(err => console.log(err));
}

export const editSchool = (school) => dispatch => {
    dispatch({ type: EDIT_SCHOOL });
    Axios
        .put(`${url}schools/${school.id}`, {
            id: school.id,
            school: school.name,
        })
        .then(res => dispatch({ type: EDIT_COMPLETE, payload: res.data }))
        .catch(err => console.log(err));
}

export const giveDonation = (donationTtl, school) => dispatch => {
    dispatch({ type: GIVE_DONATION });
    Axios
        .put(`${url}schools/${school.id}`, {
            donated: donationTtl
        })
        .then(res => {
            dispatch({ type: DONATION_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
        })
}

export const login = (loginInfo) => dispatch => {
    dispatch({type: LOGGING_IN});
    Axios
        .post(`${url}api/login/`, loginInfo)
        .then(res => {        
            localStorage.setItem('jwt', res.data.token);
            dispatch({type: LOGGED_IN, payload: res.data})
            Axios
                .get(`${url}api/users/${res.data.id}`)
            .then(res => {
                dispatch({type: FETCHED_USER, payload: res.data})
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));  
    
}

export const fetchGeo = (address) => dispatch => {
    dispatch({type: FETCHING_GEO});
    Axios
        .get(`http://open.mapquestapi.com/geocoding/v1/address?key=BXePamQFbEaWWQEx1Dn6eANoiTPAzVyI&location=${address.address}, ${address.city} ${address.state}`)
        .then(res => {
            dispatch({type: FETCHED_GEO, payload: res.data});
        })
        .catch(err => console.error(err));
}
