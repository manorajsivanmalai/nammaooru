import React, { useContext, useEffect, useState } from "react";
import "../assets/scss/adduser.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDroprightCircle,IoMdArrowDropleftCircle  } from "react-icons/io";
import { DataContext } from "../contextapi/dataContextApi";
const Membertable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {data,setData}=useContext(DataContext);


  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((item) => categories === "" || item.category === categories).length / itemsPerPage);


  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };



  const navigate = useNavigate();
  const handleLink = (item) => {
    navigate("/memberdeails", { state: { member: item } });
  };

  const paginatedData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((item) => categories === "" || item.category === categories).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(()=>{
  
  },[categories])

  return (
    <div className="member-table">
      <div className="sort-options">
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(data.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table border="1" className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("name")}>
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("amount")}>
              Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData
           
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>
                  <FaEdit onClick={() => handleLink(item)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <IoMdArrowDropleftCircle onClick={handlePreviousPage} disabled={currentPage === 1} style={{color:currentPage === 1?"#dbb1b1":"inherit"}}/>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <IoMdArrowDroprightCircle onClick={handleNextPage} disabled={currentPage === totalPages} style={{color:currentPage === totalPages?"#dbb1b1":"inherit"}}/>
      </div>
    </div>
  );
};

export default Membertable;
