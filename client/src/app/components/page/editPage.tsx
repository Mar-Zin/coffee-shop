import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserPage from "./editUserPage/editUserPage";
import { getCurrentUserId } from "../../store/users";

const EditPage = () => {
  const params = useParams();
  const { id } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      {id === currentUserId ? (
        <EditUserPage />
      ) : (
        <Navigate to={`/edit/${currentUserId}`} />
      )}
    </>
  );
};

export default EditPage;
