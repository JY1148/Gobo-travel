import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageAction";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { UserSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const history = useHistory();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = useSelector((s) => s.user.token);
  const [username, setUsername] = useState("");

  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    console.log(e);
    // this.setState({ language: e.key });
    if (e.key === "more") {
      dispatch(addLanguageActionCreator("新语言", "new_lang"));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(UserSlice.actions.logOut());
    history.push("/");
  };

  return (
    <div className={styles["app-header"]}>
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
                <Menu.Item key={"more"}>
                  {t("header.add_new_language")}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === "en" ? "English" : "中文"}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => history.push("/shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => history.push("/signIn")}>
                {t("header.login")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => history.push("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles["title"]}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder="Please type your dream destination"
          className={styles["search-input"]}
          onSearch={(keywords) => history.push("/search/" + keywords)}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
        <Menu.Item key={2}>{t("header.Stays")}</Menu.Item>
        <Menu.Item key={3}>{t("header.Flights")}</Menu.Item>
        <Menu.Item key={4}>{t("header.Cars")}</Menu.Item>
        <Menu.Item key={5}>{t("header.Packages")}</Menu.Item>
        <Menu.Item key={6}>{t("header.Cruises")}</Menu.Item>
        <Menu.Item key={7}>{t("header.Road Trip")}</Menu.Item>
        <Menu.Item key={8}>{t("header.Family")}</Menu.Item>
        <Menu.Item key={9}>{t("header.Romantic")}</Menu.Item>
        <Menu.Item key={10}>{t("header.Solo traveler")}</Menu.Item>
        <Menu.Item key={11}>{t("header.Beach")}</Menu.Item>
        <Menu.Item key={12}>{t("header.Pet-friendly")}</Menu.Item>
        <Menu.Item key={13}>{t("header.Luxury")}</Menu.Item>
        <Menu.Item key={14}>{t("header.All-Inclusive")}</Menu.Item>
      </Menu>
    </div>
  );
};
