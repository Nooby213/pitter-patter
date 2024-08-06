import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-image: url("/src/assets/icons/X.png");
  background-color: transparent;
  background-size: cover;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

const RecordList = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  margin-top: 1vw;
`;

const Record = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const AmountColumn = styled.span`
  flex: 1;
  text-align: right;
  color: ${({ isPositive }) => isPositive ? 'var(--logo-green-color)' : 'var(--logo-pink-color)'};
`;

const SourceColumn = styled.span`
  flex: 1;
  text-align: center;
`;

const DateColumn = styled.span`
  flex: 1;
  text-align: right;
  color: black;
`;

function CoinModal({ onClose, pointRecords, loadMoreRecords, hasMore }) {
  const observer = useRef();
  const lastRecordRef = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreRecords();
      }
    });

    if (lastRecordRef.current) observer.current.observe(lastRecordRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [lastRecordRef.current, loadMoreRecords, hasMore]);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <h2>코인 정보</h2>
        <RecordList>
          {pointRecords.map((record, index) => (
            <Record key={index} ref={index === pointRecords.length - 1 ? lastRecordRef : null}>
              <SourceColumn>{record.source}</SourceColumn>
              <AmountColumn isPositive={record.amount > 0}>{record.amount}</AmountColumn>
              <DateColumn>{new Date(record.createdAt).toLocaleString()}</DateColumn>
            </Record>
          ))}
        </RecordList>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CoinModal;