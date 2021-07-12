import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup,
  CCol,
  CLabel,
  CCardFooter,
  CButton,
  CSelect,
  CInputFile,
  CAlert,
} from "@coreui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
  TeamAxios,
  RankAxios,
  PositionAxios,
} from "src/modules/manager/Account";

import {
  RegistAccount,
  mail,
  updateEmpImg,
} from "../../../lib/api/manager/Account/AccountRegistAPI";

export function AccountField() {
  const [filecheck, setFilecheck] = useState(false);
  const [filename, setFileName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TeamAxios());
    dispatch(RankAxios());
    dispatch(PositionAxios());
  }, [dispatch]);

  const { team_list, rank_list, position_list } = useSelector((state) => {
    return {
      team_list: state.account.team_list,
      rank_list: state.account.rank_list,
      position_list: state.account.position_list,
    };
  });

  const [date, setDate] = useState(null);
  const [inputs, setInputs] = useState({
    name: null,
    team: 1,
    rank: 1,
    position: 1,
    num: null,
    email: null,
    file: [],
  });

  const { name, team, rank, position, num, email, file } = inputs;

  const onChange = (e) => {
    //input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target;

    // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
  };

  const onRegist = () => {
    //{InsertAccount(dept, rank, position, num, date)}
    //    username, email, password, position, rank, team

    if (num == null) {
      alert("사원번호를 입력하세요");
    } else if (name == null) {
      alert("이름을 입력하세요");
    } else if (date == null) {
      alert("입사일을 입력하세요");
    } else if (email == null) {
      alert("이메일을 입력하세요");
    } else {
      const id = num;
      console.log(id); //사원번호
      console.log(name); //sunmin
      console.log(num); //사원번호
      RegistAccount(id, name, email, num, position, rank, team, 1).then(
        (response) => {
          mail(email, name, id).then(console.log("메일전송완료"));
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(inputs);
    }
  };
  const imgUpload = () => {
    console.log(file);
    const formData = new FormData();
    formData.append("EMP_ID", Number(num));
    formData.append("FILES", file[0]);
    updateEmpImg(formData);
  };
  function onDate(dateString) {
    setDate(moment(dateString).format("YYYY/MM/DD"));
  }
  console.log(filename);
  return (
    <div>
      <CCard>
        <CCardHeader>계정 등록</CCardHeader>
        <CCardBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="num">사원번호</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="num"
                name="num"
                placeholder="사원 번호 6자리 이상 숫자 (초기 비밀번호로 설정됩니다.)"
                onChange={onChange}
                value={num || ""}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="name">이름</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="name"
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name || ""}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="team">부서</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect
                onChange={onChange}
                id="team"
                name="team"
                defaultValue={team_list[0]}
              >
                {team_list.map((team, idx) => {
                  return (
                    <option
                      key={idx}
                      value={team.team_INDEX}
                      defaultValue={team.team_INDEX}
                    >
                      {team.team_NAME}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="rank">직급</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect onChange={onChange} id="rank" name="rank">
                {rank_list.map((rank, idx) => {
                  return (
                    <option
                      key={idx}
                      value={rank.rank_INDEX}
                      defaultValue={rank.rank_INDEX}
                    >
                      {rank.rank_NAME}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="position" id="position" name="position">
                직책
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect onChange={onChange} id="position" name="position">
                {position_list.map((position, idx) => {
                  return (
                    <option
                      key={idx}
                      value={position.position_INDEX}
                      defaultValue={position.position_INDEX}
                    >
                      {position.position_NAME}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="date">입사일</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <DatePicker id="date" name="date" onChange={onDate} />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="email">이메일</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="email"
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email || ""}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel>파일첨부</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputFile
                id="file-multiple-input"
                name="file-multiple-input"
                custom
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log(e.target.files[0].type);
                  if (e.target.files.size > 102400000) {
                    setFilecheck(true);
                    return;
                  }

                  setInputs((inputs) => ({
                    ...inputs,
                    file: e.target.files,
                  }));
                  setFileName(e.target.files[0].name);
                }}
              ></CInputFile>
              {filecheck && (
                <CAlert
                  color="danger"
                  closeButton
                  onClick={() => {
                    setFilecheck(false);
                  }}
                >
                  1024KB를 초과하였습니다.
                </CAlert>
              )}
              {file.length === 0 && (
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  File Upload..
                </CLabel>
              )}
              {file.length !== 0 && (
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  {filename}
                </CLabel>
              )}
            </CCol>
          </CFormGroup>
        </CCardBody>

        <CCardFooter>
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={async () => {
              await onRegist();
            }}
          >
            Submit
          </CButton>
          <CButton type="reset" size="sm" color="danger">
            {" "}
            Reset
          </CButton>

          <CButton
            type="reset"
            size="sm"
            color="danger"
            onClick={async () => {
              await imgUpload();
            }}
          >
            {" "}
            연습
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
}

export default AccountField;
