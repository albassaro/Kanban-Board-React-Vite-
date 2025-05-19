import Style from "../../scss/components/header/header.module.scss";

import logo from '/favicons/to-do-list-app.svg';

export default function Header() {
  return (
    <>
      <header className={Style.container}>
        <div className={Style.content}>
          <button className={Style.logo}>
            <img 
              src={logo} 
              alt="Todo List Logo" 
            />
          </button>
          <div className={Style.greeting}>
            <p>Welcome back, A. Medlenkov!</p>
          </div>
          <nav className={Style.menu}>
            <p> laboriosam nesciunt delectus atque nemo, tenetur dicta sit vitae quasi itaque. Omnis?</p>
          </nav>
          <div className={Style.user}>
            <div className={Style.userData}>
              <div>
                <p className={Style.userName}>A. Medlenkov</p>
              </div>
              <div>
                <p className={Style.userStatus}>Basic User</p>
              </div>
            </div>
            <div className={Style.userLogo}>
              <img src="/" alt="user logo" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
