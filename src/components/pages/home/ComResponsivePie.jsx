import { useState, useEffect, useMemo } from 'react';
import { RadialBarChart,RadialBar, Legend, Tooltip } from 'recharts';
import styles from './numbofusers.module.css';


function ComResponsivePie() {
  const [emailCounts, setEmailCounts] = useState({ gmail: 0, hotmail: 0, other: 0 });
  const [data, setData] = useState([]);

const cachedData = useMemo(() => {
  if (data.length === 0) {
    setEmailCounts({ gmail: 0, hotmail: 0, other: 0 });
    fetch("https://soja-api.onrender.com/api/v1/modoadminselect")
      .then((response) => response.json())
      .then((datas) => {
        datas.forEach((dataA) => {
          if (dataA.email.endsWith("@gmail.com")) {
            emailCounts.gmail++;
          } else if (dataA.email.endsWith("@hotmail.com")) {
            emailCounts.hotmail++;
          } else {
            emailCounts.other++;
          }
        });
        setEmailCounts(emailCounts);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }
  return data;
}, [data]);

useEffect(() => {
  setData(cachedData);
}, [cachedData]);

  const data01 = [
      {
        "name": "Otros",
        "value": emailCounts.other,
        "uv": "Otros",
        "fill": "#52c41a"
      },
      {
        "name": "Hotmail",
        "value": emailCounts.hotmail,
        "uv": "Hotmail",
        "fill": "#1677ff"

      },
    {
      "name": "Gmail",
      "value": emailCounts.gmail,
      "uv": "Gmail",
      "fill": "#f5222d"

    },
  ];

  return (
    <>
    <RadialBarChart 
        width={330} 
        height={240} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={data01} 
        startAngle={180} 
        endAngle={0}
        className={styles.chart}
        >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
        <Legend iconSize={10} width={80} height={100} layout='vertical' verticalAlign='right' align="right" />
        <Tooltip />
    </RadialBarChart>  
    </>
  )
};

export default ComResponsivePie;
