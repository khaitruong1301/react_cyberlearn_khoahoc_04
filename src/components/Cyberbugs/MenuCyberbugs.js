import React from 'react'

export default function MenuCyberbugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" />
                    <span>Cyber Board</span>
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <span>Project Settings</span>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>


    )
}
