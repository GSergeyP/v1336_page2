import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchingData } from './connect/connect';
import { RootState } from './redux/store';
import InputNumber from './components/inputNumber';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import { Space, Spin } from 'antd';

const DataEdit = (props: {[key: string]: any}) => {

  let data = [];
  
  for(let item in props) {
    let dateTmp = new Date(props[item].x);
    let date = dateTmp.getTime()- (dateTmp.getTimezoneOffset() * 60 * 1000);

    data.push([date, props[item].y]);
  }
  return data
}
Highcharts.setOptions({
  lang: {
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  }
});
const App: React.FC = () => {

  const dispatch = useDispatch();
  const { points, data, loading, error } = useSelector((state: RootState) => state.fetchingData);
 
  useEffect(() => {
    dispatch(getFetchingData(points))
  }, [dispatch, points]);

  const options = useMemo(() => {
    const dataEdit = DataEdit(data);
    const options = {
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      accessibility: {
        enabled: false
      },
      tooltip: {
        xDateFormat: '%A, %e %B %Y г., %H:%M:%S'
      },
      xAxis: {
        type: 'datetime',
        minTickInterval: 1000,
        title: {
          text: 'Время'
        }
      },
      yAxis: {
        type: 'linear',
        min: 0,
        max: 1000,
        tickInterval: 250,
        title: {
          text: 'Вес на крюке'
        }
      },
      series: [
        {
          name: 'Вес на крюке',
          data:  dataEdit
        }
      ]
    };
    return options
  }, [data])

  if (loading && !error) return (
    <Space 
      direction="vertical" 
      style={{ 
        width: '100%', 
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)' 
      }}
    >
      <Spin tip="Loading" size="large" >
        <div className="content" />
      </Spin>
    </Space>
  )
  else if (!loading && error) return (
    <p        
      style={{ 
        width: '100%', 
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)' 
      }}
    >
      Cервер с данными недоступен
    </p>
  )
  else return (
    <>
      <InputNumber />
      <br />
      <HighchartsReact highcharts={Highcharts} options={options} Highcharts={Highcharts} />
    </>
  );
}

export default App