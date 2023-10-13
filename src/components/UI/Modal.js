import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Backdrop = props =>{
    return <div className='backdrop' onClick={props.onClose}></div>
}

const ModalOverlay = props =>{
    return <div className='modal'>
        <div className='content'>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <Fragment>
            {/* use create portal so both will not render side by side  */}
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}

export default Modal
