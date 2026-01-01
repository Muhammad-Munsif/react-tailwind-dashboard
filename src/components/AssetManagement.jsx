import React from "react";
import data from "../mockData/data";
const AssetManagement = () => {
  return (
    <div className="bg-white mt-10 p-5 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Assets Management</h1>
      <div className="">
        <select name="" id="" className="">
          {data.dashboard.categoryChart.map((category, value) => (
            <div>
              <option>
                {category.category} {category.count}
              </option>
            </div>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AssetManagement;
