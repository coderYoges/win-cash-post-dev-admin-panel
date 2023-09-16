import styled from "styled-components";

const UsersWrapper = styled.div`
  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
  pointer-events: ${(props) => (props.dullOpacity ? "none" : "auto")};
  user-select: ${(props) => (props.dullOpacity ? "none" : "auto")};
`;

const UsersContainer = styled.div`
  background-color: #b8beca;
  padding: 20px;
  min-height: calc(100vh - 116px);
  width: 100%;
  overflow-x: hidden;
  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
`;

const UsersTopRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
`;

const AddUserBtn = styled.button`
  padding: 5px 10px;
  color: #243a48;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RefreshBtn = styled.button`
  padding: 9px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const StyledTable = styled.table`
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

export const UsersStyle = {
  Wrapper: UsersWrapper,
  Container: UsersContainer,
  TopRight: UsersTopRight,
  AddUserBtn: AddUserBtn,
  RefreshBtn: RefreshBtn,
  TableContainer: TableContainer,
  StyledTable: StyledTable,
  TableHead: TableHead,
  TableRow: TableRow,
  TableCell: TableCell,
  TableStickyHead: TableStickyHead,
  TablePagination: TablePagination,
  TablePaginationLabels: TablePaginationLabels,
  TablePaginationRight: TablePaginationRight
};
