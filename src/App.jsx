// what this app will do: 
// a strong, impenetrable password generator app that generates passwords that nobody can guess - and in this way, a user's files and data will be more secure
// it will generate a random password according to user's requirements, like user can select the length of the password (6 - 14), or user can select whether they want to include small letters, or capital letters, or digits, or special characters in their password and also, they can copy that password and use it anywhere !!

import { useEffect, useState } from 'react';
import './App.css'

export default function App() {

  //declaring state variables
  const [length, setLength] = useState(6);   //checks for any change in length
  const [isSmallLettersChecked, setSmallLettersChecked] = useState(false);   //checks whether the smallLetters check is enabled or not
  const [isCapitalLettersChecked, setCapitalLettersChecked] = useState(false);   //checks whether the capitalLetters check is enabled or not
  const [isDigitsChecked, setDigitsChecked] = useState(true);   //checks whether the digits check is enabled or not
  const [isSpecialCharactersChecked, setSpecialCharactersChecked] = useState(false);   //checks whether the special characters check is enabled or not
  const [password, setPassword] = useState("");   //stores the password 
  const [copy, setCopy] = useState("COPY");   //change the button text "Copy" or "Copied" accordingly
  const [copyStyle, setCopyStyle] = useState({
    backgroundColor: "black",
  });   //if copy btn is clicked, then change the style accordingly

  //these are the function that sets the state variables as the user inputs
  function handleLengthChange(e){
    setLength(e.target.value);
    resetCopyStyle();
  }
  function handleSmallLettersChecked(e){ 
    setSmallLettersChecked(e.target.checked);
    resetCopyStyle();
  }
  function handleCapitalLettersChecked(e){ 
    setCapitalLettersChecked(e.target.checked);
    resetCopyStyle();
  }
  function handleDigitsChecked(e){ 
    setDigitsChecked(e.target.checked);
    resetCopyStyle();
  }
  function handleSpecialCharactersChecked(e){ 
    setSpecialCharactersChecked(e.target.checked);
    resetCopyStyle();
  }
  //a function to reset the style of the copy button whenever the user interacts with any input element
  function resetCopyStyle(){
    setCopy("COPY");
    setCopyStyle({
      backgroundColor: "black",
    })
  };   
  
  useEffect(() => {
    // initialize an empty string to store characters based on user selections
    let characters = "";
    
    // check if checkboxes are selected and add respective characters to the "characters" string
    if (isSmallLettersChecked) characters += "abcdefghijklmnopqrstuvwxyz";
    if (isCapitalLettersChecked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isDigitsChecked) characters += "0123456789";
    if (isSpecialCharactersChecked) characters += "`~!@#$%^&*()_-+={}[]|:;\"'<,>.?/";
  
    // initialize an empty string to store the generated password
    let newPassword = "";
  
    // generate a password of the specified length (6-14)
    for (let i = 0; i < length; i++) {
      // whatever will be the length of the "characters" string, it will generate a random number between 0 annd that length
      const randomIndex = Math.floor(Math.random() * characters.length);
      // in the "newPassword", add the character which will be at the index of the random index generated above
      newPassword += characters.charAt(randomIndex);
    }
  
    // set the generated password in the state variable
    setPassword(newPassword);
  }, [length, isSmallLettersChecked, isCapitalLettersChecked, isDigitsChecked, isSpecialCharactersChecked]);   //add the dependencies 
  

  //when the copy btn is clicked, the password will be copied to the clipboard and the btn text is set to "Copied" and the bg-clr of the btn will be set to green"
  function handleCopyButton(){
    navigator.clipboard.writeText(password);
    setCopy("COPIED");
    setCopyStyle({
      backgroundColor: "green",
    })
  };   
  
  //to generate current year
  const year = new Date().getFullYear();  

  return (
    <>
      <h3 className='heading'>SecureKey: "Generating Impenetrable Passwords"</h3>
      <div className='container'>
        <p>Generate a password of:</p>
        <div>Length: {length} <input type="range" min={6} max={14} value={length} onChange={handleLengthChange}/> </div>
        <div><input type="checkbox" checked={isSmallLettersChecked} onChange={handleSmallLettersChecked}/> Include small letters</div>
        <div> <input type="checkbox" checked={isCapitalLettersChecked} onChange={handleCapitalLettersChecked}/> Include capital letters</div>
        <div><input type="checkbox" checked={isDigitsChecked} onChange={handleDigitsChecked}/> Include digits</div>
        <div><input type="checkbox" checked={isSpecialCharactersChecked} onChange={handleSpecialCharactersChecked}/> Include special characters</div>
        <div className='password'>Your Password is: <span className='pw'>{password}</span> <button className='copy-btn' onClick={handleCopyButton} style={copyStyle}>{copy}</button></div>
    </div>
    <footer className="footer">&copy; {year} | All Rights Reserved.</footer>
    </>
  )
}
