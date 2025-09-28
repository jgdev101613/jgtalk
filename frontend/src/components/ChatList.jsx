import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const { getMyChatPartners, chats, isUserLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-4 transition-colors rounded-lg cursor-pointer bg-purple-500/10 hover:bg-purple-500/20"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO */}
            <div className={`avatar online`}>
              <div className="rounded-full size-12">
                <img
                  src={chat.profileImage || "/avater.png"}
                  alt={chat.fullName}
                />
              </div>
              <h4 className="font-medium truncate text-slate-200">
                {chat.fullName}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
