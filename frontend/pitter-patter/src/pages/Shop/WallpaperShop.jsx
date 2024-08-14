import { 
  ToolBar, 
  Wallpaper, 
  GuideText, 
  CarouselWrap, 
  Preview, 
  TransparentButton, 
  ButtonIcon, 
  RowWrap, 
  ActionButton, 
  PreviewFilter, 
  ActionRow,
  LayoutCoin,
  CoinImg,
  CoinNumber,
} from "./WallpaperShopStyle";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { assetsApi } from '../../apiService';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItem } from "../../redux/itemSlice";

import Coin from "/src/assets/icons/Coin.png";
import CoinModal from './CoinModal'; 
import Loader from "../Components/loader";

import LeftButton from "/src/assets/icons/ChevronLeft.png";
import RightButton from "/src/assets/icons/ChevronRight.png";

function WallpaperShop() {
  const Navigator = useNavigate();
  const [wallpapers, setWallpapers] = useState([]);
  const [onWallpaper, setOnWallpaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [pointRecords, setPointRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const itemsPerPage = 20;
  const token = useSelector((state) => state.token.accessToken);
  const jwtToken = `Bearer ${token}`;

  const childId = useSelector((state) => state.child.id);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadWallpapers(childId);
    getPoints(childId);
    getPointRecords(childId, 1);
  }, [childId]);

  const loadWallpapers = async (childId) => {
    try {
      const response = await assetsApi.get("/item", {
        params: {
          child_id: childId,
        },
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
      setWallpapers(response.data.filter(item => item.itemType === 'BACKGROUND'));
      setIsLoading(false); // 배경 이미지 로드 완료 후 로딩 상태 false로 설정
    } catch (error) {
      console.log("Error fetching wallpapers:", error.response.data.msg);
      setIsLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
    }
  };

  const getPoints = async (childId) => {
    try {
      const response = await assetsApi.get(`/point/${childId}`, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
      setPoints(response.data.point);
    } catch (error) {
      console.log("Error fetching points:", error.response.data.msg);
    }
  };

  const getPointRecords = async (childId, page) => {
    try {
      const response = await assetsApi.get(`/point-record/${childId}`, {
        params: {
          page: page,
          per_page: itemsPerPage,
        },
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
      setPointRecords(prevRecords => [...prevRecords, ...response.data]);
      setPage(page);
    } catch (error) {
      console.log("Error fetching point records:", error.response.data.msg);
    }
  };

  const loadMoreRecords = () => {
    getPointRecords(childId, page + 1);
  };

  const carouselRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  const handleLeft = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft - window.innerHeight * 0.23,
      behavior: "smooth"
    });
  };

  const handleRight = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft + window.innerHeight * 0.23,
      behavior: "smooth"
    });
  };

  const cancel = () => {
    Navigator(-1);
  };

  const dispatch = useDispatch();

  const save = async () => {
    if (onWallpaper && !onWallpaper.on) { 
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onWallpaper.id}`, {}, {
          headers: {
            Authorization: `${jwtToken}`,
          },
        });

        dispatch(setItem({ backgroundItem: onWallpaper.id }))

        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error.response.data.msg);
      }
    } else {
      Navigator(-1);
    }
  };

  const purchaseItem = async (childId, itemId) => {
    try {
      await assetsApi.post(`/item-property/${childId}/${itemId}`, {}, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      });

      setWallpapers(prevWallpapers =>
        prevWallpapers.map(wallpaper =>
          wallpaper.id === itemId ? { ...wallpaper, has: true } : wallpaper
        )
      );
    } catch (error) {
      console.error("Error purchasing item:", error.response.data.msg);
    }
  };

  const toggleWallpaper = (index) => {
    setWallpapers(prevWallpapers =>
      prevWallpapers.map((wallpaper, i) =>
        i === index ? { ...wallpaper, on: !wallpaper.on } : { ...wallpaper, on: false }
      )
    );
  };

  const handleSelect = (index) => {
    setSelectedWallpaper(index);
    setOnWallpaper(wallpapers[index]);
    toggleWallpaper(index);
  };

  // 로딩 중이라면 Loader 컴포넌트를 표시
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wallpaper style={{ backgroundImage: `url(${wallpapers[currentIdx]?.photo})` }}>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>{points} 코인</CoinNumber>
      </LayoutCoin>

      <ActionRow>
        <ActionButton style={{ marginRight: "15px" }} onClick={cancel}>
          취소
        </ActionButton>
        <ActionButton highlight onClick={save}>
          저장
        </ActionButton>
      </ActionRow>
      <ToolBar>
        <GuideText>게임 내에서 사용할 배경을 골라보세요!</GuideText>
        <RowWrap>
          <TransparentButton style={{ left: "0" }} onClick={handleLeft}>
            <ButtonIcon src={LeftButton} />
          </TransparentButton>
          <CarouselWrap ref={carouselRef}>
            {wallpapers.map((wallpaper, index) => (
              <Preview key={index} style={{ backgroundImage: `url(${wallpaper.photo})` }} 
              onClick={() => setCurrentIdx(index)} selected={selectedWallpaper === index}>
                {
                  index === currentIdx &&
                  <PreviewFilter>
                    <ActionButton
                      disabled={selectedWallpaper === index && wallpaper.has && wallpaper.on}
                      onClick={() => {
                        if (!wallpaper.has) {
                          purchaseItem(childId, wallpaper.id);
                        } else {
                          handleSelect(index);
                        }
                      }}
                    >
                      {wallpaper.has ? (wallpaper.on ? "장착됨" : "장착") : "구매"}
                    </ActionButton>
                  </PreviewFilter>
                }
              </Preview>
            ))}
          </CarouselWrap>
          <TransparentButton style={{ right: "0" }} onClick={handleRight}>
            <ButtonIcon src={RightButton} />
          </TransparentButton>
        </RowWrap>
      </ToolBar>
      {isModalOpen && <CoinModal onClose={closeModal} points={points} pointRecords={pointRecords} loadMoreRecords={loadMoreRecords} />} 
    </Wallpaper>
  );
}

export default WallpaperShop;
