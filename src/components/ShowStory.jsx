/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const ShowStory = () => {
  const [title, settitle] = useState("");
  const [writes, setwrites] = useState("");
  const [synopsis, setsynopsis] = useState("");
  const [category, setcategory] = useState("");
  const [tags, settags] = useState("");
  const [status, setstatus] = useState("");
  const [file, setfile] = useState("");
  const [preview, setpreview] = useState("");
  const [chapters, setChapters] = useState([]);
  const { id } = useParams();

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
  }, []);

  const getChapter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chapter");
      setChapters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-four-fifths">
        <h2 className="title">Show Story</h2>
        <form>
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
                    readOnly
                    data-testid="title-input"
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
                    readOnly
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
                readOnly
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
                      disabled={true}
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
                    readOnly
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
                      disabled={true}
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
          <table className="table is-striped is-fullwidth mt-5 has-text-centered">
            <thead>
              <tr>
                <th className="has-text-centered">Title</th>
                <th className="has-text-centered">Last Updated</th>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="field is-grouped">
            <div>
              <Link to={"/story"} className="button is-danger mb-2 mr-2">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowStory;
