import './App.css'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddandUpdate from './components/AddandUpdate';
import useDisclose from './hooks/useDisclose';
import { ToastContainer } from 'react-toastify';
import NotfoundContact from './components/NotfoundContact';

function App() {
  
  const [contacts, setContacts] = useState([]);
 
  const {open,onOpen,onClose} = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try{
      const contactsRef = collection(db, "contact");
      // const contactsSnapshot = await getDocs(contactsRef);  
       onSnapshot(contactsRef,(snapshot) => {
        const contactsList = snapshot.docs.map((doc) => {
          return{
            id: doc.id,
            ...doc.data()
          }}
          // doc.data()
        )
        setContacts(contactsList);
      })

    }
    catch (error){
      console.log(error)
    }
  }
    getContacts()
  },[])

  return (
    <>
   
    <div className="mx-auto max-w-[390px] px-4">

      <Navbar onOpen={onOpen} setContacts={setContacts}></Navbar>
       {contacts.length <= 0 ? <NotfoundContact />  : contacts.map((contact) => (
      <ContactCard  key={contact.id} contact={contact}/>
    ))}
    {/* {contacts.length === 0 && <Loading />} */}
    </div>
    <AddandUpdate open={open} onClose={onClose}/>
    <ToastContainer position="bottom-center" />
    </>
  )
}

export default App;
