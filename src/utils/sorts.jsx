
export const getSprintActive=(array) =>(

    array.find((item) => item.status===1)
)
export const getTotalTaskInColumn=(array) => array.reduce((acc, item) =>acc+item.length,0)
export const conCatArrayInArray = (array) => {
    return array.reduce((acc, item) => acc.concat(item.cards), []);
}
export const mapOrder =(array,order,key) =>{
    console.log('cchecking ',array,order,key)
    array.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return array
}
export const getStatusTaskProject=(array,col_id) =>{
    // hien tai dang bi lôi là khi thêm 1 cột mới datta ko update vào nên khi goi hàm này sẽ ko truy ra duoc tên cột mới thêm.
   const col= array.columns.find((item)=>item.id===col_id)
    return {value:col.id,label:col.title}
}
export const getListStatusTaskProject=(array) =>{
    return array.columns.map((item,index)=>({id:item.id,label:item.title}))
}
export const findStyleForStatusTask=(status,list)=>{
    return list.find((item)=>item.value===status)
}
export const splitArrayByKey = (array, key) => {
    const grouped = array.reduce((acc, item) => {
        if (!acc[item[key]]) {
            acc[item[key]] = {
                id: item[key],
                cards: []
            };
        }
        acc[item[key]].cards.push(item);
        return acc;
    }, {});

    return Object.values(grouped);
};
export const remakeSprintFromSlide = (array,sprint) => {
    const mData=splitArrayByKey(array,'columnId');
    // return {...sprint,columns:newColumns}
    return sprint.columns.map((col => {
        let item = mData.find(item => item.id === col.id)
        return {
            ...col,
            cards: item.cards
        }
    }));

};