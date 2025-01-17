import { styled } from "styled-components";
import React, { useState } from "react";
import Home from "../@components/Home/Home";
import MenuBar from "../@components/MenuBar";
import SideBar from "../@components/SideBar/SideBar";
import Statistics from "../@components/Statistics/Statistics";
import Profile from "../@components/Profile/Profile";
import Notifications from "../@components/Notifications/Notifications";
import SearchResults from "../@components/Search/SearchResults";
import ArticleDetail from "../@components/ArticleDetail/ArticleDetail";
import ArticleEditForm from "../@components/common/ArticleEditForm";
import { userIdState } from "../recoil/userId";
import { useRecoilState } from "recoil";

export default function Service() {
  const [centerContent, setCenterContent] = useState("home");
  const [userId, setUserId] = useRecoilState(userIdState);
  const [articleSeq, setArticleSeq] = useState(0);

  return (
    <>
      <ServiceWrapper>
        <MenuBarWrapper>
          <MenuBar centerContent={centerContent} setCenterContent={setCenterContent} setUserId={setUserId} />
        </MenuBarWrapper>

        {/* menu 값에 따라 가운데 내용 바뀌기 */}

        <CenterWrapper>
          {centerContent === "home" && (
            <Home setCenterContent={setCenterContent} setUserId={setUserId} setArticleSeq={setArticleSeq} />
          )}
          {centerContent === "statistics" && (
            <Statistics setCenterContent={setCenterContent} setArticleSeq={setArticleSeq} />
          )}
          {centerContent === "notifications" && (
            <Notifications setCenterContent={setCenterContent} setUserId={setUserId} setArticleSeq={setArticleSeq} />
          )}
          {centerContent === "profile" && (
            <Profile setCenterContent={setCenterContent} setUserId={setUserId} userId={userId} />
          )}
          {centerContent === "following" && <Following setCenterContent={setCenterContent} setUserId={setUserId} />}
          {centerContent === "follower" && <Follower setCenterContent={setCenterContent} setUserId={setUserId} />}
          {centerContent === "search" && (
            <SearchResults setCenterContent={setCenterContent} setUserId={setUserId} setArticleSeq={setArticleSeq} />
          )}
          {centerContent === "detail" && (
            <ArticleDetail
              setCenterContent={setCenterContent}
              setUserId={setUserId}
              articleSeq={articleSeq}
              setArticleSeq={setArticleSeq}
            />
          )}
          {centerContent === "edit" && (
            <ArticleEditForm
              setCenterContent={setCenterContent}
              articleSeq={articleSeq}
              setArticleSeq={setArticleSeq}></ArticleEditForm>
          )}
        </CenterWrapper>

        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
      </ServiceWrapper>
    </>
  );
}

const ServiceWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
`;

const MenuBarWrapper = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  width: 20.6rem;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
`;

const CenterWrapper = styled.section`
  width: 69.9rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SideBarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  width: 28.2rem;
  height: 100vh;
  border-left: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  position: sticky;
  top: 0;
  overflow: hidden;
`;
