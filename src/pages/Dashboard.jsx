import React from "react";
import Header from "../components/Dashboard/Header";
import Categories from "../components/Dashboard/categories/Categories.jsx";
import Addtasks from "../components/Dashboard/tasks/Addtasks.jsx";
import Tasks from "../components/Dashboard/tasks/tasks.jsx";

const Dashboard = () => {
   return (
    <>
      <Header />
      <main className="flex flex-col py-4 px-1 lg:flex-row">
        <Categories />

        <div className="flex flex-col  w-full p-3">
          <Addtasks />
          <Tasks></Tasks>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
