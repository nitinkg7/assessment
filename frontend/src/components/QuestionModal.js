import React from 'react'
import { Modal, Button } from "react-bootstrap";


const QuestionModal = ({questionObject,show,handleClose,wrongAnswerAlert}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}  backdrop="static" keyboard={false} centered >
        <Modal.Header>
          <Modal.Title>Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>{questionObject.questionText}</Modal.Body>
        
        <Modal.Footer>
        {questionObject.options.map((optionText,index)=>{
          return(
            <Button key={index} variant="primary" 
             onClick={index+1 === questionObject.rightAnswer?handleClose:wrongAnswerAlert}>
            {optionText}
          </Button>  
          );
        })}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default  QuestionModal;
