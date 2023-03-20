

export const mapOrder =(array,order,key) =>{
    array.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return array
}
export const getNameColumn=(array,col_id,board_id) =>{
    // hien tai dang bi lôi là khi thêm 1 cột mới datta ko update vào nên khi goi hàm này sẽ ko truy ra duoc tên cột mới thêm.
   const listColumn=array.find(board => board.id === board_id)
   const col= listColumn.columns.find((item)=>item.id===col_id)
    return {value:col.id,label:col.title}
}
export const getListNameColumn=(array,board_id) =>{
    const listColumn=array.find(board => board.id === board_id)
  //  console.log(listColumn)
    return listColumn.columns.map((item,index)=>({id:item.id,label:item.title}))
}
export const findStyleForStatusTask=(status,list)=>{
    return list.find((item)=>item.value===status)
}