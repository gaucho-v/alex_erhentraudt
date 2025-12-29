import React from 'react';
import { Flex } from 'antd';
import './Layout.css';
export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex className={'Layout_Container'}>
            {children}
        </Flex>
    )
}