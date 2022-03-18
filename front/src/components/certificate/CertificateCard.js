import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import * as Api from '../../api';
import CertificateList from './CertificateList';
import CertificateForm from './CertificateForm';

function CertificateCard({ portfolioOwnerId, isEditable }) {

    const [certificateList, setCertificateList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        Api.get('certificatelist', portfolioOwnerId)
            .then(res => setCertificateList(res.data));
    }, [portfolioOwnerId]);

    return (<Card>
        <Card.Body>
            <Card.Title>자격증</Card.Title>
            <CertificateList certificateList={certificateList} setCertificateList={setCertificateList} isEditable={isEditable} portfolioOwnerId={portfolioOwnerId}></CertificateList>
            {isEditable && (
                <div style={{ textAlign: "center" }}>
                    {!isEditing && <Card.Body><Button variant="primary" onClick={() => setIsEditing(true)}>+</Button></Card.Body>}
                    {isEditing && <CertificateForm setIsEditing={setIsEditing}></CertificateForm>}
                </div>
            )}
        </Card.Body>
    </Card>)
}
export default CertificateCard;