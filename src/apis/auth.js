import axios from "axios";
import store from "@/store"

async function join(user){
    console.log("회원가입 실행");
    try {
        const response = await axios.post("/member/join", {
            //서버로 넘기는 키는 dto와 일치해야한다
            mid: user.id,
            mname: user.name,
            mpassword: user.password,
            mrole: user.role,
            memail: user.email
        });
        console.log("회원가입 실행2");
        return response.data.result; //success, duplicated, fail
    } catch (error) {
        console.log(error);
        return "fail-network";
    }
}

async function login(user){
    try {
        const response = await axios.post("/member/login", {
            //서버로 넘기는 키는 dto와 일치해야한다
            mid: user.id,
            mpassword: user.password
        });
        store.dispatch("saveAuth", {userId: response.data.mid, authToken: response.data.accessToken});
        return "success";
    } catch (error) {
        if(error.response){
            if(error.response.status === 401){
                return "fail-401";
            } 
        } else {
            return "fail-network";
        }
    }
}

async function logout(){
    try {
        await axios.get("/member/logout");
        store.dispatch("deleteAuth");
    } catch (error) {
        console.log(error);
    }
}

async function refreshToken(){
    try {
        if(store.state.authToken !== ""){
            const response = await axios.get("/member/refreshToken");
            store.dispatch("saveAuth", {
                userId: response.data.mid,
                authToken: response.data.accessToken
            });
            return true;
        }
    } catch (error) {
        console.log(error);
    }

    return false;
    
}

export default{
    join,
    login,
    logout,
    refreshToken
};