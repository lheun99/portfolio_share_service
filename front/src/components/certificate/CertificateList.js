import React from "react";
import CertificateElement from './CertificateElement';

function ProjectList({ certificateList, setCertificateList, isEditable, portfolioOwnerId }) {
    return (
        certificateList.map((certificate, index) => (
            <CertificateElement key={index} project={certificate} isEditable={isEditable} setCertificateList={setCertificateList}></CertificateElement>
        ))
    );
}

export default ProjectList;