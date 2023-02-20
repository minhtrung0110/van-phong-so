export const  initialData ={
    boards:[
        {
            id:'kltn-01',
            name:'Khóa Luận Tốt Nghiệp',
            columnOrder:['column-1', 'column-2','column-3'],
            columns:[
                {
                    id:'column-1',
                    boardId:'kltn-01',
                    title:'Chuẩn Bị',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id: 'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Lập Kế Hoạch',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Hoc React JS',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Xem Redux',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-4',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Nắm Yêu Cầu',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-5',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Lên Bảng Màu',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }

                    ]
                },
                {
                    id:'column-2',
                    boardId:'kltn-01',
                    title:'Đang Tiến Hành',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id:'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Xây Nhân Sự',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Thiê Kế Lich Trình',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'11/03/2023 21:00:00',
                            priority:'middle',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Tạo Dụ Án Github',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'11/03/2023 21:00:00',
                            priority:'low',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                    ]
                },
                {
                    id:'column-3',
                    boardId:'kltn-01',
                    title:'Đã Hoàn Thành',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id:'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'UI Login',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'11/07/2023 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'UIBase DashBoard',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'11/07/2023 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'Đề Cương Khóa Luận',
                            description: 'Chú Ý xác định đúng đối tượng và tập trung vào quy trình doanh nghiệp',
                            startTime:'01/02/2023 00:10:00 ',
                            endTime:'11/02/2023 20:00:00 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[
                                {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
                                {id:2,name:'Viết Mục Tiêu',status:false,isNew:false}
                            ],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'Tham Khảo UI',
                            description: '',
                            startTime:'01/1/2023 00:10:00',
                            endTime:'01/02/2023 21:00:00',
                            priority:'middle',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }


                    ]
                }
            ]
        }
    ]
}