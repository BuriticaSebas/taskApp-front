import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { CiCalendar } from "react-icons/ci";
import { MdLabel } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import UpdateTask from "./UpdateTask";
import DeleteModalTask from "./Delete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTasks } from "../../../redux/Actions/gettersInfoA";
import { updateTaskA } from "../../../redux/Actions/CrudTasks";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.getter);
  const status = useSelector((state) => state.updatetask);
  const infoTasks = tasks.info;

  useEffect(() => {
    dispatch(getTasks());
  }, [status]);


  const totalTasks = infoTasks.length;
  const totalTasksPending = () => {
    return infoTasks.filter((task) => task.completed === false);
  };

  const totalTasksCompleted = () => {
    return infoTasks.filter((task) => task.completed === true);
  };

  const infoCompleted = totalTasksCompleted();

  const infoPending = totalTasksPending();

  const tabs = [
    `All (${totalTasks})`,
    `Pending (${infoPending.length})`,
    `Completed (${infoCompleted.length})`,
  ];

  const [updateTaskModal, setUpdateTaskModal] = useState(false);

  const trueModalUpdate = (id) => {
    setidTaskManipulate(id);
    setUpdateTaskModal(true);
  };

  const falseModalUpdate = () => {
    setUpdateTaskModal(false);
  };

  const [DeleteTaskModal, setDeleteTaskModal] = useState(false);

  const [idTaskManipulate, setidTaskManipulate] = useState("nada");

  const trueModalDelete = (id) => {
    setidTaskManipulate(id);
    setDeleteTaskModal(true);
  };

  const falseModalDelete = () => {
    setDeleteTaskModal(false);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Tasks</h1>

        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `w-full py-2 text-sm font-semibold rounded-lg
                 ${selected ? "bg-white text-black shadow" : "text-gray-500"}`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            <Tab.Panel className="flex flex-col gap-3">
              {infoTasks.length === 0 ? 

              <div className="text-center text-2xl p-5 font-bold text-gray-300" >
                <h1>No Tasks created</h1>
              </div>
              :infoTasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex justify-between items-center  ${
                    task.completed ? "bg-gray-100" : "bg-white"
                  } border-1 border-gray-500/20 p-4 rounded-lg hover:bg-gray-200`}
                >
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        dispatch(
                          updateTaskA({
                            id: task._id,
                            data: { completed: !task.completed },
                          })
                        )
                      }
                    />
                    <span
                      className={
                        task.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-xs opacity-50">
                      <CiCalendar />
                      <span>
                        {new Date(task.dueDate).toISOString().split("T")[0]}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[9px]">
                      <span
                        className={`px-1 rounded-full text-amber-800 font-bold ${
                          task.priority === "high"
                            ? "bg-red-200 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-200 text-yellow-600"
                            : task.priority === "low"
                            ? "bg-green-200 text-green-600"
                            : ""
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="px-1 flex items-center rounded-full gap-1 bg-gray-200 text-gray-600 font-bold">
                        <MdLabel /> {task.categoryId.name}
                      </span>
                      <button onClick={() => trueModalUpdate(task._id)}>
                        <BiSolidEdit className="text-base hover:text-gray-500" />
                      </button>
                      <button onClick={() => trueModalDelete(task._id)}>
                        <MdDeleteForever className="text-base hover:text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel className="flex flex-col gap-3">
              { infoPending.length === 0 ?  <div className="text-center text-2xl p-5 font-bold text-gray-300" >
                <h1>There are no pending tasks</h1>
              </div>:infoPending.map((task) => (
                <div
                  key={task._id}
                  className={`flex justify-between items-center  ${
                    task.completed ? "bg-gray-100" : "bg-white"
                  } border-1 border-gray-500/20 p-4 rounded-lg hover:bg-gray-200`}
                >
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        dispatch(
                          updateTaskA({
                            id: task._id,
                            data: { completed: !task.completed },
                          })
                        )
                      }
                    />
                    <span
                      className={
                        task.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-xs opacity-50">
                      <CiCalendar />
                      <span>
                        {new Date(task.dueDate).toISOString().split("T")[0]}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[9px]">
                      <span
                        className={`px-1 rounded-full text-amber-800 font-bold ${
                          task.priority === "high"
                            ? "bg-red-200 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-200 text-yellow-600"
                            : task.priority === "low"
                            ? "bg-green-200 text-green-600"
                            : ""
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="px-1 flex items-center rounded-full gap-1 bg-gray-200 text-gray-600 font-bold">
                        <MdLabel /> {task.categoryId.name}
                      </span>
                      <button onClick={() => trueModalUpdate(task._id)}>
                        <BiSolidEdit className="text-base hover:text-gray-500" />
                      </button>
                      <button onClick={() => trueModalDelete(task._id)}>
                        <MdDeleteForever className="text-base hover:text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel className="flex flex-col gap-3">
              {infoCompleted.length === 0 ?  <div className="text-center text-2xl p-5 font-bold text-gray-300" >
                <h1>There are no completed tasks</h1>
              </div>:infoCompleted.map((task) => (
                <div
                  key={task._id}
                  className={`flex justify-between items-center  ${
                    task.completed ? "bg-gray-100" : "bg-white"
                  } border-1 border-gray-500/20 p-4 rounded-lg hover:bg-gray-200`}
                >
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        dispatch(
                          updateTaskA({
                            id: task._id,
                            data: { completed: !task.completed },
                          })
                        )
                      }
                    />
                    <span
                      className={
                        task.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-xs opacity-50">
                      <CiCalendar />
                      <span>
                        {new Date(task.dueDate).toISOString().split("T")[0]}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[9px]">
                      <span
                        className={`px-1 rounded-full text-amber-800 font-bold ${
                          task.priority === "high"
                            ? "bg-red-200 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-200 text-yellow-600"
                            : task.priority === "low"
                            ? "bg-green-200 text-green-600"
                            : ""
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="px-1 flex items-center rounded-full gap-1 bg-gray-200 text-gray-600 font-bold">
                        <MdLabel /> {task.categoryId.name}
                      </span>
                      <button onClick={() => trueModalUpdate(task._id)}>
                        <BiSolidEdit className="text-base hover:text-gray-500" />
                      </button>
                      <button onClick={() => trueModalDelete(task._id)}>
                        <MdDeleteForever className="text-base hover:text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <UpdateTask
        modalUpdate={updateTaskModal}
        CloseUpdate={falseModalUpdate}
        idTask={idTaskManipulate}
      ></UpdateTask>
      <DeleteModalTask
        modalDelete={DeleteTaskModal}
        closeDelete={falseModalDelete}
        idTask={idTaskManipulate}
      ></DeleteModalTask>
    </>
  );
};

export default Tasks;
