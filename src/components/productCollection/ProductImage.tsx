import React from "react";
import {Image, Typography} from "antd";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";

interface PropsType extends RouteComponentProps{
    id: string | number;
    size: "large" | "small";
    title: string;
    imageSrc: string;
    price: number | string;
}

const ProductImageComponent: React.FC<PropsType> = ({id, size, title, imageSrc, price, history, location, match}) => {
    return <Link to={`detail/${id}`}>
        {size==="large"? (
            <Image src={imageSrc} height={291} width={450}/> 
        ) : ( 
            <Image src={imageSrc} height={120} width={220}/>
        )}
        <div>
            <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
            <Typography.Text type="danger" strong>$ {price} or less</Typography.Text>
        </div>
    </Link>
}

export const ProductImage = withRouter(ProductImageComponent);