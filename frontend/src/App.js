import React, { useState,useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionModal from './components/QuestionModal';
import sourceVideo from "./assets/move_and_Add_Add_and_Move _ Jack_Hartmann_Addition_Song.mp4";
var myInterval=null;

//question to ask
const questionObject = {questionText:'3+2=?',options:["4","5","6","7"],rightAnswer:2}  
const timestamp = 64;       //timestamp to pop the question


function App() {
  
  const [show, setShow] = useState(false);                                    
  const myvideoRef = useRef(null);                                                    //ref to access the video node
  const [questionSolved,setQuestionSolved] = useState(false); 
  
  //what to do when modal is closed
  const handleClose = () => {
    clearInterval(myInterval);                                                                   //clear the interval
    setQuestionSolved(true);                                                                     //set Question soved state to true
    myvideoRef.current.play();                                                                   //play the video
    setShow(false);                                                                              //close the modal
  };

  //when modal pops up
  const handleShow = () => setShow(true);

  //if wrong answer is choosen
  const wrongAnswerAlert = () => {
    alert("Wrong Answer! Try again.");
  }
  
  //start check on each second when video is played
  const onPlayVideo= () =>{
    myInterval=setInterval(() => checkStopingTime(), 500);                                 //interval to peroidically run video checking function
  };

  //clear the checking interval when video is paused
  const OnPauseVideo = () =>{
    clearInterval(myInterval);
  }  
  
  //fuction to decide wether to pop up question or not
  const checkStopingTime = () => {
   // 
    if(parseInt(myvideoRef.current.currentTime)>=timestamp){                                //checking if timestamp reached or exceeded
      if(!questionSolved){                                                                  //checking if question is still unsolved
        handleShow();                                                                       //pop up the question modal
        myvideoRef.current.pause();                                                         //exit fullscreen so that question can be displayed
        myvideoRef.current.webkitExitFullscreen();
        myvideoRef.current.mozCancelFullscreen();
        myvideoRef.current.exitFullscreen();
        
      }
      else{
        console.log("question already solved");                                             //if question is already solved
      }
    }
  }


  

  return (
    <div className='rootdiv'>
      <video ref={myvideoRef} width="70%"  onPlay={onPlayVideo} onPause={OnPauseVideo} controls>
      <source src={sourceVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      
    <div>
    </div>
    <div className='modalclass'>
      <QuestionModal questionObject={questionObject} show={show} handleClose={handleClose} wrongAnswerAlert={wrongAnswerAlert}/>
    </div>
    </div>
  );
}
export default App;