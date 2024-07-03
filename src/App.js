import "react-bootstrap";
import "bootstrap"
import { useState } from 'react';
import './App.css';

function App() {

  const [student, setStudent] = useState({ fname: "", age: "", email: "", password: "" });

  const [data, setData] = useState(JSON.parse(localStorage.getItem("people")) || []);

  const [isEdit, setIsEdit] = useState(-1);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  console.log(student);

  const handleSubmit = () => {
    if (isEdit !== -1) {
      const updateData = data.map((item, index) => {
        if (isEdit === index) {
          return student
        }
        return item
      })

      setData(updateData);
      localStorage.setItem("people", JSON.stringify(updateData));
    }
    else {
      setData([...data, student])
      localStorage.setItem("people", JSON.stringify([...data, student]))
    };

  }

  const handelDelete = (idx) => {
    const deleteData = data.filter((item, index) => { return index !== idx });
    setData(deleteData);
    localStorage.setItem("people", JSON.stringify(deleteData));
  }

  const handleEdit = (idx) => {
    setIsEdit(idx);
    const updateData = data.find((item, index) => { return index === idx });
    setStudent(updateData);
    localStorage.setItem("people", JSON.stringify(updateData));
  }

  return (
    <>
      <div className='bg'>

        <div className='container ml'>

          <div className='row d-flex flex-column align-items-end' style={{ gap: "30px" }}>

            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column'>
              <label htmlFor='fname' >Full Name:-</label>
              <input type='text' name='fname' id='fname' placeholder='Enter Your Full Name' value={student.fname} onChange={(e) => handleChange(e)} />
            </div>

            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column'>
              <label htmlFor='age' >Age:-</label>
              <input type='number' name='age' id='age' placeholder='Enter Your Age' value={student.age} onChange={(e) => handleChange(e)} />
            </div>

            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column'>
              <label htmlFor='email' >E-mail:-</label>
              <input type='email' name='email' id='email' placeholder='Enter Your E-mail' value={student.email} onChange={(e) => handleChange(e)} />
            </div>

            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column'>
              <label htmlFor='password' >Password:-</label>
              <input type='password' name='password' id='password' placeholder='Enter Your Password' value={student.password} onChange={(e) => handleChange(e)} />
            </div>

          </div>

          <div className='container d-flex flex-column align-items-end mt-5'>
            <button type='submit' className='button' onClick={handleSubmit}>Submit</button>
          </div>

        </div>

      </div>

      <div className='d-flex justify-content-center'>

        <div className='mt-5'>

          <div>

            <table className='table table-striped table-hover'>

              <thead>
                <th>Full Name:-</th>
                <th>Age:-</th>
                <th>E-mail:-</th>
                <th>Password:-</th>
              </thead>

              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.fname}</td>
                      <td>{item.age}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td><button type='delete' onClick={() => handelDelete(index)}>Delete</button></td>
                      <td><button type='edit' onClick={() => handleEdit(index)}>Edit</button></td>
                    </tr>
                  )
                })}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default App;
