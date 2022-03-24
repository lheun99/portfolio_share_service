import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Button, Col, Badge } from "react-bootstrap";
import { DispatchContext } from "../../App";
import * as Api from "../../api";
import UserEditForm from "./UserEditForm";

import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});


  const colorChange = () => {
    if (user?.job === "프론트엔드") {
      return "info";
    } else if (user?.job === "백엔드") {
      return "dark";
    } else if (user?.job === "데이터 분석") {
      return "success";
    } else if (user?.job === "AI") {
      return "warning";
    } else if (user?.job === "기타") {
      return "secondary";
    } else {
      return null;
    }
  };

  const portfolioOwnerId = params.userId;

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  const withdrawal = async () => {
    if (!window.confirm("정말로 회원탈퇴하시겠습니까?")) return;

    // 해당 유저의 education, award, project, certificate, career, proceeding, todo 삭제
    await Api.delete(`educationlist/${user.id}`);
    await Api.delete(`awardlist/${user.id}`);
    await Api.delete(`projectlist/${user.id}`);
    await Api.delete(`certificatelist/${user.id}`);
    await Api.delete(`careerlist/${user.id}`);
    await Api.delete(`proceedinglist/${user.id}`);
    await Api.delete(`todolist/${user.id}`);

    // 해당 유저 DELETE 요청 처리
    await Api.delete(`users/${user.id}`);

    // 회원탈퇴 확인창
    alert(`회원탈퇴가 완료되었습니다.`);

    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
          <Card.Body>
            <Row className="justify-content-md-center">
              <Card.Img
                style={{ width: "9rem", height: "9rem", borderRadius:100, margin:0, padding:0, }}
                className="mb-3"
                src={user?.profile}
                alt="사용자 프로필"
              />
            </Row>
            <Card.Title style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
              {user?.name}
              <h6 style={{ margin: "auto 5px" }}>
                <Badge pill bg={colorChange()}>
                  {" "}
                  {user?.job}
                </Badge>
              </h6>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user?.email}
            </Card.Subtitle>
            <Card.Text>{user?.description}</Card.Text>
            <Card.Text>
              <a
                href={user?.github}
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-brands fa-github"></i> {user?.github}
              </a>
            </Card.Text>
            <Card.Text>
              <a
                href={user?.gitlab}
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-brands fa-gitlab"></i> {user?.gitlab}
              </a>
            </Card.Text>
            <Card.Text>
              <a
                href={user?.twitter}
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-brands fa-twitter"></i> {user?.twitter}
              </a>
            </Card.Text>
            <Card.Text>
              <a
                href={user?.instagram}
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-brands fa-instagram"></i> {user?.instagram}
              </a>
            </Card.Text>
            <Card.Text>
              <a
                href={user?.youtube}
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-brands fa-youtube"></i> {user?.youtube}
              </a>
            </Card.Text>

            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={withdrawal}
                  >
                    회원탈퇴
                  </Button>
                </Col>
              </Row>
            </Col>
          </Card.Body>
        </Card>
      </div>
      <div className="EditProfile">
        <h4>프로필 카드 설정</h4>
        <UserEditForm user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default ProfilePage;
