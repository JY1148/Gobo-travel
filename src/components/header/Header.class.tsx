import React from "react";
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageAction"
import { connect } from "react-redux";
import { Dispatch } from "redux";



const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  }

}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return{
    changeLanguage: (code: "zh" | "en") =>{
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) =>{
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  }
}
type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
//react-router 路由props类型
//i8n props类型
//redux store映射类型
//redux dispatch映射类型

class HeaderComponent extends React.Component<PropsType> {
    



    menuClickHandler= (e) =>{
      console.log(e);
      // this.setState({ language: e.key });
      if(e.key==="more"){
        this.props.addLanguage("新语言", "new_lang");
      }else{
        this.props.changeLanguage(e.key)
      }
    }

    render() {
      const { history, t } = this.props;
      return (<div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{marginLeft:15}}
            overlay={
              <Menu onClick={this.menuClickHandler}>
                {this.props.languageList.map(l=>{
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })}
                <Menu.Item key={"more"}>{t("header.add_new_language")}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined/>}
          >{this.props.language ==="en" ? "English" : "中文"}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => history.push("/register")}>{t("header.register")}</Button>
            <Button onClick={() => history.push("/signIn")}>{t("header.login")}</Button>
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => history.push("/")}>
        <img src={logo} alt="logo" className={styles['App-logo']}/>
        <Typography.Title level={3} className={styles['title']}>
        {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search 
          placeholder="Please type your dream destination"
          className={styles['search-input']}
          onSearch={(keywords) => history.push("/search/" + keywords)}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']}>
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
    )
  }  
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));