import Axios from 'axios';
import {  AUTH_ACTION, AUTO_LOGIN_ACTION, LOGIN_ACTION, LOGOUT_ACTION, SET_USER_TOKEN_DATA_MUTATIONS, SIGNUP_ACTION } from '../../storeconstants';
import SignupValidations from '@/services/SignupValidations';

export default{
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATIONS,{
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        });
        localStorage.removeItem('userData');
    },

    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH_LS7aalW56628tk8ubjyY2TYW5BOMj0`,
        });
    },

    async [SIGNUP_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH_LS7aalW56628tk8ubjyY2TYW5BOMj0`
        })

        // context.commit(LOADING_SPINNER_SHOW_MUTATION,true, {root:true,}); 
    },

    [AUTO_LOGIN_ACTION](context){
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit(SET_USER_TOKEN_DATA_MUTATIONS, JSON.parse(userData));
        }
    },

    async [AUTH_ACTION](context,payload) {
        let postData = {
            email : payload.email,
            password : payload.password,
            returnSecureToken: true,
        };

        let response = '';

        // context.commit(LOADING_SPINNER_SHOW_MUTATION,true, {root:true,});

        try {
            response = await Axios.post(payload.url, postData,);
        } catch(err) {
            // context.commit(LOADING_SPINNER_SHOW_MUTATION,false, {root:true,});
            let errorMessage = SignupValidations.getErrorMessageFromCode(err.response.data.error.errors[0].message);
            // console.log(errorMessage);
            throw errorMessage; 
        }

        if (response.status === 200) {
            let tokenData = {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            };
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATIONS, tokenData);
        }
    },
};