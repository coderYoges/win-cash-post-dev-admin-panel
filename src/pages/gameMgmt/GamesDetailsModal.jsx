import React from "react";
import { Labels } from "../../config/constants";
import StyledCmpt from "../../components/styledCmpt";

export const GamesDetailsModal = ({ setDetailsModal, selectedGame }) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-white text-dark mt-3">
        Game Details
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox
        className="text-dark mx-2"
        onClick={() => setDetailsModal(false)}
      >
        x
      </StyledCmpt.ModalCloseBox>
      <StyledCmpt.TableContainer>
        <StyledCmpt.TableStyled>
          <StyledCmpt.TableHead>
            <StyledCmpt.TableRow>
              <StyledCmpt.TableStickyHead>
                {"User name"}
              </StyledCmpt.TableStickyHead>
              <StyledCmpt.TableStickyHead>
                {"Bet Option"}
              </StyledCmpt.TableStickyHead>
              <StyledCmpt.TableStickyHead>
                {"Bet Amount"}
              </StyledCmpt.TableStickyHead>
            </StyledCmpt.TableRow>
          </StyledCmpt.TableHead>
          <tbody>
            {selectedGame.players && selectedGame.players.length > 0 ? (
              selectedGame.players((item, idx) => {
                return (
                  <StyledCmpt.TableRow key={item + idx}>
                    <StyledCmpt.TableCell>{item.userName}</StyledCmpt.TableCell>
                    <StyledCmpt.TableCell>
                      {item.betOption}
                    </StyledCmpt.TableCell>
                    <StyledCmpt.TableCell>
                      {item.betAmount}
                    </StyledCmpt.TableCell>
                  </StyledCmpt.TableRow>
                );
              })
            ) : (
              <StyledCmpt.TableRow>
                <StyledCmpt.TableCell colSpan={3}>
                  {Labels.NoData}
                </StyledCmpt.TableCell>
              </StyledCmpt.TableRow>
            )}
          </tbody>
        </StyledCmpt.TableStyled>
      </StyledCmpt.TableContainer>
    </StyledCmpt.ModalContainer>
  );
};
