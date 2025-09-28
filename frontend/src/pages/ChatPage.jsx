import { useAuthStore } from "../store/useAuthStore";
import BorderAnimation from "../components/BorderAnimation";
import { useChatStore } from "../store/useChatStore";
// Import Components
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimation>
        {/* LEFT SIDE */}
        <div className="flex flex-col w-80 bg-slate-800/50 backdrop-blur-sm">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimation>
    </div>
  );
};

export default ChatPage;
