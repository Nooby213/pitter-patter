import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 25px;
  width: 8vw; 
  height: 10vh;
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: 30px;
  top: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicture = styled.img`
  width: 8vw;
  height: 8vh;
  border-radius: 2rem;
  background-color: #D9D9D9;
`;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
`;

const ProfileButton = styled.button`
  width: 8vw;
  height: 3.5vh;
  font-weight: bold;

  &:hover {
    background-color: var(--box-yellow-color);
    transition: ease-in-out 0.2s;
    opacity: 0.7;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #D9D9D9;
  margin: 10px 0;
`;

function ProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <GridItem>
          <ProfileButton onClick={() => navigate('/child/mypage')}>
            마이 페이지
          </ProfileButton>
        </GridItem>
        <Divider />
        <GridItem>
          <ProfileButton onClick={() => navigate('/select-profile')}>
            프로필 변경
          </ProfileButton>
        </GridItem>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ProfileModal;