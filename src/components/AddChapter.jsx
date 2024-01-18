import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddChapter = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chapterContent, setChapterContent] = useState("");
  const [title, settitle] = useState("");
  const navigate = useNavigate();

  const saveChapter = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    try {
      await axios.post("http://localhost:5000/chapter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/story/add");
    } catch (error) {
      console.log(error);
    }
  };

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
        <h2 className="title">Add Chapter</h2>
        <form onSubmit={saveChapter}>
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
              <button
                className="button is-success"
                style={{ backgroundColor: "#6558F5" }}
              >
                Save
              </button>
            </div>
            <div>
              <Link
                onClick={showModal}
                className="button is-danger"
                style={{
                  color: "#6558F5",
                  backgroundColor: "white",
                  border: "1px solid #6558F5",
                }}
              >
                Cancel
              </Link>

              {isModalVisible && (
                <div className="modal is-active">
                  <div className="modal-background" onClick={hideModal}></div>
                  <div className="modal-card">
                    <section className="modal-card-body">
                      <h1>
                        Apakah anda yakin ingin membatalkan menambahkan chapter?
                      </h1>
                    </section>
                    <footer className="modal-card-foot">
                      <Link
                        to="/story"
                        className="button is-primary"
                        style={{ backgroundColor: "#6558F5" }}
                      >
                        Yes
                      </Link>

                      <button
                        className="button"
                        onClick={hideModal}
                        style={{
                          color: "#6558F5",
                          backgroundColor: "white",
                          border: "1px solid #6558F5",
                        }}
                      >
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

export default AddChapter;
