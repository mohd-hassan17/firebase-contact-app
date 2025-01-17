
import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddandUpdate = ({open, onClose, isEdit,contact}) => {

  const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
  });

    const addContact = async(contact) => {
        try{
        const contactRef = collection(db, "contact")
        await addDoc(contactRef, contact)
        toast.success("Contact added sucessfully");
        onClose();
        }
        catch (error){
            console.log(error)
        }
    }
    const editContact = async(contact, id) => {
      try{
      const contactRef = doc(db, "contact", id)
      await updateDoc(contactRef, contact)
      toast.success("Contact updated sucessfully")
      onClose();
      }
      catch (error){
          console.log(error)
      }
  }

    return(
        <>
         <Modal open={open} onClose={onClose}>
         <Formik 
           validationSchema={contactSchemaValidation}
         initialValues={
          isEdit
          ?{
          name: contact.name,
            email:contact.email
         }
          :{
            name:"",
            email:""
         }}
         onSubmit={(values) => {
            console.log(values)
            isEdit ?
            editContact(values, contact.id) 
            : addContact(values)
         }}
         >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 font-medium">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1 font-medium">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="self-end border bg-orange px-3 py-1.5">
             {isEdit ? "Edit" : "Add"} contact
            </button>
          </Form>
        </Formik>
    </Modal>
        </>
    )
}

export default AddandUpdate;