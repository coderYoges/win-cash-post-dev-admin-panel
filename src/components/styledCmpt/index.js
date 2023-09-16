import styled from "styled-components";
import { GrClear } from "react-icons/gr";

const TableContainer = styled.div`
  padding: 10px;
  color: #243a48;
  width: 100%;
  background-color: #fffb;
  margin: 0.8rem auto;
  overflow: auto;
  &&::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &&::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #0004;
  }
`;

const TableStyled = styled.table`
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #e4e4e4;
`;

const TableRow = styled.tr`
  border: 1px solid #c8ced3;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  border-collapse: collapse;
  text-align: center;
  border: 1px solid #c8ced3;
`;

const TableStickyHead = styled.th`
  color: #000;
  font-size: 14px;
  font-weight: 700;
  position: sticky;
  top: 0;
  background-color: #e4e4e4;
  padding: 0.5rem;
  border-collapse: collapse;
  border: 1px solid #c8ced3;
  text-align: center;
  vertical-align: middle;
`;

const TablePagination = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

const TablePaginationRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const TablePaginationLabels = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#808080" : "#2E4B5E")};
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 50vw;
  transform: translate(-50%, 0);
  width: 600px;
  max-width: 90vw;
  margin: auto;
  background-color: white;
  border-radius: 5px;
  padding: 0;
  box-shadow: 0 1px 20px 0 rgb(0 0 0 /30%);
  z-index: 999;
`;

const ModalHeader = styled.div`
  padding: 10px 25px;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 20px;
  font-weight: 600;
`;

const ModalCloseBox = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;

const ModalItemsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

const ModalItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
`;

const ModalInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #e4e7ea;
  padding: 10px;
  border-radius: 5px;
  color: #5c6873;
`;

const ModalLabel = styled.label`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

const ModalBtnGrp = styled.div`
  height: 60px;
`;

const ModalBtn = styled.button`
  background-color: ${(props) => (props.disabled ? "#808080" : "#2e4b5e")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  width: 120px;
  margin: 10px 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 90%;
  color: red;
  font-size: 16px;
  font-weight: 400;
  margin: auto;
`;

const HeaderStyled = styled.h2`
  background-color: #2e4b5e;
  padding: 10px 15px;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  align-items: center;
`;

const DetailsWrapper = styled.div`
  background-color: #b8beca;
  min-height: calc(100vh - 76px);
  padding: 20px 0;
`;

const DetailsContainer = styled.div`
  width: 90%;
  margin: auto;
  border-radius: 5px;
  background-color: white;
  align-items: center;

  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
  @media (min-width: 576px) {
    width: 75%;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const DetailsItem = styled.div`
  border-bottom: 1px solid #a4bdcc;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

const DetailsLeftItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const DetailsRightItem = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #243a48;
`;

const DetailsBtn = styled.div`
  padding: 5px 10px;
  color: #fff;
  cursor: pointer;
  border: none;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border-radius: 5px;
  user-select: none;
  ${({ disabled }) =>
    disabled &&
    ` pointer-events: none;
  `}
`;

const ClearDuesBtn = styled(GrClear)`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  margin-bottom: 2px;
`;

const StyledCmpt = {
  TableContainer,
  TableStyled,
  TableHead,
  TableRow,
  TableCell,
  TableStickyHead,
  TablePagination,
  TablePaginationRight,
  TablePaginationLabels,
  ModalContainer,
  ModalHeader,
  ModalCloseBox,
  ModalItemsWrapper,
  ModalItem,
  ModalInput,
  ModalLabel,
  ModalBtnGrp,
  ModalBtn,
  ErrorContainer,
  HeaderStyled,
  DetailsWrapper,
  DetailsContainer,
  DetailsItem,
  DetailsLeftItem,
  DetailsRightItem,
  DetailsBtn,
  ClearDuesBtn,
};

export default StyledCmpt;
