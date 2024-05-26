import React, { useState } from "react";
import Icon from "../../components/Icon";
import "../../css/Icon.css";
import "../../css/Setting.css";
import Head from "../../components/Head";

import ThemeButton from "../../components/Setting/ThemeButton";
import LinkOption from "../../components/Setting/LinkOption";
import { styled, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../components/Setting/Theme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-family: ${(font) => font.fonts}, sans-serif;
  height: 100%;
`;

const Setting = () => {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Inter");

  const changeFontI = () => {
    setFont("Inter");
  };

  const changeFontG = () => {
    setFont("Gaegu");
  };

  const changeFontS = () => {
    setFont("Sunflower");
  };
  const changeFontD = () => {
    setFont("Dongle");
  };

  const toggleTheme = () => {
    setTheme(() => {
      return theme === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Container fonts={font}>
        <div className="Setting">
          <Head text={"Setting"} />
          <div className="setting_content">
            <LinkOption goto={"user"} text={"유저 정보 변경"} thema={theme} />
            <LinkOption goto={"font"} text={"폰트"} thema={theme} />
            <ThemeButton
              toggle={toggleTheme}
              thema={theme}
              font={font}
              text={"라이트 / 다크"}
            />
          </div>
          <Icon />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Setting;
