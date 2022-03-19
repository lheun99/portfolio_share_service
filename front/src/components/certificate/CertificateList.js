import React from "react";
import CertificateElement from './CertificateElement';

const CertificateList = ({ certificateList, setCertificateList, isEditable, portfolioOwnerId }) => {
    return (
        certificateList.map((certificate, index) => (
            <CertificateElement key={index} certificate={certificate} isEditable={isEditable} setCertificateList={setCertificateList}></CertificateElement>
        ))
    );
}


export default CertificateList;
