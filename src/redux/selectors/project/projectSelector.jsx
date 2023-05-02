export const isAddTaskSelector = state => state.project.isAdd
export const isEditTaskSelector = state => state.project.isEdit
export const taskByIdSelector = state => state.project.task
export const isResetTaskSelector= state => state.project.isReset
export const detailTaskSelector= state => state.project.detailTask
export const deleteTaskSelector= state => state.project.deleteTask
export const isCreateProjectSelector= state => state.project.isCreateProject
export const isViewTimelineSelector= state => state.project.isViewTimeline
export const projectSelector= state => state.project.project
export const sprintSelector= state => state.project.sprint
export const keyProjectSelector= state => state.project.key