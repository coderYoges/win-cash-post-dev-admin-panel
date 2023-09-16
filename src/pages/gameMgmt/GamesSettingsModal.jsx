import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import StyledCmpt from "../../components/styledCmpt";
import { CurrentGames } from ".";

const ToogleStyled = styled.input`
  &&& {
    width: 48px;
    height: 24px;
  }
`;

const GamesSettingsModal = ({ setSettingsModal, selectedItem, game }) => {
  const {
    blocked = false,
    removed = false,
    blockRemarks = "",
    mode = "low",
  } = game[CurrentGames[selectedItem].name];

  const [block, setBlock] = useState(blocked);
  const [remove, setRemove] = useState(removed);
  const [remarks, setRemarks] = useState(blockRemarks);
  const [gameMode, setGameMode] = useState(mode);

  const onSubmit = async () => {
    if (block && !remarks) {
      setSettingsModal(false);
      toast.error("Block Game Remarks should be filled", {
        autoClose: 2000,
      });
    } else {
      await postRequest(WIN_CASH_URL.SET_GAME_STATUS, {
        gameName: CurrentGames[selectedItem].name,
        blocked: block,
        removed: remove,
        blockRemarks: remarks,
        mode: gameMode
      });
      setSettingsModal(false);
      toast.success("Records Updated Successfully", {
        autoClose: 2000,
      });
    }
  };

  const onBlock = () => setBlock(!block);
  const onRemove = () => setRemove(!remove);

  const onChangeRemarks = (e) => {
    setRemarks(e.target.value);
  };

  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-white text-dark mt-2">
        Game Settings
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox
        className="text-dark m-2"
        onClick={() => setSettingsModal(false)}
      >
        x
      </StyledCmpt.ModalCloseBox>
      <StyledCmpt.ModalItemsWrapper>
        <div className="w-100 d-flex justify-content-between p-3">
          <StyledCmpt.DetailsLeftItem>Remove Game</StyledCmpt.DetailsLeftItem>
          <StyledCmpt.DetailsRightItem>
            <div className="form-check form-switch">
              <ToogleStyled
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={remove}
                onChange={onRemove}
              />
            </div>
          </StyledCmpt.DetailsRightItem>
        </div>
        <div className="w-100 d-flex justify-content-between p-3">
          <StyledCmpt.DetailsLeftItem>Disable Game</StyledCmpt.DetailsLeftItem>
          <StyledCmpt.DetailsRightItem>
            <div className="form-check form-switch">
              <ToogleStyled
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={block}
                onChange={onBlock}
              />
            </div>
          </StyledCmpt.DetailsRightItem>
        </div>
        {block && (
          <div className="w-100 d-flex justify-content-between align-items-center p-3">
            <StyledCmpt.DetailsLeftItem>
              Display Remarks
            </StyledCmpt.DetailsLeftItem>
            <StyledCmpt.DetailsRightItem>
              <StyledCmpt.ModalInput
                value={remarks}
                name="remarks"
                onChange={onChangeRemarks}
              />
            </StyledCmpt.DetailsRightItem>
          </div>
        )}
        <div className="w-100 d-flex justify-content-between align-items-center p-3">
          <StyledCmpt.DetailsLeftItem>
            Game Result Mode
          </StyledCmpt.DetailsLeftItem>
          <StyledCmpt.DetailsRightItem>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setGameMode("high");
                  }}
                >
                  High
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setGameMode("mid");
                  }}
                >
                  Mid
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setGameMode("low");
                  }}
                >
                  Low
                </div>
              </div>
            </div>
          </StyledCmpt.DetailsRightItem>
        </div>
      </StyledCmpt.ModalItemsWrapper>

      <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end mx-2 mb-3">
        <StyledCmpt.ModalBtn className="bg-black" onClick={onSubmit}>
          Confirm
        </StyledCmpt.ModalBtn>
      </StyledCmpt.ModalBtnGrp>
    </StyledCmpt.ModalContainer>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(GamesSettingsModal);
