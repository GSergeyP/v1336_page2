import React, { useState } from 'react';
import { Button, InputNumber, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPoints } from '../redux/fetchingDataSlice';
import { RootState } from '../redux/store';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const { points } = useSelector((state: RootState) => state.fetchingData);

  const [value, setValue] = useState<number | null>(points);
  
  const handleclick = (value: number | null) => {
    dispatch(getPoints(value));
    setValue(points);
  }

  return (
    <Space style={{marginTop: 10}}>
      <InputNumber 
        min={0} 
        max={1000} 
        value={value} 
        onChange={setValue} 
        maxLength={3}
        onKeyPress={(event) => {
          if (!/\d/.test(event.key)) {
            event.preventDefault();
          }
        }}
        placeholder='Ввод чисел'
      />
      <Button onClick={handleclick.bind(this, value)}>
        Загрузить точки
      </Button>
    </Space>
  );
};

export default App;