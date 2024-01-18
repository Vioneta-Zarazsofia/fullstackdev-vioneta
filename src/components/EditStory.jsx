/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const EditStory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, settitle] = useState("");
  const [writes, setwrites] = useState("");
  const [synopsis, setsynopsis] = useState("");
  const [category, setcategory] = useState("");
  const [tags, settags] = useState("");
  const [status, setstatus] = useState("");
  const [file, setfile] = useState("");
  const [preview, setpreview] = useState("");
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const updateStory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("writes", writes);
    formData.append("synopsis", synopsis);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("status", status);
    formData.append("file", file);
    try {
      await axios.patch(`http://localhost:5000/story/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/story");
    } catch (error) {
      console.log(error);
    }
  };

  const getStoryById = async () => {
    const response = await axios.get(`http://localhost:5000/story/${id}`);
    settitle(response.data.title);
    setwrites(response.data.writes);
    setsynopsis(response.data.synopsis);
    setcategory(response.data.category);
    settags(response.data.tags);
    setstatus(response.data.status);
    setfile(response.data.image);
    setpreview(response.data.url);
  };

  useEffect(() => {
    getStoryById();
    getChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChapter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chapter");
      setChapters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteChapter = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/chapter/${id}`);
      getChapter();
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

  const loadImage = (e) => {
    const image = e.target.files[0];
    setfile(image);
    setpreview(URL.createObjectURL(image));
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-four-fifths">
        <h2 className="title">Add Story</h2>
        <form onSubmit={updateStory}>
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
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Writes</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={writes}
                    onChange={(e) => setwrites(e.target.value)}
                    placeholder="Writes"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Synopsis</label>
            <div className="control">
              <textarea
                className="textarea"
                value={synopsis}
                onChange={(e) => setsynopsis(e.target.value)}
                placeholder="Synopsis"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      <option>Select category...</option>
                      <option value="Financial">Financial</option>
                      <option value="Technology">Technology</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Cover Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </label>
                  </div>
                </div>
                {preview ? (
                  <figure>
                    <img
                      src={preview}
                      style={{ width: "20%" }}
                      alt="Preview Image"
                    />
                  </figure>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Tags/Keyword</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tags}
                    onChange={(e) => settags(e.target.value)}
                    placeholder="Tags/Keyword"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                    >
                      <option>Select Status...</option>
                      <option value="Publish">Publish</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4 has-background-black" />
          <div className="field">
            <div className="control">
              <Link
                to="/story/add/chapter"
                className="button is-primary mb-2 mr-2"
              >
                Add Chapter
              </Link>
            </div>
          </div>
          <table className="table is-striped is-fullwidth mt-5 has-text-centered">
            <thead>
              <tr>
                <th className="has-text-centered">Title</th>
                <th className="has-text-centered">Last Updated</th>
                <th className="has-text-centered">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    Tidak terdapat data Platform yang tersimpan
                  </td>
                </tr>
              ) : (
                chapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td>{chapter.title}</td>
                    <td>{moment(chapter.updatedAt).format("DD MMMM YYYY")}</td>
                    <td>
                      <Link
                        to={`chapter/${chapter.id}`}
                        className="button is-small is-info mr-2"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={() => deleteChapter(chapter.id)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success">Update</button>
            </div>
            <div>
              <Link onClick={showModal} className="button is-danger mb-2 mr-2">
                Cancel
              </Link>
              {isModalVisible && (
                <div className="modal is-active">
                  <div className="modal-background" onClick={hideModal}></div>
                  <div className="modal-card">
                    <section className="modal-card-body">
                      <h1>
                        Apakah kamu yakin ingin membatalkan pembuatan cerita?
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

export default EditStory;
