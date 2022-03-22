import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import SearchForm from "./searchProject/SearchForm";

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
    <div style={{ padding: "25px 10px" }}>
      <Nav
        activeKey={location.pathname}
        style={{
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Nav.Item /*className="me-auto mb-5"*/>
          <Nav.Link disabled>
            안녕하세요, 포트폴리오 공유 서비스입니다.
          </Nav.Link>
        </Nav.Item>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {isLogin && <SearchForm />}
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/")}>My page</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/network")}>Mate</Nav.Link>
          </Nav.Item>
          {isLogin && (
            <>
              <Nav.Item>
                <Nav.Link>My profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav.Item>
            </>
          )}
        </div>
      </Nav>
    </div>
  );
}

export default Header;
