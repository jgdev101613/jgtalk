import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUserLoading } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="p-4 transition-colors rounded-lg cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="rounded-full size-12">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="font-medium text-slate-200">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
