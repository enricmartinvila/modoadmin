import React from 'react';
import { Typography, Table, Button,Modal, notification, Input, Drawer, Form, Space } from 'antd';
import { useState, useEffect, Fragment } from 'react';
import { DeleteOutlined, LineOutlined, ExclamationCircleFilled,SyncOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import styles from './database.module.css';

const { confirm } = Modal;
const Context = React.createContext({
  name: 'Default',
});

function Tdb() {
  const openNotification = (placement) => {
    notification.success({
      message: 'Usuario eliminado',
      description:
        'El usuario ha sido eliminado correctamente.',
      placement,
    });
  };
  const badNotification = (placement) => {
    notification.error({
      message: 'Error',
      description:
        'No se puede eliminar un usuario de tipo Administrador.',
      placement,
    });
  };
  
  
  const columns = [
    {
      title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
          filters: [
            { text: 'A-M', value: 'A-M' },
            { text: 'N-Z', value: 'N-Z' },
          ],
          onFilter: (value, record) => {
            const regex = /^[A-M]/i; 
            if (value === 'A-M') {
              return regex.test(record.name);
            } else {
              return !regex.test(record.name); 
            }
          },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => a.email.length - b.email.length,
          filters: [
            { text: 'A-M', value: 'A-M' },
            { text: 'N-Z', value: 'N-Z' },
          ],
          onFilter: (value, record) => {
            const regex = /^[A-M]/i; 
            if (value === 'A-M') {
              return regex.test(record.email);
            } else {
              return !regex.test(record.email); 
            }
          },
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
          render: () => {
            return (
              <LineOutlined/>
            )
          }, 
          align: 'center',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
        },
      ];
    const [ showColumn, setShowColumn ] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [userEmailToDelete, setUserEmailToDelete] = useState("");
    const [open, setOpen] = useState(false);


    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [id , setId] = useState('');


    const showDrawer = (row) => {
      setNameValue(row.name);
      setEmailValue(row.email);
      setId(row.id);
      setOpen(true);
    };

    const copyToClipboard = (row) => {
      navigator.clipboard.writeText(`Id: ${row.id} Name: ${row.name} Email:  ${row.email}`);
    }

    const onClose = () => {
      setOpen(false);
    };
    const [api, contextHolder] = notification.useNotification();
    const [isSyncing, setIsSyncing] = useState(false);
    const closeModal = () => setModalOpen(false);
    
    useEffect(() => {
      fetch("https://soja-api.onrender.com/api/v1/modoadminselect")
        .then((response) => response.json())
        .then((data) => {
          const dataWithAction = data.map((row) => {
            row["actions"] = (
              <Fragment>
              <Button className={styles.boton} onClick={()=>showDrawer(row)} type="primary">
                <EditOutlined />
              </Button>
              <Button
                onClick={() => {
                  setUserEmailToDelete(row.email);
                  showConfirm(row.email);
                }}
                danger
                icon={<DeleteOutlined />}
                className={styles.boton}
              ></Button>
              <Button id={`copy-button-${row.id}`} onClick={() => copyToClipboard(row)}>
                <CopyOutlined />
              </Button>
              </Fragment>
            );
            return row;
          });
          setData(dataWithAction);
          setOriginalData(dataWithAction); // Agrega esta línea
        })
        .catch((error) =>
          console.error("Error al obtener los datos:", error)
        );
    }, []);
    
    const showConfirm = (email) => {
      confirm({
        title: 'Quieres eliminar este usuario?',
        icon: <ExclamationCircleFilled />,
        content: 'Quieres eliminar este usuario ' + email + ' ?',
        onOk() {
          fetch("https://soja-api.onrender.com/api/v1/modoadmindelete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: email,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setData(prevData =>
                prevData.filter((row) => row.email !== userEmailToDelete)
              );
              if (data.message === "No se puede eliminar a un usuario de tipo Administrador") {
                badNotification('topRight');
              } else {
              setUserEmailToDelete("");
              openNotification('topRight'); 
              }
            })
            .catch((error) => {
              console.error("Error al eliminar el usuario:", error)
            }
            );
        },
        onCancel() {
        },
      });
    };
    

    const handleRefresh = () => {
      setIsSyncing(true);
      fetch("https://soja-api.onrender.com/api/v1/modoadminselect")
        .then((response) => response.json())
        .then((data) => {
          const dataWithAction = data.map((row) => {
            row["actions"] = (
              <Fragment>
              <Button className={styles.boton} onClick={()=>showDrawer(row)} type="primary">
                <EditOutlined />
              </Button>
              <Button
                onClick={() => {
                  setUserEmailToDelete(row.email);
                  showConfirm(row.email);
                }}
                danger
                icon={<DeleteOutlined />}
                className={styles.boton}
              ></Button>
              <Button id={`copy-button-${row.id}`} onClick={() => copyToClipboard(row)}>
                <CopyOutlined />
              </Button>
              </Fragment>
            );
            return row;
          });
          setData(dataWithAction);
        })
        .catch((error) =>
          console.error("Error al obtener los datos:", error)
        )
        .finally(() => {
          setIsSyncing(false);
        });
    };
    
    const handleSubmit = () => {
      fetch("https://soja-api.onrender.com/api/v1/actualizarModoAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          id: id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al enviar la petición.");
          }
          setSelectedRow({});
          setNameValue('');
          setEmailValue('');
          setOpen(false);
        })
        .catch((error) => console.error("Error:", error));
    };

    const handleSearch = (value) => {
      setIsEmpty(value === '');
      setSearchText(value);
    };
    
    const filteredData = isEmpty
      ? originalData // Restablecer los datos a su estado original
      : data.filter((row) => {
          return (
            row.name.toLowerCase().includes(searchText.toLowerCase()) ||
            row.email.toLowerCase().includes(searchText.toLowerCase())
          );
        });
    
    
    return (
      <div className={styles.divisor}>
        <Typography.Title level={2}>
          Database
          <SyncOutlined
            className={isSyncing ? `${styles.rotate}` : ''}
            style={{ fontSize: '24px', color: '#1677ff', marginLeft: '10px' }}
            onClick={handleRefresh}
          />
        </Typography.Title>
        <Input.Search
          placeholder="Buscar por nombre o email"
          allowClear
          onSearch={handleSearch}
          style={{ marginBottom: '16px' , width: '350px' }}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="email"
          pagination={{ pageSize: 8 }}

        />
        <Drawer width={600}  title='Editar usuario' onClose={onClose} open={open} extra={
          <Button  onClick={onClose}>
            Cancelar
          </Button>
        }>
          <Form onFinish={handleSubmit}>
            <Form.Item label='Name' >
              <Input placeholder='Nombre' onChange={(e) => setNameValue(e.target.value)} value={nameValue} />
            </Form.Item>
            <Form.Item label='Email'>
              <Input placeholder='Email' onChange={(e) => setEmailValue(e.target.value)} value={emailValue} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Guardar
              </Button>
            </Form.Item>
            
          </Form>
        </Drawer>
        {contextHolder}
      </div>
    );
};

export default Tdb
export { Tdb };
