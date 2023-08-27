import { useState } from "react";
import "./chatbot.css";
import { useRef } from "react";

const ChatBot = () => {
    const [isShowContent, setIsShowContent] = useState(false)
    const [isThinking, setIsThinking] = useState(false)
    const chatInputRef = useRef(null)
    const chatMessageRef = useRef(null)
    const [chatContents, setChatContents] = useState([
        { id: 1, content: 'Hello, You can start a conversation now!', user: 'bot'}
    ])

    const toggleShowContent = () => {
        setIsShowContent(!isShowContent)
    }

    const handleSubmit = async () => {
        const chatTxt = chatInputRef.current.value
        if(!chatTxt) {
            return;
        }
        if(isThinking) {
            return;
        }

        setChatContents([...chatContents, { id: chatContents.length + 1, content: chatTxt, user: 'me'}])
        let url = `http://localhost:5000?msg=${chatTxt}`
        setIsThinking(true)
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setChatContents(prev => {
                let ans = data.answer
                ans = ans.replace(/_/g, ' ')
                return [...prev, { id: prev.length + 1, content: ans, user: 'bot'}]
            })
            // scroll to bottom
            chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight
        })
        .catch(err => {
            console.log({err});
            // toast.error(error.message)
        }).finally(() => {
            chatInputRef.current.value = ''
            chatInputRef.current.focus()
            setIsThinking(false)
        })

        // try {
        //     setIsThinking(true)
        // } catch (error) {
        //     toast.error(error.message)
        // } finally {
        //     chatInputRef.current.value = ''
        //     chatInputRef.current.focus()
        // }
    }

    return (<div className={`chatbot ${isShowContent && 'is-active'}`}>
            <div className="chatbot__btn" onClick={toggleShowContent}>
                <span>Start chat with Chatbot</span>
                <svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xmlSpace="preserve">
                    <path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689
                        c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01
                        c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z" />
                </svg>
            </div>
            <div className="chatbot__wrapper">
                <div className="chatbot__header">
                    <div className="chatbot__header--title">Chatbot</div>
                    <div className="chatbot__header--close" onClick={toggleShowContent}>
                    <svg width="25px" height="25px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu / Close_SM">
                        <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#fff" strokeWidth="2" />
                        </g>
                        </svg>
                    </div>
                </div>
                <div className="chatbot__content">
                    <div className="chatbot__message" ref={chatMessageRef}>
                        {chatContents.map((item, index) => {
                            return <div className={`chatbot__message--item ${item.user === 'bot' ? '' : 'me'}`} key={index}>{item.content}</div>
                        })}
                    </div>
                    {isThinking && 
                    <div className="chatbot__thinking">
                        <span>Bot is thinking </span>
                        <div className="bounce-loading"><div></div><div></div><div></div><div></div></div>
                    </div>}
                    <div className="chatbot__input">
                        <input type="text" placeholder="Nhập tin nhắn" ref={chatInputRef}/>
                        <button onClick={handleSubmit}>Gửi</button>
                    </div>
                </div>
            </div>
    </div>);
}

export default ChatBot;