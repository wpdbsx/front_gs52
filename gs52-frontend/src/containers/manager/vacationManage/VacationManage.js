import React, { useEffect, useRef, useState } from "react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import { useDispatch, useSelector } from "react-redux";
import { vacationAxios } from "src/modules/manager/vacation";
import AttendManage from "../../../components/manager/vacationManage/attendManage";
import BusinessManage from "../../../components/manager/vacationManage/businessManage";
import CompleteManage from "../../../components/manager/vacationManage/completeManage";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const VacationManage = () => {
  const vacation_EMP_INDEX = useRef(5);
  const dispatch = useDispatch();
  const { vacation } = useSelector((state) => {
    return {
      vacation: state.vacation.vacation,
    };
  });

  useEffect(() => {
    dispatch(vacationAxios());
  }, [dispatch]);

  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>연차 / 출장 관리</h4>
      </div>
      <CRow style={{ marginTop: "50px" }}>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            {/*<CCardHeader>연차/출장관리</CCardHeader>*/}
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>연차</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>출장</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>완료</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <AttendManage
                      content={vacation}
                      userid={vacation_EMP_INDEX.current}
                    ></AttendManage>
                  </CTabPane>
                  <CTabPane>
                    <BusinessManage
                      content={vacation}
                      userid={vacation_EMP_INDEX.current}
                    ></BusinessManage>
                  </CTabPane>
                  <CTabPane>
                    <CompleteManage
                      content={vacation}
                      userid={vacation_EMP_INDEX.current}
                    ></CompleteManage>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default VacationManage;
