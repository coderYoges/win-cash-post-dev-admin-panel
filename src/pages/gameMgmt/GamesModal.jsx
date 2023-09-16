import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CurrentGames } from ".";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import StyledCmpt from "../../components/styledCmpt";

const CountDowm = styled.div`
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  color: #383b45;
  font-size: 18px;
  font-weight: 600;
  font-family: sans-serif;
  height: 18px;
`;

const AmountBox = styled.div`
  display: inline-block;
  text-align: center;
  padding: 4px;
  color: #383b45;
  font-size: 16px;
  font-weight: 600;
  font-family: sans-serif;
  width: 100px;
  border-radius: 5px;
`;

const RedAmountBox = styled(AmountBox)`
  background: #da393f;
`;

const GrayAmountBox = styled(AmountBox)`
  background: #808080;
`;

const BlueAmountBox = styled(AmountBox)`
  background: #6298e8;
`;

const ButtonItem = styled.button`
  display: inline-block;
  text-align: center;
  padding: 4px;
  color: #383b45;
  font-size: 16px;
  font-weight: 600;
  font-family: sans-serif;
  width: 100px;
  border-radius: 5px;
`;

export const GamesModal = ({
  setGameModal,
  selectedGame,
  editOption,
  counter,
  gameControls,
  selectedItem,
  fetchCurrentGameList,
}) => {
  if (counter === 0) {
    setGameModal(false);
  }
  const btnDisabled = !editOption || selectedGame.winnerOption;
  const setGameResult = async (winnerOption) => {
    try {
      var resp = await postRequest(WIN_CASH_URL.SET_GAME_RESULT, {
        sequenceNumber: selectedGame.sequenceNumber,
        gameId: CurrentGames[selectedItem].id,
        winnerOption: winnerOption,
      });

      await fetchCurrentGameList();
      if (resp.isSuccessful) {
        toast.success("Winner Record captured Successfully", {
          autoClose: 2000,
        });
      }
    } catch (e) {
      toast.error("Error capturing Winner Record", { autoClose: 2000 });
    } finally {
      setGameModal(false);
    }
  };

  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-white text-dark">
        Game
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox
        className="text-dark mx-2"
        onClick={() => setGameModal(false)}
      >
        x
      </StyledCmpt.ModalCloseBox>
      <StyledCmpt.ModalItemsWrapper>
        <div className="d-flex flex-wrap w-100 px-2 justify-content-between">
          <div className="d-flex ">
            <CountDowm>{0}</CountDowm>
            <CountDowm>{0}</CountDowm>
            <CountDowm>{" : "}</CountDowm>
            <CountDowm>
              { (counter < (gameControls.red === "ANDAR" ? 44 : 54)) &&  counter > (gameControls.red === "ANDAR" ? 2 : 2) && !selectedGame.winnerOption
                ? Math.floor((  (gameControls.red === "ANDAR" ? 45 : 55) - counter) / 10)
                : 0}
            </CountDowm>
            <CountDowm>
              {(counter < (gameControls.red === "ANDAR" ? 44 : 54)) && (counter > (gameControls.red === "ANDAR" ? 2 : 2)) && !selectedGame.winnerOption
                ? ((gameControls.red === "ANDAR" ? 45 : 55) - counter) % 10
                : 0}
            </CountDowm>
          </div>
          <div className="d-flex">{`Game Id: ${selectedGame.sequenceNumber}`}</div>
        </div>
        <div className="d-flex flex-wrap w-100 px-5 justify-content-between mt-4">
          <RedAmountBox>
            {selectedGame[gameControls.totalRed] || 0}
          </RedAmountBox>
          <GrayAmountBox>
            {selectedGame[gameControls.totalTie] || 0}
          </GrayAmountBox>
          <BlueAmountBox>
            {selectedGame[gameControls.totalBlue] || 0}
          </BlueAmountBox>
        </div>
        <div className="d-flex flex-wrap w-100 px-5 justify-content-between mt-2">
          <ButtonItem
            disabled={btnDisabled}
            onClick={() => setGameResult(gameControls.red)}
          >
            {gameControls.red}
          </ButtonItem>
          <ButtonItem
            disabled={btnDisabled}
            onClick={() => setGameResult(gameControls.tie)}
          >
            {gameControls.tie}
          </ButtonItem>
          <ButtonItem
            disabled={btnDisabled}
            onClick={() => setGameResult(gameControls.blue)}
          >
            {gameControls.blue}
          </ButtonItem>
        </div>
      </StyledCmpt.ModalItemsWrapper>
    </StyledCmpt.ModalContainer>
  );
};
