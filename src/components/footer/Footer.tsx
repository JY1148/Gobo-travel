import React from "react";
import { Layout, Typography } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const Footer : React.FC = () => {
  const { t } = useTranslation();
    return (<Layout.Footer>
        <Typography.Title level={3} style={{textAlign: 'center'}}>
        {t("footer.detail")}
        </Typography.Title>
        <Typography.Title level={5} style={{textAlign: 'center'}}>
        <div><FacebookOutlined /><TwitterOutlined /> <InstagramOutlined /> <WhatsAppOutlined /></div>
        </Typography.Title>
      </Layout.Footer>)
}