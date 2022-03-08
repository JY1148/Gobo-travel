import React from "react";
import styles from "./FeaturedClients.module.css";
import { Divider, Row, Col, Typography} from "antd";

import fea1 from "../../assets/image/fea1.png";
import fea2 from "../../assets/image/fea2.jpg";
import fea3 from "../../assets/image/fea3.jpeg";
import fea4 from "../../assets/image/fea4.webp";

const clients = [
    {src: fea1, title: "Facebook"},
    {src: fea2, title: "Google"},
    {src: fea3, title: "Microsoft"},
    {src: fea4, title: "Netflix"}
]

export const FeaturedClients: React.FC = (props) => {
    return <div className={styles.content}>
        <Divider orientation="left">
            <Typography.Title level={3}>Featured Clients</Typography.Title>
        </Divider>
        <Row>
            {clients.map((c, index) => (
                <Col span={6} key={"featured-clients-" + index}>
                    <img src={c.src} alt="featured-clients" style={{width:"80%", display:"blcok", marginLeft:"auto", marginRight:"auto",}}/>
                </Col>
            ))}
        </Row>
        
    </div>
};