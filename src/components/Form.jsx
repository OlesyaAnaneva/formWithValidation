import React, { useState } from "react";

function Form() {
  const initialState = {
    userName: "",
    userEmail: "",
    userMsg: "",
    Bdate: "",
  };
  const [{ userName, userEmail, userMsg, Bdate }, setState] = useState(
    initialState
  );

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    messageError: "",
    BdateError: "",
  });

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let messageError = "";
    let BdateError = "";

    if (!userName) {
      nameError = "Имя не может быть пустым";
    }
    if (!userEmail) {
      emailError = "Необходимо ввести email";
    }
    if (userEmail && !/^[^@]+@[^@.]+\.[^@]+$/.test(userEmail)) {
      emailError = "Неправильный формат email";
    }
    if (!userMsg) {
      messageError = "Сообщение не может быть пустым";
    }
    if (!Bdate) {
      BdateError = "Введите дату рождения";
    }
    if (Bdate && !/^\d\d\.\d\d\.\d\d\d\d$/.test(Bdate)) {
      BdateError = "Неправильный формат даты рождения";
    }
    if (emailError || nameError || messageError || BdateError) {
      setErrors({ emailError, nameError, messageError, BdateError });
      return false;
    }

    return true;
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (isValid) {
      console.log(`Вы ввели: \n
  Имя: ${userName} \n
  Email: ${userEmail} \n
  Дата рождения: ${Bdate} \n
  Сообщение: ${userMsg}`);
      clearState();
      setErrors({
        nameError: "",
        emailError: "",
        messageError: "",
        BdateError: "",
      });
    }
  };

  return (
    <>
      <form id="formID">
        <h1 id="title">Отправить сообщение</h1>
        <p id="underTitle">Анонимные сообщения рассматриваются</p>
        <div className="twoInputs">
          <div className="divForInput">
            <input
              placeholder="Имя"
              value={userName}
              name="userName"
              onChange={onChange}
              className={!errors.nameError ? "inputStyle" : "inputStyleError"}
            />
            <p className="errMsg">{errors.nameError || ""}</p>
          </div>
          <div className="divForInput">
            <input
              placeholder="Email"
              value={userEmail}
              name="userEmail"
              onChange={onChange}
              className={!errors.emailError ? "inputStyle" : "inputStyleError"}
            />
            <p className="errMsg">{errors.emailError || ""}</p>
          </div>
          <div className="divForInput">
            <input
              placeholder="Дата рождения"
              value={Bdate}
              name="Bdate"
              onChange={onChange}
              className={!errors.BdateError ? "inputStyle" : "inputStyleError"}
            />
            <p className="errMsg">{errors.BdateError || ""}</p>
          </div>
        </div>
        <div id="inputStyleMsgDiv">
          <input
            placeholder="Сообщение"
            value={userMsg}
            name="userMsg"
            onChange={onChange}
            // id="inputStyleMsg"
            className={!errors.messageError ? "inputStyleMsg" : "inputStyleMsgError"}
          />
          <p className="errMsg">{errors.messageError || ""}</p>
        </div>
        <div className="twoButtons">
          <button onClick={clearState} id="clearButton">
            <p id="clearButtonText">Очистить</p>
          </button>
          <button onClick={handleSubmit} id="sendButton" disabled={!validate}>
            <p id="sendButtonText">Отправить</p>
          </button>
        </div>
      </form>
    </>
  );
}
export default Form;
