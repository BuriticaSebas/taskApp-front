import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdLabel } from "react-icons/md";
import AddModalCategory from "./AddCategoryMod";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import UpdateModalCategory from "./UpdateCategory";
import DeleteModalCategory from "./DeleteCategory";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/Actions/gettersInfoA";


const Categories = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.getter);

  const { status } = useSelector((state) => state.CrudCategories);

  const infoCategories = categories.info;

  useEffect(() => {
    dispatch(getCategories());
  }, [status]);

  const [openAddCategory, setopenAddCategory] = useState(false);

  const trueModalAdd = () => {
    setopenAddCategory(true);
  };
  const falseModalAdd = () => {
    setopenAddCategory(false);
  };

  const [idCategoryManipulate, setidCategoryManipulate] = useState("nada");

  const [openUpdateCategory, setopenUpdateCategory] = useState(false);
  const trueModalUpdate = (id) => {
    setidCategoryManipulate(id);
    setopenUpdateCategory(true);
  };
  const falseModalUpdate = () => {
    setopenUpdateCategory(false);
  };

  const [openDeleteCategory, setopenDeleteCategory] = useState(false);

  const trueModalDelete = (id) => {
    setidCategoryManipulate(id);
    setopenDeleteCategory(true);
  };

  const falseModalDelete = () => {
    setopenDeleteCategory(false);
  };

  const cantidadTasksinCategory = "(1)";

  return (
    <>
      <div className="bg-white p-2 rounded-xl flex flex-col gap-4 md:w-2/3 lg:w-1/4 m-auto lg:mt-3">
        <div className="flex justify-between">
          <span className="font-bold  text-2xl p-2">Categories</span>
          <button className="mr-2" onClick={trueModalAdd}>
            <IoIosAdd className="text-4xl hover:text-gray-500" />
          </button>
        </div>

        <div>
          <ul className=" flex flex-col gap-3">
            <div>
              <ul className="flex flex-col gap-3">
                {infoCategories.length === 0 ? (
                  <div className="text-center">
                    <h1 className="text-gray-400">No Categories Created</h1>
                    <button className="mr-2" onClick={trueModalAdd}>
                      <IoIosAdd className="text-4xl hover:text-gray-500" />
                    </button>
                  </div>
                ) : (
                  infoCategories.map((cat) => (
                    <li key={cat._id}>
                      <div className="flex justify-between hover:bg-gray-100 p-2 rounded-xl">
                        <div className="flex gap-2 items-center text-lg">
                          <MdLabel />
                          <span>{cat.name}</span>
                        </div>

                        <div className="text-xl mr-4">
                          <button onClick={() => trueModalUpdate(cat._id)}>
                            <BiSolidEdit className="text-base hover:text-gray-500" />
                          </button>
                          <button onClick={() => trueModalDelete(cat._id)}>
                            <MdDeleteForever className="text-base hover:text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </ul>
        </div>
      </div>
      <AddModalCategory
        modal={openAddCategory}
        Close={falseModalAdd}
      ></AddModalCategory>
      <UpdateModalCategory
        modalUpdate={openUpdateCategory}
        closeUpdate={falseModalUpdate}
        idCategory={idCategoryManipulate}
      ></UpdateModalCategory>
      <DeleteModalCategory
        modalDelete={openDeleteCategory}
        closeDelete={falseModalDelete}
        idCategory={idCategoryManipulate}
      ></DeleteModalCategory>
    </>
  );
};

export default Categories;
