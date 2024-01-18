/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditChapter = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chapterContent, setChapterContent] = useState("");
  const [title, settitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getSiswaById = async () => {
    const response = await axios.get(`http://localhost:5000/chapter/${id}`);
    settitle(response.data.title);
  };

  const updateChapter = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    try {
      await axios.patch(`http://localhost:5000/chapter/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/story/add");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSiswaById();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleChapterContentChange = (content) => {
    setChapterContent(content);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-four-fifths">
        <h2 className="title">Edit Chapter</h2>
        <form onSubmit={updateChapter}>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    placeholder="Title"
                  ></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Story Chapter</label>
                <div className="control">
                  <ReactQuill
                    value={chapterContent}
                    onChange={handleChapterContentChange}
                    placeholder="Write your chapter content..."
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4 has-background-black" />
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success" type="submit">
                Update
              </button>
            </div>
            <div>
            <Link onClick={showModal} className="button is-danger">
                Cancel
              </Link>
              {isModalVisible && (
                <div className="modal is-active">
                  <div className="modal-background" onClick={hideModal}></div>
                  <div className="modal-card">
                    <section className="modal-card-body">
                      <h1>
                        Are you sure you want to cancel adding the story without
                        saving the data?
                      </h1>
                    </section>
                    <footer className="modal-card-foot">
                      <Link to="/story/add" className="button is-primary">
                        Yes
                      </Link>
                      <button className="button" onClick={hideModal}>
                        No
                      </button>
                    </footer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChapter;
