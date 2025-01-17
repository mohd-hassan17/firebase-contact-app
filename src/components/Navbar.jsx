
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import {collection, onSnapshot} from "firebase/firestore";
import { db } from "../config/firebase"; 

const Navbar = ({onOpen, setContacts}) => {

  const filteredContact = (e) => {
    const value = e.target.value;
     const contactsRef = collection(db, "contact");
     onSnapshot(contactsRef,(snapshot) => {
            const contactsList = snapshot.docs.map((doc) => {
              return{
                id: doc.id,
                ...doc.data()
              }})
            const filteredContacts = contactsList.filter((contact) => 
            contact.name.toLowerCase().includes(value.toLowerCase())
            );
            setContacts(filteredContacts);
            return filteredContacts;
          })
  }

    return(
      <>
        <div className="my-4  flex h-[60px] items-center justify-center gap-3 rounded-lg bg-white text-xl font-medium">
      <img src="/logos_firebase.png" />
      <h1>Firebase Contact App</h1>
    </div>

{/* Input Section */}

<div className="flex gap-2 mt-6 ">
<div className="relative flex flex-grow items-center ">
  <FiSearch className="absolute ml-2 text-3xl text-white" />
  <input
   onChange={filteredContact}
    type="text"
    className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-11 text-white"
  />
</div>

<AiFillPlusCircle
  className="cursor-pointer text-5xl text-white "
  onClick={onOpen}
/>
</div>
</>
    )
}

export default Navbar;