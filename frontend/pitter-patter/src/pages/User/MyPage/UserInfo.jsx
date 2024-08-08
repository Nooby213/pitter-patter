import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LayoutMyPage,
  Profile,
  MainImg,
  InputWrap,
  InputItem,
  InputTitle,
} from './UserInfoStyle';
import SingingBanana from "../../../assets/img/User/SingingBanana.png";

import {
  updateUser,
  reissueJwtToken,
  getUser,
} from "/src/pages/User/userApi.js";

const InputBox = styled.input`
  width: 15vw;
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const SelectBox = styled.select`
  width: 15vw;
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const SubmitButton = styled.button`
    border-radius: 1.5rem;
    background-color: #FFD8DF;
    box-shadow: #FA6DA1 0 .6vh;
    font-size: 1.2rem;
    height: 5vh;
    padding: .5rem 1.8rem;

    &:hover {
      box-shadow: #FA6DA1 0 .4vh;
      transform: translateY(.3vh);
    }

    &:active {
      box-shadow: #FA6DA1 0 0;
      transform: translateY(.6vh);
    }

    transition: all .1s;
`

function UserInfo() {
  const navigator = useNavigate();
  
  const teamNameInputRef = useRef(null);

  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  // 추후 redux에서 가져와야할 정보들
  const [accessToken, setAccessToken] = useState('access token');

  // 페이지가 렌더링 될 때 사용자 정보를 가져옴
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUser(accessToken);
        
        if (response.status === 200) {
          const exception = response.data.exception;
          const msg = response.data.msg;
          if (exception === undefined) {
            const userInfo = response.data.data;
            setTimeout(() => {
              setEmail(userInfo.email);
              setTeamName(userInfo.teamName);
            }, 100);
          } else {
            alert(msg);
            navigator("/");
          }
        } else {
          alert("사용자 정보를 가져올 수 없습니다.");
          navigator("/")
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // intercetor에서 토큰 재발급 수행
          alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
          navigator("/");
        } else if (error.msg && error.msg === "토큰 검증 실패") {
          // intercetor에서 토큰 재발급 수행
          alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
          navigator("/");
        } else {
          alert("문제가 발생했습니다. 다시 시도해주세요.");
        }
      }
    };

    getUserData();
  }, []);

  const handleSubmit = async () => {
    // 가족 팀 이름은 필수 입력값
    if (teamName === '') {
      alert("가족 팀 이름을 입력해주세요.");
      teamNameInputRef.current.focus();
      return;
    }

    // 가족 팀 이름 변경
    await updateTeamName();
  };

  const updateTeamName = async () => {
    try {
      const response = await updateUser(accessToken, {teamName});
      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;

        if (exception === undefined) {
          const updatedUserInfo = response.data.data;

          setTimeout(() => {
            setTeamName(updatedUserInfo.teamName);
          }, 100)
          alert("회원정보가 성공적으로 변경되었습니다.");
        } else {
          alert(msg);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else if (error.msg && error.msg === "토큰 검증 실패") {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <LayoutMyPage>
      <Profile>
        <MainImg src={SingingBanana} alt="SingingBanana" />
      </Profile>
      <InputWrap>
        <InputItem>
          <InputTitle>아이디</InputTitle>
          <InputBox type="text" value={email} disabled />
        </InputItem>
        {/* <InputItem>
          <InputTitle>가입일</InputTitle>
          <InputBox type="date" placeholder="created-at" />
        </InputItem> */}
        <InputItem>
          <InputTitle>가족 팀 이름</InputTitle>
          <InputBox 
            type="text"
            placeholder="팀이름"
            value={teamName}
            onChange={(e) => {setTeamName(e.target.value)}}
            ref={teamNameInputRef}
          />
        </InputItem>
      </InputWrap>
      <Profile style={{background: 'none', height: '13vh'}}>
        <SubmitButton onClick={handleSubmit}>
          저장
        </SubmitButton>
      </Profile>
    </LayoutMyPage>
  )
}

export default UserInfo;
