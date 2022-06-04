import axios from "axios";

async function getBoardList(pageNo=1){
    let response = null;
    try {
        response = await axios.get("/list");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//파일 다운로드
async function downloadBoardAttach(bno){
    let blob = null;
    try{
        const response = await axios.get(`/battach/${bno}`, {responseType: "blob"});
        blob = response.data;
        console.log("~~~~~~~~~");
    }catch(error){
        console.log(error);
    }
    return blob;
}

//게시물 가져오기(상세보기)
async function readBoard(bno,hit){
    let board = null;
    try{
        console.log("실행");
        const response = await axios.get(`/${bno}?hit=${hit}`);
        board = response.data;
        console.log(board);
    }catch(error){
        console.log(error);
    }
    return board;
}

//게시물 쓰기(멀티 파트)
async function createBoard(multipartFormData){
    let dbBoard = null;
    try{
        const response = await axios.post("/", multipartFormData);
        dbBoard = response.data;
    } catch(error){
        console.log(error);
    }
    return dbBoard;
}

//게시물수정
async function updateBoard(multipartFormData){
    let dbBoard = null;
    try{
        const response = await axios.put(`/`, multipartFormData);
        dbBoard = response.data;
    }catch(error){
        console.log(error);
    }
    return dbBoard;
}

//게시물 삭제
async function deleteBoard(bno){
    let result = null;
    try{
        const response = await axios.delete(`/${bno}`);
        result = response.data.result;
    }catch(error){
        console.log(error);
    }

    return result;
}


//내보내기
export default{
    getBoardList,
    downloadBoardAttach,
    readBoard,
    createBoard,
    updateBoard,
    deleteBoard
}