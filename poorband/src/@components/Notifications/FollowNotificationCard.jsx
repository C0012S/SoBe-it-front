import React, { useEffect, useState } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { styled } from "styled-components";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { theme } from '../../style/theme';
// import { SIDEBAR_DETAIL } from "../../../core/sideBarData";

export default function FollowNotificationCard({ type, followingUserNickName, followingUserId, following, content, url, imageUrl, timestamp }) {
  const [time, setTime] = useState([]);
  const nowDate = new Date();

  // 사용자 프로필 이미지
  let avatarImg = null;
  if (imageUrl) {
    avatarImg = <img src={ imageUrl } alt="사용자 프로필 이미지" style={{ width: "100%", height: "100%" }} />;
  }
  else {
//    avatarImg = <img src={ SIDEBAR_DETAIL.user.profileImageUrl } style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
    avatarImg = <MoodBadIcon style={{ width: "6rem", height: "6rem", color: "#845EC2" }}/>;
  }

  // 알림 시간 구하기
  useEffect(() => {
    const notificationDate = new Date(timestamp);
    if (notificationDate.getFullYear() != nowDate.getFullYear())
      setTime(["year", nowDate.getFullYear() - notificationDate.getFullYear()]); // 연도 차이
    if (notificationDate.getMonth() != nowDate.getMonth())
      setTime(["month", nowDate.getMonth() - notificationDate.getMonth()]); // 달 차이
    else if (notificationDate.getDate() != nowDate.getDate())
      setTime(["date", nowDate.getDate() - notificationDate.getDate()]); // 일 차이
    else if (notificationDate.getHours() != nowDate.getHours())
      setTime(["hours", nowDate.getHours() - notificationDate.getHours()]); // 시간 차이
    else if (notificationDate.getMinutes() != nowDate.getMinutes())
      setTime(["minutes", nowDate.getMinutes() - notificationDate.getMinutes()]); // 분 차이
    else setTime(["seconds", nowDate.getSeconds() - notificationDate.getSeconds()]); // 초 차이
  }, []);
  
  const deleteNotification = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    console.log("삭제 버튼 클릭");
  };

  return (
    <NotificationCardButton disableRipple>
      <ListItem secondaryAction={
        <NotificationIconButton edge="end" aria-label="delete" onClick={ deleteNotification } disableRipple>
          <ClearIcon />
        </NotificationIconButton>
      }>
        
        <ListItemAvatar style={{ width: "6rem", height: "6rem" }}>
          {/* <Avatar style={{ width: "6rem", height: "6rem" }}> */}
            { avatarImg }
          {/* </Avatar> */}
        </ListItemAvatar>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "0.6rem", alignItems: "center" }}>
                <MainNotificationText primary={ followingUserNickName } />
                <PlusNotificationText primary="UserTier" />
                <PlusNotificationText style={{ color: "#878787" }} primary={ `@${followingUserId}` } />
              </div>
              
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {/* <SubNotificationText secondary="Follow Content" /> */}
                <FollowContent>{ content }</FollowContent>
                <TimeNotificationText secondary={ time && (
                  <span>
                    { time[1] }
                    { time[0] === "year" && "년" }
                    { time[0] === "month" && "월" }
                    { time[0] === "date" && "일" }
                    { time[0] === "hours" && "시간" }
                    { time[0] === "minutes" && "분" }
                    { time[0] === "secounds" && "초" } 전
                  </span>
                )} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FollowButton>팔로우</FollowButton>
            </div>
          </div>
        </div>
      </ListItem>
    </NotificationCardButton>
  );
}

const NotificationCardButton = muiStyled(ListItemButton) ({
  '&:hover': {
    backgroundColor: theme.colors.lightpurple,
  },
  '&:active': {
    backgroundColor: 'none',
  },
  '%:focus': {
    backgroundColor: 'none',
  },
});

const NotificationIconButton = muiStyled(IconButton) ({
  '&:hover': {
    backgroundColor: theme.colors.lightpurple,
  },
  '&:active': {
    backgroundColor: 'none',
  },
  '&:focus': {
    border: 'none',
    outline: 'none',
  },
});

const MainNotificationText = muiStyled(ListItemText) ({
  '& span': { 
    fontSize: '1.6rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const PlusNotificationText = muiStyled(ListItemText) ({
  marginLeft: '0.6rem',

  '& span': { 
    fontSize: '1.2rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const FollowContent = styled.div`
  font-size: 1.4rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.03em;
`;

const TimeNotificationText = muiStyled(ListItemText) ({
  marginLeft: '0.6rem',

  '& p': { 
    color: '#8799A5',
    fontSize: '1rem',
    fontFamily: [
      'Roboto',
    ].join(','),
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
});

const FollowButton = muiStyled(Button) ({
  width: '3.4rem',
  height: '2.2rem',
  borderRadius: '3rem',
  color: theme.colors.white,
  backgroundColor: theme.colors.mainpurple,
  fontSize: '1.2rem',
  fontFamily: [
    'Spoqa Han Sans Neo',
  ].join(','),
  fontStyle: 'normal',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.colors.darkpurple_2
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.colors.lightpurple,
    borderColor: theme.colors.lightgrey_1,
  },
  '&:focus': {
    boxShadow: '0 0 0 0.04rem #EDEDED',
    border: 'none',
    outline: 'none',
  },
});
