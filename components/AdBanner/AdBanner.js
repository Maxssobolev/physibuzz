import Image from "next/image";
import React, { useEffect } from "react";
import BannerIcon from '../../assets/img/254x507.png'
const AdBanner = () => {

    return (
        <div className="adBanner">

            <Image src={BannerIcon} />
        </div>
    )
};

export default AdBanner;