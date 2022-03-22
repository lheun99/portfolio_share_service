import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 profile 상태를 생성함.
  const [profile, setProfile] = useState({
    profileObj: "",
    preview: "",
    currentUrl: user.profile,
  });

  const setDefaultHandler = async (e) => {
    e.preventDefault();

    setProfile(current => {
      const newValue = { 
        profileObj: "",
        currentUrl: "https://kr.object.ncloudstorage.com/team3/default.png",
        preview: "",
      }
      return newValue;
    });
    
  }

  const changeHandler = (e) => {
    e.preventDefault();

    if (profile.preview) {
      URL.revokeObjectURL(profile.preview);
    }

    setProfile(current => {
      const newValue = {
        ...current,
        profileObj: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      }
      return newValue;
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedProfile = { data: profile.currentUrl };

    if (profile.preview) {
      URL.revokeObjectURL(profile.preview);
    }

    const prevImage = user.profile.includes("default") ? "" : user.profile;

    if (profile.profileObj) {
      const fd = new FormData();
      fd.append('filename', profile.profileObj);
      fd.append('prevImage', prevImage);
      try {
        updatedProfile = await Api.postImg("upload", fd);
        setProfile(current => {
          const newValue = {
            profileObj: {},
            currentUrl: updatedProfile.data,
            preview: "",
          }
          return newValue;
        });
      } catch (err) {
        console.log(err.response);
      }
    } else if (profile.currentUrl !== user.profile) {
      const toDelete = user.profile.split("/").slice(-1)[0]
      try {
        await Api.delete('deleteImg', toDelete);
      } catch(e) {
        console.log(e);
      }
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      profile: updatedProfile.data,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
      <Row className="justify-content-md-center"> 
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={profile.preview ? profile.preview : profile.currentUrl}
            alt="사용자 프로필"
          />
        </Row>
        <label htmlFor="image_upload"><i className="fa-solid fa-camera"></i></label>
        <input type="file" id="image_upload" accept="image/*" onChange={changeHandler} style={{display:"none"}}/>
        <label htmlFor="set_default"><i className="fa-solid fa-arrow-rotate-left"></i></label>
        <input type="button" id="set_default" onClick={setDefaultHandler} style={{display:"none"}}/>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
