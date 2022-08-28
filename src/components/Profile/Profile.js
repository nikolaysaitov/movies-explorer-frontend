import React from "react";
import { useEffect, useState } from "react";
import { useValidationForm } from "../../utils/useValidationForm";
import { Link } from "react-router-dom";
import "./Profile.css";
import { VALIDATION_PARAMS } from "../../utils/constans";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ handleUpdateUser, handleExit, setCurrentUser }) {
  const { currentUser } = React.useContext(CurrentUserContext); 
  const startValues = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const { values, isValid, handleChange, setIsValid } =
    useValidationForm(startValues);

  useEffect(() => {
    const isValidName = VALIDATION_PARAMS.REGEX.NAME.test(values.name);
    const isValidEmail = VALIDATION_PARAMS.REGEX.EMAIL.test(values.email);
    const isChangeName = values.name !== currentUser.name;
    const isChangeEmail = values.email !== currentUser.email;

    isValidName && isValidEmail && (isChangeName || isChangeEmail)
      ? setIsValid(true)
      : setIsValid(false);
  }, [values]);

  function clickUpdateButton() {
    handleUpdateUser(values).then(() => setIsValid(false));
  }

  function clickSignOutButton() {
    handleExit();
  }
  return (
    <div className="profile">
      <div className="container profile__container">
        <div className="profile__wrapper">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form">
            <label className="profile__label">
              <p className="profile__text">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name}
                required
                onInput={handleChange}
                placeholder="Ваше новое имя"
              />
            </label>
            <label className="profile__label">
              <p className="profile__text">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                value={values.email}
                required
                onInput={handleChange}
                placeholder="Ваш новый E-mail"
              />
            </label>
          </form>
          <div className="profile__buttons">
            <button
              className={
                isValid
                  ? "profile__button"
                  : "profile__button profile__button_off"
              }
              type="button"
              onClick={clickUpdateButton}
            >
              Редактировать
            </button>
            <button
              className="profile__button profile__button_color_red"
              type="button"
              onClick={clickSignOutButton}
              >Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
// import React from "react";
// import { useEffect, useState } from "react";
// import { useValidationForm } from "../../utils/useValidationForm";
// // import { Link } from "react-router-dom";
// import "./Profile.css";
// import { VALIDATION_PARAMS } from "../../utils/constans";
// import { CurrentUserContext } from "../../context/CurrentUserContext";

// function Profile({ handleUpdateUser, handleExit, setIsShowMenu, setCurrentUser }) {

//   const { currentUser } = React.useContext(CurrentUserContext); 

//   const formWithValidation = useValidationForm();
//   const { email, name, isValid } = formWithValidation.values;

//   // Начальные значения формы
//   React.useEffect(() => {
//     formWithValidation.setValues({
//       email: currentUser.email,
//       name: currentUser.name,
//     });
//   }, [currentUser]);






//   // const startValues = {
//   //   name: currentUser.name,
//   //   email: currentUser.email,
//   // };

//   // const { values, isValid, handleChange, setIsValid } =
//   //   useValidationForm(startValues);

//   // useEffect(() => {
//   //   const isValidName = VALIDATION_PARAMS.REGEX.NAME.test(values.name);
//   //   const isValidEmail = VALIDATION_PARAMS.REGEX.EMAIL.test(values.email);
//   //   const isChangeName = values.name !== currentUser.name;
//   //   const isChangeEmail = values.email !== currentUser.email;

//   //   isValidName && isValidEmail && (isChangeName || isChangeEmail)
//   //     ? setIsValid(true)
//   //     : setIsValid(false);
//   // }, [values]);

//   // function clickUpdateButton() {
//   //   handleUpdateUser(values).then(() => setIsValid(false));
//   // }


//   const clickUpdateButton = (event) => {
//     event.preventDefault();
//     handleUpdateUser(name, email);
//   };


//   function clickSignOutButton() {
//     handleExit();
//   }
//   return (
//     <div className="profile">
//       <div className="container profile__container">
//         <div className="profile__wrapper">
//           <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
//           <form className="profile__form">
//             <label className="profile__label">
//               <p className="profile__text">Имя</p>
//               <input
//                 className="profile__input"
//                 type="text"
//                 name="name"
//                 value={name || ""}
//                 required
//                 onChange={formWithValidation.handleChange}
//                 placeholder="Ваше новое имя"
//               />
//             </label>
//             <label className="profile__label">
//               <p className="profile__text">E-mail</p>
//               <input
//                 className="profile__input"
//                 type="email"
//                 name="email"
//                 value={email || ""}
//                 required
//                 onChange={formWithValidation.handleChange}
//                 placeholder="Ваш новый E-mail"
//               />
//             </label>
//           </form>
//           <div className="profile__buttons">
//             <button
//               className={
//                 isValid
//                   ? "profile__button"
//                   : "profile__button profile__button_off"
//               }
//               type="button"
//               onClick={clickUpdateButton}
//             >
//               Редактировать
//             </button>
//             <button
//               className="profile__button profile__button_color_red"
//               type="button"
//               onClick={clickSignOutButton}
//               >Выйти из аккаунта</button>
          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
