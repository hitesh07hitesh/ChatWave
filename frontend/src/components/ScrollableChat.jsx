import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div className={`  flex aling-end ${m.sender._id === user._id ? "justify-end" : "justify-start"}`} key={m._id}>
                        {/* {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <div className="mt-7px mr-1 ">
                                    <img
                                        className=" w-6 h-6 cursor-pointer rounded-full"
                                        src={m.sender.pic}
                                        alt={m.sender.name}
                                    />
                                </div>
                            )} */}
                        <span
                            className={`max-w-48 flex text-white backdrop-blur-2xl border-b-[1px] ${m.sender._id === user._id ?
                                "bg-[#fcfcfc53]  rounded-tl-[15px] rounded-tr-[15px] rounded-br-0 rounded-bl-[15px]" :
                                "abg-green-200 bg-[#fcfcfc53]  rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px] rounded-bl-0"} ml-${isSameSenderMargin(messages, m, i, user._id) ? 10 : 50} mt-${isSameUser(messages, m, i, user._id) ? 3 : 60} arounded-lg px-4 py-1  max-w-[75%] `}

                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
