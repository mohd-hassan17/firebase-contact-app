
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclose from "../hooks/useDisclose";
import AddandUpdate from "./AddandUpdate";
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {

  const {open,onOpen,onClose} = useDisclose();

  const deleteContact = async (id) => {   
    try{
      await deleteDoc(doc(db, "contact", id ));
      toast.success("Contact deletd");
    }
    catch (error) {
      console.log(error)
    }
  }

    return(
        <>
        
         <div className='mt-6'>
          <div>
            <div
            className="flex items-center justify-between rounded-lg bg-yellow p-3"
          >
            <div className="flex gap-2">
              <HiOutlineUserCircle className="text-4xl text-orange" />
              <div className="">
                <h2 className="font-medium">{contact.name}</h2>
                <p className="text-sm">{contact.email}</p>
              </div>
            </div>
            <div className="flex text-3xl gap-2">
              <RiEditCircleLine  onClick={onOpen}
              className="cursor-pointer" />
              <IoMdTrash onClick={() => deleteContact(contact.id)} className="cursor-pointer text-orange"
              />
            </div>
          </div>
          
          </div>
        </div>
        <AddandUpdate 
        isEdit
        contact={contact}
         open={open} 
         onClose={onClose} />
        </>
    )
}

export default ContactCard;