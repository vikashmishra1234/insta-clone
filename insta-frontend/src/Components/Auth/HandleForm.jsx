export const HandleForm=async(Api,data)=>{
    try {
        let res = await Api(data);
        return res;
    } catch (error) {
        alert("eror")
    }
}
