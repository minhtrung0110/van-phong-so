
export const applyDrag = (arr, dragResult,newColmnnID) => {
    console.log('Array khi vao ',arr)
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }
    console.log('card bi di chuyen :',itemToAdd)

    if (addedIndex !== null) {
        itemToAdd.columnId=newColmnnID;
        result.splice(addedIndex, 0, itemToAdd);
    }
    // cập columnID mới cho card_task
    // const oldCard

    return result;
};
export const applyDragSprint = (arr, dragResult,newSprintID) => {
    console.log('Array khi vao ',arr)
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }
    console.log('card bi di chuyen :',itemToAdd)

    if (addedIndex !== null) {
        itemToAdd.sprint_id=newSprintID;
        result.splice(addedIndex, 0, itemToAdd);
    }
    // cập columnID mới cho card_task
    // const oldCard
    console.log('ket qua :',result)
    return result;
};
export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(creator(i));
    }
    return result;
};