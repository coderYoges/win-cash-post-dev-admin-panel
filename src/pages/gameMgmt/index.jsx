import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import HeaderCmpt from "../../components/header";
import NavbarCmpt from "../../components/navbar";
import { GamesListPage } from "./GamesListPage";
import { GamesModal } from "./GamesModal";
import { GamesDetailsModal } from "./GamesDetailsModal";
import GamesSettingsModal from "./GamesSettingsModal";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { postRequest, getRequest } from "../../api";
import { setAndarBahar, setDragonTiger, setLuckySeven } from "../../redux/game";

export const CurrentGames = [
  { id: "dragon-tiger", title: "Dragon Tiger", name: "dragonTiger" },
  { id: "andar-bahar", title: "Andar Bahar", name: "andarBahar" },
  { id: "lucky-seven", title: "Lucky Seven", name: "luckySeven" },
];

const GameTerms = [
  {
    totalRed: "totalDragon",
    totalBlue: "totalTiger",
    totalTie: "totalTie",
    red: "DRAGON",
    blue: "TIGER",
    tie: "TIE",
  },
  {
    totalRed: "totalAndar",
    totalBlue: "totalBahar",
    totalTie: "totalTie",
    red: "ANDAR",
    blue: "BAHAR",
    tie: "TIE",
  },
  {
    totalRed: "totalUp",
    totalBlue: "totalDown",
    totalTie: "totalTie",
    red: "UP",
    blue: "DOWN",
    tie: "TIE",
  },
];
const CmptWrapper = styled.div`
  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
  pointer-events: ${(props) => (props.dullOpacity ? "none" : "auto")};
  user-select: ${(props) => (props.dullOpacity ? "none" : "auto")};
`;

const SettingsContainer = styled.div`
  background-color: #b8beca;
  padding: 20px;
  display: flex;
  min-height: calc(100vh - 112px);
`;

const SettingsHeader = styled.h3`
  background-color: #2e4b5e;
  padding: 10px;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const SettingsLeftItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SettingsLeftItem = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#fffb" : "#fff")};
  border-bottom: 1px solid #c8ced3;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const GameMgmtPage = ({ setAndarBahar, setDragonTiger, setLuckySeven }) => {
  const [selectedItem, setItem] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [gameModal, setGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [editOption, setEditOption] = useState(false);
  const [counter, setCounter] = useState(0);
  const [gameRecords, setGameRecords] = useState([]);

  const fetchCurrentGameList = async () => {
    const resp = await postRequest(WIN_CASH_URL.GET_CURRENT_GAMES, {
      gameCollection: CurrentGames[selectedItem].id,
    });
    setGameRecords(resp.data);
  };

  useEffect(() => {
    if (gameRecords.length === 0) {
      fetchCurrentGameList();
    }
    // eslint-disable-next-line
  }, [gameRecords]);

  console.log(counter);

  useEffect(() => {
    if (counter === 0 || counter === 41) {
      fetchCurrentGameList();
    }
    if (counter === (GameTerms[selectedItem].red === "ANDAR" ? 30 : 40)) {
      setEditOption(true);
    }
    if (counter === (GameTerms[selectedItem].red === "ANDAR" ? 44 : 54)) {
      setEditOption(false);
    }
    // eslint-disable-next-line
  }, [counter]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      let currentUTCTime = new Date();
      const currentISTMins =
        currentUTCTime.getMinutes() - currentUTCTime.getTimezoneOffset();
      currentUTCTime.setMinutes(currentISTMins);
      const currentTimeInSec = Math.floor(
        Number(currentUTCTime.valueOf()) / 1000
      );
      setCounter(currentTimeInSec % 60);
    }, [1000]);
    return () => clearInterval(intervalTime);
    // eslint-disable-next-line
  }, []);

  const onSetGameItem = (idx) => {
    setItem(idx);
    setGameRecords([]);
  };

  const onClickSettings = async () => {
    try {
      const resp = await getRequest(WIN_CASH_URL.GET_GAME_STATUS);
      resp?.data?.map((item) =>
        item.docName === "andarBahar"
          ? setAndarBahar(item)
          : item.docName === "dragonTiger"
          ? setDragonTiger(item)
          : item.docName === "luckySeven"
          ? setLuckySeven(item)
          : null
      );
    } catch (e) {
    } finally {
      setSettingsModal(true);
    }
  };

  return (
    <Fragment>
      {gameModal && (
        <GamesModal
          setGameModal={setGameModal}
          selectedGame={selectedGame}
          editOption={editOption}
          counter={counter}
          gameControls={GameTerms[selectedItem]}
          selectedItem={selectedItem}
          fetchCurrentGameList={fetchCurrentGameList}
        />
      )}
      {detailsModal && (
        <GamesDetailsModal
          setDetailsModal={setDetailsModal}
          selectedGame={selectedGame}
        />
      )}
      {settingsModal && (
        <GamesSettingsModal
          setSettingsModal={setSettingsModal}
          selectedItem={selectedItem}
        />
      )}
      <CmptWrapper dullOpacity={gameModal || detailsModal || settingsModal}>
        <HeaderCmpt />
        <NavbarCmpt />

        <SettingsContainer className="row m-0">
          <div className="col-12 col-md-3 p-0">
            <SettingsHeader className="m-0">Games</SettingsHeader>
            <SettingsLeftItems>
              {CurrentGames.length > 0 &&
                CurrentGames.map((item, idx) => (
                  <SettingsLeftItem
                    key={item.id + idx}
                    onClick={() => onSetGameItem(idx)}
                    active={selectedItem === idx}
                  >
                    {item.title}
                  </SettingsLeftItem>
                ))}
            </SettingsLeftItems>
          </div>
          <div className="col-12 col-md-1 mt-4 p-0" />
          <div className="col-12 col-md-8 p-0">
            <GamesListPage
              item={CurrentGames[selectedItem]}
              setGameModal={setGameModal}
              setSelectedGame={setSelectedGame}
              gameControls={GameTerms[selectedItem]}
              gameRecords={gameRecords}
              setDetailsModal={setDetailsModal}
              onClickSettings={onClickSettings}
            />
          </div>
        </SettingsContainer>
      </CmptWrapper>
    </Fragment>
  );
};

const mapDispatchToProps = {
  setAndarBahar: setAndarBahar,
  setDragonTiger: setDragonTiger,
  setLuckySeven: setLuckySeven,
};

export default connect(null, mapDispatchToProps)(GameMgmtPage);
