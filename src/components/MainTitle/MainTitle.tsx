import React from "react";
import './MainTitle.css'
import {Typography} from "antd";
export const MainTitle = () => {
    return (
        <div className="main-title-container">
            <div className="bg-glow"></div>

            <div className="title-3d">
                <div className="title-line">
                    <Typography.Text className={'text-part pink-glow'}>
                        NO SOJU
                    </Typography.Text>
                </div>

                <div className="title-line">
                    <Typography.Text className={'text-part blue-glow'}>
                        NO CHILL QUIZ
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
};