import React from "react";
import {
  CCard,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCol,
  CRow,
  CCardHeader,
} from "@coreui/react";

import ProjectContent from "./projectDetail/ProjectContent";
import ProjectTask from "./projectDetail/ProjectTask";
import ProjectInsite from "./projectDetail/ProjectInsite";

function ShowProject() {
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>프로젝트</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>프로젝트 개요</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>업무</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>인사이트</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ProjectContent />
                </CTabPane>
                <CTabPane>
                  <ProjectTask />
                </CTabPane>
                <CTabPane>
                  <ProjectInsite />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
}

export default ShowProject;
