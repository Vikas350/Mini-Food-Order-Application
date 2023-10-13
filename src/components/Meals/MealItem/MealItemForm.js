import React,{useRef,useState} from 'react';
import './MealItemForm.css';
import Input from '../../UI/Input';

function MealItemForm(props) {

  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event)=>{
    event.preventDefault();

    //find the amount value
    const enteredAmount = amountInputRef.current.value; //this is in form of string
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setAmountIsValid(false);
      return ;
    }

    //use this function as to link between form and cart button
    props.onAddToCart(enteredAmountNumber);

  }

  return (
    <form className='form' onSubmit={submitHandler}>
      {/* because we have to give all the attributes as they can be used in input also */}
      <Input
        ref={amountInputRef} //access using forward ref
        label="Amount"
        input={{
          id: 'amount' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button> + Add</button>
      {!amountIsValid && <p>Enter correct value (1-5).</p>}
    </form>
  )
}

export default MealItemForm;
