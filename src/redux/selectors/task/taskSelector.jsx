export const isAddTaskSelector = state => state.task.isAdd
export const isEditTaskSelector = state => state.task.isEdit
export const taskByIdSelector = state => state.task.task
export const isResetTaskSelector= state => state.task.isReset
export const detailTaskSelector= state => state.task.detailTask
export const deleteTaskSelector= state => state.task.deleteTask
export const isCreateProjectSelector= state => state.task.isCreateProject
export const isViewTimelineSelector= state => state.task.isViewTimeline