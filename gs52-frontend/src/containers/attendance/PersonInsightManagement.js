import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const PersonInsight = (props) => {
  const EMP_INDEX = getCurrentUser();

  return (
    <div class="container">
      <div class="row">
        <div class="col w-100 mt-3">
          <PersonInsightList EMP_INDEX={EMP_INDEX.index}></PersonInsightList>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonInsight);
