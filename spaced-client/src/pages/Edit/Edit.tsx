import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../redux/reducers/api";
import { useAppSelector } from "../../redux/store";
import { useOnFulfilled } from "../../shared/hooks/useOnFulfilled";
import Create from "../Create/Create";

function EditWrapper() {
  const [details, setDetails] = useState();
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { isFulfilled } = useOnFulfilled();
  useEffect(() => {
    if (location.state && location.state.deck) {
      setDetails(location.state.deck);
    } else {
      const body = {
        url: "fetchCardByID",
        method: "POST",
        data: { user: user, id: id },
        type: "CARD",
      };
      isFulfilled(
        apiRequest,
        body,
        (data: any) => {
          setDetails(data);
        },
        () => navigate("/u/home")
      );
    }
  }, []);
  return <>{details && <Create details={details}></Create>}</>;
}

export default EditWrapper;
