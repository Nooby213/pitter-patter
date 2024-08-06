import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { childPlaytimeGet } from './../Child/childApi.js';
import { 
  LayoutActivityPage, 
  LayoutGraphList, 
  PlaytimeGraph, 
  GraphHeader, 
  GraphFooter, 
  ContentBody 
} from './ChildActivityTableStyle';

function ChildActivityTable() {
  const [data, setData] = useState([]);
  const childId = 1; // 테스트용 childId 변수 선언
  const startDate = '2024-07-24';
  const endDate = '2024-08-05';
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI4NDQwNjcsImlhdCI6MTcyMjg0NDA2NywiZXhwIjoxNzIyODQ3MDY3LCJqdGkiOiIyOTVlNGQ0My1jNTdiLTQzOGYtYmZhMi1iYTgxY2ZjODhiZjkifQ.26imCUiKUgvhsMFLfMWALQ2BWiDnNz3nZidUCLW4waEbI5WbSVNFoePMoz0p7KGX4I8V9buste_pbowZnrpbQg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playtimeData = await childPlaytimeGet(childId, startDate, endDate, token);
        const formattedData = playtimeData.data.map(item => ({
          createdAt: item.createdAt,
          playtime: item.playtime
        }));
        // 더미 데이터 추가
        formattedData.push(
          { createdAt: '2024-07-25', playtime: 120 },
        );
        // 날짜 순으로 정렬
        formattedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching playtime data:', error);
      }
    };
    fetchData();
  }, [childId, startDate, endDate, token]);

  const getTotalPlaytime = (data) => {
    return data.reduce((total, item) => total + item.playtime, 0);
  };

  return (
    <ContentBody>
      <GraphHeader>
        <span>키나 몸무게를 최근에 새로 측정하셨나요? 지금 추가해서 그래프를 업데이트 해보세요! </span>
        <a>추가하러 가기</a>
      </GraphHeader>
      <LayoutActivityPage>
        <LayoutGraphList>
          <PlaytimeGraph>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="playtime" stroke="#003f89" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </PlaytimeGraph>
        </LayoutGraphList>
      </LayoutActivityPage>
      <GraphFooter>
        <p>해당 기간 총 플레이타임은 {getTotalPlaytime(data)}분 입니다.</p>
        <p>### 님의 나이에서 해당 BMI는 ### 입니다. </p>
      </GraphFooter>
    </ContentBody>
  );
}

export default ChildActivityTable;