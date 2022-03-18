import React from "react";
import CertificateCard from './CertificateCard';


function Certificate({portfolioOwnerId, isEditable}) {
    return (
        <>
            <CertificateCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable}></CertificateCard>
        </>
    )
}

export default Certificate;