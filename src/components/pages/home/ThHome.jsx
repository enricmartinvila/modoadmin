import { Typography, Card, Space, Button, notification, Form, Input, message, Switch } from 'antd';
import NumberOfUsers from './NumberOfUsers';
import ComResponsivePie from './ComResponsivePie';
import { UserOutlined, MailOutlined, BellOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

function ThHome() {
  const [formValues, setFormValues] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para manejar el estado del Switch

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('https://soja-api.onrender.com/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values, 
          admin: isAdmin 
        })
      });
      setFormValues({});
      message.success('El usuario ha sido registrado.');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSwitchChange = (checked) => {
    setIsAdmin(checked); // Actualiza el estado del Switch
  }

  useEffect(() => {
    notification.open({
      icon: <BellOutlined style={{ color: '#108ee9' }} />,
      message: 'Welcome',
      description: 'Hola bienvenido/a al modo admin de SOJA',
      placement: 'topRight',
    });
  }, []);

  return (
    <div className={styles.divisor}>
      <Typography.Title level={2}>Home</Typography.Title>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <div className={styles.divisorCards}>
          <Card className={styles.card} style={{}} extra={<UserOutlined />} title="Current users">
            <NumberOfUsers />
          </Card>
          <Card className={styles.card2} extra={<MailOutlined />} title="Types of mails" >
            <ComResponsivePie />
          </Card>
            <Card extra={<UserAddOutlined/>} className={styles.newCard}  title="Crear usuario">
                <Form onFinish={handleSubmit} initialValues={formValues}>
                    <Form.Item label="Nombre" name="name">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input autoComplete='off'/>
                    </Form.Item>
                    <Space direction='horizontal' size='small'>
                      <Switch className={styles.switcher} checkedChildren="Admin" unCheckedChildren="User"  />
                    </Space>
                    <Button type="primary" htmlType="submit">Crear</Button>
                </Form>
            </Card>
           
            </div>
            </Space>
        </div>
  )
};

export default ThHome;

export { ThHome };
