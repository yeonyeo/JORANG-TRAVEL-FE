import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiaryAllByPostId, getPostById ,getExpenseDetailById} from "../config/postApi";

const DetailPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getPostByIdApi = async () => {
    try {
      console.log("-------" + id);
      const response = await getPostById(id);
      console.log(response);
      setPost(response);
    } catch {
      console.log("error in getPostByIdApi");
    }
  };

  const getAllByPostIdApi = async () => {
    try {
      console.log("-------" + id);
      const response = await getDiaryAllByPostId(id);
      console.log(response);
      setDiaries(response);
      setLoading(false);
    } catch {
      console.log("error in getAllByPostIdApi");
    }
  };
// const getExpenseDetailByIdApi = async () =>
//   useEffect(() => {
//     getPostByIdApi();
//     getAllByPostIdApi();
//   }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div>
          <div className="post-signature-color-oval">{post.title}</div>
          <p style={{ color: "#606060", fontSize: "15px" }}>
            생성일 : {formatDate(post.createdAt)}
          </p>
          <p style={{ color: "#606060", fontSize: "15px" }}>
            나라 : {diaries[0].country}
          </p>
          <div
            className="post-signature-color-oval"
            style={{ width: "80px", height: "30px" }}
          >
            여행기
          </div>
          <div>
            {diaries.map((diary, index) =>
              diary.scope === "PUBLIC" ? (
                <div
                  className="signature-oval"
                  style={{ width: "700px", height: "200px" }}
                  key={index}
                >
                  <div className="sign-up">
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {diary.date}
                    </p>
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {diary.title}
                    </p>
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {diary.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            )}
          </div>
          <div
            className="post-signature-color-oval"
            style={{ width: "80px", height: "30px" }}
          >
            경비
          </div>
          <button className="signature-oval">
            <p style={{ color: "#606060", fontSize: "15px" }}>{post.love}개</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailPost;
