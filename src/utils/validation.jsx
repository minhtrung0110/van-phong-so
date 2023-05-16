export  function checkErrorImage(url){
    let img = document.createElement('img');
    img.src = url;
    img.onload =  () => false;
    img.onerror = ()=> true;
}
export  function  checkIsImage(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const arr = new Uint8Array(reader.result).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }
        switch (header) {
            case '89504e47':
            case '47494638':
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
                return true;
            default:
                return false;
        }
    };
    reader.readAsArrayBuffer(file);
};
export const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};
export const validateEmailCompany = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[A-Z0-9._%+-]+@nextgen\.vn$/i;
    return emailRegex.test(email);
};