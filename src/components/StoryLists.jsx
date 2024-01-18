import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import filter from "../assets/filter.ico";

const StoryLists = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Select category...");
  const [selectedStatus, setSelectedStatus] = useState("Select status...");

  const getStory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/story");
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/story/${id}`);
      getStory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleFilter = () => {
    // Sesuaikan fungsi filter berdasarkan nilai Category dan Status
    const filteredStories = stories.filter((story) => {
      const isTitleMatch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.writes.toLowerCase().includes(searchTerm.toLowerCase());

      const isCategoryMatch =
        selectedCategory === "Select category..." ||
        story.category === selectedCategory;

      const isStatusMatch =
        selectedStatus === "Select status..." ||
        story.status === selectedStatus;

      return isTitleMatch && isCategoryMatch && isStatusMatch;
    });

    const sortedStories = filteredStories.sort((a, b) => {
      // Sesuaikan dengan properti timestamp atau properti lainnya
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedStories;
  };

  const filteredStories = handleFilter();

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <div className="field is-grouped">
            <div className="control">
              <h1 className="title is-marginless mb-3">List Story</h1>
            </div>
            <div className="control is-expanded">
              <input
                type="text"
                className="input"
                placeholder="Search by writer's name/title story"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-rounded" onClick={showModal}>
                <img src={filter} width="25" alt="Filter" />
              </button>
            </div>
            <div className="control">
              <Link
                to="/story/add"
                className="button is-primary is-outlined mb-2 mr-2"
                style={{ backgroundColor: "#6558F5", color: "white" }}
              >
                Add New
              </Link>
            </div>
          </div>

          {isModalVisible && (
            <div className="modal is-active">
              <div className="modal-background" onClick={hideModal}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Filter</p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={hideModal}
                  ></button>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Category:</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option>Select category...</option>
                          <option>Financial</option>
                          <option>Technology</option>
                          <option>Health</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Status:</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option>Select status...</option>
                          <option>Publish</option>
                          <option>Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button mr-5"
                    onClick={() => {
                      setSelectedCategory("Select category...");
                      setSelectedStatus("Select status...");
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="button is-pulled-right"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="button is-pulled-right"
                    onClick={hideModal}
                    style={{ backgroundColor: "#6558F5", color: "white" }}
                  >
                    Filter
                  </button>
                </footer>
              </div>
            </div>
          )}
          <form
            className="mb-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          ></form>

          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Title</th>
                <th>Writes</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStories.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    Tidak terdapat data Platform yang tersimpan
                  </td>
                </tr>
              ) : (
                filteredStories.map((story) => (
                  <tr key={story.id}>
                    <td>{story.title}</td>
                    <td>{story.writes}</td>
                    <td>{story.category}</td>
                    <td>
                      {story.tags && story.tags.length > 0 ? (
                        JSON.parse(story.tags).map((tag, index) => (
                          <span key={index} className="tag is-info mr-1">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span>No Tags</span>
                      )}
                    </td>
                    <td>
                      <span className="tag is-success">{story.status}</span>
                    </td>
                    <td>
                      <Link
                        to={`/story/${story.id}`}
                        className="button is-small is-success mr-2"
                      >
                        Show
                      </Link>
                      <Link
                        to={`/story/edit/${story.id}`}
                        className="button is-small is-info mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteStory(story.id)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoryLists;
