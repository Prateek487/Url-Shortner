import { useState } from "react";
import { useRef } from "react";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const inputRef = useRef();
  const [generatedUrl, setGeneratedUrl] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const inputVal = inputRef.current.value;
    console.log(inputVal);

    try {
      const response = await fetch("/addRoute", {
        method: "POST",
        body: JSON.stringify({ val: inputVal }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 422) {
        alert("Invalid URL");
        return;
      }
      if (response.status != 201 && response.status != 200) {
        alert("Something Went Wrong");
        return;
      }
      const resData = await response.json();
      setGeneratedUrl(resData.hashedUrl);
      inputRef.current.value = "";
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.Home}>
      <div className={classes.Form}>
        <form onSubmit={onSubmitHandler}>
          <label>Please Enter the URL:</label>
          <input type={"url"} ref={inputRef} />
          <button type="submit">Genrate URL</button>
        </form>
      </div>
      <div className={classes.GeneratedUrl}>
        {generatedUrl && (
          <a target={"_blank"} href={generatedUrl}>
            {generatedUrl}
          </a>
        )}
      </div>
    </div>
  );
};
export default HomePage;
