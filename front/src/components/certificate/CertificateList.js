import React, {useState} from "react";
import CertificateElement from './CertificateElement';

function CertificateList({ certificateList, setCertificateList, isEditable, portfolioOwnerId }) {
    return (
        certificateList.map((certificate, index) => (
            <CertificateElement key={index} certificate={certificate} isEditable={isEditable} setCertificateList={setCertificateList}></CertificateElement>
        ))
    );
}

// function CertificateList({ certificateList, setCertificateList, isEditable, portfolioOwnerId }) {
//     const [edit, setEdit] = useState(false) // 편집창 열고 닫기
//     return (
//         certificateList.map((certificate, index) => (
//             <>
//                 {edit && <CertificateElement key={index} setEdit={setEdit}></CertificateElement>}
//             </>
//         ))
//     );
// }
// function One() {
//     return (
//         <>
//             <Two></Two>
//         </>
//     )   
// }
// function Two() {
//     const [two, setTwo] = useState(0);
//     return (
//         <>
//             <button onClick={()=> setTwo(two+1)}></button>
//             <Three></Three>
//         </>
//     )
// }
// function Three() {
//     return (
//         <h1>Three</h1>
//     )
// }
// function App() {
//     return (
//         <One></One>
//     )
// }




export default CertificateList;


