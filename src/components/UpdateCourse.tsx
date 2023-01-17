import useCourses from "../hooks/useCourses";
import { MdDelete } from 'react-icons/md';
import { AiOutlineEdit } from "react-icons/ai";
const UpdateCourse = () => {
  const { courses } = useCourses();
  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>
                Código
              </th>
              <th>
                Nombre
              </th>
              <th>
                Editar
              </th>
              <th>
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (<tr>
              <td>{ course.code }</td>
              <td>{ course.name }</td>
              <td><AiOutlineEdit className="mb-0.5" /></td>
              <td><MdDelete className="fill-red-600" /></td>
            </tr>))}
          </tbody>
        </table>
    </div>
  )
};

export default UpdateCourse;
