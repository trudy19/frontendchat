import React, { useState,useEffect, } from 'react';
import {useDispatch,useSelector} from "react-redux";
import axios from "axios";
import SockJS from 'sockjs-client/dist/sockjs.min'
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Stomp from 'webstomp-client/dist/webstomp.min'
import { FetchConversations } from '../Redux/Actions/ConversationsActions';
import {signalProtocolManagerUser} from '../signal/SignalGateway';
import util from '../signal/helpers';
import { createSignalProtocolManager, SignalServerStore } from "../signal/SignalGateway"

var stompClient = null;
const libsignal = window.libsignal


const appBarHeight = 80;
const menuWidth = "26%";
const inputContainerHeight = 258;



function ChatWindow(props) {
    const [StompCommunicationInitialized, setStompCommunicationInitialized] =
    useState(false);
    const [notificationsSubscribed, setNotificationsSubscribed] =
    useState(false);
const [subscribedChatconversations, setSubscribedConversations] = useState([]);
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo}= userSignin ;    
    const listConversationsFetch = useSelector((state) => state.listConversationsFetch)
    const {conversations}= listConversationsFetch ; 
    
    const[state,setState]=useState({
        isLoggedIn: false,
        loggedInUserObj: {},
        dummySignalServer: new SignalServerStore(),
        signalProtocolManagerUser: undefined
      })
    const [activeChat, setActiveChat] = useState({
        chatconversationId: "",
        name: "",
        userId:"",
    });
    

    const [chatText,setChatText]=useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);

    const SOCKET_URL = 'http://192.168.1.10:9000/chat';


//// fetch all converrsations
const dispatch=useDispatch();
 


    useEffect(()=>{
        dispatch( FetchConversations());
    },[dispatch]);

    const initializeStompCommunication = () => {
console.log("instialize")
        let socket = new SockJS(SOCKET_URL);
        stompClient = Stomp.over(socket);
        stompClient.connect({ userId: userInfo.userId,username:userInfo.username }, onConnected);
    };

    const onConnected = () => {
        console.log("connected");
        console.log("conversation"+conversations.data[0])
        subscribeChatrooms();
    };


    const subscribeChatrooms = () => {
        conversations.data.forEach((conversation) => {
            let id = conversation.chatconversationId;
            if (subscribedChatconversations.includes(id)) {
                return;
            }
            stompClient.subscribe("/topic/chatconversation." + id, onMessageReceived);
            setSubscribedConversations((subscribedChatconversations) => [
                ...subscribedChatconversations,
                id,
            ]);
        });
    };


    const  onMessageReceived = async (msg) => {
        console.log("i received a smg"+msg)
        console.log(activeChat.userId)
let toverifyactive=activeChat;
let toverifystate=state;
        let message = JSON.parse(msg.body);
        message.time = new Date(message.time).toString();
        if (message.sender === userInfo.username) {
            message.mine = true;
        } else {
            console.log(activeChat)
            console.log(activeChat.userId)
            console.log(message.content)
         let decrytedMessage = await state.signalProtocolManagerUser.decryptMessageAsync("y", message.content)

            message.mine = false;
        }
        setReceivedMessages((messages) => [...messages, message]);
    };/*
    useEffect(() => {
        if(Conversations){
        console.log(Conversations.data)}
    }, [Conversations]);*/


    useEffect(() => {
        setLoggedinUser();

    },[]);
    useEffect(() => {
        console.log("effect de connect")
        if(conversations&&state.signalProtocolManagerUser!=null){

        if (conversations.data === undefined || conversations.data.length === 0) {
            console.log("step0")

            return;
        } else {

            if (conversations.data.length > 0) {
                if (activeChat.chatconversationId === "") {
                    setActiveChat(conversations.data[0]);
                }
            }
            console.log("step1")

            if (!StompCommunicationInitialized) {
                initializeStompCommunication();
                setStompCommunicationInitialized(true);
                console.log("stmp  truee:::::"+StompCommunicationInitialized)

            } else {
                console.log("stmpint:::::::"+StompCommunicationInitialized)
                subscribeChatrooms();
            }
        }
    }}, [state]);


    const setLoggedinUser=()=> {
        
          // Initializing signal server here
          createSignalProtocolManager(userInfo.userId,userInfo.username , state.dummySignalServer)
            .then(signalProtocolManagerUser => {
              setState({ signalProtocolManagerUser: signalProtocolManagerUser })
            })
        
      }

    const sendMessage = async() => {
        setChatText("");
        let msg = chatText;
        try {
            console.log(activeChat.userId)
            let toverifyybeforesending =activeChat.userId;
            let encryptedMessage = await state.signalProtocolManagerUser.encryptMessageAsync(activeChat.userId,msg);
            //let encryptedMessage = await encryptMessageAsync(activeChat.userId,msg);
            msg= encryptedMessage
            //this.state.ws.send(JSON.stringify(msgToSend))
          //  this.setState({ lastSentMessage: newMsgObj.message }) // Storing last-sent message for Verification with Received Message
        } catch (error) {
            console.log(error);
        }
        if (msg!== "") {
            let chatconversationId = activeChat.chatconversationId;
            let friendName = activeChat.userId;
            const message = {
                sender: userInfo.username,
                receiver: friendName,
                content: msg,
                time: "15h",
            };
            stompClient.send(
                "/app/chatconversation/" + chatconversationId,
                
                JSON.stringify(message)
            );
        }
    };



    return (
        
     <div>

{conversations?conversations.data.map(conversation=>{return<button onClick={
    ()=>
    {
    setActiveChat(conversation)
    
    }
    }>{conversation.name}</button>}):<div>
    </div>}

<div>
<span>{activeChat.name}</span>

</div>

<input onChange={(e)=>setChatText(e.target.value)}></input>
<button onClick={()=>sendMessage()}>send msg</button>

<div>

</div>
     </div>
    );
}

export default ChatWindow;