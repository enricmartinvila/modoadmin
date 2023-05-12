import {useEffect, useState, useMemo} from 'react';
import { Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './numbofusers.module.css';

function NumberOfUsers () {
    const [data, setData] = useState([]);

    const cachedData = useMemo(() => {
      if (data.length === 0) {
        fetch('https://soja-api.onrender.com/api/v1/modoadminselect')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error al obtener los datos:', error));
      }
      return data;
    }, [data]);

    useEffect(() => {
      setData(cachedData);
    }, [cachedData]);

    return (
        <>
            <p className={styles.tagpusers}>{data.length}</p>
        </>
  )
};

export default NumberOfUsers