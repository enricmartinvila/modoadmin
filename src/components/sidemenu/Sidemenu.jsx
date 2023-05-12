import {useState} from 'react';
import {Menu, Image} from 'antd';
import { HomeFilled, DatabaseFilled, SettingFilled } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

function Sidemenu () {
    const navigate = useNavigate();
    return (
        <div className='SideMenu'>
            <Menu mode='horizontal'
 onClick={(item)=> {
                navigate(item.key);
            }}
            items={[
                {
                },
                {
                    label: 'Home',
                    icon: <HomeFilled />,
                    key: '/',
                },
                {
                    label: 'Database',
                    key: '/database',
                    icon: <DatabaseFilled />,
                },
                {
                    label: 'Settings',
                    key: '/settings',
                    icon: <SettingFilled />,
                },
            ]}/>
        </div>
  )
};

export default Sidemenu