import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "~/components/Client/Project/HeaderTask/HeaderTask";
import BoardBar from "~/components/Client/Project/BoardBar/BoardBar";
import BoardContent from "~/components/Client/Project/BoardContent/BoardContent";
import HeaderTask from "~/components/Client/Project/HeaderTask/HeaderTask";
import './style.scss'
ManageTaskPage.propTypes = {

};

function ManageTaskPage(props) {
    const board={
        name: 'Lập Trình Mạng'
    }
    return (
        <div className='trello-minhtrung-master'>
            <HeaderTask  />
            <BoardBar boardName={board.name}/>
            <BoardContent  />
        </div>
    );
}

export default ManageTaskPage;