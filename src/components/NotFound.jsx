import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const NotFoundPage = () => {
    return (
        <PageContainer>
            <div className="fs-xxxl fw-700">404</div>
            <div className="fs-xl fw-600">Page Not Found</div>
        </PageContainer>
    );
};
