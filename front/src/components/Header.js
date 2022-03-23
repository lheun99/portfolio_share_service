import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;
  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px 10px",
        position: isLogin ? "fixed" : null,
        zIndex: 99999,
        width: "-webkit-fill-available",
      }}
    >
      <Nav
        activeKey={location.pathname}
        style={{
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Nav.Item /*className="me-auto mb-5"*/>
          <Nav.Link disabled className="fadein">
            <img alt="" src="img/communication.png" width="30" height="30" />
            {isLogin ? (
              <> 환영합니다, {userState.user.name}님!</>
            ) : (
              <> 안녕하세요, 포트폴리오 공유 서비스입니다.</>
            )}
          </Nav.Link>
        </Nav.Item>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Poppins",
          }}
        >
          <Nav.Item>
            <Nav.Link
              className="item"
              style={{ color: "#79889e" }}
              onClick={() => navigate("/")}
            >
              <span
                className="material-icons"
                style={{ verticalAlign: "middle" }}
              >
                contact_page
              </span>{" "}
              My page
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="item"
              style={{ color: "#79889e" }}
              onClick={() => navigate("/network")}
            >
              <span
                className="material-icons"
                style={{ verticalAlign: "middle" }}
              >
                explore
              </span>{" "}
              Mate
            </Nav.Link>
          </Nav.Item>
          {isLogin && (
            <>
              <Nav.Item>
                <Nav.Link onClick={() => navigate("/projects")}>
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="item"
                  style={{ color: "#79889e" }}
                  onClick={() =>
                    navigate(`/users/${userState.user.id}/profilePage`)
                  }
                >
                  <span
                    className="material-icons"
                    style={{ verticalAlign: "middle" }}
                  >
                    manage_accounts
                  </span>{" "}
                  My profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="item"
                  style={{ color: "#FE4F70" }}
                  onClick={logout}
                >
                  {
                    <span
                      className="material-icons"
                      style={{ verticalAlign: "middle" }}
                    >
                      logout
                    </span>
                  }{" "}
                  Logout
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </div>
      </Nav>
    </div>
  );
}

export default Header;
