import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {
  Board,
  Stone,
  SVGContainer
} from './AttendanceEventStyle';
import UndoneImage from '/src/assets/icons/Undone.png';
import DoneImage from '/src/assets/icons/Done.png';

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 2rem;
  color: #629d1b;
`;

const stonePositions = [
  { src: DoneImage, alt: "done", style: { top: '10%', left: '10%' } },
  { src: UndoneImage, alt: "undone", style: { top: '14%', left: '30%' } },
  { src: UndoneImage, alt: "undone", style: { top: '8%', left: '50%' } },
  { src: UndoneImage, alt: "undone", style: { top: '12%', left: '66%' } },

  { src: UndoneImage, alt: "undone", style: { top: '30%', left: '81%' } },
  { src: UndoneImage, alt: "undone", style: { top: '32%', left: '50%' } },
  { src: UndoneImage, alt: "undone", style: { top: '33%', left: '20%' } },
  { src: UndoneImage, alt: "undone", style: { top: '47%', left: '5%' } },

  { src: UndoneImage, alt: "undone", style: { top: '50%', left: '32%' } },
  { src: UndoneImage, alt: "undone", style: { top: '52%', left: '59%' } },
  { src: UndoneImage, alt: "undone", style: { top: '47%', left: '77%' } },

  { src: UndoneImage, alt: "undone", style: { top: '66%', left: '85%' } },
  { src: UndoneImage, alt: "undone", style: { top: '73%', left: '45%' } },
  { src: UndoneImage, alt: "undone", style: { top: '70%', left: '17%' } },
];

function generatePathData(positions) {
  const pathData = positions.map(pos => {
    const x = parseFloat(pos.style.left) + 2;
    const y = parseFloat(pos.style.top) + 5;
    return { x, y };
  });

  let pathString = `M${pathData[0].x} ${pathData[0].y}`;
  for (let i = 1; i < pathData.length; i++) {
    const prev = pathData[i - 1];
    const current = pathData[i];
    const cx1 = (prev.x + current.x) / 2;
    const cy1 = prev.y * 1.3;
    const cx2 = (prev.x + current.x) / 2;
    const cy2 = current.y / 1.5;
    pathString += ` C${cx1} ${cy1}, ${cx2} ${cy2}, ${current.x} ${current.y}`;
  }
  return pathString;
}

function AttendanceEvent() {
  return (
    <Board>
      <Info>14일 이상 출석해 엄청난 보상을 획득해 보세요!</Info>
      <SVGContainer>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
          <path
            d={generatePathData(stonePositions)}
            stroke="#629d1b"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="1, 1"
          />
        </svg>
        {stonePositions.map((pos, index) => (
          <Stone key={index} src={pos.src} alt={pos.alt} style={pos.style} />
        ))}
      </SVGContainer>
    </Board>
  );
}

export default AttendanceEvent;
