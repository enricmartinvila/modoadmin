import {Typography, Switch, Card} from 'antd';
import styles from './settings.module.css';


function ThSettings () {
    return (
        <>
            <div className={styles.divisor}>
                <Typography.Title level={2}>Settings</Typography.Title>
                <Card title="Light/Dark theme">
                <Switch  />
                </Card>
            </div>
        </>
  )
};

export default ThSettings
export { ThSettings };
