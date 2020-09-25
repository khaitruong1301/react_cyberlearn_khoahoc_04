import React from 'react'

export default function TodolistRFC() {
    return (
        <div className="card">
            <div className="card__header">
                <img src="./img/X2oObC4.png" />
            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" type="text" placeholder="Enter an activity..." />
                        <button id="addItem">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            <li>
                                <span>Đi ngủ</span>
                                <div className="buttons">
                                    <button className="remove">
                                        <i className="fa fa-trash-alt" />
                                    </button>
                                    <button className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            <li>
                                <span>Ăn sáng</span>
                                <div className="buttons">
                                    <button className="remove">
                                        <i className="fa fa-trash-alt" />
                                    </button>
                                    <button className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
