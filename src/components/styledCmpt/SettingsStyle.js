import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: white;
`;

const Header = styled.h3`
  background-color: #2e4b5e;
  padding: 10px;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const ItemsWrapper = styled.div`
  padding: 0 5px;
  padding-bottom: 10px;
  color: #243a48;
`;

const Item = styled.div`
  border-bottom: 1px solid #a4bdcc;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  gap: 20px;
`;

const Label = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

const Point = styled.div`
  flex: 1;
  text-align: center;
`;

const Btn = styled.div`
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
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  gap: 30px;
  flex-wrap: wrap;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`;

const FilterSubItem = styled.div`
  border: 1px solid #c8ced3;
  border-radius: 5px;
  background-color: #c8ced3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #fff;
  height: 36px;
  user-select: none;
`;

const FilterButton = styled.button`
  margin-top: 30px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#808080" : "#14213d")};
  fontsize: 14px;
  fontweight: 600;
  color: white;
  display: block;
  user-select: none;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
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

export const SettingsStyle = {
  Container,
  Header,
  ItemsWrapper,
  Item,
  Label,
  Point,
  Btn,
  FilterContainer,
  FilterItem,
  FilterSubItem,
  FilterInput,
  FilterButton,
  SettingsContainer,
  SettingsHeader,
  SettingsLeftItems,
  SettingsLeftItem
};
