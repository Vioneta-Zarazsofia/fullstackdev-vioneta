import React from "react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa"; // Ganti dengan ikon story yang sesuai

const SideBar = () => {
  const customColor = "#6558F5"; // Kode warna #6558F5

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <ul className="menu-list">
          <li>
            <NavLink
              to={"/"}
              style={{
                color: customColor,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IoHome style={{ color: customColor }} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/story"}
              style={{
                color: customColor,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaFileDownload style={{ color: customColor }} />
              <span>Management Story</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
