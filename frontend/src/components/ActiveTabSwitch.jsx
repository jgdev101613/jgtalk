import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="p-2 m-2 bg-transparent tabs tabs-boxed ">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-purple-500/20 text-purple-400"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-purple-500/20 text-purple-400"
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
